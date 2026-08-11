import { NextRequest, NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';
import { localizeHoliday, normalizeLang } from '@/lib/localization';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || searchParams.get('query') || '';
  const langParam = searchParams.get('lang') || searchParams.get('locale');

  if (!q.trim()) {
    return NextResponse.json({
      success: false,
      apiVersion: '3.2.1',
      error: 'Missing required query parameter `q` or `query`.'
    }, { status: 400 });
  }

  const lang = normalizeLang(langParam || undefined);
  const query = q.toLowerCase().trim();
  const holidays = (holidayData as any).holidays || [];

  const results = holidays.filter((h: any) =>
    h.name.toLowerCase().includes(query) ||
    h.description.toLowerCase().includes(query) ||
    h.date.includes(query) ||
    h.type.toLowerCase().includes(query) ||
    h.category.toLowerCase().includes(query)
  ).map((h: any) => localizeHoliday(h, lang));

  return NextResponse.json({
    success: true,
    apiVersion: '3.2.1',
    query: q,
    lang,
    count: results.length,
    data: results
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
