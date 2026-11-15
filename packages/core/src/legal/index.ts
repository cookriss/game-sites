import type { Locale, NavItem, SiteConfig } from '../lib/types';
import { localePath } from '../lib/i18n';
import { LEGAL_DOCS, LEGAL_LABELS, LEGAL_LANGS, legalLang, type LegalDocId } from './docs';
export * from './docs';

/** Locales that have their own legal pages (others use English). */
export const legalLocales = (site: SiteConfig): Locale[] =>
  site.locales.filter((l) => LEGAL_LANGS.includes(legalLang(l.lang)) && (LEGAL_LANGS as string[]).includes(l.lang.split('-')[0]));

/** The locale whose legal pages a visitor in `locale` should see. */
export const legalLocaleFor = (site: SiteConfig, locale: Locale): Locale =>
  legalLocales(site).find((l) => legalLang(l.lang) === legalLang(locale.lang)) ?? site.locales[0];

/** getStaticPaths entries for a `[...lang]/[doc].astro` route. */
export const legalPaths = (site: SiteConfig) =>
  legalLocales(site).flatMap((l) => LEGAL_DOCS.map((doc) => ({ params: { lang: l.prefix || undefined, doc } })));

export const legalLinks = (site: SiteConfig, locale: Locale): NavItem[] => {
  const ll = legalLocaleFor(site, locale);
  const labels = LEGAL_LABELS[legalLang(ll.lang)];
  return LEGAL_DOCS.map((d: LegalDocId) => ({ href: localePath(ll, '/' + d), label: labels[d] }));
};

export const cookieSettingsLabel = (locale: Locale) => LEGAL_LABELS[legalLang(locale.lang)].cookieSettings;
