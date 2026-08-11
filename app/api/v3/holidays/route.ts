import { NextRequest, NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const yearParam = searchParams.get('year');
  const monthParam = searchParams.get('month');
  const dayParam = searchParams.get('day');
  const typeParam = searchParams.get('type') || searchParams.get('religion');
  const categoryParam = searchParams.get('category');
  const publicOnly = searchParams.get('public') === 'true' || searchParams.get('publicOnly') === 'true';
  const bankOnly = searchParams.get('bank') === 'true' || searchParams.get('bankOnly') === 'true';
  const queryParam = searchParams.get('q') || searchParams.get('query');
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const limitParam = parseInt(searchParams.get('limit') || '500', 10);

  let results = [...(holidayData as any).holidays];

  if (yearParam) {
    const y = parseInt(yearParam, 10);
    if (!isNaN(y)) results = results.filter(h => h.year === y);
  }

  if (monthParam) {
    const m = parseInt(monthParam, 10);
    if (!isNaN(m)) results = results.filter(h => h.month === m);
  }

  if (dayParam) {
    const d = parseInt(dayParam, 10);
    if (!isNaN(d)) results = results.filter(h => h.day === d);
  }

  if (typeParam) {
    const t = typeParam.toLowerCase();
    results = results.filter(h => h.type.toLowerCase() === t);
  }

  if (categoryParam) {
    const c = categoryParam.toLowerCase();
    results = results.filter(h => h.category.toLowerCase() === c);
  }

  if (publicOnly) {
    results = results.filter(h => h.isPublicHoliday);
  }

  if (bankOnly) {
    results = results.filter(h => h.isBankHoliday);
  }

  if (queryParam) {
    const q = queryParam.toLowerCase().trim();
    results = results.filter(h =>
      h.name.toLowerCase().includes(q) ||
      h.description.toLowerCase().includes(q) ||
      h.date.includes(q) ||
      h.type.toLowerCase().includes(q)
    );
  }

  const totalCount = results.length;
  const page = Math.max(1, pageParam);
  const limit = Math.max(1, Math.min(limitParam, 500));
  const totalPages = Math.ceil(totalCount / limit);
  const startIndex = (page - 1) * limit;
  const paginatedData = results.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    success: true,
    apiVersion: '3.2.0',
    pagination: {
      totalCount,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    },
    data: paginatedData
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
