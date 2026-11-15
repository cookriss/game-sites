/**
 * Original placeholder art for the Petit Planet section (no official assets).
 * Avatars are simple drawn animal faces; replace with a real image by setting `image` on a Neighbor.
 */

const PALETTE = ['#ffc6d6', '#c9d8ff', '#cdeccf', '#ffe3a8', '#e3d4ff', '#bfe9f0', '#ffd3b8'];
const hash = (s: string) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);

export type Species = 'dog' | 'red-panda' | 'sheep' | 'caracal';

const eyes = (y = 52) => `<circle cx="40" cy="${y}" r="4" fill="#3b3561"/><circle cx="60" cy="${y}" r="4" fill="#3b3561"/><circle cx="41.3" cy="${y - 1.3}" r="1.3" fill="#fff"/><circle cx="61.3" cy="${y - 1.3}" r="1.3" fill="#fff"/>`;
const blush = (y = 60) => `<ellipse cx="33" cy="${y}" rx="5" ry="3" fill="#ff8fab" opacity=".45"/><ellipse cx="67" cy="${y}" rx="5" ry="3" fill="#ff8fab" opacity=".45"/>`;
const smile = (y = 62) => `<path d="M46 ${y}q4 4 8 0" fill="none" stroke="#3b3561" stroke-width="2" stroke-linecap="round"/>`;

function face(species: Species): string {
  switch (species) {
    case 'dog':
      return `<ellipse cx="22" cy="52" rx="11" ry="22" fill="#b98c5e" transform="rotate(14 22 52)"/><ellipse cx="78" cy="52" rx="11" ry="22" fill="#b98c5e" transform="rotate(-14 78 52)"/>`
        + `<circle cx="50" cy="52" r="27" fill="#ecd6b6"/><path d="M28 40q22-22 44 0q-6-14-22-14t-22 14z" fill="#d9b88f"/>`
        + `<ellipse cx="50" cy="63" rx="11" ry="8" fill="#fff6e8"/><ellipse cx="50" cy="59" rx="4" ry="3" fill="#3b3561"/>` + eyes(50) + blush(60) + smile(64);
    case 'red-panda':
      return `<path d="M20 34l6-16 14 12z" fill="#c4562f"/><path d="M80 34l-6-16-14 12z" fill="#c4562f"/><path d="M24 31l3-8 7 6z" fill="#fff3e6"/><path d="M76 31l-3-8-7 6z" fill="#fff3e6"/>`
        + `<circle cx="50" cy="54" r="28" fill="#d9734a"/><ellipse cx="36" cy="58" rx="10" ry="8" fill="#fff3e6"/><ellipse cx="64" cy="58" rx="10" ry="8" fill="#fff3e6"/>`
        + `<ellipse cx="50" cy="64" rx="9" ry="7" fill="#fff3e6"/><ellipse cx="50" cy="61" rx="3.5" ry="2.5" fill="#3b3561"/>` + eyes(51) + smile(66);
    case 'sheep':
      return `<g fill="#fffaf2">${[[30, 34], [42, 26], [58, 26], [70, 34], [76, 48], [24, 48], [50, 22]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12"/>`).join('')}</g>`
        + `<ellipse cx="22" cy="56" rx="10" ry="6" fill="#f0c9b0" transform="rotate(-20 22 56)"/><ellipse cx="78" cy="56" rx="10" ry="6" fill="#f0c9b0" transform="rotate(20 78 56)"/>`
        + `<ellipse cx="50" cy="58" rx="22" ry="24" fill="#f6dccb"/>` + eyes(55) + blush(63) + smile(66);
    case 'caracal':
      return `<path d="M22 40l2-30 18 20z" fill="#c98f52"/><path d="M78 40l-2-30-18 20z" fill="#c98f52"/><path d="M24 12l-2-8 4 6zM76 12l2-8-4 6z" fill="#3b3561" stroke="#3b3561" stroke-width="2"/>`
        + `<circle cx="50" cy="54" r="27" fill="#ddb07a"/><ellipse cx="50" cy="64" rx="12" ry="9" fill="#fbf0e0"/>`
        + `<path d="M40 44l-4-4M60 44l4-4" stroke="#3b3561" stroke-width="2" stroke-linecap="round"/><ellipse cx="50" cy="60" rx="3.5" ry="2.5" fill="#d46a7e"/>` + eyes(51) + smile(64);
  }
}

/** Avatar SVG markup for a Neighbor. Unknown species get a soft initial badge in a stable pastel color. */
export function avatar(name: string, species?: Species): string {
  const bg = PALETTE[hash(name) % PALETTE.length];
  const inner = species
    ? face(species)
    : `<circle cx="50" cy="52" r="28" fill="#fffdf7"/><text x="50" y="63" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="30" fill="#5a4bc4">${name[0]}</text>`
      + `<path d="M74 22l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ffd27a"/>`;
  return `<svg class="avatar" viewBox="0 0 100 100" role="img" aria-label="${name}"><circle cx="50" cy="50" r="50" fill="${bg}"/>${inner}</svg>`;
}

import { PP_IMAGES } from './images';

/** Category icons for the database cards and headers. */
export const ICONS: Record<string, string> = {
  neighbors: '<circle cx="32" cy="34" r="20" fill="#d9734a"/><path d="M14 22l4-12 10 8zM50 22l-4-12-10 8z" fill="#c4562f"/><ellipse cx="24" cy="38" rx="7" ry="5" fill="#fff3e6"/><ellipse cx="40" cy="38" rx="7" ry="5" fill="#fff3e6"/><circle cx="25" cy="32" r="3" fill="#3b3561"/><circle cx="39" cy="32" r="3" fill="#3b3561"/><ellipse cx="32" cy="40" rx="3" ry="2" fill="#3b3561"/>',
  codes: '<rect x="8" y="20" width="48" height="26" rx="5" fill="#ffe3a8"/><path d="M40 20v26" stroke="#ffc76a" stroke-width="2" stroke-dasharray="3 3"/><path d="M16 30h16M16 37h10" stroke="#b98c5e" stroke-width="3" stroke-linecap="round"/><path d="M48 27l2 4 4 1-4 2-2 4-2-4-4-2 4-1z" fill="#ff8fab"/>',
  recipes: '<path d="M14 30h36l-4 16H18z" fill="#ffc6d6"/><path d="M10 30h44" stroke="#5a4bc4" stroke-width="3" stroke-linecap="round"/><path d="M24 22q2-6 0-10M32 22q2-6 0-10M40 22q2-6 0-10" stroke="#a99cf0" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
  fish: '<path d="M10 32q14-14 32 0q-18 14-32 0z" fill="#9fd0ff"/><path d="M42 32l12-9v18z" fill="#7ab8f5"/><circle cx="20" cy="30" r="2.5" fill="#3b3561"/>',
  bugs: '<ellipse cx="32" cy="36" rx="12" ry="15" fill="#ff8fab"/><path d="M32 22v29" stroke="#3b3561" stroke-width="2"/><circle cx="32" cy="19" r="6" fill="#3b3561"/><circle cx="26" cy="32" r="3" fill="#3b3561"/><circle cx="38" cy="40" r="3" fill="#3b3561"/><path d="M28 14l-4-6M36 14l4-6" stroke="#3b3561" stroke-width="2" stroke-linecap="round"/>',
  crops: '<path d="M14 46h36" stroke="#b98c5e" stroke-width="5" stroke-linecap="round"/><path d="M32 44V24" stroke="#7cc4a0" stroke-width="3"/><path d="M32 30q-12-2-14-12q12 0 14 12zM32 26q10-2 14-12q-12 0-14 12z" fill="#8fd17a"/>',
  flowers: '<g fill="#ffc6d6"><circle cx="32" cy="18" r="8"/><circle cx="44" cy="28" r="8"/><circle cx="40" cy="42" r="8"/><circle cx="24" cy="42" r="8"/><circle cx="20" cy="28" r="8"/></g><circle cx="32" cy="31" r="6" fill="#ffd27a"/>',
  materials: '<path d="M12 46l10-22 14-6 16 14-6 14z" fill="#c9d0e8"/><path d="M22 24l8 22M36 18l-6 28" stroke="#a7b0d0" stroke-width="2"/><path d="M44 14l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#bfe9f0"/>',
  gifts: '<rect x="14" y="26" width="36" height="24" rx="3" fill="#ffc6d6"/><rect x="12" y="20" width="40" height="9" rx="2" fill="#ff8fab"/><path d="M32 20v30" stroke="#ffd27a" stroke-width="5"/><path d="M32 20q-12-12-14-2q4 4 14 2zM32 20q12-12 14-2q-4 4-14 2z" fill="#ffd27a"/>',
  furniture: '<rect x="12" y="28" width="40" height="14" rx="5" fill="#a99cf0"/><rect x="16" y="18" width="32" height="14" rx="5" fill="#c3b8ff"/><path d="M16 42v6M48 42v6" stroke="#5a4bc4" stroke-width="3" stroke-linecap="round"/>',
  clothing: '<path d="M22 12l10 6 10-6 12 8-6 9-4-3v24H20V26l-4 3-6-9z" fill="#9fd8b8"/><path d="M28 16q4 6 8 0" stroke="#5a8f74" stroke-width="2" fill="none"/>',
};
export const icon = (id: string, size = 40) => PP_IMAGES[id]
  ? `<img class="cat-icon" src="${PP_IMAGES[id]}" width="${size}" height="${size}" alt="" loading="lazy">`
  : `<svg class="cat-icon" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">${ICONS[id] ?? ''}</svg>`;
