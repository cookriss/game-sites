import { getImage } from 'astro:assets';
import { SITE } from '../../site.config';
import { localePath, localeFromParam } from '@gamesites/core/lib/i18n';
import type { Locale } from '@gamesites/core/lib/types';
import { compact } from '@gamesites/core/lib/format';
import { useT, UI_KEYS_FOR_CLIENT } from '../i18n/ui';
import { data, BRACKET_QUERY, type Bracket, type StatQuery, type Region } from './data';
import { tierRows, makeFmt, type HeroMeta, type ItemMeta, type PageData } from './render';

export const WINDOW_DAYS = 30;
export const BUILD_DATE = new Date();

const memo = new Map<string, Promise<any>>();
function once<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (!memo.has(key)) memo.set(key, fn());
  return memo.get(key)!;
}
const qk = (q: StatQuery) => String(q.minBadge ?? 0);

export const getHeroes = (locale: Locale) => once(`heroes:${locale.prefix}`, () => data.heroes(SITE.apiLang[locale.prefix]));
export const getItems = (locale: Locale) => once(`items:${locale.prefix}`, () => data.items(SITE.apiLang[locale.prefix]));
export const getRanks = (locale: Locale) => once(`ranks:${locale.prefix}`, () => data.ranks(SITE.apiLang[locale.prefix]));
export const getHeroStats = (q: StatQuery = {}) => once(`hs:${qk(q)}`, () => data.heroStats(q));
export const getBanStats = (q: StatQuery = {}) => once(`bs:${qk(q)}`, () => data.banStats(q).catch(() => []));
export const getItemStats = (q: StatQuery = {}, heroId?: number) => once(`is:${qk(q)}:${heroId ?? ''}`, () => data.itemStats(q, heroId));
export const getCounters = (q: StatQuery = {}) => once(`c:${qk(q)}`, () => data.counters(q));
export const getSynergies = (q: StatQuery = {}) => once(`s:${qk(q)}`, () => data.synergies(q));
export const getAbilityOrders = (heroId: number, q: StatQuery = {}) => once(`ao:${qk(q)}:${heroId}`, () => data.abilityOrders(q, heroId).catch(() => []));
export const getLeaderboard = (region: Region, heroId?: number) => once(`lb:${region}:${heroId ?? ''}`, () => data.leaderboard(region, heroId));
export const getPatches = () => once('patches', () => data.patches().catch(() => []));
export { BRACKET_QUERY, type Bracket };

/** Optimized image URL (built once per source and size, shared by all locales). */
const imgCache = new Map<string, Promise<string>>();
export function img(src: string | undefined, width: number, height = width) {
  if (!src) return Promise.resolve('');
  const k = `${src}@${width}x${height}`;
  if (!imgCache.has(k)) imgCache.set(k, getImage({ src, width, height, format: 'webp', inferSize: false }).then((r) => r.src).catch(() => src));
  return imgCache.get(k)!;
}

export async function heroMeta(locale: Locale): Promise<Record<number, HeroMeta>> {
  return once(`hm:${locale.prefix}`, async () => {
    const heroes = await getHeroes(locale);
    const entries = await Promise.all(heroes.map(async (h) => [h.id, {
      id: h.id, slug: h.slug, name: h.name, nameEn: h.nameEn, color: h.color,
      img: await img(h.image, 60, 81),
      abilities: await Promise.all(h.abilities.map(async (a) => ({ id: a.id, name: a.name, img: await img(a.image, 48) }))),
    }] as const));
    return Object.fromEntries(entries);
  });
}
export async function itemMeta(locale: Locale): Promise<Record<number, ItemMeta>> {
  return once(`im:${locale.prefix}`, async () => {
    const items = await getItems(locale);
    const entries = await Promise.all(items.map(async (i) => [i.id, { id: i.id, slug: i.slug, name: i.name, slot: i.slot, tier: i.tier, cost: i.cost, img: await img(i.image, 52) }] as const));
    return Object.fromEntries(entries);
  });
}

export async function heroRowsFor(q: StatQuery, locale: Locale) {
  const [stats, bans, heroes] = await Promise.all([getHeroStats(q), getBanStats(q), getHeroes(locale)]);
  return tierRows(stats, bans, new Set(heroes.map((h) => h.id)));
}
export const heroRows = (locale: Locale, b: Bracket = 'all') => heroRowsFor(BRACKET_QUERY[b], locale);

export async function totalMatches() {
  const s = await getHeroStats({});
  return Math.round(s.reduce((n, r) => n + r.matches, 0) / 12);
}

/** Everything a page needs to render the shared chrome in one locale. */
export async function ctx(langParam: string | undefined) {
  const locale = localeFromParam(SITE, langParam);
  const t = useT(locale);
  const L = (p: string) => localePath(locale, p);
  const fmtDate = new Intl.DateTimeFormat(locale.lang, { dateStyle: 'medium', timeZone: 'UTC' }).format(BUILD_DATE);
  const month = new Intl.DateTimeFormat(locale.lang, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(BUILD_DATE);
  const matches = await totalMatches();
  const f = makeFmt(locale.lang);
  /** Data shipped to the browser for client-side re-rendering. */
  const pageData = async (withItems = false): Promise<PageData> => ({
    lang: locale.lang, prefix: locale.prefix,
    heroes: await heroMeta(locale),
    items: withItems ? await itemMeta(locale) : undefined,
    s: Object.fromEntries(UI_KEYS_FOR_CLIENT.map((k) => [k, t(k)])),
  });
  return {
    site: SITE, locale, t, L, month, f, pageData,
    nf: f.nf, pct: f.pct, compact: (n: number) => compact(n, locale.lang),
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

/** Tier rows with the full Hero object attached (for templates that need more than the meta). */
export async function heroRowsWithHero(locale: Locale, b: Bracket = 'all') {
  const [rows, heroes] = await Promise.all([heroRows(locale, b), getHeroes(locale)]);
  const byId = new Map(heroes.map((h) => [h.id, h]));
  return rows.map((r) => ({ ...r, hero: byId.get(r.heroId)! }));
}
