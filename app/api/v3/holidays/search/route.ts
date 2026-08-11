import { NextRequest, NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || searchParams.get('query') || '';

  if (!q.trim()) {
    return NextResponse.json({
      success: false,
      apiVersion: '3.2.0',
      error: 'Missing required query parameter `q` or `query`.'
    }, { status: 400 });
  }

  const query = q.toLowerCase().trim();
  const holidays = (holidayData as any).holidays || [];

  const results = holidays.filter((h: any) =>
    h.name.toLowerCase().includes(query) ||
    h.description.toLowerCase().includes(query) ||
    h.date.includes(query) ||
    h.type.toLowerCase().includes(query) ||
    h.category.toLowerCase().includes(query)
  );

  return NextResponse.json({
    success: true,
    apiVersion: '3.2.0',
    query: q,
    count: results.length,
    data: results
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
