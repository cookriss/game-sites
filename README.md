# game-sites

One reusable base for ad-funded game data sites (tier lists, builds, stats), one static site per game.

```
packages/core/   Shared layout, SEO (canonical, hreflang, JSON-LD), i18n helpers,
                 API fetch cache, ad slots, legal pages and consent.
sites/hub/        The main site (provisional brand "Partida"): home, release calendar,
                 legal pages. Game sections live under sites/hub/src/pages/[...lang]/<game>/.
```

## Starting a new game site

Add `sites/<game>` as an Astro site that imports from `@gamesites/core`, with its own `site.config.ts`, strings and data source. Deploy it as its own Cloudflare Pages project connected to this repo (build `npm run build -w sites/<game>`, output `sites/<game>/dist`, Node from `.node-version`).

## Legal and consent (all sites)

`packages/core/src/legal` holds the legal notice (LSSI), privacy policy (GDPR), cookie policy and terms, in English and Spanish. A site gets them with one route file, `src/pages/[...lang]/[doc].astro`, and `owner: OWNER` plus `dataSource` in its `site.config.ts`.

Owner details for the legal notice come from build variables, so they stay out of this public repo. Set them in each Cloudflare Pages project (Settings → Variables): `OWNER_NAME`, `OWNER_TAX_ID`, `OWNER_ADDRESS`, `OWNER_EMAIL`.

Ads: set `ADSENSE_CLIENT=ca-pub-…` in the Pages project. That turns on the AdSense script, Google Consent Mode v2 (denied by default in the EEA, UK and CH), `/ads.txt`, and a "Cookie settings" footer link. Consent itself is Google's certified CMP: in AdSense, Privacy & messaging → European regulations. Do not add a home-made cookie banner.
