/** Browser-side source used when visitors change filters. Same normalizers as the build. */
import type { LiveSource } from './model';
import { urls, norm } from './deadlock-api-core';

const cache = new Map<string, Promise<any>>();
function get(url: string) {
  if (!cache.has(url)) cache.set(url, fetch(url).then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }));
  return cache.get(url)!;
}

export const live: LiveSource = {
  heroStats: async (q) => norm.heroStats(await get(urls.heroStats(q))),
  banStats: async (q) => norm.banStats(await get(urls.banStats(q))),
  itemStats: async (q, heroId) => norm.itemStats(await get(urls.itemStats(q, heroId))),
  counters: async (q) => norm.counters(await get(urls.counters(q))),
  synergies: async (q) => norm.synergies(await get(urls.synergies(q))),
  abilityOrders: async (q, heroId) => norm.abilityOrders(await get(urls.abilityOrders(q, heroId))),
};
