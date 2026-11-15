import type { SiteConfig } from '@gamesites/core/lib/types';
import { OWNER } from '@gamesites/core/legal/owner';

/** Provisional brand. Change name and url when the domain is bought. */
export const SITE: SiteConfig = {
  name: 'Partida',
  url: process.env.SITE_URL || 'https://partida-hub.pages.dev',
  game: 'video games',
  accent: '#e0b341',
  adsenseClient: process.env.ADSENSE_CLIENT || '',
  cfAnalyticsToken: process.env.CF_ANALYTICS_TOKEN || '',
  owner: OWNER,
  publishers: [ 'HoYoverse', 'Elementa', 'NetEase', 'Chucklefish'],
  locales: [
    { prefix: '', lang: 'en', label: 'English' },
    { prefix: 'es', lang: 'es', label: 'Español' },
    { prefix: 'pt', lang: 'pt-BR', label: 'Português' },
  ],
};
