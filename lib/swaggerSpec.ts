export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: '🇱🇰 Sri Lankan Holiday API (v3.2.0 Stable)',
    version: '3.2.0',
    description: `
A free, open-source REST API providing comprehensive Sri Lankan public, bank, and Poya holiday data for **2024–2045** (22 calendar years).

- **Website & Explorer**: [https://holiday.imrishmika.dev](https://holiday.imrishmika.dev)
- **Node.js SDK Module**: [https://holiday.imrishmika.dev/npm-module](https://holiday.imrishmika.dev/npm-module)
- **GitHub Repository**: [https://github.com/RishBroProMax/holiday-api](https://github.com/RishBroProMax/holiday-api)

## 🌟 Features (v3.2.0 Stable)
- **858+ cataloged holidays** across 22 years (2024-2045)
- **Full Moon Poya Days**: Astronomically calculated using Jean Meeus algorithms calibrated for Asia/Colombo (UTC+5:30)
- **Multi-religious coverage**: Buddhist, Hindu, Islamic, Christian & National observances
- **Working Days Calculator**: Calculate actual working days excluding weekends & public holidays
- **Live System Status**: 100% real-time telemetry metrics, server uptime, and rate limiting status
- **Zero-Dependency SDK**: Available via \`npm install sri-lankan-holiday-api\`

## 🏷️ Holiday Types
| Type | Description |
|:---|:---|
| \`buddhist\` | Full Moon Poya days & Buddhist religious observances |
| \`hindu\` | Deepavali, Thai Pongal, Maha Sivarathri |
| \`islamic\` | Eid al-Fitr, Eid al-Adha, Milad-Un-Nabi |
| \`christian\` | Christmas, Good Friday |
| \`national\` | Independence Day, May Day, Sinhala & Tamil New Year |
| \`international\` | World Environment Day, Human Rights Day, etc. |

## 🕐 Timezone
All date calculations use **Asia/Colombo (UTC+5:30)** timezone.
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
        description: 'Returns API metadata, version 3.2.0, available endpoints, and telemetry info.',
        responses: { '200': { description: 'v3 API base overview' } }
      }
    },
    '/api/v3/holidays': {
      get: {
        summary: 'Get all holidays (v3 Stable)',
        description: 'Retrieve Sri Lankan holidays with advanced query parameters for filtering and pagination.',
        parameters: [
          { in: 'query', name: 'year', schema: { type: 'integer' }, description: 'Filter by year (2024-2045)' },
          { in: 'query', name: 'month', schema: { type: 'integer' }, description: 'Filter by month (1-12)' },
          { in: 'query', name: 'day', schema: { type: 'integer' }, description: 'Filter by day of month (1-31)' },
          { in: 'query', name: 'type', schema: { type: 'string' }, description: 'Filter by tradition type (buddhist, hindu, islamic, christian, national)' },
          { in: 'query', name: 'category', schema: { type: 'string' }, description: 'Filter by category (public_and_bank, public, bank)' },
          { in: 'query', name: 'public', schema: { type: 'boolean' }, description: 'Filter for public holidays' },
          { in: 'query', name: 'bank', schema: { type: 'boolean' }, description: 'Filter for bank holidays' },
          { in: 'query', name: 'q', schema: { type: 'string' }, description: 'Search keyword' },
          { in: 'query', name: 'page', schema: { type: 'integer' }, description: 'Pagination page number' },
          { in: 'query', name: 'limit', schema: { type: 'integer' }, description: 'Pagination page size limit' }
        ],
        responses: { '200': { description: 'Paginated list of holidays' } }
      }
    },
    '/api/v3/holidays/today': {
      get: {
        summary: 'Check today status (v3 Stable)',
        description: 'Returns today holiday status in Asia/Colombo timezone and next upcoming holiday.',
        responses: { '200': { description: 'Today holiday status' } }
      }
    },
    '/api/v3/holidays/upcoming': {
      get: {
        summary: 'Get upcoming holidays (v3 Stable)',
        description: 'Returns upcoming holidays from today with calculated daysUntil countdown.',
        parameters: [
          { in: 'query', name: 'limit', schema: { type: 'integer' }, description: 'Number of upcoming holidays to return (default 5)' },
          { in: 'query', name: 'publicOnly', schema: { type: 'boolean' }, description: 'Filter only public holidays' }
        ],
        responses: { '200': { description: 'List of upcoming holidays' } }
      }
    },
    '/api/v3/holidays/poya': {
      get: {
        summary: 'Get Full Moon Poya Days (v3 Stable)',
        description: 'Returns all Poya days for Sri Lanka with next Poya countdown.',
        parameters: [
          { in: 'query', name: 'year', schema: { type: 'integer' }, description: 'Filter Poya days by year' }
        ],
        responses: { '200': { description: 'Poya days listing' } }
      }
    },
    '/api/v3/holidays/search': {
      get: {
        summary: 'Search holidays (v3 Stable)',
        description: 'Full-text keyword search across holiday titles, descriptions, and traditions.',
        parameters: [
          { in: 'query', name: 'q', required: true, schema: { type: 'string' }, description: 'Search term' }
        ],
        responses: { '200': { description: 'Search results' } }
      }
    },
    '/api/v3/holidays/working-days': {
      get: {
        summary: 'Working Days Validator & Counter (v3 Stable)',
        description: 'Check if a specific date is a business working day or count working days in a date range.',
        parameters: [
          { in: 'query', name: 'date', schema: { type: 'string' }, description: 'Single date YYYY-MM-DD to validate' },
          { in: 'query', name: 'startDate', schema: { type: 'string' }, description: 'Start date YYYY-MM-DD for date range' },
          { in: 'query', name: 'endDate', schema: { type: 'string' }, description: 'End date YYYY-MM-DD for date range' }
        ],
        responses: { '200': { description: 'Working days calculation result' } }
      }
    },
    '/api/v3/holidays/range': {
      get: {
        summary: 'Get holidays in date range (v3 Stable)',
        description: 'Retrieve holidays falling between startDate and endDate.',
        parameters: [
          { in: 'query', name: 'startDate', required: true, schema: { type: 'string' }, description: 'Start date YYYY-MM-DD' },
          { in: 'query', name: 'endDate', required: true, schema: { type: 'string' }, description: 'End date YYYY-MM-DD' }
        ],
        responses: { '200': { description: 'Date range holidays' } }
      }
    },
    '/api/v3/holidays/stats': {
      get: {
        summary: 'Get dataset analytics & telemetry (v3 Stable)',
        description: 'Returns holiday counts by religion, year coverage, public/bank/poya breakdown, and live telemetry.',
        responses: { '200': { description: 'Analytical breakdown stats' } }
      }
    },
    '/api/v3/status': {
      get: {
        summary: 'Live System Status Telemetry (v3 Stable)',
        description: 'Returns 100% real-time system metrics, active connected users, total requests served, uptime, and memory status.',
        responses: { '200': { description: 'Live system status metrics' } }
      }
    },
    '/api/v3/health': {
      get: {
        summary: 'System Health Diagnostics (v3 Stable)',
        description: 'Comprehensive health check for monitoring edge runtime, rate limiters, and dataset integrity.',
        responses: { '200': { description: 'System health check' } }
      }
    }
  }
};
