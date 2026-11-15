import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

/**
 * Build-time JSON fetch with an on-disk cache, a polite delay between network
 * calls and retries. Keeps builds fast locally and under public API rate limits.
 */
const CACHE_DIR = path.resolve(process.env.GS_CACHE_DIR || '.cache/api');
const TTL_MS = Number(process.env.GS_CACHE_TTL_MS || 6 * 3600 * 1000);
const DELAY_MS = Number(process.env.GS_FETCH_DELAY_MS || 350);
const inflight = new Map<string, Promise<unknown>>();
let chain: Promise<void> = Promise.resolve();

function slot(): Promise<void> {
  const p = chain.then(() => new Promise<void>((r) => setTimeout(r, DELAY_MS)));
  chain = p;
  return p;
}

export function fetchJson<T = unknown>(url: string): Promise<T> {
  if (!inflight.has(url)) inflight.set(url, load(url));
  return inflight.get(url) as Promise<T>;
}

async function load(url: string): Promise<unknown> {
  const file = path.join(CACHE_DIR, createHash('sha1').update(url).digest('hex') + '.json');
  try {
    const s = await stat(file);
    if (Date.now() - s.mtimeMs < TTL_MS) return JSON.parse(await readFile(file, 'utf8'));
  } catch {}
  let lastErr: unknown;
  for (let attempt = 0; attempt < 4; attempt++) {
    await slot();
    try {
      const res = await fetch(url, { headers: { 'user-agent': 'gamesites-build/1.0' } });
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      const data = await res.json();
      await mkdir(CACHE_DIR, { recursive: true });
      await writeFile(file, JSON.stringify(data));
      return data;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
    }
  }
  throw new Error(`fetchJson failed for ${url}: ${lastErr}`);
}
