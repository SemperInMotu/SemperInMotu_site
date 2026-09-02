# Semper In Motu — site

Next.js site for `semperinmotu.com` (App Router, i18n EN/RU/BE).

## Run

```bash
cd 01_Projects/SemperInMotu/site
npm install
npm run dev      # http://127.0.0.1:5174
npm run build    # production
npm start
```

## Stack

- **Next.js 15** App Router
- **Middleware** — EN at `/`, RU `/ru/`, BE `/be/` (internal rewrite to `/en/*`)
- **ECharts** — industry BI demos (`/ops/demos/*`)
- **FormSubmit** — contact forms

## Routes

| URL | Page |
|-----|------|
| `/` | Hub (EN) |
| `/ru/` | Hub (RU) |
| `/ops/` | Ops index |
| `/ops/data/` | Data / DWH |
| `/ops/smart/` | ALFAKIT SMART |
| `/ops/poc/` | KPI POC |
| `/ops/alfakit/` | → redirect alfakit.by |
| `/ops/demos/` | Demo gallery |
| `/ops/demos/logistics/` | … retail, manufacturing, ecommerce |
| `/work/` | Cases |
| `/journal/` | Journal stub |
| `/about/` | About |
| `/contact/` | Contact |

Legacy `.html` URLs redirect to clean paths (`/ops/data.html` → `/ops/data/`).

Heritavia: `/heritage/*` → `heritavia.vitalykhoruzhko.com` (see `next.config.mjs`).

## Structure

```
site/
├── app/[locale]/          # pages
├── components/            # React chrome, demos
├── lib/                   # i18n, copy, metadata
├── lib/demos/             # ECharts demo engine (from Vite era)
├── public/                # assets, robots, sitemap, _redirects
└── _legacy/               # (optional) old Vite HTML — can archive
```

Спека: [[../website-structure|website-structure]].

## Deploy

Build output: `.next/` (Node) or configure `output: 'export'` for static hosting if needed.

Netlify/Vercel: point to `site/`, build `npm run build`, start `npm start` (or adapter).

Old Vite `dist/` and root `*.html` files are superseded — safe to archive under `_legacy/`.
