/**
 * Normalized data model the pages use. Pages never see raw API shapes, so the
 * source behind it (community deadlock-api today, an official API tomorrow)
 * can be swapped by writing a new DataSource.
 */
export type Bracket = 'all' | 'high';
export type Slot = 'weapon' | 'vitality' | 'spirit';

export interface Hero {
  id: number;
  slug: string;          // stable, English-based, used in URLs for every language
  name: string;          // localized
  nameEn: string;        // English name, kept for search terms in every language
  role: string;          // localized one-liner
  playstyle: string;     // localized
  lore: string;          // localized
  type: string;          // e.g. 'mystic', 'marksman'
  color: string;         // hex
  image: string;         // portrait card
  icon: string;          // small icon
  abilities: Ability[];
  popularItems: { phase: 'early' | 'mid' | 'late'; itemId: number; pickRate: number; winRate: number }[];
}

export interface Ability { id: number; name: string; image?: string; description?: string }

export interface Item {
  id: number;
  slug: string;
  name: string;
  slot: Slot;
  tier: number;
  cost: number;
  image: string;
  active: boolean;
}

export interface HeroStat {
  heroId: number; matches: number; wins: number; winRate: number; pickRate: number;
  kills: number; deaths: number; assists: number; netWorth: number; damage: number;
}

export interface ItemStat { itemId: number; matches: number; winRate: number; pickRate?: number; avgBuyTimeS: number }
export interface Matchup { heroId: number; otherId: number; matches: number; winRate: number }

export interface Patch { title: string; date: string; url: string }

export interface DataSource {
  name: string;
  attribution: { label: string; url: string };
  heroes(lang: string): Promise<Hero[]>;
  items(lang: string): Promise<Item[]>;
  heroStats(bracket: Bracket): Promise<HeroStat[]>;
  itemStats(bracket: Bracket, heroId?: number): Promise<ItemStat[]>;
  counters(bracket: Bracket): Promise<Matchup[]>;
  synergies(bracket: Bracket): Promise<Matchup[]>;
  patches(): Promise<Patch[]>;
}
