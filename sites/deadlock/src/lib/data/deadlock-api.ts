import { fetchJson } from '@gamesites/core/lib/fetch-cache';
import { slugify } from '@gamesites/core/lib/format';
import type { DataSource, Hero, Item, Rank, Patch, Slot } from './model';
import { API, urls, norm } from './deadlock-api-core';

const strip = (s?: string) => (s ?? '').replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
/** Tooltip stats of an item, formatted like the game shows them. */
function itemStatsOf(i: any): Item['stats'] {
  const out: NonNullable<Item['stats']> = []; const seen = new Set<string>();
  for (const sec of i.tooltip_sections ?? []) {
    const kind = sec.section_type === 'active' ? 'active' : sec.section_type === 'passive' ? 'passive' : 'innate';
    for (const a of sec.section_attributes ?? []) {
      for (const key of [...(a.elevated_properties ?? []), ...(a.properties ?? [])]) {
        const p = i.properties?.[key]; if (!p || seen.has(key) || !p.label) continue;
        const n = Number(p.value); if (!Number.isFinite(n) || n === 0) continue;
        seen.add(key);
        const sign = (p.prefix === '{s:sign}' || p.prefix === '+') && n > 0 ? '+' : '';
        out.push({ label: strip(p.label), value: `${sign}${Number(n.toFixed(2))}${(p.postfix ?? '').replace(/\{[^}]*\}/g, '')}`, kind });
      }
    }
  }
  return out;
}
const rawItems = (lang: string) => fetchJson<any[]>(`${API}/v1/assets/items?language=${lang}`);

export const deadlockApi: DataSource = {
  name: 'deadlock-api',
  attribution: { label: 'deadlock-api.com', url: 'https://deadlock-api.com' },

  async heroes(lang) {
    const [raw, english, items] = await Promise.all([
      fetchJson<any[]>(`${API}/v1/assets/heroes?language=${lang}`),
      fetchJson<any[]>(`${API}/v1/assets/heroes?language=english`),
      rawItems(lang),
    ]);
    const enName = new Map(english.map((h) => [h.id, h.name]));
    const byClass = new Map(items.map((i) => [i.class_name, i]));
    return raw
      .filter((h) => h.player_selectable && !h.disabled && !h.in_development && !h.prerelease_only)
      .map((h): Hero => ({
        id: h.id,
        slug: slugify(enName.get(h.id) ?? h.name),
        name: h.name,
        nameEn: enName.get(h.id) ?? h.name,
        role: strip(h.description?.role),
        playstyle: strip(h.description?.playstyle),
        lore: strip(h.description?.lore),
        type: h.hero_type ?? '',
        color: h.colors?.style_hex ?? '#888',
        image: h.images?.icon_hero_card_webp ?? h.images?.icon_hero_card,
        icon: h.images?.icon_image_small_webp ?? h.images?.icon_image_small,
        abilities: ['signature1', 'signature2', 'signature3', 'signature4']
          .map((k) => byClass.get(h.items?.[k]))
          .filter(Boolean)
          .map((a: any) => ({ id: a.id, name: a.name, image: a.image_webp ?? a.image, description: strip(a.description?.desc) })),
        popularItems: (['early', 'mid', 'late'] as const).flatMap((phase) =>
          (h.popular_items?.[`${phase}_game`] ?? []).map((p: any) => ({ phase, itemId: p.item_id, pickRate: p.pick_pct / 100, winRate: p.winrate_pct / 100 })),
        ),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  },

  async items(lang) {
    const [raw, english] = await Promise.all([rawItems(lang), rawItems('english')]);
    const enName = new Map(english.map((i) => [i.id, i.name]));
    const byClass = new Map(raw.map((i) => [i.class_name, { id: Number(i.id) }]));
    return raw
      .filter((i) => i.type === 'upgrade' && i.shopable && !i.disabled)
      .map((i): Item => ({
        id: Number(i.id),
        slug: slugify(enName.get(i.id) ?? i.name),
        name: i.name,
        slot: i.item_slot_type as Slot,
        tier: Number(i.item_tier),
        cost: Number(i.cost),
        image: i.shop_image_webp ?? i.shop_image ?? i.image_webp ?? i.image,
        active: Boolean(i.is_active_item),
        description: strip(i.description?.desc),
        stats: itemStatsOf(i),
        components: (i.component_items ?? []).map((c: string) => byClass.get(c)?.id).filter((x: unknown): x is number => typeof x === 'number'),
      }));
  },

  async ranks(lang) {
    const raw = await fetchJson<any[]>(`${API}/v1/assets/ranks?language=${lang}`);
    return raw.map((r): Rank => ({ tier: r.tier, name: String(r.name).replace(/\u2060/g, '').replace(/\/(a|e|in|ин)$/i, '').trim(), color: r.color, image: r.images?.large_webp ?? r.images?.large }));
  },

  heroStats: async (q) => norm.heroStats(await fetchJson(urls.heroStats(q))),
  banStats: async (q) => norm.banStats(await fetchJson(urls.banStats(q))),
  itemStats: async (q, heroId) => norm.itemStats(await fetchJson(urls.itemStats(q, heroId))),
  counters: async (q) => norm.counters(await fetchJson(urls.counters(q))),
  synergies: async (q) => norm.synergies(await fetchJson(urls.synergies(q))),
  abilityOrders: async (q, heroId) => norm.abilityOrders(await fetchJson(urls.abilityOrders(q, heroId))),
  leaderboard: async (region, heroId) => norm.leaderboard(await fetchJson(urls.leaderboard(region, heroId)).catch(() => ({ entries: [] }))),

  async patches() {
    const raw = await fetchJson<any[]>(`${API}/v2/patches`);
    return raw.slice(0, 20).map((p): Patch => ({ title: p.title, date: p.pub_date, url: p.link }));
  },
};
