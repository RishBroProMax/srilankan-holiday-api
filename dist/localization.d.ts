export type LanguageCode = 'en' | 'si' | 'ta';
export type LocaleCode = 'en-LK' | 'si-LK' | 'ta-LK' | 'en' | 'si' | 'ta';
export declare function normalizeLang(langOrLocale?: string): LanguageCode;
export declare const DAYS_OF_WEEK_LOCALIZED: Record<LanguageCode, Record<string, string>>;
export declare const CATEGORIES_LOCALIZED: Record<LanguageCode, Record<string, string>>;
export declare const HOLIDAY_TRANSLATIONS: Record<string, {
    siName: string;
    taName: string;
    siDesc?: string;
    taDesc?: string;
}>;
export declare function localizeHoliday(holiday: any, langOrLocale?: string): any;
