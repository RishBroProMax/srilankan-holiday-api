import { NextRequest, NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';
import { localizeHoliday, normalizeLang, resolveTimezone } from '@/lib/localization';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const fromStr = searchParams.get('from') || searchParams.get('startDate') || searchParams.get('start');
  const toStr = searchParams.get('to') || searchParams.get('endDate') || searchParams.get('end');
  const langParam = searchParams.get('lang') || searchParams.get('locale');
  const tzParam = searchParams.get('timezone');

  if (!fromStr || !toStr) {
    return NextResponse.json({
      success: false,
      apiVersion: '3.2.1',
      error: 'Both `from` (or `startDate`) and `to` (or `endDate`) query parameters are required (YYYY-MM-DD).'
    }, { status: 400 });
  }

  const start = new Date(fromStr.trim() + 'T00:00:00');
  const end = new Date(toStr.trim() + 'T00:00:00');
  const lang = normalizeLang(langParam || undefined);
  const timezone = resolveTimezone(tzParam || undefined);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
    return NextResponse.json({
      success: false,
      apiVersion: '3.2.1',
      error: 'Invalid date format or `from` date is after `to` date.'
    }, { status: 400 });
  }

  const allHolidays = (holidayData as any).holidays || [];
  const rawHolidaysInRange = allHolidays
    .filter((h: any) => h.date >= fromStr && h.date <= toStr)
    .sort((a: any, b: any) => a.date.localeCompare(b.date));

  const publicHolidayDateSet = new Set(
    allHolidays.filter((h: any) => h.isPublicHoliday).map((h: any) => h.date)
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

  const localizedHolidaysList = rawHolidaysInRange.map((h: any) => localizeHoliday(h, lang));

  return NextResponse.json({
    success: true,
    apiVersion: '3.2.1',
    from: fromStr,
    to: toStr,
    timezone,
    lang,
    totalDays,
    weekends,
    holidays: rawHolidaysInRange.length,
    businessDays,
    workingDaysList,
    holidaysList: localizedHolidaysList
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
