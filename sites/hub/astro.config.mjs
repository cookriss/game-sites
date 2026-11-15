import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Temporary home on pages.dev until the domain is bought. Set SITE_URL in
// Cloudflare when moving; old URLs then 301 to the new domain (see public/_redirects).
const SITE_URL = process.env.SITE_URL || 'https://partida-hub.pages.dev';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es', pt: 'pt-BR' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
