import type { NavLink } from './types';
import { PP_TABLES } from './petit-planet-db';

/** Per-game section menu, shown in the header of every page of that game's section. */
export const SECTION_NAV: Record<string, NavLink[]> = {
  'petit-planet': [
    { path: '/petit-planet', label: { en: 'Overview', es: 'Resumen', pt: 'Resumo' } },
    { path: '/petit-planet/neighbors', label: { en: 'Neighbors', es: 'Vecinos', pt: 'Vizinhos' }, icon: 'neighbors',
      blurb: { en: 'All 16 known Neighbors, their jobs and birthdays.', es: 'Los 16 vecinos conocidos, sus profesiones y cumpleaños.', pt: 'Os 16 vizinhos conhecidos, profissões e aniversários.' } },
    { path: '/petit-planet/birthdays', label: { en: 'Birthdays', es: 'Cumpleaños', pt: 'Aniversários' }, icon: 'gifts',
      blurb: { en: 'Birthday calendar of every Neighbor, with the next one highlighted.', es: 'Calendario con el cumpleaños de cada vecino y el próximo destacado.', pt: 'Calendário com o aniversário de cada vizinho e o próximo em destaque.' } },
    ...(['recipes', 'fish', 'bugs', 'crops', 'flowers', 'materials', 'gifts', 'furniture', 'clothing'] as const).map((id) => {
      const t = PP_TABLES.find((x) => x.id === id)!;
      return { path: `/petit-planet/database/${id}`, label: t.name, icon: id, blurb: t.blurb, soon: t.rows.length === 0 };
    }),
    { path: '/petit-planet/guide', label: { en: 'Guide', es: 'Guía', pt: 'Guia' }, icon: 'crops',
      blurb: { en: 'Luca Arbor, currencies, Starsea Voyages and launch-day tips.', es: 'Árbol Luca, monedas, viajes por el Mar Estelar y consejos para el primer día.', pt: 'Árvore Luca, moedas, viagens pelo Mar Estelar e dicas para o primeiro dia.' } },
    { path: '/petit-planet/codes', label: { en: 'Codes', es: 'Códigos', pt: 'Códigos' }, icon: 'codes',
      blurb: { en: 'Every working redeem code, from launch day.', es: 'Todos los códigos que funcionan, desde el día del lanzamiento.', pt: 'Todos os códigos que funcionam, desde o dia do lançamento.' } },
    { path: '/petit-planet/betas', label: { en: 'Betas', es: 'Betas', pt: 'Betas' }, icon: 'flowers',
      blurb: { en: 'What each of the three closed betas added.', es: 'Qué añadió cada una de las tres betas cerradas.', pt: 'O que cada um dos três betas fechados trouxe.' } },
  ],
};
