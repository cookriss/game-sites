import { fetchJson } from '@gamesites/core/lib/fetch-cache';
import { slugify } from '@gamesites/core/lib/format';
import type { DataSource, Hero, Item, HeroStat, ItemStat, Matchup, Patch, Bracket, Slot } from './model';

const API = process.env.DEADLOCK_API_URL || 'https://api.deadlock-api.com';
const DAY = 86400;
/** Stats window. Matches the API default (30 days) but pinned so caches line up. */
const WINDOW_DAYS = Number(process.env.STATS_WINDOW_DAYS || 30);
/** 'high' = Oracle (tier 8) and above. Badge = tier*10 + subtier. */
const HIGH_BADGE = 81;

const since = () => Math.floor(Date.now() / 1000 / 3600) * 3600 - WINDOW_DAYS * DAY; // hour-aligned
function q(bracket: Bracket, extra: Record<string, string | number> = {}) {
  const p = new URLSearchParams({ min_unix_timestamp: String(since()), ...Object.fromEntries(Object.entries(extra).map(([k, v]) => [k, String(v)])) });
  if (bracket === 'high') p.set('min_average_badge', String(HIGH_BADGE));
  return p.toString();
}

const strip = (s?: string) => (s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

let itemsByClass: Map<string, any> | null = null;
async function rawItems(lang: string): Promise<any[]> {
  return fetchJson<any[]>(`${API}/v1/assets/items?language=${lang}`);
}

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
      }));
  },

  async heroStats(bracket) {
    const raw = await fetchJson<any[]>(`${API}/v1/analytics/hero-stats?${q(bracket)}`);
    const totalPicks = raw.reduce((s, r) => s + r.matches, 0);
    return raw.map((r): HeroStat => ({
      heroId: r.hero_id, matches: r.matches, wins: r.wins,
      winRate: r.wins / Math.max(1, r.matches),
      pickRate: (r.matches / Math.max(1, totalPicks)) * 12, // 12 players per match
      kills: r.total_kills / r.matches, deaths: r.total_deaths / r.matches, assists: r.total_assists / r.matches,
      netWorth: r.total_net_worth / r.matches, damage: r.total_player_damage / r.matches,
    }));
  },

  async itemStats(bracket, heroId) {
    const extra: Record<string, number> = { min_matches: 100 };
    if (heroId) extra.hero_id = heroId;
    const raw = await fetchJson<any[]>(`${API}/v1/analytics/item-stats?${q(bracket, extra)}`);
    return raw.map((r): ItemStat => ({ itemId: r.item_id, matches: r.matches, winRate: r.wins / Math.max(1, r.matches), avgBuyTimeS: r.avg_buy_time_s }));
  },

  async counters(bracket) {
    const raw = await fetchJson<any[]>(`${API}/v1/analytics/hero-counter-stats?${q(bracket, { min_matches: 100 })}`);
    return raw.map((r): Matchup => ({ heroId: r.hero_id, otherId: r.enemy_hero_id, matches: r.matches_played, winRate: r.wins / Math.max(1, r.matches_played) }));
  },

  async synergies(bracket) {
    const raw = await fetchJson<any[]>(`${API}/v1/analytics/hero-synergy-stats?${q(bracket, { min_matches: 100 })}`);
    return raw.flatMap((r): Matchup[] => {
      const wr = r.wins / Math.max(1, r.matches_played);
      return [
        { heroId: r.hero_id1, otherId: r.hero_id2, matches: r.matches_played, winRate: wr },
        { heroId: r.hero_id2, otherId: r.hero_id1, matches: r.matches_played, winRate: wr },
      ];
    });
  },

  async patches() {
    const raw = await fetchJson<any[]>(`${API}/v2/patches`);
    return raw.slice(0, 10).map((p): Patch => ({ title: p.title, date: p.pub_date, url: p.link }));
  },
};
