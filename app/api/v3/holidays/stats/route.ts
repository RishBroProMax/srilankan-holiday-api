import { NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';
import { getTelemetryStats } from '@/lib/telemetry';

const holidaysList: any[] = (holidayData as any).holidays || [];

export async function GET() {
  const telemetry = getTelemetryStats();

  const typeCounts: Record<string, number> = {};
  let publicCount = 0;
  let bankCount = 0;
  let poyaCount = 0;

  const yearsSet = new Set<number>();

  holidaysList.forEach(h => {
    yearsSet.add(h.year);
    typeCounts[h.type] = (typeCounts[h.type] || 0) + 1;
    if (h.isPublicHoliday) publicCount++;
    if (h.isBankHoliday) bankCount++;
    if (h.type === 'buddhist' || h.name.toLowerCase().includes('poya')) poyaCount++;
  });

  const sortedYears = Array.from(yearsSet).sort((a, b) => a - b);

  return NextResponse.json({
    success: true,
    apiVersion: '3.2.0',
    data: {
      dataset: {
        totalHolidays: holidaysList.length,
        supportedYears: sortedYears,
        startYear: sortedYears[0],
        endYear: sortedYears[sortedYears.length - 1],
        totalYears: sortedYears.length,
        publicHolidaysCount: publicCount,
        bankHolidaysCount: bankCount,
        poyaDaysCount: poyaCount,
        breakdownByType: typeCounts
      },
      telemetry
    }
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}
