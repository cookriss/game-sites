/**
 * Normalized data model the pages use. Pages never see raw API shapes, so the
 * source behind it (community deadlock-api today, an official API tomorrow)
 * can be swapped by writing a new DataSource (build time) and LiveSource (browser).
 */
export type Slot = 'weapon' | 'vitality' | 'spirit';

/** Stats filter. minBadge = tier*10+subtier (e.g. 81 = Oracle 1). Undefined = all ranks. */
export interface StatQuery { minBadge?: number }
/** Named filters used for pre-rendered pages. */
export type Bracket = 'all' | 'high';
export const BRACKET_QUERY: Record<Bracket, StatQuery> = { all: {}, high: { minBadge: 81 } };

export interface Hero {
  id: number;
  slug: string;          // stable, English-based, used in URLs for every language
  name: string;          // localized
  nameEn: string;        // English name, kept for search terms in every language
  role: string;
  playstyle: string;
  lore: string;
  type: string;
  color: string;
  image: string;
  icon: string;
  abilities: Ability[];
  popularItems: { phase: 'early' | 'mid' | 'late'; itemId: number; pickRate: number; winRate: number }[];
}

export interface Ability { id: number; name: string; image?: string; description?: string }

export interface Item {
  id: number; slug: string; name: string; slot: Slot; tier: number; cost: number; image: string; active: boolean;
  description?: string;
}

export interface HeroStat {
  heroId: number; matches: number; wins: number; winRate: number; pickRate: number;
  kills: number; deaths: number; assists: number; netWorth: number; damage: number;
  damageTaken: number; objDamage: number; lastHits: number; denies: number; accuracy: number; healing?: number;
}
export interface BanStat { heroId: number; banRate: number; bans: number; matches: number }
export interface ItemStat { itemId: number; matches: number; winRate: number; avgBuyTimeS: number }
export interface Matchup { heroId: number; otherId: number; matches: number; winRate: number }
export interface AbilityOrder { order: number[]; matches: number; winRate: number }
export interface LeaderboardEntry { rank: number; name: string; accountId?: number; heroIds: number[] }
export interface Rank { tier: number; name: string; color: string; image: string }
export interface Patch { title: string; date: string; url: string }

export const REGIONS = ['Europe', 'NAmerica', 'SAmerica', 'Asia', 'Oceania'] as const;
export type Region = (typeof REGIONS)[number];

/** Build-time source: everything the static pages need. */
export interface DataSource {
  name: string;
  attribution: { label: string; url: string };
  heroes(lang: string): Promise<Hero[]>;
  items(lang: string): Promise<Item[]>;
  ranks(lang: string): Promise<Rank[]>;
  heroStats(q: StatQuery): Promise<HeroStat[]>;
  banStats(q: StatQuery): Promise<BanStat[]>;
  itemStats(q: StatQuery, heroId?: number): Promise<ItemStat[]>;
  counters(q: StatQuery): Promise<Matchup[]>;
  synergies(q: StatQuery): Promise<Matchup[]>;
  abilityOrders(q: StatQuery, heroId: number): Promise<AbilityOrder[]>;
  leaderboard(region: Region, heroId?: number): Promise<LeaderboardEntry[]>;
  patches(): Promise<Patch[]>;
}

/** Browser source: the subset pages re-query when the visitor changes filters. */
export type LiveSource = Pick<DataSource, 'heroStats' | 'banStats' | 'itemStats' | 'counters' | 'synergies' | 'abilityOrders'>;
