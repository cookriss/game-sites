export type Lang = 'en' | 'es' | 'pt';
export type L = Record<Lang, string>;

/** Pre-launch / overview page for one game. Every fact should trace to a listed source. */
export interface NavLink { path: string; label: L }

export interface GamePageContent {
  /** Game slug (theme, section nav, publisher lookup). */
  slug: string;
  /** Page path without locale prefix; defaults to '/' + slug. */
  path?: string;
  /** Short name of this page in breadcrumbs for sub-pages (e.g. "Neighbors"). */
  crumb?: L;
  name: string;
  /** ISO date of the last content review, shown on the page. */
  updated: string;
  release?: string;
  title: L;
  description: L;
  h1: L;
  lede: L;
  facts?: { label: L; value: L }[];
  sections: { id: string; h: L; html: L }[];
  faq?: { q: L; a: L }[];
  sources: { label: string; url: string }[];
}
