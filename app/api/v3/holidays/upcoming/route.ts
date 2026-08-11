import { NextRequest, NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';
import { localizeHoliday, normalizeLang, resolveTimezone, getTodayDateString } from '@/lib/localization';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limitParam = parseInt(searchParams.get('limit') || '5', 10);
  const publicOnly = searchParams.get('public') === 'true' || searchParams.get('publicOnly') === 'true';
  const langParam = searchParams.get('lang') || searchParams.get('locale');
  const tzParam = searchParams.get('timezone');

  const lang = normalizeLang(langParam || undefined);
  const timezone = resolveTimezone(tzParam || undefined);
  const todayStr = getTodayDateString(timezone);

  let candidates = (holidayData as any).holidays.filter((h: any) => h.date >= todayStr);

  if (publicOnly) {
    candidates = candidates.filter((h: any) => h.isPublicHoliday);
  }

  candidates.sort((a: any, b: any) => a.date.localeCompare(b.date));

  const limit = Math.max(1, Math.min(limitParam, 50));
  const results = candidates.slice(0, limit).map((h: any) => {
    const todayDate = new Date(todayStr + 'T00:00:00');
    const targetDate = new Date(h.date + 'T00:00:00');
    const daysUntil = Math.ceil((targetDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
    return {
      ...localizeHoliday(h, lang),
      daysUntil
    };
  });

  return NextResponse.json({
    success: true,
    apiVersion: '3.2.1',
    currentDate: todayStr,
    timezone,
    lang,
    count: results.length,
    data: results
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600'
    }
  });
}
