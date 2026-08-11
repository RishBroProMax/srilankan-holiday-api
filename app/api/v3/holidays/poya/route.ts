import { NextRequest, NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';

function getSriLankaTodayString(): string {
  const now = new Date();
  const sriLankaOffset = 5.5 * 60 * 60 * 1000;
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
  const sriLankaTime = new Date(utcTime + sriLankaOffset);
  return sriLankaTime.toISOString().split('T')[0];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get('year');

  const todayStr = getSriLankaTodayString();
  let poyaDays = (holidayData as any).holidays.filter((h: any) =>
    h.name.toLowerCase().includes('poya') || h.type === 'buddhist'
  );

  if (yearParam) {
    const y = parseInt(yearParam, 10);
    if (!isNaN(y)) poyaDays = poyaDays.filter((h: any) => h.year === y);
  }

  poyaDays.sort((a: any, b: any) => a.date.localeCompare(b.date));

  // Immediate next upcoming Poya Day
  const upcomingPoyas = poyaDays.filter((h: any) => h.date >= todayStr);
  let nextPoya = null;
  if (upcomingPoyas.length > 0) {
    const target = upcomingPoyas[0];
    const todayDate = new Date(todayStr + 'T00:00:00');
    const targetDate = new Date(target.date + 'T00:00:00');
    const daysUntil = Math.ceil((targetDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
    nextPoya = {
      ...target,
      daysUntil
    };
  }

  return NextResponse.json({
    success: true,
    apiVersion: '3.2.0',
    currentSriLankaDate: todayStr,
    totalPoyaDays: poyaDays.length,
    nextPoyaDay: nextPoya,
    data: poyaDays
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
