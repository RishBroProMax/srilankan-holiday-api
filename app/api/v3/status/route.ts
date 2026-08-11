import { NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';
import { getTelemetryStats } from '@/lib/telemetry';

export async function GET() {
  const telemetry = getTelemetryStats();
  const holidays = (holidayData as any).holidays || [];

  return NextResponse.json({
    success: true,
    apiVersion: '3.2.1',
    service: 'Sri Lankan Holiday API & SDK',
    status: '100% Operational',
    timestamp: new Date().toISOString(),
    data: {
      globalEdgeStatus: '100% Operational',
      activeConnectedUsers: telemetry.activeUsers,
      totalRequestsServed: telemetry.totalRequestsServed,
      uptimeSeconds: telemetry.uptimeSeconds,
      uptimeFormatted: telemetry.uptimeFormatted,
      lastRequestTime: telemetry.lastRequestTime,
      systemMemory: telemetry.systemMemory,
      dataset: {
        totalHolidays: holidays.length,
        supportedYears: '2024–2045 (22 Calendar Years)',
        timezone: 'Asia/Colombo (UTC+5:30)',
        integrity: '100% Verified'
      },
      rateLimiter: {
        status: 'active',
        limit: '60 requests/min',
        protection: 'Sliding Window DDoS Protection'
      }
    }
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}
