export interface Locale {
  /** URL prefix ('' for the default locale) */
  prefix: string;
  /** html lang / hreflang value, e.g. 'en', 'es', 'pt-BR' */
  lang: string;
  /** Label shown in the language switcher */
  label: string;
}

export interface SiteConfig {
  name: string;
  /** Absolute origin, no trailing slash */
  url: string;
  game: string;
  /** Google AdSense publisher id (ca-pub-...). Empty until approved. */
  adsenseClient?: string;
  /** Cloudflare Web Analytics token. Empty to disable. */
  cfAnalyticsToken?: string;
  locales: Locale[];
  /** Accent color used for theme-color and highlights */
  accent: string;
}

export interface NavItem { href: string; label: string }

export interface LayoutStrings {
  disclaimer: string;
  about: string;
  privacy: string;
  language: string;
  updated?: string;
}
