/**
 * Pure HTML-string renderers shared by the static build and the browser
 * (when a visitor changes the rank filter). No Astro or Node imports here.
 */
import type { HeroStat, BanStat, ItemStat, Matchup, AbilityOrder } from './data/model';

export type Tier = 'S' | 'A' | 'B' | 'C' | 'D';
const TIER_CUTS: [number, Tier][] = [[0.12, 'S'], [0.35, 'A'], [0.65, 'B'], [0.88, 'C'], [1, 'D']];
export const tierByRank = (i: number, n: number): Tier => TIER_CUTS.find(([c]) => (i + 0.5) / n <= c)![1];

export interface HeroMeta { id: number; slug: string; name: string; nameEn: string; color: string; img: string; abilities: { id: number; name: string; img?: string }[] }
export interface ItemMeta { id: number; slug: string; name: string; slot: string; tier: number; cost: number; img: string }
export interface PageData {
  lang: string;
  prefix: string; // '' or 'es'
  heroes: Record<number, HeroMeta>;
  items?: Record<number, ItemMeta>;
  s: Record<string, string>;
}

export function makeFmt(lang: string) {
  const nf = (n: number, d = 0) => new Intl.NumberFormat(lang, { maximumFractionDigits: d, minimumFractionDigits: d }).format(n);
  const pct = (x: number, d = 1) => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: d, minimumFractionDigits: d }).format(x);
  const compact = (n: number) => new Intl.NumberFormat(lang, { notation: 'compact', maximumFractionDigits: 1 }).format(n);
  const delta = (x: number, d = 1) => `${x > 0 ? '+' : x < 0 ? '−' : '±'}${nf(Math.abs(x * 100), d)}`;
  const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
  return { nf, pct, compact, delta, mmss };
}
export type Fmt = ReturnType<typeof makeFmt>;

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const cls = (x: number) => (x > 0.0005 ? 'good' : x < -0.0005 ? 'bad' : '');
export const heroHref = (d: PageData, slug: string) => `${d.prefix ? `/${d.prefix}` : ''}/heroes/${slug}`;

export const heroChip = (d: PageData, id: number, size = 28, link = true) => {
  const h = d.heroes[id];
  if (!h) return '';
  const inner = `<img src="${h.img}" alt="" width="${size}" height="${Math.round(size * 1.35)}" loading="lazy" class="hero-img" style="background:${h.color}55"><span>${esc(h.name)}</span>`;
  return link ? `<a class="hero-chip" href="${heroHref(d, h.slug)}">${inner}</a>` : `<span class="hero-chip">${inner}</span>`;
};
export const itemHref = (d: PageData, slug: string) => `${d.prefix ? `/${d.prefix}` : ''}/items/${slug}`;
export const itemChip = (d: PageData, id: number, size = 26, link = true) => {
  const it = d.items?.[id];
  if (!it) return '';
  const inner = `<span class="item-box"><img src="${it.img}" alt="" width="${size}" height="${size}" loading="lazy"></span><span>${esc(it.name)}</span>`;
  return link ? `<a class="item-chip slot-${it.slot}" href="${itemHref(d, it.slug)}">${inner}</a>` : `<span class="item-chip slot-${it.slot}">${inner}</span>`;
};

/** Heroes ranked by how much better they do with an item than without it. */
export interface ItemHeroRow { heroId: number; matches: number; winRate: number; heroWr: number }
export function itemHeroTable(rows: ItemHeroRow[], d: PageData, f: Fmt) {
  if (!rows.length) return `<p class="muted">${d.s.no_data}</p>`;
  return `<div class="table-wrap"><table><thead><tr><th style="text-align:left">${d.s.col_hero}</th><th>${d.s.col_hero_wr}</th><th>Δ</th><th class="hide-sm">${d.s.col_matches}</th></tr></thead><tbody>${rows.map((r) =>
    `<tr><td style="text-align:left">${heroChip(d, r.heroId, 26)}</td><td class="${cls(r.winRate - 0.5)}"><b>${f.pct(r.winRate)}</b></td><td class="small ${cls(r.winRate - r.heroWr)}">${f.delta(r.winRate - r.heroWr)}</td><td class="hide-sm">${f.compact(r.matches)}</td></tr>`).join('')}</tbody></table></div>`;
}

// ---------- tier list ----------
export interface TierRow extends HeroStat { tier: Tier; banRate?: number; rank: number }
export function tierRows(stats: HeroStat[], bans: BanStat[], known: Set<number>): TierRow[] {
  const ban = new Map(bans.map((b) => [b.heroId, b.banRate]));
  const rows = stats.filter((s) => known.has(s.heroId)).sort((a, b) => b.winRate - a.winRate);
  return rows.map((r, i) => ({ ...r, tier: tierByRank(i, rows.length), banRate: ban.get(r.heroId), rank: i + 1 }));
}

export type TierSortKey = 'rank' | 'name' | 'winRate' | 'pickRate' | 'banRate' | 'kda' | 'netWorth' | 'matches';
export function sortTierRows(rows: TierRow[], key: TierSortKey, dir: 1 | -1, d: PageData) {
  const v = (r: TierRow): number | string =>
    key === 'name' ? d.heroes[r.heroId]?.name ?? '' : key === 'kda' ? (r.kills + r.assists) / Math.max(1, r.deaths) : key === 'rank' ? -r.rank : ((r as any)[key] ?? -1);
  // dir 1 = descending (best first), -1 = ascending
  return [...rows].sort((a, b) => { const x = v(a), y = v(b); return (typeof x === 'string' ? (y as string).localeCompare(x) : (y as number) - (x as number)) * dir; });
}

export function tierTbody(rows: TierRow[], d: PageData, f: Fmt) {
  return rows.map((r) => `<tr>
<td class="num muted">${r.rank}</td>
<td>${heroChip(d, r.heroId, 30)}</td>
<td><span class="tier tier-${r.tier}">${r.tier}</span></td>
<td class="${cls(r.winRate - 0.5)}"><b>${f.pct(r.winRate, 2)}</b></td>
<td class="${cls(r.winRate - 0.5)} small">${f.delta(r.winRate - 0.5, 2)}</td>
<td>${f.pct(r.pickRate)}</td>
<td class="hide-sm">${r.banRate !== undefined ? f.pct(r.banRate) : '—'}</td>
<td class="hide-sm">${f.nf((r.kills + r.assists) / Math.max(1, r.deaths), 2)}</td>
<td class="hide-sm">${f.compact(r.netWorth)}</td>
<td class="hide-sm">${f.compact(r.matches)}</td>
</tr>`).join('');
}

// ---------- hero page ----------
export function heroHeaderStats(row: TierRow | undefined, total: number, d: PageData, f: Fmt) {
  if (!row) return `<p class="muted">${d.s.no_data}</p>`;
  const box = (v: string, label: string, c = '') => `<div><b class="${c}">${v}</b><small>${label}</small></div>`;
  return [
    `<div><span class="tier tier-${row.tier}">${row.tier}</span><small>${d.s.col_tier} · #${row.rank}/${total}</small></div>`,
    box(f.pct(row.winRate, 2), `${d.s.col_wr} (${f.delta(row.winRate - 0.5)})`, cls(row.winRate - 0.5)),
    box(f.pct(row.pickRate), d.s.col_pr),
    box(row.banRate !== undefined ? f.pct(row.banRate) : '—', d.s.col_br),
    box(f.compact(row.matches), d.s.col_matches),
  ].join('');
}

export function itemTable(stats: ItemStat[], heroMatches: number, heroWr: number, d: PageData, f: Fmt, limit = 15) {
  const minM = Math.max(200, heroMatches * 0.01);
  const rows = stats.filter((s) => d.items?.[s.itemId] && s.matches >= minM).sort((a, b) => b.winRate - a.winRate).slice(0, limit);
  if (!rows.length) return `<p class="muted">${d.s.no_data}</p>`;
  return `<div class="table-wrap"><table class="sortable"><thead><tr><th>${d.s.col_item}</th><th>${d.s.col_wr}</th><th>Δ</th><th>${d.s.col_pr}</th><th class="hide-sm">${d.s.col_buy}</th><th class="hide-sm">${d.s.col_matches}</th></tr></thead><tbody>${rows
    .map((s) => `<tr><td>${itemChip(d, s.itemId)}</td><td class="${cls(s.winRate - heroWr)}"><b>${f.pct(s.winRate)}</b></td><td class="small ${cls(s.winRate - heroWr)}">${f.delta(s.winRate - heroWr)}</td><td>${f.pct(s.matches / Math.max(1, heroMatches), 0)}</td><td class="hide-sm">${f.mmss(s.avgBuyTimeS)}</td><td class="hide-sm">${f.compact(s.matches)}</td></tr>`)
    .join('')}</tbody></table></div>`;
}

export function matchupTable(list: Matchup[], heroWr: number, d: PageData, f: Fmt) {
  if (!list.length) return `<p class="muted">${d.s.no_data}</p>`;
  return `<div class="table-wrap"><table><thead><tr><th>${d.s.col_hero}</th><th>${d.s.col_wr}</th><th>Δ</th><th>${d.s.col_matches}</th></tr></thead><tbody>${list
    .map((m) => `<tr><td>${heroChip(d, m.otherId, 26)}</td><td class="${cls(m.winRate - 0.5)}"><b>${f.pct(m.winRate)}</b></td><td class="small ${cls(m.winRate - heroWr)}">${f.delta(m.winRate - heroWr)}</td><td>${f.compact(m.matches)}</td></tr>`)
    .join('')}</tbody></table></div>`;
}

export function pickMatchups(all: Matchup[], heroId: number, known: Set<number>, heroMatches: number) {
  const minM = Math.max(100, heroMatches * 0.004);
  const mine = all.filter((m) => m.heroId === heroId && m.matches >= minM && known.has(m.otherId));
  return {
    strong: [...mine].sort((a, b) => b.winRate - a.winRate).slice(0, 8),
    weak: [...mine].sort((a, b) => a.winRate - b.winRate).slice(0, 8),
  };
}

export function abilityOrderBlock(orders: AbilityOrder[], heroId: number, d: PageData, f: Fmt) {
  const h = d.heroes[heroId];
  if (!orders.length || !h) return `<p class="muted">${d.s.no_data}</p>`;
  const total = orders.reduce((s, o) => s + o.matches, 0);
  const common = orders[0];
  const best = [...orders].filter((o) => o.matches >= Math.max(200, total * 0.03)).sort((a, b) => b.winRate - a.winRate)[0] ?? common;
  const grid = (o: AbilityOrder, title: string) => {
    const steps = o.order.length;
    const rows = h.abilities.map((a, ai) => {
      const cells = o.order.map((id, si) => {
        if (id !== a.id) return '<td></td>';
        const nth = o.order.slice(0, si + 1).filter((x) => x === id).length;
        return `<td><span class="ao-cell ao-${ai}">${nth === 1 ? '●' : nth - 1}</span></td>`;
      }).join('');
      return `<tr><th class="ao-name">${a.img ? `<img src="${a.img}" alt="" width="24" height="24" loading="lazy">` : ''}<span>${esc(a.name)}</span></th>${cells}</tr>`;
    }).join('');
    return `<div class="ao"><div class="ao-head"><b>${title}</b><span class="muted small">${f.pct(o.winRate)} ${d.s.col_wr.toLowerCase()} · ${f.compact(o.matches)} ${d.s.col_matches.toLowerCase()} · ${f.pct(o.matches / total, 0)} ${d.s.pick}</span></div>
<div class="table-wrap"><table class="ao-table"><thead><tr><th></th>${Array.from({ length: steps }, (_, i) => `<th>${i + 1}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div></div>`;
  };
  return grid(common, d.s.ao_common) + (best !== common ? grid(best, d.s.ao_best) : '');
}

export const STAT_KEYS = [
  ['kills', 'st_kills', 1], ['deaths', 'st_deaths', -1], ['assists', 'st_assists', 1], ['netWorth', 'st_networth', 1],
  ['damage', 'st_damage', 1], ['damageTaken', 'st_taken', -1], ['objDamage', 'st_obj', 1], ['lastHits', 'st_lasthits', 1],
  ['denies', 'st_denies', 1], ['accuracy', 'st_accuracy', 1],
] as const;

export function statRanks(all: HeroStat[], heroId: number, known: Set<number>, d: PageData, f: Fmt) {
  const pool = all.filter((s) => known.has(s.heroId));
  const me = pool.find((s) => s.heroId === heroId);
  if (!me) return `<p class="muted">${d.s.no_data}</p>`;
  const avg = (k: string) => pool.reduce((s, r) => s + (r as any)[k], 0) / pool.length;
  return `<div class="stat-grid">${STAT_KEYS.map(([k, label, dir]) => {
    const sorted = [...pool].sort((a, b) => ((b as any)[k] - (a as any)[k]) * dir);
    const rank = sorted.findIndex((s) => s.heroId === heroId) + 1;
    const v = (me as any)[k] as number;
    const a = avg(k);
    const val = k === 'accuracy' ? f.pct(v) : v >= 1000 ? f.compact(v) : f.nf(v, 1);
    const good = rank <= pool.length / 3 ? 'good' : rank > (pool.length * 2) / 3 ? 'bad' : '';
    return `<div class="card stat"><small>${d.s[label]}</small><b>${val}</b><span class="small muted">avg ${k === 'accuracy' ? f.pct(a) : a >= 1000 ? f.compact(a) : f.nf(a, 1)}</span><span class="rank ${good}">#${rank}<span class="muted">/${pool.length}</span></span></div>`;
  }).join('')}</div>`;
}
