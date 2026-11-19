/**
 * Writes the brand files to public/: favicon, NerdSaloon logo (wordmark as outlined paths, so it
 * renders the same everywhere) and one icon per game. Run: node scripts/brand-assets.mjs
 * Needs opentype.js (npm i --no-save opentype.js) only to outline the wordmark.
 */
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import { MARK, GAME_ICONS } from '../src/brand.ts';
const out = { MARK, GAME_ICONS };
const pub = new URL('../public/', import.meta.url);
mkdirSync(new URL('brand/games/', pub), { recursive: true });
writeFileSync(new URL('favicon.svg', pub), out.MARK);
writeFileSync(new URL('brand/mark.svg', pub), out.MARK);
for (const [slug, svg] of Object.entries(out.GAME_ICONS)) writeFileSync(new URL(`brand/games/${slug}.svg`, pub), svg);

const opentype = require('opentype.js');
const font = opentype.parse(readFileSync(require.resolve('@fontsource/alfa-slab-one/files/alfa-slab-one-latin-400-normal.woff')));
const size = 44, base = 46;
const p1 = font.getPath('Nerd', 0, base, size);
const w1 = font.getAdvanceWidth('Nerd', size);
const p2 = font.getPath('Saloon', w1 + 1, base, size);
const w = Math.ceil(w1 + 1 + font.getAdvanceWidth('Saloon', size));
const inner = out.MARK.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
const logo = (fg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${64 + 16 + w} 64">`
  + `<g>${inner}</g><g transform="translate(80 0)"><path d="${p1.toPathData(2)}" fill="${fg}"/><path d="${p2.toPathData(2)}" fill="#f4b942"/></g></svg>`;
writeFileSync(new URL('brand/nerdsaloon-logo.svg', pub), logo('#22172f'));
writeFileSync(new URL('brand/nerdsaloon-logo-dark.svg', pub), logo('#fff1d6'));
console.log('brand assets written, wordmark width', w);
