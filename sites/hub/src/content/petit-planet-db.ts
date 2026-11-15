import type { L } from './types';

/**
 * Petit Planet databases. Every table has its page and template ready; a table with no rows shows a
 * "coming soon" state, is noindex and stays out of the sitemap. Fill rows from the live game
 * (from 4 December 2026): cell values are plain text, a number, or per-language text.
 */
export interface DbColumn {
  key: string;
  label: L;
  /** Adds a dropdown filter built from this column's values */
  filter?: boolean;
  /** Numeric column: right-aligned and sorted as numbers */
  num?: boolean;
}
export type Cell = string | number | L;
export interface DbTable {
  id: string;
  /** Menu / card name */
  name: L;
  /** What the table will hold, shown on the card and in the coming-soon state */
  blurb: L;
  title: L;
  description: L;
  columns: DbColumn[];
  rows: Record<string, Cell>[];
}

const C = {
  name: (en: string, es: string, pt: string): DbColumn => ({ key: 'name', label: { en, es, pt } }),
  where: { key: 'where', label: { en: 'Where', es: 'Dónde', pt: 'Onde' }, filter: true } as DbColumn,
  season: { key: 'season', label: { en: 'Season', es: 'Estación', pt: 'Estação' }, filter: true } as DbColumn,
  time: { key: 'time', label: { en: 'Time', es: 'Hora', pt: 'Horário' } } as DbColumn,
  rarity: { key: 'rarity', label: { en: 'Rarity', es: 'Rareza', pt: 'Raridade' }, filter: true } as DbColumn,
  price: { key: 'price', label: { en: 'Sell price', es: 'Precio de venta', pt: 'Preço de venda' }, num: true } as DbColumn,
  source: { key: 'source', label: { en: 'How to get', es: 'Cómo conseguirlo', pt: 'Como conseguir' } } as DbColumn,
};

export const PP_TABLES: DbTable[] = [
  {
    id: 'recipes',
    name: { en: 'Recipes', es: 'Recetas', pt: 'Receitas' },
    blurb: { en: 'Every dish, its ingredients, how to unlock it and what it sells for.', es: 'Cada plato, sus ingredientes, cómo se desbloquea y por cuánto se vende.', pt: 'Cada prato, seus ingredientes, como desbloquear e por quanto vende.' },
    title: { en: 'Petit Planet Recipes: All Dishes and Ingredients', es: 'Recetas de Petit Planet: todos los platos e ingredientes', pt: 'Receitas de Petit Planet: todos os pratos e ingredientes' },
    description: { en: 'Every Petit Planet cooking recipe with ingredients, how to unlock it and sell price.', es: 'Todas las recetas de Petit Planet con ingredientes, cómo desbloquearlas y precio de venta.', pt: 'Todas as receitas de Petit Planet com ingredientes, como desbloquear e preço de venda.' },
    columns: [C.name('Recipe', 'Receta', 'Receita'), { key: 'ingredients', label: { en: 'Ingredients', es: 'Ingredientes', pt: 'Ingredientes' } }, { key: 'type', label: { en: 'Type', es: 'Tipo', pt: 'Tipo' }, filter: true }, { key: 'unlock', label: { en: 'Unlock', es: 'Desbloqueo', pt: 'Desbloqueio' } }, C.price],
    rows: [],
  },
  {
    id: 'fish',
    name: { en: 'Fish', es: 'Peces', pt: 'Peixes' },
    blurb: { en: 'Where and when each fish appears, rarity and price.', es: 'Dónde y cuándo aparece cada pez, su rareza y su precio.', pt: 'Onde e quando cada peixe aparece, raridade e preço.' },
    title: { en: 'Petit Planet Fish: Locations, Times and Prices', es: 'Peces de Petit Planet: dónde pescarlos, horas y precios', pt: 'Peixes de Petit Planet: onde pescar, horários e preços' },
    description: { en: 'Full Petit Planet fish list with location, time, season, rarity and sell price.', es: 'Lista completa de peces de Petit Planet con lugar, hora, estación, rareza y precio de venta.', pt: 'Lista completa de peixes de Petit Planet com local, horário, estação, raridade e preço de venda.' },
    columns: [C.name('Fish', 'Pez', 'Peixe'), C.where, C.time, C.season, C.rarity, C.price],
    rows: [],
  },
  {
    id: 'bugs',
    name: { en: 'Bugs', es: 'Insectos', pt: 'Insetos' },
    blurb: { en: 'Where and when to catch every bug, rarity and price.', es: 'Dónde y cuándo cazar cada insecto, su rareza y su precio.', pt: 'Onde e quando pegar cada inseto, raridade e preço.' },
    title: { en: 'Petit Planet Bugs: Locations, Times and Prices', es: 'Insectos de Petit Planet: dónde encontrarlos, horas y precios', pt: 'Insetos de Petit Planet: onde encontrar, horários e preços' },
    description: { en: 'Full Petit Planet bug list with location, time, season, rarity and sell price.', es: 'Lista completa de insectos de Petit Planet con lugar, hora, estación, rareza y precio de venta.', pt: 'Lista completa de insetos de Petit Planet com local, horário, estação, raridade e preço de venda.' },
    columns: [C.name('Bug', 'Insecto', 'Inseto'), C.where, C.time, C.season, C.rarity, C.price],
    rows: [],
  },
  {
    id: 'crops',
    name: { en: 'Crops', es: 'Cultivos', pt: 'Cultivos' },
    blurb: { en: 'Seeds, growing time, season and profit for each crop.', es: 'Semillas, tiempo de crecimiento, estación y beneficio de cada cultivo.', pt: 'Sementes, tempo de crescimento, estação e lucro de cada cultivo.' },
    title: { en: 'Petit Planet Crops: Seeds, Growth Times and Profit', es: 'Cultivos de Petit Planet: semillas, tiempo de crecimiento y beneficio', pt: 'Cultivos de Petit Planet: sementes, tempo de crescimento e lucro' },
    description: { en: 'Every Petit Planet crop with season, growth time, seed cost and sell price.', es: 'Todos los cultivos de Petit Planet con estación, tiempo de crecimiento, precio de semilla y de venta.', pt: 'Todos os cultivos de Petit Planet com estação, tempo de crescimento, preço da semente e de venda.' },
    columns: [C.name('Crop', 'Cultivo', 'Cultivo'), C.season, { key: 'grow', label: { en: 'Growth time', es: 'Crecimiento', pt: 'Crescimento' } }, { key: 'seed', label: { en: 'Seed cost', es: 'Semilla', pt: 'Semente' }, num: true }, C.price],
    rows: [],
  },
  {
    id: 'flowers',
    name: { en: 'Flowers', es: 'Flores', pt: 'Flores' },
    blurb: { en: 'Every flower and color, and which crossbreeds produce them.', es: 'Todas las flores y colores, y qué cruces los producen.', pt: 'Todas as flores e cores, e quais cruzamentos as produzem.' },
    title: { en: 'Petit Planet Flowers: Colors and Crossbreeding', es: 'Flores de Petit Planet: colores y cruces', pt: 'Flores de Petit Planet: cores e cruzamentos' },
    description: { en: 'Petit Planet flower list with every color and the crossbreeding combinations to get them.', es: 'Lista de flores de Petit Planet con cada color y los cruces para conseguirlos.', pt: 'Lista de flores de Petit Planet com cada cor e os cruzamentos para conseguir.' },
    columns: [C.name('Flower', 'Flor', 'Flor'), { key: 'color', label: { en: 'Color', es: 'Color', pt: 'Cor' }, filter: true }, { key: 'parents', label: { en: 'Crossbreed', es: 'Cruce', pt: 'Cruzamento' } }, C.season],
    rows: [],
  },
  {
    id: 'materials',
    name: { en: 'Materials', es: 'Materiales', pt: 'Materiais' },
    blurb: { en: 'Where to gather each material, on your planet or on Starsea islets.', es: 'Dónde recoger cada material, en tu planeta o en los islotes del Mar Estelar.', pt: 'Onde coletar cada material, no seu planeta ou nas ilhotas do Mar Estelar.' },
    title: { en: 'Petit Planet Materials: Where to Find Every Resource', es: 'Materiales de Petit Planet: dónde conseguir cada recurso', pt: 'Materiais de Petit Planet: onde achar cada recurso' },
    description: { en: 'Every Petit Planet material and where to gather it, on your planet or on Starsea islets.', es: 'Todos los materiales de Petit Planet y dónde recogerlos, en tu planeta o en los islotes del Mar Estelar.', pt: 'Todos os materiais de Petit Planet e onde coletar, no seu planeta ou nas ilhotas do Mar Estelar.' },
    columns: [C.name('Material', 'Material', 'Material'), C.where, { key: 'use', label: { en: 'Used for', es: 'Sirve para', pt: 'Serve para' } }],
    rows: [],
  },
  {
    id: 'gifts',
    name: { en: 'Gifts', es: 'Regalos', pt: 'Presentes' },
    blurb: { en: 'What each Neighbor loves, likes and dislikes.', es: 'Lo que le encanta, le gusta y no le gusta a cada vecino.', pt: 'O que cada vizinho ama, gosta e não gosta.' },
    title: { en: 'Petit Planet Gift Guide: What Every Neighbor Loves', es: 'Guía de regalos de Petit Planet: lo que le encanta a cada vecino', pt: 'Guia de presentes de Petit Planet: o que cada vizinho ama' },
    description: { en: 'Best gifts for every Petit Planet Neighbor: loved, liked and disliked items.', es: 'Los mejores regalos para cada vecino de Petit Planet: lo que les encanta, les gusta y no les gusta.', pt: 'Os melhores presentes para cada vizinho de Petit Planet: o que amam, gostam e não gostam.' },
    columns: [C.name('Neighbor', 'Vecino', 'Vizinho'), { key: 'loves', label: { en: 'Loves', es: 'Le encanta', pt: 'Ama' } }, { key: 'likes', label: { en: 'Likes', es: 'Le gusta', pt: 'Gosta' } }, { key: 'dislikes', label: { en: 'Dislikes', es: 'No le gusta', pt: 'Não gosta' } }],
    rows: [],
  },
  {
    id: 'furniture',
    name: { en: 'Furniture', es: 'Muebles', pt: 'Móveis' },
    blurb: { en: 'Every furniture item, its set, size and how to get it.', es: 'Cada mueble, su colección, tamaño y cómo conseguirlo.', pt: 'Cada móvel, sua coleção, tamanho e como conseguir.' },
    title: { en: 'Petit Planet Furniture: All Items and How to Get Them', es: 'Muebles de Petit Planet: todos los objetos y cómo conseguirlos', pt: 'Móveis de Petit Planet: todos os itens e como conseguir' },
    description: { en: 'Petit Planet furniture catalog with category, set, size and how to get each item.', es: 'Catálogo de muebles de Petit Planet con categoría, colección, tamaño y cómo conseguir cada uno.', pt: 'Catálogo de móveis de Petit Planet com categoria, coleção, tamanho e como conseguir cada um.' },
    columns: [C.name('Item', 'Mueble', 'Móvel'), { key: 'type', label: { en: 'Category', es: 'Categoría', pt: 'Categoria' }, filter: true }, { key: 'set', label: { en: 'Set', es: 'Colección', pt: 'Coleção' }, filter: true }, { key: 'size', label: { en: 'Size', es: 'Tamaño', pt: 'Tamanho' } }, C.source],
    rows: [],
  },
  {
    id: 'clothing',
    name: { en: 'Clothing', es: 'Ropa', pt: 'Roupas' },
    blurb: { en: 'Every outfit piece, its type and how to unlock it.', es: 'Cada prenda, su tipo y cómo desbloquearla.', pt: 'Cada peça de roupa, seu tipo e como desbloquear.' },
    title: { en: 'Petit Planet Clothing: All Outfits and How to Unlock Them', es: 'Ropa de Petit Planet: todas las prendas y cómo conseguirlas', pt: 'Roupas de Petit Planet: todas as peças e como conseguir' },
    description: { en: 'Petit Planet clothing catalog: hats, tops, bottoms, shoes and accessories with how to get each.', es: 'Catálogo de ropa de Petit Planet: gorros, partes de arriba y abajo, calzado y accesorios, y cómo conseguir cada uno.', pt: 'Catálogo de roupas de Petit Planet: chapéus, partes de cima e de baixo, calçados e acessórios, e como conseguir cada um.' },
    columns: [C.name('Item', 'Prenda', 'Peça'), { key: 'type', label: { en: 'Type', es: 'Tipo', pt: 'Tipo' }, filter: true }, { key: 'set', label: { en: 'Set', es: 'Conjunto', pt: 'Conjunto' }, filter: true }, C.source],
    rows: [],
  },
];

export const PP_LIVE_TABLES = PP_TABLES.filter((t) => t.rows.length > 0);
/** Unlocalized paths of empty tables (noindex, left out of the sitemap). */
export const PP_EMPTY_PATHS = PP_TABLES.filter((t) => t.rows.length === 0).map((t) => `/petit-planet/database/${t.id}`);
