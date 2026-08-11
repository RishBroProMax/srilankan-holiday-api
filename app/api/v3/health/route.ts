import { NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';
import { getTelemetryStats } from '@/lib/telemetry';

export async function GET() {
  const telemetry = getTelemetryStats();
  const holidays = (holidayData as any).holidays || [];

  return NextResponse.json({
    status: 'healthy',
    statusCode: 200,
    timestamp: new Date().toISOString(),
    version: '3.2.0',
    service: 'Sri Lankan Holiday API',
    uptime: {
      seconds: telemetry.uptimeSeconds,
      formatted: telemetry.uptimeFormatted
    },
    checks: {
      dataset: {
        status: 'healthy',
        totalHolidaysCount: holidays.length,
        yearCoverage: '2024–2045 (22 Calendar Years)',
        timezone: 'Asia/Colombo'
      },
      telemetry: {
        status: 'healthy',
        activeSessions: telemetry.activeUsers,
        totalRequestsServed: telemetry.totalRequestsServed
      },
      rateLimiter: {
        status: 'healthy',
        limit: '60 requests / minute',
        protection: 'Active Edge Sliding Window'
      },
      systemMemory: telemetry.systemMemory
    }
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}
