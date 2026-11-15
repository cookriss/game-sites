# game-sites

Monorepo for ad-supported game tools sites (op.gg style). One shared core, one folder per site.

```
packages/core/        shared layout, SEO (canonical, hreflang, JSON-LD), i18n helpers, ad slot, cached API fetch, styles
sites/deadlock/       Deadlock Meta: tier list, hero builds/counters, items. 6 languages.
.github/workflows/    one workflow per site: daily rebuild with fresh stats + deploy to Cloudflare Pages
```

## Run locally

```
npm install
npm run dev:deadlock      # http://localhost:4321
npm run build:deadlock    # static output in sites/deadlock/dist
```

API responses are cached in `sites/deadlock/.cache` for 6 hours to keep local builds fast.

## How a site is built

- Static pages, generated at build time. They are served from Cloudflare's CDN, so a traffic spike costs nothing and can't take the site down.
- Stats refresh once a day through the scheduled GitHub Action.
- Pages read data only through `src/lib/data/model.ts` (`DataSource`). Today it is backed by the community API at deadlock-api.com (`deadlock-api.ts`). To switch to an official API, write another `DataSource` and select it with the `DATA_SOURCE` env var.

## Adding a new game

1. Copy `sites/deadlock` to `sites/<game>`, change `site.config.ts`, the strings in `src/i18n/ui.ts` and the data source.
2. Copy the workflow and change the folder and the Cloudflare project name.

## Deploy setup (once per GitHub repo)

GitHub repo → Settings → Secrets and variables → Actions:
- Secrets: `CLOUDFLARE_API_TOKEN` (Cloudflare token with the "Cloudflare Pages: Edit" permission), `CLOUDFLARE_ACCOUNT_ID`.
- Variables (optional): `DEADLOCK_SITE_URL` (e.g. https://deadlockmeta.gg once the domain exists), `ADSENSE_CLIENT`, `DEADLOCK_CF_ANALYTICS_TOKEN`.

Create the Cloudflare Pages project once with: `npx wrangler pages project create deadlock-meta --production-branch=main` (or let the first deploy create it).
