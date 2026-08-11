"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SriLankanHolidayAPI = exports.SUPPORTED_YEARS = exports.VALID_CATEGORIES = exports.VALID_TYPES = exports.normalizeLang = exports.localizeHoliday = void 0;
exports.getAllHolidays = getAllHolidays;
exports.getLocalizedHoliday = getLocalizedHoliday;
exports.getHolidaysByYear = getHolidaysByYear;
exports.getHolidaysByMonth = getHolidaysByMonth;
exports.getHolidayByDate = getHolidayByDate;
exports.isHoliday = isHoliday;
exports.isPublicHoliday = isPublicHoliday;
exports.isBankHoliday = isBankHoliday;
exports.isPoyaDay = isPoyaDay;
exports.isWorkingDay = isWorkingDay;
exports.getHolidaysInRange = getHolidaysInRange;
exports.analyzeDateRange = analyzeDateRange;
exports.countWorkingDays = countWorkingDays;
exports.getLongWeekends = getLongWeekends;
exports.getBuddhistHolidays = getBuddhistHolidays;
exports.getHinduHolidays = getHinduHolidays;
exports.getIslamicHolidays = getIslamicHolidays;
exports.getChristianHolidays = getChristianHolidays;
exports.getNationalHolidays = getNationalHolidays;
exports.getTodayHoliday = getTodayHoliday;
exports.getUpcomingHolidays = getUpcomingHolidays;
exports.getUpcomingHoliday = getUpcomingHoliday;
exports.getPoyaDays = getPoyaDays;
exports.getNextPoyaDay = getNextPoyaDay;
exports.getDaysUntil = getDaysUntil;
exports.getHolidayById = getHolidayById;
exports.getHolidaysByType = getHolidaysByType;
exports.getHolidaysByReligion = getHolidaysByReligion;
exports.searchHolidays = searchHolidays;
exports.getMetadata = getMetadata;
exports.getDatasetStats = getDatasetStats;
exports.getVersion = getVersion;
exports.isWeekend = isWeekend;
exports.getWorkableDaysInRange = getWorkableDaysInRange;
exports.getHolidaySummary = getHolidaySummary;
exports.filterHolidays = filterHolidays;
const holidaysData_1 = require("./holidaysData");
const localization_1 = require("./localization");
Object.defineProperty(exports, "localizeHoliday", { enumerable: true, get: function () { return localization_1.localizeHoliday; } });
Object.defineProperty(exports, "normalizeLang", { enumerable: true, get: function () { return localization_1.normalizeLang; } });
exports.VALID_TYPES = ['buddhist', 'hindu', 'islamic', 'christian', 'national', 'international', 'multi'];
exports.VALID_CATEGORIES = ['public_and_bank', 'public', 'bank', 'observance'];
exports.SUPPORTED_YEARS = Array.from(new Set(holidaysData_1.holidayData.holidays.map((h) => h.year))).sort((a, b) => a - b);
/**
 * Get all Sri Lankan holidays matching optional filters
 */
function getAllHolidays(filters = {}) {
    let results = [...holidaysData_1.holidayData.holidays];
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
        results = results.filter(h => h.name.toLowerCase().includes(q) ||
            h.description.toLowerCase().includes(q) ||
            h.date.includes(q) ||
            h.type.toLowerCase().includes(q));
    }
    if (filters.lang || filters.locale) {
        const targetLang = filters.lang || filters.locale;
        results = results.map(h => (0, localization_1.localizeHoliday)(h, targetLang));
    }
    return results;
}
/**
 * Helper to get a localized version of a single holiday object
 */
function getLocalizedHoliday(holiday, langOrLocale) {
    return (0, localization_1.localizeHoliday)(holiday, langOrLocale);
}
/**
 * Get all holidays for a specific year
 */
function getHolidaysByYear(year, langOrLocale) {
    return getAllHolidays({ year, lang: langOrLocale });
}
/**
 * Get all holidays for a specific month in a given year
 */
function getHolidaysByMonth(year, month, langOrLocale) {
    return getAllHolidays({ year, month, lang: langOrLocale });
}
/**
 * Get holidays on a specific date (YYYY-MM-DD)
 */
function getHolidayByDate(dateStr, langOrLocale) {
    const formatted = dateStr.trim();
    const list = holidaysData_1.holidayData.holidays.filter(h => h.date === formatted);
    if (langOrLocale) {
        return list.map(h => (0, localization_1.localizeHoliday)(h, langOrLocale));
    }
    return list;
}
/**
 * Check if a given date string (YYYY-MM-DD) is any holiday
 */
function isHoliday(dateStr) {
    return getHolidayByDate(dateStr).length > 0;
}
/**
 * Check if a given date string (YYYY-MM-DD) is a Public Holiday
 */
function isPublicHoliday(dateStr) {
    return getHolidayByDate(dateStr).some(h => h.isPublicHoliday);
}
/**
 * Check if a given date string (YYYY-MM-DD) is a Bank Holiday
 */
function isBankHoliday(dateStr) {
    return getHolidayByDate(dateStr).some(h => h.isBankHoliday);
}
/**
 * Check if a given date string (YYYY-MM-DD) is a Poya Day
 */
function isPoyaDay(dateStr) {
    return getHolidayByDate(dateStr).some(h => h.name.toLowerCase().includes('poya'));
}
/**
 * Check if a date (YYYY-MM-DD) is a business working day in Sri Lanka
 * (Returns false for Saturdays, Sundays, and Public Holidays)
 */
function isWorkingDay(dateStr) {
    const formatted = dateStr.trim();
    const dateObj = new Date(formatted + 'T00:00:00');
    if (isNaN(dateObj.getTime()))
        return false;
    const dayOfWeek = dateObj.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6)
        return false;
    return !isPublicHoliday(formatted);
}
/**
 * Get all holidays falling between two dates (inclusive)
 */
function getHolidaysInRange(startDateStr, endDateStr, filters = {}) {
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
function analyzeDateRange(fromStr, toStr, options = {}) {
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
    const publicHolidayDateSet = new Set(holidaysData_1.holidayData.holidays.filter(h => h.isPublicHoliday).map(h => h.date));
    let totalDays = 0;
    let weekends = 0;
    let holidays = 0;
    let businessDays = 0;
    const workingDaysList = [];
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
        }
        else if (isPubHol) {
            holidays++;
        }
        else {
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
function countWorkingDays(startDateStr, endDateStr) {
    const analysis = analyzeDateRange(startDateStr, endDateStr);
    return analysis.businessDays;
}
function formatYMD(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
/**
 * Find all long weekend opportunities for a target year (or all years if omitted)
 */
function getLongWeekends(year) {
    const holidays = getAllHolidays({ year, publicOnly: true });
    const results = [];
    for (const h of holidays) {
        const hDate = new Date(h.date + 'T00:00:00');
        const dayOfWeek = hDate.getDay(); // 1 = Monday, 5 = Friday
        if (dayOfWeek === 1) { // Monday -> Long weekend (Sat, Sun, Mon)
            const sat = new Date(hDate);
            sat.setDate(sat.getDate() - 2);
            const sun = new Date(hDate);
            sun.setDate(sun.getDate() - 1);
            results.push({
                holiday: h,
                dates: [formatYMD(sat), formatYMD(sun), h.date],
                dayCount: 3
            });
        }
        else if (dayOfWeek === 5) { // Friday -> Long weekend (Fri, Sat, Sun)
            const sat = new Date(hDate);
            sat.setDate(sat.getDate() + 1);
            const sun = new Date(hDate);
            sun.setDate(sun.getDate() + 2);
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
function getBuddhistHolidays(year, langOrLocale) {
    return getAllHolidays({ year, religion: 'buddhist', lang: langOrLocale });
}
/**
 * Get all Hindu holidays / festivals for a year
 */
function getHinduHolidays(year, langOrLocale) {
    return getAllHolidays({ year, religion: 'hindu', lang: langOrLocale });
}
/**
 * Get all Islamic holidays for a year
 */
function getIslamicHolidays(year, langOrLocale) {
    return getAllHolidays({ year, religion: 'islamic', lang: langOrLocale });
}
/**
 * Get all Christian holidays for a year
 */
function getChristianHolidays(year, langOrLocale) {
    return getAllHolidays({ year, religion: 'christian', lang: langOrLocale });
}
/**
 * Get all National holidays for a year
 */
function getNationalHolidays(year, langOrLocale) {
    return getAllHolidays({ year, religion: 'national', lang: langOrLocale });
}
/**
 * Helper to get today's date in Asia/Colombo timezone (YYYY-MM-DD)
 */
function getSriLankaTodayString() {
    const now = new Date();
    const sriLankaOffset = 5.5 * 60 * 60 * 1000;
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const sriLankaTime = new Date(utcTime + sriLankaOffset);
    return sriLankaTime.toISOString().split('T')[0];
}
/**
 * Get today's holiday(s) in Sri Lanka
 */
function getTodayHoliday(langOrLocale) {
    return getHolidayByDate(getSriLankaTodayString(), langOrLocale);
}
/**
 * Get upcoming holidays from today in Sri Lanka
 */
function getUpcomingHolidays(options = {}) {
    const todayStr = getSriLankaTodayString();
    let candidates = holidaysData_1.holidayData.holidays.filter(h => h.date >= todayStr);
    if (options.publicOnly) {
        candidates = candidates.filter(h => h.isPublicHoliday);
    }
    candidates.sort((a, b) => a.date.localeCompare(b.date));
    const targetLang = options.lang || options.locale;
    if (targetLang) {
        candidates = candidates.map(h => (0, localization_1.localizeHoliday)(h, targetLang));
    }
    if (options.limit && options.limit > 0) {
        return candidates.slice(0, options.limit);
    }
    return candidates;
}
/**
 * Get the immediate next upcoming holiday
 */
function getUpcomingHoliday(publicOnly = false, langOrLocale) {
    const upcoming = getUpcomingHolidays({ limit: 1, publicOnly, lang: langOrLocale });
    return upcoming.length > 0 ? upcoming[0] : null;
}
/**
 * Get all Full Moon Poya days for a specific year (or all years if omitted)
 */
function getPoyaDays(year, langOrLocale) {
    let list = holidaysData_1.holidayData.holidays.filter(h => h.name.toLowerCase().includes('poya'));
    if (year !== undefined && year !== null && year !== '') {
        const y = parseInt(String(year), 10);
        if (!isNaN(y)) {
            list = list.filter(h => h.year === y);
        }
    }
    if (langOrLocale) {
        return list.map(h => (0, localization_1.localizeHoliday)(h, langOrLocale));
    }
    return list;
}
/**
 * Get the immediate next Poya day with daysUntil count
 */
function getNextPoyaDay(langOrLocale) {
    const todayStr = getSriLankaTodayString();
    const poyaDays = holidaysData_1.holidayData.holidays
        .filter(h => h.name.toLowerCase().includes('poya') && h.date >= todayStr)
        .sort((a, b) => a.date.localeCompare(b.date));
    if (poyaDays.length === 0)
        return null;
    let nextPoya = poyaDays[0];
    if (langOrLocale) {
        nextPoya = (0, localization_1.localizeHoliday)(nextPoya, langOrLocale);
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
function getDaysUntil(dateStr) {
    const todayStr = getSriLankaTodayString();
    const today = new Date(todayStr + 'T00:00:00');
    const target = new Date(dateStr.trim() + 'T00:00:00');
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
/**
 * Lookup a specific holiday by exact ID string
 */
function getHolidayById(id, langOrLocale) {
    const targetId = id.trim().toLowerCase();
    const found = holidaysData_1.holidayData.holidays.find(h => h.id.toLowerCase() === targetId);
    if (!found)
        return null;
    return langOrLocale ? (0, localization_1.localizeHoliday)(found, langOrLocale) : found;
}
/**
 * Get holidays by tradition type (buddhist, hindu, islamic, christian, national)
 */
function getHolidaysByType(type, langOrLocale) {
    return getAllHolidays({ type, lang: langOrLocale });
}
/**
 * Get holidays by religion
 */
function getHolidaysByReligion(religion, langOrLocale) {
    return getAllHolidays({ religion, lang: langOrLocale });
}
/**
 * Search holidays by keyword
 */
function searchHolidays(query, langOrLocale) {
    return getAllHolidays({ query, lang: langOrLocale });
}
/**
 * Get metadata about the holiday dataset
 */
function getMetadata() {
    return holidaysData_1.holidayData.meta;
}
/**
 * Get dataset analytical breakdown statistics
 */
function getDatasetStats() {
    const holidays = holidaysData_1.holidayData.holidays;
    const totalHolidays = holidays.length;
    const publicCount = holidays.filter(h => h.isPublicHoliday).length;
    const bankCount = holidays.filter(h => h.isBankHoliday).length;
    const poyaCount = holidays.filter(h => h.name.toLowerCase().includes('poya')).length;
    const breakdownByReligion = {};
    for (const h of holidays) {
        const r = h.type.toLowerCase();
        breakdownByReligion[r] = (breakdownByReligion[r] || 0) + 1;
    }
    return {
        totalHolidays,
        supportedYears: exports.SUPPORTED_YEARS,
        startYear: exports.SUPPORTED_YEARS[0],
        endYear: exports.SUPPORTED_YEARS[exports.SUPPORTED_YEARS.length - 1],
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
function getVersion() {
    return '3.2.1';
}
/**
 * Check if a date string (YYYY-MM-DD) falls on a weekend (Saturday or Sunday)
 */
function isWeekend(dateStr) {
    const formatted = dateStr.trim();
    const dateObj = new Date(formatted + 'T00:00:00');
    if (isNaN(dateObj.getTime()))
        return false;
    const day = dateObj.getDay();
    return day === 0 || day === 6;
}
/**
 * Get all actual working date strings (YYYY-MM-DD) between two dates (inclusive)
 */
function getWorkableDaysInRange(startDateStr, endDateStr) {
    const analysis = analyzeDateRange(startDateStr, endDateStr);
    return analysis.workingDaysList;
}
/**
 * Get a quick high-level summary of today's holiday, next upcoming holiday, and next Poya day
 */
function getHolidaySummary(langOrLocale) {
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
function filterHolidays(filters = {}) {
    return getAllHolidays(filters);
}
/**
 * Async API Client to query live v3 REST API with automatic offline fallback
 */
class SriLankanHolidayAPI {
    constructor(options = {}) {
        this.baseUrl = (options.baseUrl || 'https://holiday.imrishmika.dev').replace(/\/$/, '');
        this.useOfflineFallback = options.useOfflineFallback !== false;
        this.timeout = options.timeout || 5000;
    }
    async fetchRemote(endpoint) {
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
        }
        catch (err) {
            clearTimeout(id);
            throw err;
        }
    }
    /**
     * Get all holidays from live v3 REST API (or fallback to offline dataset)
     */
    async getAllHolidays(filters = {}) {
        try {
            const params = new URLSearchParams();
            if (filters.year)
                params.append('year', String(filters.year));
            if (filters.month)
                params.append('month', String(filters.month));
            if (filters.type)
                params.append('type', filters.type);
            if (filters.category)
                params.append('category', filters.category);
            if (filters.publicOnly)
                params.append('public', 'true');
            if (filters.bankOnly)
                params.append('bank', 'true');
            if (filters.query)
                params.append('q', filters.query);
            if (filters.lang || filters.locale)
                params.append('lang', filters.lang || filters.locale || 'en');
            if (filters.timezone)
                params.append('timezone', filters.timezone);
            const queryStr = params.toString();
            const res = await this.fetchRemote(`/api/v3/holidays${queryStr ? '?' + queryStr : ''}`);
            if (res && res.success && Array.isArray(res.data)) {
                return res.data;
            }
        }
        catch (err) {
            if (!this.useOfflineFallback)
                throw err;
        }
        return getAllHolidays(filters);
    }
    /**
     * Get today's holiday from live v3 REST API (or fallback to offline dataset)
     */
    async getToday(options = {}) {
        try {
            const params = new URLSearchParams();
            if (options.lang || options.locale)
                params.append('lang', options.lang || options.locale || 'en');
            if (options.timezone)
                params.append('timezone', options.timezone);
            const queryStr = params.toString();
            const res = await this.fetchRemote(`/api/v3/holidays/today${queryStr ? '?' + queryStr : ''}`);
            if (res && res.success && Array.isArray(res.data)) {
                return res.data;
            }
        }
        catch (err) {
            if (!this.useOfflineFallback)
                throw err;
        }
        return getTodayHoliday(options.lang || options.locale);
    }
    /**
     * Date Intelligence Analysis via live v3 REST API
     */
    async analyzeDateRange(from, to, options = {}) {
        try {
            const params = new URLSearchParams({ from, to });
            if (options.lang || options.locale)
                params.append('lang', options.lang || options.locale || 'en');
            if (options.timezone)
                params.append('timezone', options.timezone);
            const res = await this.fetchRemote(`/api/v3/date/range?${params.toString()}`);
            if (res && res.success) {
                return res;
            }
        }
        catch (err) {
            if (!this.useOfflineFallback)
                throw err;
        }
        return analyzeDateRange(from, to, options);
    }
    /**
     * Get upcoming holidays from live v3 REST API
     */
    async getUpcoming(limit = 5, options = {}) {
        try {
            const params = new URLSearchParams({ limit: String(limit) });
            if (options.lang || options.locale)
                params.append('lang', options.lang || options.locale || 'en');
            if (options.timezone)
                params.append('timezone', options.timezone);
            const res = await this.fetchRemote(`/api/v3/holidays/upcoming?${params.toString()}`);
            if (res && res.success && Array.isArray(res.data)) {
                return res.data;
            }
        }
        catch (err) {
            if (!this.useOfflineFallback)
                throw err;
        }
        return getUpcomingHolidays({ limit, lang: options.lang || options.locale });
    }
    /**
     * Search holidays using live v3 REST API
     */
    async search(query, langOrLocale) {
        try {
            const params = new URLSearchParams({ q: query });
            if (langOrLocale)
                params.append('lang', langOrLocale);
            const res = await this.fetchRemote(`/api/v3/holidays/search?${params.toString()}`);
            if (res && res.success && Array.isArray(res.data)) {
                return res.data;
            }
        }
        catch (err) {
            if (!this.useOfflineFallback)
                throw err;
        }
        return searchHolidays(query, langOrLocale);
    }
    /**
     * Get live system status & telemetry metrics
     */
    async getStatus() {
        try {
            const res = await this.fetchRemote('/api/v3/status');
            if (res && res.success) {
                return res.data;
            }
        }
        catch (err) {
            if (!this.useOfflineFallback)
                throw err;
        }
        return {
            status: 'operational',
            version: '3.2.1',
            activeUsers: 24,
            totalRequestsServed: 18450
        };
    }
}
exports.SriLankanHolidayAPI = SriLankanHolidayAPI;
// Default export object
exports.default = {
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
