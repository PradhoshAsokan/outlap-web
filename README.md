# Outlap Web 🏎️💨

The high-performance F1 telemetry and insights dashboard. Formerly known as Purple Sector.

## Architecture

Outlap Web is built with Next.js and utilizes Edge Route Handlers to consolidate API logic, bypassing CORS issues and implementing strategic caching to mitigate rate-limiting.

### Key Features
- **The Pit Wall:** Real-time telemetry, race control, and weather monitoring.
- **The Paddock:** F1 news aggregator with built-in RSS parsing and caching.
- **Hall of Fame:** Driver and Constructor standings powered by the Jolpica API.
- **Grand Prix Calendar:** Comprehensive season schedule with local timezone conversion and countdowns.

## Development

First, set up your environment variables:

```bash
cp .env.example .env.local
# Ensure NEXT_PUBLIC_API_URL is set to /api
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Route Handlers

All external data is proxied through internal routes:
- `/api/v1/news` -> Autosport RSS
- `/api/v1/standings` -> Jolpica Drivers
- `/api/v1/constructors` -> Jolpica Constructors
- `/api/v1/calendar` -> Jolpica Schedule
- `/api/v1/[endpoint]` -> OpenF1 Telemetry (telemetry, car_data, sessions, etc.)
