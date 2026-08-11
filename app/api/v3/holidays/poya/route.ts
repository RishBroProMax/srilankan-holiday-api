import { NextRequest, NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';
import { localizeHoliday, normalizeLang, getTodayDateString } from '@/lib/localization';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get('year');
  const langParam = searchParams.get('lang') || searchParams.get('locale');

  const lang = normalizeLang(langParam || undefined);
  const todayStr = getTodayDateString('Asia/Colombo');

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
      ...localizeHoliday(target, lang),
      daysUntil
    };
  }

  const localizedData = poyaDays.map((h: any) => localizeHoliday(h, lang));

  return NextResponse.json({
    success: true,
    apiVersion: '3.2.1',
    lang,
    currentSriLankaDate: todayStr,
    totalPoyaDays: poyaDays.length,
    nextPoyaDay: nextPoya,
    data: localizedData
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
