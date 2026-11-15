/**
 * Player search and profiles. Runs in the browser only: player data is per-visitor
 * and changes every match, so it is fetched live from the data API.
 */
import { API } from './data/deadlock-api-core';
import { heroChip, makeFmt, type PageData } from './render';

export interface RankMeta { name: string; color: string; img: string }
export interface PlayerPageData extends PageData { ranks: Record<number, RankMeta> }

export interface SteamProfile { accountId: number; name: string; avatar: string; profileUrl: string }
export interface PlayerMatch { matchId: number; heroId: number; start: number; duration: number; win: boolean; k: number; d: number; a: number; souls: number; lastHits: number }
export interface PlayerHero { heroId: number; matches: number; wins: number; k: number; d: number; a: number; soulsPerMin: number; lastPlayed: number }
export interface PlayerRank { tier: number; subtier: number }

const STEAM64_BASE = 76561197960265728n;
const get = async (url: string) => { const r = await fetch(url); if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); };
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** Turns a Steam32/Steam64 id or a /profiles/ URL into an account id. Vanity URLs return null. */
export function parseAccountId(input: string): number | null {
  const s = input.trim();
  const m = s.match(/steamcommunity\.com\/profiles\/(\d{17})/) ?? s.match(/^(\d{17})$/);
  if (m) return Number(BigInt(m[1]) - STEAM64_BASE);
  if (/^\d{1,10}$/.test(s)) return Number(s);
  return null;
}
/** Vanity profile URLs (/id/name) are searched by their name part. */
export const searchTerm = (input: string) => input.trim().match(/steamcommunity\.com\/id\/([^/?#]+)/)?.[1] ?? input.trim();

const profile = (p: any): SteamProfile => ({ accountId: p.account_id, name: p.personaname, avatar: p.avatarmedium || p.avatar, profileUrl: p.profileurl });

export const players = {
  search: async (q: string): Promise<SteamProfile[]> => (await get(`${API}/v1/players/steam-search?search_query=${encodeURIComponent(q)}`)).map(profile),
  steam: async (id: number): Promise<SteamProfile | null> => { const r = await get(`${API}/v1/players/steam?account_ids=${id}`); return r[0] ? profile(r[0]) : null; },
  rank: async (id: number): Promise<PlayerRank | null> => {
    const r = await get(`${API}/v1/players/${id}/rank`).catch(() => null);
    return r && r.rank ? { tier: r.rank, subtier: r.subrank } : null;
  },
  matches: async (id: number): Promise<PlayerMatch[]> => (await get(`${API}/v1/players/${id}/match-history`)).map((m: any) => ({
    matchId: m.match_id, heroId: m.hero_id, start: m.start_time, duration: m.match_duration_s, win: m.match_result === m.player_team,
    k: m.player_kills, d: m.player_deaths, a: m.player_assists, souls: m.net_worth, lastHits: m.last_hits,
  })),
  heroes: async (id: number): Promise<PlayerHero[]> => (await get(`${API}/v1/players/hero-stats?account_ids=${id}`)).map((h: any) => ({
    heroId: h.hero_id, matches: h.matches_played, wins: h.wins, k: h.kills, d: h.deaths, a: h.assists, soulsPerMin: h.networth_per_min, lastPlayed: h.last_played,
  })),
};

export const playerHref = (d: PageData, id: number) => `${d.prefix ? `/${d.prefix}` : ''}/player?id=${id}`;
const kda = (k: number, d: number, a: number) => (k + a) / Math.max(1, d);

export function searchResults(list: SteamProfile[], d: PageData) {
  if (!list.length) return `<p class="muted">${d.s.no_results}</p>`;
  return `<ul class="player-list">${list.slice(0, 30).map((p) => `<li><a href="${playerHref(d, p.accountId)}"><img src="${esc(p.avatar)}" alt="" width="40" height="40" loading="lazy"><span>${esc(p.name)}<small>ID ${p.accountId}</small></span></a></li>`).join('')}</ul>`;
}

export function rankBadge(r: PlayerRank | null, d: PlayerPageData) {
  const m = r && d.ranks[r.tier];
  if (!m) return `<span class="muted">${d.s.unranked}</span>`;
  return `<span class="player-rank"><img src="${m.img}" alt="" width="36" height="36"><b style="color:${m.color}">${esc(m.name)} ${r!.subtier}</b></span>`;
}

export function summaryCards(ms: PlayerMatch[], d: PageData) {
  const f = makeFmt(d.lang);
  if (!ms.length) return '';
  const recent = ms.slice(0, 50);
  const wins = recent.filter((m) => m.win).length;
  const t = recent.reduce((s, m) => ({ k: s.k + m.k, d: s.d + m.d, a: s.a + m.a }), { k: 0, d: 0, a: 0 });
  const counts = new Map<number, number>(); recent.forEach((m) => counts.set(m.heroId, (counts.get(m.heroId) ?? 0) + 1));
  const main = [...counts].sort((a, b) => b[1] - a[1])[0]?.[0];
  const card = (label: string, val: string) => `<div class="card stat"><small>${label}</small><b>${val}</b></div>`;
  return `<p class="muted small">${d.s.last_n.replace('{n}', String(recent.length))}</p><div class="stat-grid">${[
    card(d.s.sum_matches, f.nf(ms.length)),
    card(d.s.sum_wr, `<span class="${wins / recent.length >= 0.5 ? 'good' : 'bad'}">${f.pct(wins / recent.length)}</span>`),
    card(d.s.sum_kda, `${f.nf(kda(t.k, t.d, t.a), 2)} <span class="muted small">${f.nf(t.k / recent.length, 1)} / ${f.nf(t.d / recent.length, 1)} / ${f.nf(t.a / recent.length, 1)}</span>`),
    main !== undefined ? card(d.s.sum_hero, heroChip(d, main, 24)) : '',
  ].join('')}</div>`;
}

export function heroesTable(hs: PlayerHero[], d: PageData, limit = 10) {
  const f = makeFmt(d.lang);
  const rows = hs.filter((h) => d.heroes[h.heroId] && h.matches > 0).sort((a, b) => b.matches - a.matches).slice(0, limit);
  if (!rows.length) return `<p class="muted">${d.s.no_data}</p>`;
  return `<div class="table-wrap"><table><thead><tr><th style="text-align:left">${d.s.col_hero}</th><th>${d.s.col_matches}</th><th>${d.s.col_wr}</th><th>${d.s.col_kda}</th><th class="hide-sm">${d.s.col_souls}/min</th></tr></thead><tbody>${rows.map((h) => {
    const wr = h.wins / h.matches;
    return `<tr><td style="text-align:left">${heroChip(d, h.heroId, 28)}</td><td>${f.nf(h.matches)}</td><td class="${wr >= 0.5 ? 'good' : 'bad'}">${f.pct(wr)}</td><td>${f.nf(kda(h.k, h.d, h.a), 2)}</td><td class="hide-sm">${f.nf(h.soulsPerMin)}</td></tr>`;
  }).join('')}</tbody></table></div>`;
}

export function matchesTable(ms: PlayerMatch[], d: PageData, limit = 20) {
  const f = makeFmt(d.lang);
  if (!ms.length) return `<p class="muted">${d.s.no_data}</p>`;
  const rtf = new Intl.RelativeTimeFormat(d.lang, { numeric: 'auto' });
  const ago = (t: number) => {
    const s = t - Date.now() / 1000;
    for (const [u, n] of [['day', 86400], ['hour', 3600], ['minute', 60]] as const) if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), u);
    return rtf.format(0, 'minute');
  };
  return `<div class="table-wrap"><table class="matches"><thead><tr><th style="text-align:left">${d.s.col_hero}</th><th>${d.s.col_result}</th><th>K / D / A</th><th class="hide-sm">${d.s.col_souls}</th><th class="hide-sm">${d.s.col_duration}</th><th>${d.s.col_when}</th></tr></thead><tbody>${ms.slice(0, limit).map((m) =>
    `<tr class="${m.win ? 'm-win' : 'm-loss'}"><td style="text-align:left">${heroChip(d, m.heroId, 26)}</td><td class="${m.win ? 'good' : 'bad'}"><b>${m.win ? d.s.win : d.s.loss}</b></td><td>${m.k} / ${m.d} / ${m.a}</td><td class="hide-sm">${f.compact(m.souls)}</td><td class="hide-sm">${f.mmss(m.duration)}</td><td class="muted small">${ago(m.start)}</td></tr>`).join('')}</tbody></table></div>`;
}
