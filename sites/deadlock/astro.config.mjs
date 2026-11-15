import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE_URL = process.env.SITE_URL || 'https://deadlock-meta.pages.dev';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: { format: 'file' },
  image: { domains: ['assets-bucket.deadlock-api.com'] },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es', pt: 'pt-BR', ru: 'ru', de: 'de', fr: 'fr' } },
      filter: (page) => !page.includes('/404') && !/\/player$/.test(page),
    }),
  ],
});
