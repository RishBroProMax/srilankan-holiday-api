import { NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';

function getSriLankaTodayString(): string {
  const now = new Date();
  const sriLankaOffset = 5.5 * 60 * 60 * 1000;
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
  const sriLankaTime = new Date(utcTime + sriLankaOffset);
  return sriLankaTime.toISOString().split('T')[0];
}

export async function GET() {
  const todayStr = getSriLankaTodayString();
  const holidays = (holidayData as any).holidays || [];

  const todayHolidays = holidays.filter((h: any) => h.date === todayStr);
  const isHoliday = todayHolidays.length > 0;

  // Find next upcoming holiday
  const upcomingHolidays = holidays
    .filter((h: any) => h.date > todayStr)
    .sort((a: any, b: any) => a.date.localeCompare(b.date));

  const nextHoliday = upcomingHolidays.length > 0 ? upcomingHolidays[0] : null;

  let daysUntilNext = null;
  if (nextHoliday) {
    const todayDate = new Date(todayStr + 'T00:00:00');
    const nextDate = new Date(nextHoliday.date + 'T00:00:00');
    daysUntilNext = Math.ceil((nextDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  return NextResponse.json({
    success: true,
    apiVersion: '3.2.0',
    date: todayStr,
    timezone: 'Asia/Colombo (UTC+5:30)',
    isHoliday,
    todayHolidaysCount: todayHolidays.length,
    data: todayHolidays,
    nextUpcomingHoliday: nextHoliday ? {
      ...nextHoliday,
      daysUntil: daysUntilNext
    } : null
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  });
}
