import { NextRequest, NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';
import { localizeHoliday, normalizeLang, resolveTimezone, getTodayDateString } from '@/lib/localization';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const langParam = searchParams.get('lang') || searchParams.get('locale');
  const tzParam = searchParams.get('timezone');

  const lang = normalizeLang(langParam || undefined);
  const timezone = resolveTimezone(tzParam || undefined);
  const todayStr = getTodayDateString(timezone);

  const holidays = (holidayData as any).holidays || [];

  const rawTodayHolidays = holidays.filter((h: any) => h.date === todayStr);
  const isHoliday = rawTodayHolidays.length > 0;

  // Find next upcoming holiday
  const upcomingHolidays = holidays
    .filter((h: any) => h.date > todayStr)
    .sort((a: any, b: any) => a.date.localeCompare(b.date));

  const nextHolidayRaw = upcomingHolidays.length > 0 ? upcomingHolidays[0] : null;

  let daysUntilNext = null;
  if (nextHolidayRaw) {
    const todayDate = new Date(todayStr + 'T00:00:00');
    const nextDate = new Date(nextHolidayRaw.date + 'T00:00:00');
    daysUntilNext = Math.ceil((nextDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  const todayHolidaysLocalized = rawTodayHolidays.map((h: any) => localizeHoliday(h, lang));
  const nextHolidayLocalized = nextHolidayRaw ? {
    ...localizeHoliday(nextHolidayRaw, lang),
    daysUntil: daysUntilNext
  } : null;

  return NextResponse.json({
    success: true,
    apiVersion: '3.2.1',
    date: todayStr,
    timezone,
    lang,
    isHoliday,
    todayHolidaysCount: todayHolidaysLocalized.length,
    data: todayHolidaysLocalized,
    nextUpcomingHoliday: nextHolidayLocalized
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  });
}
