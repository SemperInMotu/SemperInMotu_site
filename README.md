# Semper In Motu — site

Next.js site for `semperinmotu.com` (App Router, i18n EN/RU/BE).

## Run

```bash
cd 01_Projects/SemperInMotu/site
npm install
npm run dev      # http://127.0.0.1:5174
npm run build    # → out/ (static export)
npx serve out    # preview production build
```

Локально с `basePath` (как на Project Pages):

```bash
$env:NEXT_PUBLIC_BASE_PATH="/SemperInMotu_site"; npm run build
npx serve out
```

## Stack

- **Next.js 15** App Router
- **Static export** — `output: 'export'` for GitHub Pages (no middleware)
- **ECharts** — industry BI demos (`/ops/demos/*`)
- **FormSubmit** — contact forms

## Routes

| URL | Page |
|-----|------|
| `/` | → redirect `/en/` |
| `/en/`, `/ru/`, `/be/` | Hub |
| `/en/ops/` | Ops index |
| `/en/ops/data/` | Data / DWH |
| `/en/ops/smart/` | ALFAKIT SMART |
| `/en/ops/poc/` | KPI POC |
| `/en/ops/alfakit/` | → redirect alfakit.by |
| `/en/ops/demos/` | Demo gallery |
| `/en/ops/demos/logistics/` | … retail, manufacturing, ecommerce |
| `/en/work/` | Cases |
| `/en/journal/` | Journal stub |
| `/en/about/` | About |
| `/en/contact/` | Contact |

(RU/BE — те же пути с префиксом `/ru/`, `/be/`.)

Heritavia: `/heritage/` → `heritavia.vitalykhoruzhko.com` (`public/heritage/index.html`).

## Structure

```
site/
├── app/[locale]/          # pages
├── components/            # React chrome, demos
├── lib/                   # i18n, copy, metadata
├── lib/demos/             # ECharts demo engine (from Vite era)
├── public/                # assets, robots, sitemap, .nojekyll
└── _legacy/               # (optional) old Vite HTML — can archive
```

Спека: [[../website-structure|website-structure]].

## Deploy — GitHub Pages

Static export (`output: 'export'`). Workflow: `.github/workflows/deploy-pages.yml`.

### One-time setup (GitHub)

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. Push to `main` — workflow builds `out/` and deploys

### URLs

| Hosting | `NEXT_PUBLIC_BASE_PATH` | Example |
|---------|-------------------------|---------|
| Project Pages | `/SemperInMotu_site` (default in workflow) | `https://semperinmotu.github.io/SemperInMotu_site/en/` |
| Custom domain | empty — set repo variable `NEXT_PUBLIC_BASE_PATH` to `` or `/` | `https://semperinmotu.com/en/` |

**Settings → Secrets and variables → Actions → Variables:**

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_BASE_PATH` | `/SemperInMotu_site` or leave empty for custom domain |

### Local static preview

```bash
npm run build
npx serve out
# with basePath: npx serve out -p 3000
```

Node **≥ 20** (`.nvmrc`).

Heritavia: `/heritage/` → static redirect in `public/heritage/index.html`.
