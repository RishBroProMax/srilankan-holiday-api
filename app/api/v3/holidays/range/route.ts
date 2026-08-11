import { NextRequest, NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const startDateStr = searchParams.get('startDate') || searchParams.get('start');
  const endDateStr = searchParams.get('endDate') || searchParams.get('end');

  if (!startDateStr || !endDateStr) {
    return NextResponse.json({
      success: false,
      apiVersion: '3.2.0',
      error: 'Both `startDate` (or `start`) and `endDate` (or `end`) query parameters are required (YYYY-MM-DD).'
    }, { status: 400 });
  }

  const start = startDateStr.trim();
  const end = endDateStr.trim();

  const holidays = (holidayData as any).holidays || [];
  const results = holidays
    .filter((h: any) => h.date >= start && h.date <= end)
    .sort((a: any, b: any) => a.date.localeCompare(b.date));

  return NextResponse.json({
    success: true,
    apiVersion: '3.2.0',
    startDate: start,
    endDate: end,
    count: results.length,
    data: results
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
