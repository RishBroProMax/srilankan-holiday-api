# 🇱🇰 Sri Lankan Holiday API & Node.js Module (`sri-lankan-holiday-api`)

![Sri Lankan Holiday API Banner](public/OG.png)

[![npm version](https://img.shields.io/npm/v/sri-lankan-holiday-api.svg?color=emerald)](https://www.npmjs.com/package/sri-lankan-holiday-api)
[![npm downloads](https://img.shields.io/npm/dm/sri-lankan-holiday-api.svg)](https://www.npmjs.com/package/sri-lankan-holiday-api)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/sri-lankan-holiday-api.svg?color=amber)](https://bundlephobia.com/package/sri-lankan-holiday-api)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Live Site](https://img.shields.io/badge/Live-holiday.imrishmika.dev-007A3D.svg)](https://holiday.imrishmika.dev)

The official **Node.js Module** and **Public REST API** serving 858+ hand-verified Sri Lankan public holidays, bank holidays, and Full Moon Poya days for **2024 through 2045** (22 complete calendar years).

- 📦 **NPM Module**: `sri-lankan-holiday-api` — 100% offline-ready, zero-dependency TypeScript/JavaScript SDK.
- 🌐 **Web API Explorer**: [https://holiday.imrishmika.dev](https://holiday.imrishmika.dev)
- 📖 **Interactive Docs**: [https://holiday.imrishmika.dev/docs](https://holiday.imrishmika.dev/docs)
- 🚀 **NPM Module Portal**: [https://holiday.imrishmika.dev/npm-module](https://holiday.imrishmika.dev/npm-module)

---

## 📦 1. Node.js Module Quick Start

### Installation

```bash
# Using npm
npm install sri-lankan-holiday-api

# Using yarn
yarn add sri-lankan-holiday-api

# Using pnpm
pnpm add sri-lankan-holiday-api

# Using bun
bun add sri-lankan-holiday-api
```

---

### Key Node.js SDK Usage Examples

#### ES Modules / TypeScript

```typescript
import { 
  getUpcomingHoliday, 
  getNextPoyaDay, 
  isPublicHoliday, 
  isWorkingDay,
  countWorkingDays,
  getLongWeekends
} from 'sri-lankan-holiday-api';

// 1. Get immediate upcoming holiday
const nextHoliday = getUpcomingHoliday();
console.log('Next Holiday:', nextHoliday.name, 'on', nextHoliday.date);

// 2. Get next Full Moon Poya Day + Days Countdown
const poya = getNextPoyaDay();
console.log(`Next Poya in ${poya.daysUntil} days: ${poya.name}`);

// 3. Check if today or a given date is a Public Holiday
console.log('April 13 Public Holiday?', isPublicHoliday('2026-04-13')); // true

// 4. Check business working day (returns false for weekends & public holidays)
console.log('April 13 Business Working Day?', isWorkingDay('2026-04-13')); // false

// 5. Count business working days in a month (ideal for leave & payroll calculation)
const aprilWorkDays = countWorkingDays('2026-04-01', '2026-04-30');
console.log('April 2026 Total Working Days:', aprilWorkDays); // 18

// 6. Find all long weekend opportunities in 2026 (3-day weekends)
const longWeekends = getLongWeekends(2026);
console.log(`2026 Long Weekends (${longWeekends.length} found):`, longWeekends[0].holiday.name);
```

#### CommonJS (Node.js)

```javascript
const { 
  getHolidaysByYear, 
  searchHolidays, 
  getBuddhistHolidays 
} = require('sri-lankan-holiday-api');

// Get all 2026 Sri Lankan holidays
const holidays2026 = getHolidaysByYear(2026);
console.log(`Found ${holidays2026.length} holidays for 2026`);

// Get all Buddhist Poya days
const poyaDays = getBuddhistHolidays(2026);

// Full-text search
const vesak = searchHolidays('Vesak');
console.log('Vesak dates:', vesak.map(h => h.date));
```

#### Hybrid Remote API Client with Automatic Offline Fallback

```typescript
import { SriLankanHolidayAPI } from 'sri-lankan-holiday-api';

// Query live REST API domain, with automatic fallback to embedded offline data if connection drops
const client = new SriLankanHolidayAPI({
  baseUrl: 'https://holiday.imrishmika.dev',
  useOfflineFallback: true, // Auto fallback to local dataset if server is down
  timeout: 4000
});

async function main() {
  const holidays = await client.getAllHolidays({ year: 2026 });
  console.log('2026 Holidays:', holidays.length);
}
main();
```

---

## 🛠️ Exported SDK Methods Reference

| Method | Parameters | Return Type | Description |
|:---|:---|:---|:---|
| `getVersion()` | `none` | `string` | Get current SDK version string ("3.2.0") |
| `getAllHolidays(filters?)` | `FilterOptions` | `Holiday[]` | Query holidays by year, month, type, religion, category |
| `getHolidaysByYear(year)` | `number \| string` | `Holiday[]` | Get all holidays for a specific calendar year |
| `getHolidaysByMonth(year, month)` | `year, month` | `Holiday[]` | Get holidays for a specific month (1–12) |
| `getHolidayByDate(dateStr)` | `string ("YYYY-MM-DD")` | `Holiday[]` | Get holiday records matching an exact date |
| `getTodayHoliday()` | `none` | `Holiday[]` | Get today's holiday in Sri Lanka timezone |
| `getUpcomingHoliday(publicOnly?)` | `boolean` | `Holiday \| null` | Get immediate next holiday from today |
| `getNextPoyaDay()` | `none` | `Holiday & { daysUntil }` | Get next Full Moon Poya day with days count |
| `getPoyaDays(year?)` | `number \| string` | `Holiday[]` | Get all Full Moon Poya days |
| `isHoliday(dateStr)` | `string ("YYYY-MM-DD")` | `boolean` | Returns true if target date is any holiday |
| `isPublicHoliday(dateStr)` | `string ("YYYY-MM-DD")` | `boolean` | Returns true if target date is a public holiday |
| `isBankHoliday(dateStr)` | `string ("YYYY-MM-DD")` | `boolean` | Returns true if target date is a bank holiday |
| `isWorkingDay(dateStr)` | `string ("YYYY-MM-DD")` | `boolean` | Returns true if date is a business day (excl. weekends & public holidays) |
| `isWeekend(dateStr)` | `string ("YYYY-MM-DD")` | `boolean` | Returns true if date is Saturday or Sunday |
| `countWorkingDays(start, end)` | `startDate, endDate` | `number` | Count business working days between two dates |
| `getWorkableDaysInRange(start, end)`| `startDate, endDate` | `string[]` | Get array of working date strings (YYYY-MM-DD) |
| `getHolidaysInRange(start, end)` | `startDate, endDate` | `Holiday[]` | Get holidays falling within a date range |
| `getLongWeekends(year?)` | `number \| string` | `LongWeekend[]` | Detect long weekend holiday opportunities |
| `getHolidaySummary()` | `none` | `Object` | Get high-level summary of today, next holiday, and next Poya |
| `getBuddhistHolidays(year?)` | `number \| string` | `Holiday[]` | Filter Buddhist & Poya holidays |
| `getHinduHolidays(year?)` | `number \| string` | `Holiday[]` | Filter Hindu festivals |
| `getIslamicHolidays(year?)` | `number \| string` | `Holiday[]` | Filter Islamic lunar observances |
| `getChristianHolidays(year?)` | `number \| string` | `Holiday[]` | Filter Christian holidays |
| `getNationalHolidays(year?)` | `number \| string` | `Holiday[]` | Filter National observances |
| `getDaysUntil(dateStr)` | `string ("YYYY-MM-DD")` | `number` | Count days remaining until target date |
| `getHolidayById(id)` | `string` | `Holiday \| null` | Lookup holiday by exact ID string |
| `searchHolidays(query)` | `string` | `Holiday[]` | Full-text search by keyword |
| `getDatasetStats()` | `none` | `Object` | Analytical distribution breakdown |
| `getMetadata()` | `none` | `Object` | Dataset metadata & version |
| `SriLankanHolidayAPI` | `ClientOptions` | `class instance` | Async client class for remote API calls with fallback |

---

## 🌐 2. Public REST API Endpoints

### API v3 (Stable Release)

Base URL: `https://holiday.imrishmika.dev`

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/v3/holidays` | Search, filter (year, month, type, category, public, bank), paginate (`?page=1&limit=50`) |
| `GET` | `/api/v3/holidays/today` | Check if today is a public holiday in Sri Lanka timezone + next holiday |
| `GET` | `/api/v3/holidays/upcoming` | Get next N upcoming holidays from today (`?limit=5&publicOnly=true`) |
| `GET` | `/api/v3/holidays/poya` | Official Sri Lanka Full Moon Poya days & next Poya calculator |
| `GET` | `/api/v3/holidays/search` | Full-text keyword search across titles and descriptions (`?q=poya`) |
| `GET` | `/api/v3/holidays/working-days` | Validate single working day (`?date=2026-04-15`) or calculate range (`?start=...&end=...`) |
| `GET` | `/api/v3/holidays/range` | Get holidays falling within custom date range (`?start=2026-04-01&end=2026-04-30`) |
| `GET` | `/api/v3/holidays/stats` | Analytics, year coverage breakdown, and dataset telemetry |
| `GET` | `/api/v3/status` | 100% real-time Live System Status telemetry (active users, uptime, request count) |
| `GET` | `/api/v3/health` | Comprehensive system health check & diagnostics |

---

## 💡 Quick cURL Example

```bash
curl "https://holiday.imrishmika.dev/api/v3/holidays/upcoming?limit=3"
```

---

## 📄 License

[MIT License](LICENSE) © 2026 [imrishmika.dev](https://imrishmika.dev) • [RishBroProMax](https://github.com/RishBroProMax)
