/** URL builders and response normalizers for deadlock-api.com. No Node APIs: shared by build and browser. */
import type { StatQuery, HeroStat, BanStat, ItemStat, Matchup, AbilityOrder, LeaderboardEntry, Region } from './model';

export const API = 'https://api.deadlock-api.com';
const WINDOW_DAYS = 30;
const since = () => Math.floor(Date.now() / 1000 / 3600) * 3600 - WINDOW_DAYS * 86400; // hour-aligned so caches match

function qs(q: StatQuery, extra: Record<string, string | number | undefined> = {}) {
  const p = new URLSearchParams({ min_unix_timestamp: String(since()) });
  if (q.minBadge) p.set('min_average_badge', String(q.minBadge));
  for (const [k, v] of Object.entries(extra)) if (v !== undefined) p.set(k, String(v));
  return p.toString();
}

export const urls = {
  heroStats: (q: StatQuery) => `${API}/v1/analytics/hero-stats?${qs(q)}`,
  banStats: (q: StatQuery) => `${API}/v1/analytics/hero-ban-stats?${qs(q)}`,
  itemStats: (q: StatQuery, heroId?: number) => `${API}/v1/analytics/item-stats?${qs(q, { hero_id: heroId, min_matches: 100 })}`,
  counters: (q: StatQuery) => `${API}/v1/analytics/hero-counter-stats?${qs(q, { min_matches: 50 })}`,
  synergies: (q: StatQuery) => `${API}/v1/analytics/hero-synergy-stats?${qs(q, { min_matches: 50 })}`,
  abilityOrders: (q: StatQuery, heroId: number) => `${API}/v1/analytics/ability-order-stats?${qs(q, { hero_id: heroId, min_matches: 100 })}`,
  leaderboard: (region: Region, heroId?: number) => `${API}/v1/leaderboard/${region}${heroId ? `/${heroId}` : ''}`,
};

const div = (a: number, b: number) => (b > 0 ? a / b : 0);

export const norm = {
  heroStats(raw: any[]): HeroStat[] {
    const totalPicks = raw.reduce((s, r) => s + r.matches, 0);
    return raw.filter((r) => r.matches > 0).map((r) => ({
      heroId: r.hero_id, matches: r.matches, wins: r.wins,
      winRate: div(r.wins, r.matches),
      pickRate: div(r.matches, totalPicks) * 12,
      kills: div(r.total_kills, r.matches), deaths: div(r.total_deaths, r.matches), assists: div(r.total_assists, r.matches),
      netWorth: div(r.total_net_worth, r.matches), damage: div(r.total_player_damage, r.matches),
      damageTaken: div(r.total_player_damage_taken, r.matches), objDamage: div(r.total_boss_damage, r.matches),
      lastHits: div(r.total_last_hits, r.matches), denies: div(r.total_denies, r.matches),
      accuracy: div(r.total_shots_hit, r.total_shots_hit + r.total_shots_missed),
    }));
  },
  banStats(raw: any[]): BanStat[] {
    return raw.map((r) => ({ heroId: r.hero_id, bans: r.bans, matches: r.matches, banRate: div(r.bans, r.matches) }));
  },
  itemStats(raw: any[]): ItemStat[] {
    return raw.map((r) => ({ itemId: r.item_id, matches: r.matches, winRate: div(r.wins, r.matches), avgBuyTimeS: r.avg_buy_time_s }));
  },
  counters(raw: any[]): Matchup[] {
    return raw.map((r) => ({ heroId: r.hero_id, otherId: r.enemy_hero_id, matches: r.matches_played, winRate: div(r.wins, r.matches_played) }));
  },
  synergies(raw: any[]): Matchup[] {
    return raw.flatMap((r) => {
      const winRate = div(r.wins, r.matches_played);
      return [
        { heroId: r.hero_id1, otherId: r.hero_id2, matches: r.matches_played, winRate },
        { heroId: r.hero_id2, otherId: r.hero_id1, matches: r.matches_played, winRate },
      ];
    });
  },
  abilityOrders(raw: any[]): AbilityOrder[] {
    return raw.map((r) => ({ order: r.abilities, matches: r.matches, winRate: div(r.wins, r.matches) })).sort((a, b) => b.matches - a.matches);
  },
  leaderboard(raw: any): LeaderboardEntry[] {
    return (raw?.entries ?? []).map((e: any) => ({
      rank: e.rank, name: e.account_name,
      accountId: e.possible_account_ids?.length === 1 ? e.possible_account_ids[0] : undefined,
      heroIds: e.top_hero_ids ?? [],
    }));
  },
};
