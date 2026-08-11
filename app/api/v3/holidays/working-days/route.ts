import { NextRequest, NextResponse } from 'next/server';
import holidayData from '@/data/holidays.json';

const holidaysList: any[] = (holidayData as any).holidays || [];
const publicHolidaySet = new Set(
  holidaysList.filter(h => h.isPublicHoliday).map(h => h.date)
);

function isWorkingDay(dateStr: string): boolean {
  const dateObj = new Date(dateStr + 'T00:00:00');
  if (isNaN(dateObj.getTime())) return false;
  const day = dateObj.getDay();
  if (day === 0 || day === 6) return false;
  return !publicHolidaySet.has(dateStr);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date');
  const startDateStr = searchParams.get('startDate') || searchParams.get('start');
  const endDateStr = searchParams.get('endDate') || searchParams.get('end');

  // Mode 1: Check single date
  if (dateStr) {
    const formatted = dateStr.trim();
    const working = isWorkingDay(formatted);
    const dateObj = new Date(formatted + 'T00:00:00');
    const dayOfWeek = isNaN(dateObj.getTime()) ? null : dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const matchingHoliday = holidaysList.find(h => h.date === formatted && h.isPublicHoliday);

    return NextResponse.json({
      success: true,
      apiVersion: '3.2.0',
      date: formatted,
      dayOfWeek,
      isWorkingDay: working,
      isWeekend: dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday',
      isPublicHoliday: !!matchingHoliday,
      holiday: matchingHoliday || null
    });
  }

  // Mode 2: Calculate working days range
  if (startDateStr && endDateStr) {
    const start = new Date(startDateStr.trim() + 'T00:00:00');
    const end = new Date(endDateStr.trim() + 'T00:00:00');

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      return NextResponse.json({
        success: false,
        apiVersion: '3.2.0',
        error: 'Invalid date parameters or startDate > endDate.'
      }, { status: 400 });
    }

    let workingCount = 0;
    const workingDates: string[] = [];
    const current = new Date(start);

    while (current <= end) {
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, '0');
      const day = String(current.getDate()).padStart(2, '0');
      const dStr = `${year}-${month}-${day}`;

      if (isWorkingDay(dStr)) {
        workingCount++;
        workingDates.push(dStr);
      }
      current.setDate(current.getDate() + 1);
    }

    return NextResponse.json({
      success: true,
      apiVersion: '3.2.0',
      startDate: startDateStr,
      endDate: endDateStr,
      workingDaysCount: workingCount,
      workingDates
    });
  }

  return NextResponse.json({
    success: false,
    apiVersion: '3.2.0',
    error: 'Please provide either `date` or both `startDate` and `endDate` parameters.'
  }, { status: 400 });
}
