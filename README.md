# Kostenklar — Entrümpelung Kosten Rechner 2026

Modern, mobile-first cost calculator and lead qualification platform for clearing out and liquidation services in Germany (*Entrümpelung & Wohnungsauflösung*).

## Configuration & Environment

The website domain is 100% dynamic and configured via `NEXT_PUBLIC_SITE_URL`. No domain is hardcoded in sitemaps, robots, canonicals, JSON-LD schemas, or email templates.

Copy `.env.example` to `.env.local` and set your domain and database credentials:

```bash
# Domain
NEXT_PUBLIC_SITE_URL=https://example.com

# Neon Serverless Postgres (AWS Europe Central 1, Frankfurt)
DATABASE_URL=postgresql://neondb_owner:password@ep-something-pooler.c-8.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## Tech Stack

- **Framework:** Next.js (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS (Dark/Light mode, Mobile-first responsive)
- **Database / Backend:** Neon Serverless PostgreSQL (Frankfurt / `eu-central-1`)
- **Icons & UI:** Lucide React, Framer Motion
- **Testing & QA:** Playwright (WebKit & Chromium), Vitest

## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Build

```bash
npm run build
npm start
```
