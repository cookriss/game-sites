/**
 * Hub brand and game icons. All original SVG drawn for this site: no official logos or game art.
 * The same strings are written to public/brand/ by scripts/brand-assets.mjs (favicon, logo files).
 */

/** Hub mark: saloon swing doors under a pair of nerd glasses. Works from 16px up. */
export const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">`
  + `<rect width="64" height="64" rx="15" fill="#22172f"/>`
  + `<g fill="none" stroke="#fff1d6" stroke-width="3.6"><rect x="10" y="9" width="18" height="13" rx="5"/><rect x="36" y="9" width="18" height="13" rx="5"/><path d="M28 14q4-3.5 8 0"/></g>`
  + `<path d="M7 28v28M57 28v28" stroke="#8a5a2b" stroke-width="3" stroke-linecap="round"/>`
  + `<path d="M10 30q11-7 20 2v19H10z" fill="#f4b942"/><path d="M54 30q-11-7-20 2v19h20z" fill="#f4b942"/>`
  + `<path d="M15 34v13M20 32v15M25 33v14M39 33v14M44 32v15M49 34v13" stroke="#c98a1e" stroke-width="2.2" stroke-linecap="round"/>`
  + `</svg>`;

/** Rounded-square icon per game, used on the hub cards, the release calendar and as each section's favicon. */
export const GAME_ICONS: Record<string, string> = {
  'petit-planet': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="ppbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9d8ff"/><stop offset="1" stop-color="#fde3ee"/></linearGradient></defs>`
    + `<rect width="64" height="64" rx="15" fill="url(#ppbg)"/>`
    + `<circle cx="32" cy="38" r="17" fill="#9fd8b8"/><path d="M15.5 42a17 17 0 0 0 33 0c-6 4-27 4-33 0z" fill="#7cc4a0"/><circle cx="25" cy="33" r="3" fill="#fff" opacity=".55"/>`
    + `<ellipse cx="32" cy="38" rx="27" ry="5.5" fill="none" stroke="#ff8fab" stroke-width="3" transform="rotate(-12 32 38)"/>`
    + `<path d="M32 21v-8" stroke="#7a5c3e" stroke-width="2.6" stroke-linecap="round"/><path d="M32 14c-6-6-13-2-13 2 6 1 10 0 13-2zM32 13c5-7 13-5 13 0-6 2-10 1-13 0z" fill="#79c66a"/>`
    + `<path d="M52 9l1.4 4 4 1.4-4 1.4-1.4 4-1.4-4-4-1.4 4-1.4z" fill="#ffd27a"/><circle cx="11" cy="16" r="1.6" fill="#fff"/></svg>`,
  ananta: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#15122b"/>`
    + `<circle cx="45" cy="17" r="7" fill="#ffd3e8"/><circle cx="48" cy="15" r="6" fill="#15122b"/>`
    + `<path d="M8 52V30h8v22M19 52V14h10v38M32 52V24h8v28M43 52V33h6v19M52 52V27h5v25" fill="#241f45" stroke="#ff4fa3" stroke-width="2.4" stroke-linejoin="round"/>`
    + `<path d="M22 20h4M22 26h4M22 32h4M35 30h2M35 36h2" stroke="#3fe3ff" stroke-width="2" stroke-linecap="round"/>`
    + `<path d="M5 53h54" stroke="#3fe3ff" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  'silver-palace': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#262a3d"/>`
    + `<circle cx="28" cy="27" r="14" fill="#3a4060" stroke="#d9dde8" stroke-width="4"/>`
    + `<path d="M28 18v9l6 4" stroke="#e8c36a" stroke-width="2.6" stroke-linecap="round" fill="none"/><circle cx="28" cy="27" r="2" fill="#e8c36a"/>`
    + `<path d="M38 37l13 13" stroke="#d9dde8" stroke-width="6" stroke-linecap="round"/><path d="M45 44l6 6" stroke="#8a6a3a" stroke-width="6" stroke-linecap="round"/></svg>`,
  witchbrook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#3a2950"/>`
    + `<path d="M10 46q22-8 44 0q-22 7-44 0z" fill="#7b55b8"/><path d="M19 44q4-14 9-22q4-9 14-12q-6 7-6 14l4 20q-11 4-21 0z" fill="#9b72d6"/>`
    + `<path d="M19 43q11 4 21 0l-1-5q-10 3-19 0z" fill="#f2c14e"/><rect x="27" y="38.5" width="5" height="5" rx="1" fill="none" stroke="#3a2950" stroke-width="1.6"/>`
    + `<path d="M50 14l1.3 3.5 3.5 1.3-3.5 1.3-1.3 3.5-1.3-3.5-3.5-1.3 3.5-1.3z" fill="#f2c14e"/><circle cx="14" cy="18" r="1.6" fill="#fff"/><circle cx="46" cy="30" r="1.2" fill="#fff"/></svg>`,
};

/** Inline use: strip the xmlns and add a class / size. */
export const inlineSvg = (svg: string, cls: string, size?: number) =>
  svg.replace('<svg xmlns="http://www.w3.org/2000/svg"', `<svg class="${cls}" aria-hidden="true" focusable="false"${size ? ` width="${size}" height="${size}"` : ''}`);
