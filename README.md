# Semper In Motu — site

Next.js site for `semperinmotu.com` (App Router, i18n EN/RU/BE).

## Branches (compare v1 / v2)

| Branch | Port | IA |
|--------|------|-----|
| `main` | **5174** | v1 — `/ops/*` |
| `feature/site-v2-ia` | **5175** | v2 — Start · Capabilities · Solutions · Products · Methods · Engage |

### Parallel compare (two terminals)

```bash
# terminal A — current (main)
cd 01_Projects/SemperInMotu/site
git checkout main
npm run dev          # if on main: set port 5174 in package.json, or:
npx next dev --port 5174

# terminal B — v2 worktree (recommended)
cd 01_Projects/SemperInMotu
git -C site worktree add ../site-v2 feature/site-v2-ia
cd site-v2
npm install
npm run dev          # :5175
```

Open side-by-side:
- v1 → http://127.0.0.1:5174/en/
- v2 → http://127.0.0.1:5175/en/

On this branch (`feature/site-v2-ia`) default `npm run dev` = **5175**.

## Run

```bash
cd 01_Projects/SemperInMotu/site
npm install
npm run dev      # http://127.0.0.1:5175 (v2 branch)
npm run build    # → out/ (static export)
npx serve out
```

## Stack

- **Next.js 15** App Router · static export (GitHub Pages)
- **ECharts** demos — `/products/demos/*` (legacy `/ops/demos/*` redirects)
- **FormSubmit** contact forms

## Routes (v2)

| URL | Page |
|-----|------|
| `/en/` | Hub |
| `/en/start/` | Problem router |
| `/en/capabilities/` | Analytics · Engineering |
| `/en/solutions/` | Logistics · sales-ops · operations |
| `/en/products/` | Data · SMART · POC · demos |
| `/en/methods/` | KPI POC · shadow · audit · express audit |
| `/en/engage/` | How to buy |
| `/en/ops/*` | → redirects to solutions/products |

Спека: [[../website-structure|website-structure v2]].

## Deploy — GitHub Pages

See workflow `.github/workflows/deploy-pages.yml`. Custom domain → empty `NEXT_PUBLIC_BASE_PATH`.
