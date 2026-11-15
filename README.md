# game-sites

One reusable base for ad-funded game data sites (tier lists, builds, stats), one static site per game.

```
packages/core/   Shared layout, SEO (canonical, hreflang, JSON-LD), i18n helpers,
                 API fetch cache, ad slots, legal pages and consent.
sites/<game>/    One Astro site per game (none active right now).
```

## Starting a new game site

The first site (Deadlock) was removed on 2026-11-15. Its full code is kept in the git tag `deadlock-final` and is the template for the next site:

```
git checkout deadlock-final -- sites/deadlock
git mv sites/deadlock sites/<game>
```

Then change `site.config.ts`, the strings in `src/i18n/ui.ts` and the data source in `src/lib/data/` (pages only read data through the `DataSource` interface in `model.ts`).

Deploy: create a Cloudflare Pages project connected to this repo, with build command `npm run build -w sites/<game>`, output `sites/<game>/dist`, and Node from `.node-version`. A daily rebuild can be scheduled with a GitHub Action that commits a timestamp (see `.github/workflows/daily-refresh.yml` in the tag).

## Legal and consent (all sites)

`packages/core/src/legal` holds the legal notice (LSSI), privacy policy (GDPR), cookie policy and terms, in English and Spanish. A site gets them with one route file, `src/pages/[...lang]/[doc].astro`, and `owner: OWNER` plus `dataSource` in its `site.config.ts`.

Owner details for the legal notice come from build variables, so they stay out of this public repo. Set them in each Cloudflare Pages project (Settings → Variables): `OWNER_NAME`, `OWNER_TAX_ID`, `OWNER_ADDRESS`, `OWNER_EMAIL`.

Ads: set `ADSENSE_CLIENT=ca-pub-…` in the Pages project. That turns on the AdSense script, Google Consent Mode v2 (denied by default in the EEA, UK and CH), `/ads.txt`, and a "Cookie settings" footer link. Consent itself is Google's certified CMP: in AdSense, Privacy & messaging → European regulations. Do not add a home-made cookie banner.
