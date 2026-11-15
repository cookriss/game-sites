import type { Locale, SiteConfig } from './types';

/** Join a locale prefix and an unlocalized path ('/' or '/heroes/x'). */
export function localePath(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path;
  if (!locale.prefix) return clean || '/';
  return `/${locale.prefix}${clean}`;
}

/** getStaticPaths helper for a `[...lang]` route segment. */
export function langParams(site: SiteConfig) {
  return site.locales.map((l) => ({ params: { lang: l.prefix || undefined }, props: { locale: l } }));
}

export function localeFromParam(site: SiteConfig, param: string | undefined): Locale {
  return site.locales.find((l) => (l.prefix || undefined) === param) ?? site.locales[0];
}

/** Build a translator from a dictionary keyed by locale prefix ('' = default). */
export function makeT<D extends Record<string, string>>(dicts: Record<string, Partial<D>>, base: D) {
  return (locale: Locale) => {
    const d = dicts[locale.prefix] ?? {};
    return (key: keyof D, vars: Record<string, string | number> = {}) => {
      let s = (d[key] ?? base[key]) as string;
      for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
      return s;
    };
  };
}
