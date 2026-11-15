import { SITE } from '../../site.config';
import { localePath, localeFromParam } from '@gamesites/core/lib/i18n';
import type { Locale } from '@gamesites/core/lib/types';
import { compact } from '@gamesites/core/lib/format';
import { useT } from '../i18n/ui';
import { data, type Bracket, type Hero, type HeroStat, type Item } from './data';

export const WINDOW_DAYS = Number(process.env.STATS_WINDOW_DAYS || 30);
export const BUILD_DATE = new Date();

export type Tier = 'S' | 'A' | 'B' | 'C' | 'D';
/** Tiers by rank within the bracket: top 12% S, next 23% A, middle 30% B, next 23% C, bottom 12% D. */
const TIER_CUTS: [number, Tier][] = [[0.12, 'S'], [0.35, 'A'], [0.65, 'B'], [0.88, 'C'], [1, 'D']];
export function tierByRank(index: number, total: number): Tier {
  const q = (index + 0.5) / total;
  return TIER_CUTS.find(([cut]) => q <= cut)![1];
}

const memo = new Map<string, Promise<any>>();
function once<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (!memo.has(key)) memo.set(key, fn());
  return memo.get(key)!;
}

export const getHeroes = (locale: Locale) => once(`heroes:${locale.prefix}`, () => data.heroes(SITE.apiLang[locale.prefix]));
export const getItems = (locale: Locale) => once(`items:${locale.prefix}`, () => data.items(SITE.apiLang[locale.prefix]));
export const getHeroStats = (b: Bracket) => once(`hs:${b}`, () => data.heroStats(b));
export const getItemStats = (b: Bracket, heroId?: number) => once(`is:${b}:${heroId ?? ''}`, () => data.itemStats(b, heroId));
export const getCounters = (b: Bracket) => once(`c:${b}`, () => data.counters(b));
export const getSynergies = (b: Bracket) => once(`s:${b}`, () => data.synergies(b));
export const getPatches = () => once('patches', () => data.patches().catch(() => []));

export interface HeroRow extends HeroStat { hero: Hero; tier: Tier }
export async function heroRows(locale: Locale, bracket: Bracket): Promise<HeroRow[]> {
  const [heroes, stats] = await Promise.all([getHeroes(locale), getHeroStats(bracket)]);
  const byId = new Map(stats.map((s) => [s.heroId, s]));
  const sorted = heroes.filter((h) => byId.has(h.id)).map((h) => ({ ...byId.get(h.id)!, hero: h })).sort((a, b) => b.winRate - a.winRate);
  return sorted.map((r, i) => ({ ...r, tier: tierByRank(i, sorted.length) }));
}

export async function totalMatches(bracket: Bracket = 'all') {
  const s = await getHeroStats(bracket);
  return Math.round(s.reduce((n, r) => n + r.matches, 0) / 12);
}

export function itemMap(items: Item[]) { return new Map(items.map((i) => [i.id, i])); }

/** Everything a page needs to render the shared chrome in one locale. */
export async function ctx(langParam: string | undefined) {
  const locale = localeFromParam(SITE, langParam);
  const t = useT(locale);
  const L = (p: string) => localePath(locale, p);
  const fmtDate = new Intl.DateTimeFormat(locale.lang, { dateStyle: 'medium', timeZone: 'UTC' }).format(BUILD_DATE);
  const month = new Intl.DateTimeFormat(locale.lang, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(BUILD_DATE);
  const matches = await totalMatches();
  return {
    site: SITE, locale, t, L, month,
    nf: (n: number, d = 0) => new Intl.NumberFormat(locale.lang, { maximumFractionDigits: d, minimumFractionDigits: d }).format(n),
    pct: (x: number, d = 1) => new Intl.NumberFormat(locale.lang, { style: 'percent', maximumFractionDigits: d, minimumFractionDigits: d }).format(x),
    compact: (n: number) => compact(n, locale.lang),
    matches,
    nav: [
      { href: L('/tier-list'), label: t('nav_tier') },
      { href: L('/heroes'), label: t('nav_heroes') },
      { href: L('/items'), label: t('nav_items') },
    ],
    strings: {
      disclaimer: t('disclaimer'), about: t('about'), privacy: t('privacy'), language: t('language'),
      updated: t('updated', { count: compact(matches, locale.lang), days: WINDOW_DAYS, source: data.attribution.label, date: fmtDate }),
    },
  };
}
export type Ctx = Awaited<ReturnType<typeof ctx>>;
export { SITE };
