# Portfolio Astro

Pure Astro marketing site for [agustin.top](https://www.agustin.top). No React islands — static HTML, Tailwind CSS, and small vanilla scripts.

## Requirements

- Node.js 18+
- npm

## Setup

```bash
cd astro
npm install
cp .env.example .env
# Edit .env with your Mailprex, SMTP, and Upstash credentials
```

## Development

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). Root `/` redirects to `/es/`.

## Build & preview

```bash
npm run build
npm run preview
```

Type-check:

```bash
npm run check
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `EMAIL_DESTINY` | Yes (contact) | Inbox that receives discovery form submissions via Mailprex |
| `MAILPREX_FORM_TOKEN` | Yes (contact) | Mailprex API form token |
| `MAILER_FROM` | Yes (contact) | From address for thank-you emails |
| `MAILER_HOST` | Yes (contact) | SMTP host |
| `MAILER_PORT` | No | SMTP port (default `587`) |
| `MAILER_USER` | Yes (contact) | SMTP username |
| `MAILER_PASS` | Yes (contact) | SMTP password |
| `PUBLIC_TURNSTILE_SITE_KEY` | Recommended | Cloudflare Turnstile site key (public, needed at build) |
| `TURNSTILE_SECRET_KEY` | Recommended | Cloudflare Turnstile secret (server verify) |
| `UPSTASH_REDIS_REST_URL` | Recommended | Upstash Redis URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Recommended | Upstash Redis token |

Without Upstash, rate limiting falls back to in-memory storage (not reliable on serverless).

## Architecture

- **i18n**: locale routes `/es/` and `/en/`
- **Static pages**: prerendered with `export const prerender = true`
- **Contact API**: `POST /api/contact` (Vercel serverless via `@astrojs/vercel`)
- **Blog**: fetched at build time from `https://blog.agustin.top/api/posts?locale={es|en}`

## Deploy

Configured for Vercel with `output: "server"` and the Vercel adapter. Set all env vars in the Vercel project dashboard before deploying.

```bash
npm run build
```
