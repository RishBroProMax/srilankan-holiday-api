# 📜 Changelog — Sri Lankan Holiday API & Node Module

All notable changes to the `sri-lankan-holiday-api` package and REST API will be documented in this file.

---

## 🌍 [v3.2.1] — 2026-08-11 (Localization & Date Intelligence)

### 🌟 Node Module SDK (v3.2.1)
- **Multi-Language Localization**:
  - Added Sinhala (`si` / `si-LK`) and Tamil (`ta` / `ta-LK`) translations for holiday names, descriptions, day of week names (`Monday` -> `සඳුදා` / `திங்கள்`), and categories.
  - Added `getLocalizedHoliday(holiday, lang)` helper function.
- **Date Intelligence Range Analysis**:
  - Added `analyzeDateRange(from, to, options)` returning `{ totalDays, weekends, holidays, businessDays, workingDaysList, holidaysList }` for HR leave management, payroll, invoice delivery estimates, and SaaS apps.
- **Timezone Support**:
  - Support `timezone` parameter in SDK calls and `SriLankanHolidayAPI` queries (`?timezone=Asia/Colombo`, `?timezone=UTC`, `?timezone=America/New_York`).

### 🌐 REST API (/v3)
- **New Endpoints**:
  - `GET /api/v3/date/range?from=2026-08-01&to=2026-08-31` returning exact Date Intelligence analysis: `{"totalDays": 31, "weekends": 10, "holidays": 1, "businessDays": 20}`.
- **Query Parameters**:
  - `?lang=en` | `?lang=si` | `?lang=ta`
  - `?locale=en-LK` | `?locale=si-LK` | `?locale=ta-LK`
  - `?timezone=Asia/Colombo`

---

## 🚀 [v3.2.0] — 2026-08-11 (Stable Release)

### 🌟 Node Module SDK (v3.2.0)
- **New Helper Functions**:
  - `getVersion()`: Returns the SDK version string (`"3.2.0"`).
  - `isWeekend(dateStr)`: Check if a date string (`YYYY-MM-DD`) falls on Saturday or Sunday.
  - `getWorkableDaysInRange(startDate, endDate)`: Get array of actual business working date strings.
  - `getHolidaySummary()`: Instant high-level summary of today's holiday, next upcoming holiday, and next Full Moon Poya day.
  - `filterHolidays(filters)`: Enhanced filter query wrapper.
- **REST API v3 Client**: Updated `SriLankanHolidayAPI` class to target `/api/v3/` endpoints with automatic offline fallback to local dataset.

### 🌐 REST API (/v3 Stable)
- **New Endpoints**:
  - `GET /api/v3`: Base API metadata, version information, and telemetry index.
  - `GET /api/v3/holidays`: Full catalog query with multi-field filtering (`year`, `month`, `day`, `type`, `category`, `public`, `bank`, `q`) and pagination (`page`, `limit`).
  - `GET /api/v3/holidays/today`: Real-time today holiday check in `Asia/Colombo` timezone with next holiday info.
  - `GET /api/v3/holidays/upcoming`: Next upcoming holidays list with `daysUntil` countdown.
  - `GET /api/v3/holidays/poya`: Full Moon Poya days listing & next Poya day countdown.
  - `GET /api/v3/holidays/search`: Full-text keyword search across holiday titles, descriptions, and traditions.
  - `GET /api/v3/holidays/working-days`: Business working day validator & working days counter between two dates.
  - `GET /api/v3/holidays/range`: Custom date range query (`startDate` to `endDate`).
  - `GET /api/v3/holidays/stats`: Dataset statistics & breakdown by religion.
  - `GET /api/v3/status`: 100% real-time Live System Status telemetry (active users, uptime, request count).
  - `GET /api/v3/health`: System health diagnostic checks.

### 🔒 AI SEO & Crawling (AEO/GEO)
- **AI Bot Crawling**: Added explicit `allow: /` permissions in `robots.txt` for `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`, `Bingbot`, and `Googlebot`.
- **JSON-LD Schema Markup**: Upgraded structured data with `SoftwareApplication` v3.2.0, `Dataset`, `FAQPage`, `BreadcrumbList`, and `Organization`.
- **Sitemap**: Added `/npm-module` and all `/api/v3/...` endpoints.

---

## 📦 [v3.0.0] — 2026-08-04

### Features
- Published official Node.js SDK (`sri-lankan-holiday-api`) on NPM.
- Zero-dependency, 100% offline-ready TypeScript/JavaScript SDK.
- Hand-verified dataset covering 2024–2045 (858+ holidays).
- Dual CJS (`dist/index.js`) and ESM (`dist/index.mjs`) builds with `.d.ts` types.
- Created `/npm-module` interactive web documentation page with live playground.

---

## 🌐 [v2.5.0] — 2026-06-15

### Features
- Introduced `/api/v2` endpoints with full-text search, pagination, and sorting.
- Astronomically computed Full Moon Poya days using Jean Meeus algorithms.
- Expanded dataset to 2045.

---

## 🇱🇰 [v1.0.0] — 2024-01-01

### Features
- Initial release of Sri Lankan Holiday API.
- Basic `/api/v1/holidays` listing and JSON/CSV export.
