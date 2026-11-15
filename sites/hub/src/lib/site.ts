import { legalLinks, cookieSettingsLabel } from '@gamesites/core/legal/index';
import { localePath, localeFromParam } from '@gamesites/core/lib/i18n';
import { SITE } from '../../site.config';
import { useT } from '../i18n/ui';

export const BUILD_DATE = new Date();

/** Everything a page needs to render the shared chrome in one locale. */
export function ctx(langParam: string | undefined) {
  const locale = localeFromParam(SITE, langParam);
  const t = useT(locale);
  const L = (p: string) => localePath(locale, p);
  const lang = (locale.prefix || 'en') as 'en' | 'es' | 'pt';
  return {
    site: SITE, locale, t, L, lang,
    nav: [{ href: L('/') + '#games', label: t('nav_games') }, { href: L('/') + '#calendar', label: t('nav_calendar') }],
    strings: {
      disclaimer: t('disclaimer'), about: t('about'), aboutHref: L('/about'), privacy: t('privacy'), language: t('language'),
      legal: legalLinks(SITE, locale), cookieSettings: cookieSettingsLabel(locale),
    },
  };
}
export type Ctx = ReturnType<typeof ctx>;
export { SITE };
