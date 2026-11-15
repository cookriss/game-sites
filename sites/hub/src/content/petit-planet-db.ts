import type { L } from './types';

/**
 * Launch-day databases for Petit Planet (recipes, crops, gifts).
 * Each table is published only once it has rows, so nothing empty goes live.
 * Fill rows from the live game from 4 December 2026; cell values are plain text or per-language text.
 */
export interface DbTable {
  id: 'recipes' | 'crops' | 'gifts';
  title: L;
  description: L;
  h1: L;
  lede: L;
  columns: { key: string; label: L }[];
  rows: Record<string, string | L>[];
}

export const PP_TABLES: DbTable[] = [
  {
    id: 'recipes',
    title: { en: 'Petit Planet Recipes: All Dishes and Ingredients', es: 'Recetas de Petit Planet: todos los platos e ingredientes', pt: 'Receitas de Petit Planet: todos os pratos e ingredientes' },
    description: { en: 'Every Petit Planet cooking recipe with ingredients, how to unlock it and sell price.', es: 'Todas las recetas de cocina de Petit Planet con ingredientes, cómo desbloquearlas y precio de venta.', pt: 'Todas as receitas de Petit Planet com ingredientes, como desbloquear e preço de venda.' },
    h1: { en: 'Petit Planet recipes', es: 'Recetas de Petit Planet', pt: 'Receitas de Petit Planet' },
    lede: { en: 'All cooking recipes, their ingredients and how to unlock them.', es: 'Todas las recetas de cocina, sus ingredientes y cómo desbloquearlas.', pt: 'Todas as receitas, seus ingredientes e como desbloquear.' },
    columns: [
      { key: 'name', label: { en: 'Recipe', es: 'Receta', pt: 'Receita' } },
      { key: 'ingredients', label: { en: 'Ingredients', es: 'Ingredientes', pt: 'Ingredientes' } },
      { key: 'unlock', label: { en: 'How to unlock', es: 'Cómo se desbloquea', pt: 'Como desbloquear' } },
      { key: 'price', label: { en: 'Sell price', es: 'Precio de venta', pt: 'Preço de venda' } },
    ],
    rows: [],
  },
  {
    id: 'crops',
    title: { en: 'Petit Planet Crops: Seeds, Growth Times and Seasons', es: 'Cultivos de Petit Planet: semillas, tiempos de crecimiento y estaciones', pt: 'Cultivos de Petit Planet: sementes, tempo de crescimento e estações' },
    description: { en: 'Every Petit Planet crop with season, growth time and sell price.', es: 'Todos los cultivos de Petit Planet con estación, tiempo de crecimiento y precio de venta.', pt: 'Todos os cultivos de Petit Planet com estação, tempo de crescimento e preço de venda.' },
    h1: { en: 'Petit Planet crops', es: 'Cultivos de Petit Planet', pt: 'Cultivos de Petit Planet' },
    lede: { en: 'Seeds, seasons, growth times and prices.', es: 'Semillas, estaciones, tiempos de crecimiento y precios.', pt: 'Sementes, estações, tempos de crescimento e preços.' },
    columns: [
      { key: 'name', label: { en: 'Crop', es: 'Cultivo', pt: 'Cultivo' } },
      { key: 'season', label: { en: 'Season', es: 'Estación', pt: 'Estação' } },
      { key: 'time', label: { en: 'Growth time', es: 'Tiempo', pt: 'Tempo' } },
      { key: 'price', label: { en: 'Sell price', es: 'Precio de venta', pt: 'Preço de venda' } },
    ],
    rows: [],
  },
  {
    id: 'gifts',
    title: { en: 'Petit Planet Gift Guide: What Every Neighbor Loves', es: 'Guía de regalos de Petit Planet: lo que le encanta a cada vecino', pt: 'Guia de presentes de Petit Planet: o que cada vizinho ama' },
    description: { en: 'Best gifts for every Petit Planet Neighbor: loved, liked and disliked items.', es: 'Los mejores regalos para cada vecino de Petit Planet: lo que les encanta, les gusta y no les gusta.', pt: 'Os melhores presentes para cada vizinho de Petit Planet: o que amam, gostam e não gostam.' },
    h1: { en: 'Petit Planet gift guide', es: 'Guía de regalos de Petit Planet', pt: 'Guia de presentes de Petit Planet' },
    lede: { en: 'What each Neighbor loves, likes and dislikes.', es: 'Lo que le encanta, le gusta y no le gusta a cada vecino.', pt: 'O que cada vizinho ama, gosta e não gosta.' },
    columns: [
      { key: 'neighbor', label: { en: 'Neighbor', es: 'Vecino', pt: 'Vizinho' } },
      { key: 'loves', label: { en: 'Loves', es: 'Le encanta', pt: 'Ama' } },
      { key: 'likes', label: { en: 'Likes', es: 'Le gusta', pt: 'Gosta' } },
      { key: 'dislikes', label: { en: 'Dislikes', es: 'No le gusta', pt: 'Não gosta' } },
    ],
    rows: [],
  },
];

/** Tables with data, i.e. the ones that get a page and a menu entry. */
export const PP_LIVE_TABLES = PP_TABLES.filter((t) => t.rows.length > 0);
