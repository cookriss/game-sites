import type { SiteConfig } from '@gamesites/core/lib/types';

export const SITE: SiteConfig & { apiLang: Record<string, string> } = {
  name: 'Deadlock Meta',
  // Change when the domain is bought. Used for canonical URLs, hreflang and the sitemap.
  url: process.env.SITE_URL || 'https://deadlock-meta.pages.dev',
  game: 'Deadlock',
  accent: '#e0b341',
  adsenseClient: process.env.ADSENSE_CLIENT || '',
  cfAnalyticsToken: process.env.CF_ANALYTICS_TOKEN || '',
  locales: [
    { prefix: '', lang: 'en', label: 'English' },
    { prefix: 'es', lang: 'es', label: 'Español' },
    { prefix: 'pt', lang: 'pt-BR', label: 'Português' },
    { prefix: 'ru', lang: 'ru', label: 'Русский' },
    { prefix: 'de', lang: 'de', label: 'Deutsch' },
    { prefix: 'fr', lang: 'fr', label: 'Français' },
  ],
  // Locale prefix -> language name the data API expects for localized names.
  apiLang: { '': 'english', es: 'spanish', pt: 'brazilian', ru: 'russian', de: 'german', fr: 'french' },
};
