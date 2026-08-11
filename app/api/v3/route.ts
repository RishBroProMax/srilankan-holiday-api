import { NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';
import { getTelemetryStats } from '@/lib/telemetry';

export async function GET() {
  const telemetry = getTelemetryStats();
  const holidays = (holidayData as any).holidays || [];

  return NextResponse.json({
    success: true,
    name: 'Sri Lankan Holiday API (v3.2.0 Stable)',
    version: '3.2.0',
    status: 'operational',
    license: 'MIT',
    timezone: 'Asia/Colombo (UTC+5:30)',
    documentation: 'https://holiday.imrishmika.dev/docs',
    npmModule: 'https://holiday.imrishmika.dev/npm-module',
    datasetInfo: {
      totalHolidaysIndexed: holidays.length,
      yearCoverage: '2024–2045 (22 Calendar Years)',
      religionsCovered: ['buddhist', 'hindu', 'islamic', 'christian', 'national']
    },
    endpoints: {
      holidays: '/api/v3/holidays',
      today: '/api/v3/holidays/today',
      upcoming: '/api/v3/holidays/upcoming',
      poya: '/api/v3/holidays/poya',
      search: '/api/v3/holidays/search',
      stats: '/api/v3/holidays/stats',
      workingDays: '/api/v3/holidays/working-days',
      range: '/api/v3/holidays/range',
      status: '/api/v3/status',
      health: '/api/v3/health'
    },
    telemetry: {
      activeUsers: telemetry.activeUsers,
      totalRequestsServed: telemetry.totalRequestsServed
    }
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
