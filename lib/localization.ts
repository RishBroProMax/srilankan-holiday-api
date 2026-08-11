// Server-side Localization Helper (v3.2.1)
import { normalizeLang, localizeHoliday, LanguageCode } from '@/src/localization';

export { normalizeLang, localizeHoliday };
export type { LanguageCode };

export function resolveTimezone(tzParam?: string | null): string {
  if (!tzParam) return 'Asia/Colombo';
  const clean = tzParam.trim();
  try {
    // Validate timezone string validity
    Intl.DateTimeFormat(undefined, { timeZone: clean });
    return clean;
  } catch (err) {
    return 'Asia/Colombo';
  }
}

export function getTodayDateString(timezoneStr: string = 'Asia/Colombo'): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezoneStr,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(new Date()); // Returns YYYY-MM-DD
  } catch (e) {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }
}
