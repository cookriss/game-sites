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

## Deploy setup

Each site is a Cloudflare Pages project connected to this GitHub repo (no API tokens):
- Build command: `npm run build -w sites/<game>`
- Build output directory: `sites/<game>/dist`
- Environment variables: `NODE_VERSION=22`, `SITE_URL` (the site's domain), optional `ADSENSE_CLIENT`, `CF_ANALYTICS_TOKEN`.
- Build watch paths: `sites/<game>/*`, `packages/*`, `package-lock.json`, `.last-refresh`.

Cloudflare rebuilds on every push to `main`. `.github/workflows/daily-refresh.yml` pushes a timestamp commit once a day so stats stay fresh.

## Legal and consent (all sites)

`packages/core/src/legal` holds the legal notice (LSSI), privacy policy (GDPR), cookie policy and terms, in English and Spanish. A site gets them with one route file, `src/pages/[...lang]/[doc].astro` (copy it from `sites/deadlock`), and `owner: OWNER` plus `dataSource` in its `site.config.ts`.

Owner details for the legal notice come from build variables, so they stay out of this public repo. Set them in each Cloudflare Pages project (Settings → Variables): `OWNER_NAME`, `OWNER_TAX_ID`, `OWNER_ADDRESS`, `OWNER_EMAIL`.

Ads: set `ADSENSE_CLIENT=ca-pub-…` in the Pages project. That turns on the AdSense script, Google Consent Mode v2 (denied by default in the EEA, UK and CH), `/ads.txt`, and a "Cookie settings" footer link. Consent itself is Google's certified CMP: in AdSense, Privacy & messaging → European regulations → create a message for the site. Do not add a home-made cookie banner, since AdSense requires a Google-certified CMP in Europe.
