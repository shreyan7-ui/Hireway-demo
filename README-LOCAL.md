# ElevateBridge — Local Development

## Requirements
- Node.js 18+ (20+ recommended)

## Run
From this project folder:

```bash
npm start
```

Then open:

**http://localhost:5500**

You can also use:

```bash
npm run dev
```

## What works locally
- All frontend pages and animations run locally.
- `/api/*` requests are proxied to the deployed Hatchable API, so public forms can be tested from localhost without changing frontend code.
- Routes such as `/about`, `/services`, `/clients`, `/careers`, `/contact`, and `/resource-request` are supported.

## Important
The database/backend still belongs to the Hatchable deployment. Submitting a public lead or resource request while running locally will use the deployed API/database.

Admin pages may still require the Hatchable authentication/session because authentication is tied to the deployed Hatchable environment.

## Project structure
- `public/` — frontend
- `api/` — Hatchable API functions
- `migrations/` — database migrations
- `seed.sql` — seed data
- `hatchable.toml` — Hatchable configuration
- `dev-server.js` — local static server + API proxy
