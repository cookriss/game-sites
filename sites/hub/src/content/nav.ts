import type { NavLink } from './types';
import { PP_LIVE_TABLES } from './petit-planet-db';

/** Per-game section menu, shown on every page of that game's section. */
export const SECTION_NAV: Record<string, NavLink[]> = {
  'petit-planet': [
    { path: '/petit-planet', label: { en: 'Overview', es: 'Resumen', pt: 'Resumo' } },
    { path: '/petit-planet/neighbors', label: { en: 'Neighbors', es: 'Vecinos', pt: 'Vizinhos' } },
    { path: '/petit-planet/guide', label: { en: 'Beginner guide', es: 'Guía para empezar', pt: 'Guia para começar' } },
    ...PP_LIVE_TABLES.map((t) => ({ path: `/petit-planet/${t.id}`, label: t.h1 })),
    { path: '/petit-planet/codes', label: { en: 'Codes', es: 'Códigos', pt: 'Códigos' } },
    { path: '/petit-planet/betas', label: { en: 'Beta tests', es: 'Betas', pt: 'Betas' } },
  ],
};
