export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: '🇱🇰 Sri Lankan Holiday API (v3.2.1 Stable)',
    version: '3.2.1',
    description: `
A free, open-source REST API providing comprehensive Sri Lankan public, bank, and Poya holiday data for **2024–2045** (22 calendar years).

- **Website & Explorer**: [https://holiday.imrishmika.dev](https://holiday.imrishmika.dev)
- **Node.js SDK Module**: [https://holiday.imrishmika.dev/npm-module](https://holiday.imrishmika.dev/npm-module)
- **GitHub Repository**: [https://github.com/RishBroProMax/holiday-api](https://github.com/RishBroProMax/holiday-api)

## 🌟 New Features in v3.2.1
- 🌍 **Multi-Language Localization**: Full Sinhala (\`si\` / \`si-LK\`), Tamil (\`ta\` / \`ta-LK\`), and English (\`en\` / \`en-LK\`) translations for holiday names, descriptions, day of week names, and categories.
- 🕒 **Timezone Support**: Custom timezone querying via \`?timezone=...\` (e.g. \`Asia/Colombo\`, \`UTC\`, \`America/New_York\`).
- 🧠 **Date Intelligence Range Analysis**: \`GET /api/v3/date/range?from=2026-08-01&to=2026-08-31\` returning \`totalDays\`, \`weekends\`, \`holidays\`, and \`businessDays\` for HR, payroll, invoicing & SaaS apps.
- **Zero-Dependency SDK**: Available via \`npm install sri-lankan-holiday-api\`.

## 🏷️ Holiday Types
| Type | Description |
|:---|:---|
| \`buddhist\` | Full Moon Poya days & Buddhist religious observances |
| \`hindu\` | Deepavali, Thai Pongal, Maha Sivarathri |
| \`islamic\` | Eid al-Fitr, Eid al-Adha, Milad-Un-Nabi |
| \`christian\` | Christmas, Good Friday |
| \`national\` | Independence Day, May Day, Sinhala & Tamil New Year |
| \`international\` | World Environment Day, Human Rights Day, etc. |

## 🌐 Supported Languages & Locales
- \`en\` / \`en-LK\`: English (Default)
- \`si\` / \`si-LK\`: Sinhala (සිංහල)
- \`ta\` / \`ta-LK\`: Tamil (தமிழ்)
    `,
    contact: {
      name: 'RishBroProMax',
      url: 'https://github.com/RishBroProMax/holiday-api'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'https://holiday.imrishmika.dev',
      description: 'Production Server'
    },
    {
      url: 'http://localhost:3000',
      description: 'Local Development Server'
    }
  ],
  paths: {
    '/api/v3': {
      get: {
        summary: 'v3 API Base Overview',
        description: 'Returns API metadata, version 3.2.1, available endpoints, and telemetry index.',
        responses: { '200': { description: 'v3 API base overview' } }
      }
    },
    '/api/v3/date/range': {
      get: {
        summary: 'Date Intelligence Range Analysis (v3.2.1)',
        description: 'Returns total days, weekends, holidays count, business days count, and working date lists between `from` and `to` dates for HR, payroll & delivery estimates.',
        parameters: [
          { in: 'query', name: 'from', required: true, schema: { type: 'string' }, example: '2026-08-01', description: 'Start date YYYY-MM-DD' },
          { in: 'query', name: 'to', required: true, schema: { type: 'string' }, example: '2026-08-31', description: 'End date YYYY-MM-DD' },
          { in: 'query', name: 'lang', schema: { type: 'string' }, example: 'si', description: 'Language code (en, si, ta)' },
          { in: 'query', name: 'timezone', schema: { type: 'string' }, example: 'Asia/Colombo', description: 'Target IANA timezone' }
        ],
        responses: { '200': { description: 'Date Intelligence breakdown' } }
      }
    },
    '/api/v3/holidays': {
      get: {
        summary: 'Get all holidays (v3.2.1)',
        description: 'Retrieve Sri Lankan holidays with multi-language localization, timezone support, and filtering.',
        parameters: [
          { in: 'query', name: 'year', schema: { type: 'integer' }, description: 'Filter by year (2024-2045)' },
          { in: 'query', name: 'month', schema: { type: 'integer' }, description: 'Filter by month (1-12)' },
          { in: 'query', name: 'day', schema: { type: 'integer' }, description: 'Filter by day of month (1-31)' },
          { in: 'query', name: 'type', schema: { type: 'string' }, description: 'Filter by tradition type (buddhist, hindu, islamic, christian, national)' },
          { in: 'query', name: 'category', schema: { type: 'string' }, description: 'Filter by category (public_and_bank, public, bank)' },
          { in: 'query', name: 'lang', schema: { type: 'string' }, example: 'si', description: 'Language / Locale (en, si, ta, si-LK, ta-LK)' },
          { in: 'query', name: 'timezone', schema: { type: 'string' }, example: 'Asia/Colombo' },
          { in: 'query', name: 'q', schema: { type: 'string' }, description: 'Search keyword' },
          { in: 'query', name: 'page', schema: { type: 'integer' }, description: 'Pagination page number' },
          { in: 'query', name: 'limit', schema: { type: 'integer' }, description: 'Pagination page size limit' }
        ],
        responses: { '200': { description: 'Paginated list of localized holidays' } }
      }
    },
    '/api/v3/holidays/today': {
      get: {
        summary: 'Check today status (v3.2.1)',
        description: 'Returns today holiday status in requested timezone and language.',
        parameters: [
          { in: 'query', name: 'lang', schema: { type: 'string' }, example: 'ta' },
          { in: 'query', name: 'timezone', schema: { type: 'string' }, example: 'Asia/Colombo' }
        ],
        responses: { '200': { description: 'Today holiday status' } }
      }
    },
    '/api/v3/holidays/upcoming': {
      get: {
        summary: 'Get upcoming holidays (v3.2.1)',
        description: 'Returns upcoming holidays from today with calculated daysUntil countdown.',
        parameters: [
          { in: 'query', name: 'limit', schema: { type: 'integer' }, description: 'Number of upcoming holidays to return (default 5)' },
          { in: 'query', name: 'lang', schema: { type: 'string' }, example: 'si' },
          { in: 'query', name: 'timezone', schema: { type: 'string' }, example: 'Asia/Colombo' }
        ],
        responses: { '200': { description: 'List of upcoming holidays' } }
      }
    },
    '/api/v3/holidays/poya': {
      get: {
        summary: 'Get Full Moon Poya Days (v3.2.1)',
        description: 'Returns all Poya days for Sri Lanka with next Poya countdown in selected language.',
        parameters: [
          { in: 'query', name: 'year', schema: { type: 'integer' }, description: 'Filter Poya days by year' },
          { in: 'query', name: 'lang', schema: { type: 'string' }, example: 'si' }
        ],
        responses: { '200': { description: 'Poya days listing' } }
      }
    },
    '/api/v3/holidays/search': {
      get: {
        summary: 'Search holidays (v3.2.1)',
        description: 'Full-text keyword search across holiday titles, descriptions, and traditions.',
        parameters: [
          { in: 'query', name: 'q', required: true, schema: { type: 'string' }, description: 'Search term' },
          { in: 'query', name: 'lang', schema: { type: 'string' }, example: 'ta' }
        ],
        responses: { '200': { description: 'Search results' } }
      }
    },
    '/api/v3/status': {
      get: {
        summary: 'Live System Status Telemetry (v3.2.1)',
        description: 'Returns 100% real-time system metrics, active connected users, total requests served, uptime, and memory status.',
        responses: { '200': { description: 'Live system status metrics' } }
      }
    },
    '/api/v3/health': {
      get: {
        summary: 'System Health Diagnostics (v3.2.1)',
        description: 'Comprehensive health check for monitoring edge runtime, rate limiters, and dataset integrity.',
        responses: { '200': { description: 'System health check' } }
      }
    }
  }
};
