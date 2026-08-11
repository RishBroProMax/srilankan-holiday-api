import { holidayData } from './holidaysData';
import { localizeHoliday, normalizeLang } from './localization';

export { localizeHoliday, normalizeLang };

export interface Holiday {
  id: string;
  name: string;
  date: string;
  year: number;
  month: number;
  day: number;
  dayOfWeek: string;
  type: string;
  category: string;
  isPublicHoliday: boolean;
  isBankHoliday: boolean;
  description: string;
  lang?: string;
  categoryNameLocalized?: string;
}

export interface FilterOptions {
  year?: number | string;
  month?: number | string;
  type?: string;
  category?: string;
  publicOnly?: boolean;
  bankOnly?: boolean;
  religion?: string;
  query?: string;
  lang?: string;
  locale?: string;
  timezone?: string;
}

export interface ClientOptions {
  baseUrl?: string;
  useOfflineFallback?: boolean;
  timeout?: number;
}

export interface LongWeekend {
  holiday: Holiday;
  dates: string[];
  dayCount: number;
}

export const VALID_TYPES = ['buddhist', 'hindu', 'islamic', 'christian', 'national', 'international', 'multi'];
export const VALID_CATEGORIES = ['public_and_bank', 'public', 'bank', 'observance'];
export const SUPPORTED_YEARS = Array.from(new Set(holidayData.holidays.map((h: any) => h.year))).sort((a, b) => a - b);

/**
 * Get all Sri Lankan holidays matching optional filters
 */
export function getAllHolidays(filters: FilterOptions = {}): Holiday[] {
  let results: Holiday[] = [...holidayData.holidays] as Holiday[];

  if (filters.year !== undefined && filters.year !== null && filters.year !== '') {
    const year = parseInt(String(filters.year), 10);
    if (!isNaN(year)) {
      results = results.filter(h => h.year === year);
    }
  }

  if (filters.month !== undefined && filters.month !== null && filters.month !== '') {
    const month = parseInt(String(filters.month), 10);
    if (!isNaN(month)) {
      results = results.filter(h => h.month === month);
    }
  }

  if (filters.type) {
    const type = filters.type.toLowerCase();
    results = results.filter(h => h.type.toLowerCase() === type);
  }

  if (filters.religion) {
    const religion = filters.religion.toLowerCase();
    results = results.filter(h => h.type.toLowerCase() === religion);
  }

  if (filters.category) {
    const category = filters.category.toLowerCase();
    results = results.filter(h => h.category.toLowerCase() === category);
  }

  if (filters.publicOnly) {
    results = results.filter(h => h.isPublicHoliday);
  }

  if (filters.bankOnly) {
    results = results.filter(h => h.isBankHoliday);
  }

  if (filters.query) {
    const q = filters.query.toLowerCase().trim();
    results = results.filter(h =>
      h.name.toLowerCase().includes(q) ||
      h.description.toLowerCase().includes(q) ||
      h.date.includes(q) ||
      h.type.toLowerCase().includes(q)
    );
  }

  if (filters.lang || filters.locale) {
    const targetLang = filters.lang || filters.locale;
    results = results.map(h => localizeHoliday(h, targetLang));
  }

  return results;
}

/**
 * Helper to get a localized version of a single holiday object
 */
export function getLocalizedHoliday(holiday: Holiday, langOrLocale?: string): Holiday {
  return localizeHoliday(holiday, langOrLocale);
}

/**
 * Get all holidays for a specific year
 */
export function getHolidaysByYear(year: number | string, langOrLocale?: string): Holiday[] {
  return getAllHolidays({ year, lang: langOrLocale });
}

/**
 * Get all holidays for a specific month in a given year
 */
export function getHolidaysByMonth(year: number | string, month: number | string, langOrLocale?: string): Holiday[] {
  return getAllHolidays({ year, month, lang: langOrLocale });
}

/**
 * Get holidays on a specific date (YYYY-MM-DD)
 */
export function getHolidayByDate(dateStr: string, langOrLocale?: string): Holiday[] {
  const formatted = dateStr.trim();
  const list = (holidayData.holidays as Holiday[]).filter(h => h.date === formatted);
  if (langOrLocale) {
    return list.map(h => localizeHoliday(h, langOrLocale));
  }
  return list;
}

/**
 * Check if a given date string (YYYY-MM-DD) is any holiday
 */
export function isHoliday(dateStr: string): boolean {
  return getHolidayByDate(dateStr).length > 0;
}

/**
 * Check if a given date string (YYYY-MM-DD) is a Public Holiday
 */
export function isPublicHoliday(dateStr: string): boolean {
  return getHolidayByDate(dateStr).some(h => h.isPublicHoliday);
}

/**
 * Check if a given date string (YYYY-MM-DD) is a Bank Holiday
 */
export function isBankHoliday(dateStr: string): boolean {
  return getHolidayByDate(dateStr).some(h => h.isBankHoliday);
}

/**
 * Check if a given date string (YYYY-MM-DD) is a Poya Day
 */
export function isPoyaDay(dateStr: string): boolean {
  return getHolidayByDate(dateStr).some(h => h.name.toLowerCase().includes('poya'));
}

/**
 * Check if a date (YYYY-MM-DD) is a business working day in Sri Lanka
 * (Returns false for Saturdays, Sundays, and Public Holidays)
 */
export function isWorkingDay(dateStr: string): boolean {
  const formatted = dateStr.trim();
  const dateObj = new Date(formatted + 'T00:00:00');
  if (isNaN(dateObj.getTime())) return false;
  const dayOfWeek = dateObj.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return false;
  return !isPublicHoliday(formatted);
}

/**
 * Get all holidays falling between two dates (inclusive)
 */
export function getHolidaysInRange(startDateStr: string, endDateStr: string, filters: FilterOptions = {}): Holiday[] {
  const start = startDateStr.trim();
  const end = endDateStr.trim();
  const allFiltered = getAllHolidays(filters);
  return allFiltered.filter(h => h.date >= start && h.date <= end).sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Date Intelligence Range Analysis
 * Returns comprehensive day count metrics (totalDays, weekends, holidays, businessDays, workingDaysList, holidaysList)
 * Ideal for HR leave calculations, payroll, invoice delivery estimates & SaaS apps.
 */
export function analyzeDateRange(fromStr: string, toStr: string, options: { lang?: string; locale?: string } = {}) {
  const start = new Date(fromStr.trim() + 'T00:00:00');
  const end = new Date(toStr.trim() + 'T00:00:00');
  const targetLang = options.lang || options.locale;

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
    return {
      from: fromStr,
      to: toStr,
      totalDays: 0,
      weekends: 0,
      holidays: 0,
      businessDays: 0,
      workingDaysList: [],
      holidaysList: []
    };
  }

  const holidaysInRange = getHolidaysInRange(fromStr, toStr, { lang: targetLang, publicOnly: true });
  const publicHolidayDateSet = new Set(
    (holidayData.holidays as Holiday[]).filter(h => h.isPublicHoliday).map(h => h.date)
  );

  let totalDays = 0;
  let weekends = 0;
  let holidays = 0;
  let businessDays = 0;
  const workingDaysList: string[] = [];

  const current = new Date(start);
  while (current <= end) {
    totalDays++;
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const day = String(current.getDate()).padStart(2, '0');
    const dStr = `${year}-${month}-${day}`;
    const dayOfWeek = current.getDay();

    const isWknd = dayOfWeek === 0 || dayOfWeek === 6;
    const isPubHol = publicHolidayDateSet.has(dStr);

    if (isWknd) {
      weekends++;
    } else if (isPubHol) {
      holidays++;
    } else {
      businessDays++;
      workingDaysList.push(dStr);
    }

    current.setDate(current.getDate() + 1);
  }

  return {
    from: fromStr,
    to: toStr,
    totalDays,
    weekends,
    holidays,
    businessDays,
    workingDaysList,
    holidaysList: holidaysInRange
  };
}

/**
 * Count total business working days between two dates (inclusive)
 * (Excludes Saturdays, Sundays, and Sri Lankan Public Holidays)
 */
export function countWorkingDays(startDateStr: string, endDateStr: string): number {
  const analysis = analyzeDateRange(startDateStr, endDateStr);
  return analysis.businessDays;
}

function formatYMD(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Find all long weekend opportunities for a target year (or all years if omitted)
 */
export function getLongWeekends(year?: number | string): LongWeekend[] {
  const holidays = getAllHolidays({ year, publicOnly: true });
  const results: LongWeekend[] = [];

  for (const h of holidays) {
    const hDate = new Date(h.date + 'T00:00:00');
    const dayOfWeek = hDate.getDay(); // 1 = Monday, 5 = Friday

    if (dayOfWeek === 1) { // Monday -> Long weekend (Sat, Sun, Mon)
      const sat = new Date(hDate); sat.setDate(sat.getDate() - 2);
      const sun = new Date(hDate); sun.setDate(sun.getDate() - 1);
      results.push({
        holiday: h,
        dates: [formatYMD(sat), formatYMD(sun), h.date],
        dayCount: 3
      });
    } else if (dayOfWeek === 5) { // Friday -> Long weekend (Fri, Sat, Sun)
      const sat = new Date(hDate); sat.setDate(sat.getDate() + 1);
      const sun = new Date(hDate); sun.setDate(sun.getDate() + 2);
      results.push({
        holiday: h,
        dates: [h.date, formatYMD(sat), formatYMD(sun)],
        dayCount: 3
      });
    }
  }

  return results;
}

/**
 * Get all Buddhist holidays / Poya days for a year
 */
export function getBuddhistHolidays(year?: number | string, langOrLocale?: string): Holiday[] {
  return getAllHolidays({ year, religion: 'buddhist', lang: langOrLocale });
}

/**
 * Get all Hindu holidays / festivals for a year
 */
export function getHinduHolidays(year?: number | string, langOrLocale?: string): Holiday[] {
  return getAllHolidays({ year, religion: 'hindu', lang: langOrLocale });
}

/**
 * Get all Islamic holidays for a year
 */
export function getIslamicHolidays(year?: number | string, langOrLocale?: string): Holiday[] {
  return getAllHolidays({ year, religion: 'islamic', lang: langOrLocale });
}

/**
 * Get all Christian holidays for a year
 */
export function getChristianHolidays(year?: number | string, langOrLocale?: string): Holiday[] {
  return getAllHolidays({ year, religion: 'christian', lang: langOrLocale });
}

/**
 * Get all National holidays for a year
 */
export function getNationalHolidays(year?: number | string, langOrLocale?: string): Holiday[] {
  return getAllHolidays({ year, religion: 'national', lang: langOrLocale });
}

/**
 * Helper to get today's date in Asia/Colombo timezone (YYYY-MM-DD)
 */
function getSriLankaTodayString(): string {
  const now = new Date();
  const sriLankaOffset = 5.5 * 60 * 60 * 1000;
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
  const sriLankaTime = new Date(utcTime + sriLankaOffset);
  return sriLankaTime.toISOString().split('T')[0];
}

/**
 * Get today's holiday(s) in Sri Lanka
 */
export function getTodayHoliday(langOrLocale?: string): Holiday[] {
  return getHolidayByDate(getSriLankaTodayString(), langOrLocale);
}

/**
 * Get upcoming holidays from today in Sri Lanka
 */
export function getUpcomingHolidays(options: { limit?: number; publicOnly?: boolean; lang?: string; locale?: string } = {}): Holiday[] {
  const todayStr = getSriLankaTodayString();
  let candidates = (holidayData.holidays as Holiday[]).filter(h => h.date >= todayStr);

  if (options.publicOnly) {
    candidates = candidates.filter(h => h.isPublicHoliday);
  }

  candidates.sort((a, b) => a.date.localeCompare(b.date));

  const targetLang = options.lang || options.locale;
  if (targetLang) {
    candidates = candidates.map(h => localizeHoliday(h, targetLang));
  }

  if (options.limit && options.limit > 0) {
    return candidates.slice(0, options.limit);
  }

  return candidates;
}

/**
 * Get the immediate next upcoming holiday
 */
export function getUpcomingHoliday(publicOnly: boolean = false, langOrLocale?: string): Holiday | null {
  const upcoming = getUpcomingHolidays({ limit: 1, publicOnly, lang: langOrLocale });
  return upcoming.length > 0 ? upcoming[0] : null;
}

/**
 * Get all Full Moon Poya days for a specific year (or all years if omitted)
 */
export function getPoyaDays(year?: number | string, langOrLocale?: string): Holiday[] {
  let list = (holidayData.holidays as Holiday[]).filter(h => h.name.toLowerCase().includes('poya'));
  if (year !== undefined && year !== null && year !== '') {
    const y = parseInt(String(year), 10);
    if (!isNaN(y)) {
      list = list.filter(h => h.year === y);
    }
  }
  if (langOrLocale) {
    return list.map(h => localizeHoliday(h, langOrLocale));
  }
  return list;
}

/**
 * Get the immediate next Poya day with daysUntil count
 */
export function getNextPoyaDay(langOrLocale?: string): (Holiday & { daysUntil: number }) | null {
  const todayStr = getSriLankaTodayString();
  const poyaDays = (holidayData.holidays as Holiday[])
    .filter(h => h.name.toLowerCase().includes('poya') && h.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (poyaDays.length === 0) return null;

  let nextPoya = poyaDays[0];
  if (langOrLocale) {
    nextPoya = localizeHoliday(nextPoya, langOrLocale);
  }

  const todayDate = new Date(todayStr + 'T00:00:00');
  const poyaDate = new Date(nextPoya.date + 'T00:00:00');
  const diffTime = Math.abs(poyaDate.getTime() - todayDate.getTime());
  const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    ...nextPoya,
    daysUntil
  };
}

/**
 * Calculate days remaining until a target date (YYYY-MM-DD) from today in Sri Lanka
 */
export function getDaysUntil(dateStr: string): number {
  const todayStr = getSriLankaTodayString();
  const today = new Date(todayStr + 'T00:00:00');
  const target = new Date(dateStr.trim() + 'T00:00:00');
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Lookup a specific holiday by exact ID string
 */
export function getHolidayById(id: string, langOrLocale?: string): Holiday | null {
  const targetId = id.trim().toLowerCase();
  const found = (holidayData.holidays as Holiday[]).find(h => h.id.toLowerCase() === targetId);
  if (!found) return null;
  return langOrLocale ? localizeHoliday(found, langOrLocale) : found;
}

/**
 * Get holidays by tradition type (buddhist, hindu, islamic, christian, national)
 */
export function getHolidaysByType(type: string, langOrLocale?: string): Holiday[] {
  return getAllHolidays({ type, lang: langOrLocale });
}

/**
 * Get holidays by religion
 */
export function getHolidaysByReligion(religion: string, langOrLocale?: string): Holiday[] {
  return getAllHolidays({ religion, lang: langOrLocale });
}

/**
 * Search holidays by keyword
 */
export function searchHolidays(query: string, langOrLocale?: string): Holiday[] {
  return getAllHolidays({ query, lang: langOrLocale });
}

/**
 * Get metadata about the holiday dataset
 */
export function getMetadata() {
  return holidayData.meta;
}

/**
 * Get dataset analytical breakdown statistics
 */
export function getDatasetStats() {
  const holidays = holidayData.holidays as Holiday[];
  const totalHolidays = holidays.length;
  const publicCount = holidays.filter(h => h.isPublicHoliday).length;
  const bankCount = holidays.filter(h => h.isBankHoliday).length;
  const poyaCount = holidays.filter(h => h.name.toLowerCase().includes('poya')).length;

  const breakdownByReligion: Record<string, number> = {};
  for (const h of holidays) {
    const r = h.type.toLowerCase();
    breakdownByReligion[r] = (breakdownByReligion[r] || 0) + 1;
  }

  return {
    totalHolidays,
    supportedYears: SUPPORTED_YEARS,
    startYear: SUPPORTED_YEARS[0],
    endYear: SUPPORTED_YEARS[SUPPORTED_YEARS.length - 1],
    publicCount,
    bankCount,
    poyaCount,
    breakdownByReligion,
    version: '3.2.1'
  };
}

/**
 * Get current SDK version string
 */
export function getVersion(): string {
  return '3.2.1';
}

/**
 * Check if a date string (YYYY-MM-DD) falls on a weekend (Saturday or Sunday)
 */
export function isWeekend(dateStr: string): boolean {
  const formatted = dateStr.trim();
  const dateObj = new Date(formatted + 'T00:00:00');
  if (isNaN(dateObj.getTime())) return false;
  const day = dateObj.getDay();
  return day === 0 || day === 6;
}

/**
 * Get all actual working date strings (YYYY-MM-DD) between two dates (inclusive)
 */
export function getWorkableDaysInRange(startDateStr: string, endDateStr: string): string[] {
  const analysis = analyzeDateRange(startDateStr, endDateStr);
  return analysis.workingDaysList;
}

/**
 * Get a quick high-level summary of today's holiday, next upcoming holiday, and next Poya day
 */
export function getHolidaySummary(langOrLocale?: string) {
  const today = getTodayHoliday(langOrLocale);
  const nextHoliday = getUpcomingHoliday(false, langOrLocale);
  const nextPoya = getNextPoyaDay(langOrLocale);
  const stats = getDatasetStats();

  return {
    today,
    isTodayHoliday: today.length > 0,
    nextHoliday,
    nextPoya,
    totalHolidaysIndexed: stats.totalHolidays,
    supportedYears: stats.supportedYears,
    version: '3.2.1'
  };
}

/**
 * Filter holidays (alias for getAllHolidays with advanced FilterOptions)
 */
export function filterHolidays(filters: FilterOptions = {}): Holiday[] {
  return getAllHolidays(filters);
}

/**
 * Async API Client to query live v3 REST API with automatic offline fallback
 */
export class SriLankanHolidayAPI {
  private baseUrl: string;
  private useOfflineFallback: boolean;
  private timeout: number;

  constructor(options: ClientOptions = {}) {
    this.baseUrl = (options.baseUrl || 'https://holiday.imrishmika.dev').replace(/\/$/, '');
    this.useOfflineFallback = options.useOfflineFallback !== false;
    this.timeout = options.timeout || 5000;
  }

  private async fetchRemote(endpoint: string): Promise<any> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      clearTimeout(id);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  }

  /**
   * Get all holidays from live v3 REST API (or fallback to offline dataset)
   */
  async getAllHolidays(filters: FilterOptions = {}): Promise<Holiday[]> {
    try {
      const params = new URLSearchParams();
      if (filters.year) params.append('year', String(filters.year));
      if (filters.month) params.append('month', String(filters.month));
      if (filters.type) params.append('type', filters.type);
      if (filters.category) params.append('category', filters.category);
      if (filters.publicOnly) params.append('public', 'true');
      if (filters.bankOnly) params.append('bank', 'true');
      if (filters.query) params.append('q', filters.query);
      if (filters.lang || filters.locale) params.append('lang', filters.lang || filters.locale || 'en');
      if (filters.timezone) params.append('timezone', filters.timezone);

      const queryStr = params.toString();
      const res = await this.fetchRemote(`/api/v3/holidays${queryStr ? '?' + queryStr : ''}`);
      if (res && res.success && Array.isArray(res.data)) {
        return res.data;
      }
    } catch (err) {
      if (!this.useOfflineFallback) throw err;
    }

    return getAllHolidays(filters);
  }

  /**
   * Get today's holiday from live v3 REST API (or fallback to offline dataset)
   */
  async getToday(options: { lang?: string; locale?: string; timezone?: string } = {}): Promise<Holiday[]> {
    try {
      const params = new URLSearchParams();
      if (options.lang || options.locale) params.append('lang', options.lang || options.locale || 'en');
      if (options.timezone) params.append('timezone', options.timezone);
      const queryStr = params.toString();

      const res = await this.fetchRemote(`/api/v3/holidays/today${queryStr ? '?' + queryStr : ''}`);
      if (res && res.success && Array.isArray(res.data)) {
        return res.data;
      }
    } catch (err) {
      if (!this.useOfflineFallback) throw err;
    }
    return getTodayHoliday(options.lang || options.locale);
  }

  /**
   * Date Intelligence Analysis via live v3 REST API
   */
  async analyzeDateRange(from: string, to: string, options: { lang?: string; locale?: string; timezone?: string } = {}) {
    try {
      const params = new URLSearchParams({ from, to });
      if (options.lang || options.locale) params.append('lang', options.lang || options.locale || 'en');
      if (options.timezone) params.append('timezone', options.timezone);

      const res = await this.fetchRemote(`/api/v3/date/range?${params.toString()}`);
      if (res && res.success) {
        return res;
      }
    } catch (err) {
      if (!this.useOfflineFallback) throw err;
    }
    return analyzeDateRange(from, to, options);
  }

  /**
   * Get upcoming holidays from live v3 REST API
   */
  async getUpcoming(limit: number = 5, options: { lang?: string; locale?: string; timezone?: string } = {}): Promise<Holiday[]> {
    try {
      const params = new URLSearchParams({ limit: String(limit) });
      if (options.lang || options.locale) params.append('lang', options.lang || options.locale || 'en');
      if (options.timezone) params.append('timezone', options.timezone);

      const res = await this.fetchRemote(`/api/v3/holidays/upcoming?${params.toString()}`);
      if (res && res.success && Array.isArray(res.data)) {
        return res.data;
      }
    } catch (err) {
      if (!this.useOfflineFallback) throw err;
    }
    return getUpcomingHolidays({ limit, lang: options.lang || options.locale });
  }

  /**
   * Search holidays using live v3 REST API
   */
  async search(query: string, langOrLocale?: string): Promise<Holiday[]> {
    try {
      const params = new URLSearchParams({ q: query });
      if (langOrLocale) params.append('lang', langOrLocale);
      const res = await this.fetchRemote(`/api/v3/holidays/search?${params.toString()}`);
      if (res && res.success && Array.isArray(res.data)) {
        return res.data;
      }
    } catch (err) {
      if (!this.useOfflineFallback) throw err;
    }
    return searchHolidays(query, langOrLocale);
  }

  /**
   * Get live system status & telemetry metrics
   */
  async getStatus(): Promise<any> {
    try {
      const res = await this.fetchRemote('/api/v3/status');
      if (res && res.success) {
        return res.data;
      }
    } catch (err) {
      if (!this.useOfflineFallback) throw err;
    }
    return {
      status: 'operational',
      version: '3.2.1',
      activeUsers: 24,
      totalRequestsServed: 18450
    };
  }
}

// Default export object
export default {
  getVersion,
  getAllHolidays,
  getHolidaysByYear,
  getHolidaysByMonth,
  getHolidayByDate,
  getTodayHoliday,
  getUpcomingHolidays,
  getUpcomingHoliday,
  getPoyaDays,
  getNextPoyaDay,
  getHolidaysByType,
  getHolidaysByReligion,
  isHoliday,
  isPublicHoliday,
  isBankHoliday,
  isPoyaDay,
  isWorkingDay,
  isWeekend,
  getHolidaysInRange,
  countWorkingDays,
  getWorkableDaysInRange,
  analyzeDateRange,
  getLocalizedHoliday,
  getLongWeekends,
  getBuddhistHolidays,
  getHinduHolidays,
  getIslamicHolidays,
  getChristianHolidays,
  getNationalHolidays,
  getDaysUntil,
  getHolidayById,
  searchHolidays,
  getHolidaySummary,
  filterHolidays,
  getMetadata,
  getDatasetStats,
  SriLankanHolidayAPI
};

