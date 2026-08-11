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
export declare const VALID_TYPES: string[];
export declare const VALID_CATEGORIES: string[];
export declare const SUPPORTED_YEARS: any[];
/**
 * Get all Sri Lankan holidays matching optional filters
 */
export declare function getAllHolidays(filters?: FilterOptions): Holiday[];
/**
 * Helper to get a localized version of a single holiday object
 */
export declare function getLocalizedHoliday(holiday: Holiday, langOrLocale?: string): Holiday;
/**
 * Get all holidays for a specific year
 */
export declare function getHolidaysByYear(year: number | string, langOrLocale?: string): Holiday[];
/**
 * Get all holidays for a specific month in a given year
 */
export declare function getHolidaysByMonth(year: number | string, month: number | string, langOrLocale?: string): Holiday[];
/**
 * Get holidays on a specific date (YYYY-MM-DD)
 */
export declare function getHolidayByDate(dateStr: string, langOrLocale?: string): Holiday[];
/**
 * Check if a given date string (YYYY-MM-DD) is any holiday
 */
export declare function isHoliday(dateStr: string): boolean;
/**
 * Check if a given date string (YYYY-MM-DD) is a Public Holiday
 */
export declare function isPublicHoliday(dateStr: string): boolean;
/**
 * Check if a given date string (YYYY-MM-DD) is a Bank Holiday
 */
export declare function isBankHoliday(dateStr: string): boolean;
/**
 * Check if a given date string (YYYY-MM-DD) is a Poya Day
 */
export declare function isPoyaDay(dateStr: string): boolean;
/**
 * Check if a date (YYYY-MM-DD) is a business working day in Sri Lanka
 * (Returns false for Saturdays, Sundays, and Public Holidays)
 */
export declare function isWorkingDay(dateStr: string): boolean;
/**
 * Get all holidays falling between two dates (inclusive)
 */
export declare function getHolidaysInRange(startDateStr: string, endDateStr: string, filters?: FilterOptions): Holiday[];
/**
 * Date Intelligence Range Analysis
 * Returns comprehensive day count metrics (totalDays, weekends, holidays, businessDays, workingDaysList, holidaysList)
 * Ideal for HR leave calculations, payroll, invoice delivery estimates & SaaS apps.
 */
export declare function analyzeDateRange(fromStr: string, toStr: string, options?: {
    lang?: string;
    locale?: string;
}): {
    from: string;
    to: string;
    totalDays: number;
    weekends: number;
    holidays: number;
    businessDays: number;
    workingDaysList: string[];
    holidaysList: Holiday[];
};
/**
 * Count total business working days between two dates (inclusive)
 * (Excludes Saturdays, Sundays, and Sri Lankan Public Holidays)
 */
export declare function countWorkingDays(startDateStr: string, endDateStr: string): number;
/**
 * Find all long weekend opportunities for a target year (or all years if omitted)
 */
export declare function getLongWeekends(year?: number | string): LongWeekend[];
/**
 * Get all Buddhist holidays / Poya days for a year
 */
export declare function getBuddhistHolidays(year?: number | string, langOrLocale?: string): Holiday[];
/**
 * Get all Hindu holidays / festivals for a year
 */
export declare function getHinduHolidays(year?: number | string, langOrLocale?: string): Holiday[];
/**
 * Get all Islamic holidays for a year
 */
export declare function getIslamicHolidays(year?: number | string, langOrLocale?: string): Holiday[];
/**
 * Get all Christian holidays for a year
 */
export declare function getChristianHolidays(year?: number | string, langOrLocale?: string): Holiday[];
/**
 * Get all National holidays for a year
 */
export declare function getNationalHolidays(year?: number | string, langOrLocale?: string): Holiday[];
/**
 * Get today's holiday(s) in Sri Lanka
 */
export declare function getTodayHoliday(langOrLocale?: string): Holiday[];
/**
 * Get upcoming holidays from today in Sri Lanka
 */
export declare function getUpcomingHolidays(options?: {
    limit?: number;
    publicOnly?: boolean;
    lang?: string;
    locale?: string;
}): Holiday[];
/**
 * Get the immediate next upcoming holiday
 */
export declare function getUpcomingHoliday(publicOnly?: boolean, langOrLocale?: string): Holiday | null;
/**
 * Get all Full Moon Poya days for a specific year (or all years if omitted)
 */
export declare function getPoyaDays(year?: number | string, langOrLocale?: string): Holiday[];
/**
 * Get the immediate next Poya day with daysUntil count
 */
export declare function getNextPoyaDay(langOrLocale?: string): (Holiday & {
    daysUntil: number;
}) | null;
/**
 * Calculate days remaining until a target date (YYYY-MM-DD) from today in Sri Lanka
 */
export declare function getDaysUntil(dateStr: string): number;
/**
 * Lookup a specific holiday by exact ID string
 */
export declare function getHolidayById(id: string, langOrLocale?: string): Holiday | null;
/**
 * Get holidays by tradition type (buddhist, hindu, islamic, christian, national)
 */
export declare function getHolidaysByType(type: string, langOrLocale?: string): Holiday[];
/**
 * Get holidays by religion
 */
export declare function getHolidaysByReligion(religion: string, langOrLocale?: string): Holiday[];
/**
 * Search holidays by keyword
 */
export declare function searchHolidays(query: string, langOrLocale?: string): Holiday[];
/**
 * Get metadata about the holiday dataset
 */
export declare function getMetadata(): {
    version: string;
    generated: string;
    source: string;
    totalHolidays: number;
    startYear: number;
    endYear: number;
    types: string[];
    timezone: string;
};
/**
 * Get dataset analytical breakdown statistics
 */
export declare function getDatasetStats(): {
    totalHolidays: number;
    supportedYears: any[];
    startYear: any;
    endYear: any;
    publicCount: number;
    bankCount: number;
    poyaCount: number;
    breakdownByReligion: Record<string, number>;
    version: string;
};
/**
 * Get current SDK version string
 */
export declare function getVersion(): string;
/**
 * Check if a date string (YYYY-MM-DD) falls on a weekend (Saturday or Sunday)
 */
export declare function isWeekend(dateStr: string): boolean;
/**
 * Get all actual working date strings (YYYY-MM-DD) between two dates (inclusive)
 */
export declare function getWorkableDaysInRange(startDateStr: string, endDateStr: string): string[];
/**
 * Get a quick high-level summary of today's holiday, next upcoming holiday, and next Poya day
 */
export declare function getHolidaySummary(langOrLocale?: string): {
    today: Holiday[];
    isTodayHoliday: boolean;
    nextHoliday: Holiday | null;
    nextPoya: (Holiday & {
        daysUntil: number;
    }) | null;
    totalHolidaysIndexed: number;
    supportedYears: any[];
    version: string;
};
/**
 * Filter holidays (alias for getAllHolidays with advanced FilterOptions)
 */
export declare function filterHolidays(filters?: FilterOptions): Holiday[];
/**
 * Async API Client to query live v3 REST API with automatic offline fallback
 */
export declare class SriLankanHolidayAPI {
    private baseUrl;
    private useOfflineFallback;
    private timeout;
    constructor(options?: ClientOptions);
    private fetchRemote;
    /**
     * Get all holidays from live v3 REST API (or fallback to offline dataset)
     */
    getAllHolidays(filters?: FilterOptions): Promise<Holiday[]>;
    /**
     * Get today's holiday from live v3 REST API (or fallback to offline dataset)
     */
    getToday(options?: {
        lang?: string;
        locale?: string;
        timezone?: string;
    }): Promise<Holiday[]>;
    /**
     * Date Intelligence Analysis via live v3 REST API
     */
    analyzeDateRange(from: string, to: string, options?: {
        lang?: string;
        locale?: string;
        timezone?: string;
    }): Promise<any>;
    /**
     * Get upcoming holidays from live v3 REST API
     */
    getUpcoming(limit?: number, options?: {
        lang?: string;
        locale?: string;
        timezone?: string;
    }): Promise<Holiday[]>;
    /**
     * Search holidays using live v3 REST API
     */
    search(query: string, langOrLocale?: string): Promise<Holiday[]>;
    /**
     * Get live system status & telemetry metrics
     */
    getStatus(): Promise<any>;
}
declare const _default: {
    getVersion: typeof getVersion;
    getAllHolidays: typeof getAllHolidays;
    getHolidaysByYear: typeof getHolidaysByYear;
    getHolidaysByMonth: typeof getHolidaysByMonth;
    getHolidayByDate: typeof getHolidayByDate;
    getTodayHoliday: typeof getTodayHoliday;
    getUpcomingHolidays: typeof getUpcomingHolidays;
    getUpcomingHoliday: typeof getUpcomingHoliday;
    getPoyaDays: typeof getPoyaDays;
    getNextPoyaDay: typeof getNextPoyaDay;
    getHolidaysByType: typeof getHolidaysByType;
    getHolidaysByReligion: typeof getHolidaysByReligion;
    isHoliday: typeof isHoliday;
    isPublicHoliday: typeof isPublicHoliday;
    isBankHoliday: typeof isBankHoliday;
    isPoyaDay: typeof isPoyaDay;
    isWorkingDay: typeof isWorkingDay;
    isWeekend: typeof isWeekend;
    getHolidaysInRange: typeof getHolidaysInRange;
    countWorkingDays: typeof countWorkingDays;
    getWorkableDaysInRange: typeof getWorkableDaysInRange;
    analyzeDateRange: typeof analyzeDateRange;
    getLocalizedHoliday: typeof getLocalizedHoliday;
    getLongWeekends: typeof getLongWeekends;
    getBuddhistHolidays: typeof getBuddhistHolidays;
    getHinduHolidays: typeof getHinduHolidays;
    getIslamicHolidays: typeof getIslamicHolidays;
    getChristianHolidays: typeof getChristianHolidays;
    getNationalHolidays: typeof getNationalHolidays;
    getDaysUntil: typeof getDaysUntil;
    getHolidayById: typeof getHolidayById;
    searchHolidays: typeof searchHolidays;
    getHolidaySummary: typeof getHolidaySummary;
    filterHolidays: typeof filterHolidays;
    getMetadata: typeof getMetadata;
    getDatasetStats: typeof getDatasetStats;
    SriLankanHolidayAPI: typeof SriLankanHolidayAPI;
};
export default _default;
