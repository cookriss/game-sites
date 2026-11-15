import type { NavLink } from './types';

/** Per-game section menu, shown in the header of every page of that game's section. */
export const SECTION_NAV: Record<string, NavLink[]> = {
  'petit-planet': [
    { path: '/petit-planet', label: { en: 'Overview', es: 'Resumen', pt: 'Resumo' } },
    { path: '/petit-planet/neighbors', label: { en: 'Neighbors', es: 'Vecinos', pt: 'Vizinhos' }, icon: 'neighbors',
      blurb: { en: 'All 16 known Neighbors, their jobs and birthdays.', es: 'Los 16 vecinos conocidos, sus profesiones y cumpleaños.', pt: 'Os 16 vizinhos conhecidos, profissões e aniversários.' } },
    { path: '/petit-planet/guide', label: { en: 'Guide', es: 'Guía', pt: 'Guia' }, icon: 'crops',
      blurb: { en: 'Luca Arbor, currencies, Starsea Voyages and launch-day tips.', es: 'Árbol Luca, monedas, viajes por el Mar Estelar y consejos para el primer día.', pt: 'Árvore Luca, moedas, viagens pelo Mar Estelar e dicas para o primeiro dia.' } },
    { path: '/petit-planet/database', label: { en: 'Database', es: 'Base de datos', pt: 'Banco de dados' }, icon: 'materials',
      blurb: { en: 'Recipes, fish, bugs, crops, flowers, furniture, clothing and gifts.', es: 'Recetas, peces, insectos, cultivos, flores, muebles, ropa y regalos.', pt: 'Receitas, peixes, insetos, cultivos, flores, móveis, roupas e presentes.' } },
    { path: '/petit-planet/codes', label: { en: 'Codes', es: 'Códigos', pt: 'Códigos' }, icon: 'codes',
      blurb: { en: 'Every working redeem code, from launch day.', es: 'Todos los códigos que funcionan, desde el día del lanzamiento.', pt: 'Todos os códigos que funcionam, desde o dia do lançamento.' } },
    { path: '/petit-planet/betas', label: { en: 'Betas', es: 'Betas', pt: 'Betas' }, icon: 'flowers',
      blurb: { en: 'What the three closed betas added.', es: 'Qué añadió cada una de las tres betas cerradas.', pt: 'O que cada um dos três betas fechados trouxe.' } },
  ],
};
