import type { GamePageContent } from './types';

export const petitPlanetBetas: GamePageContent = {
  slug: 'petit-planet',
  path: '/petit-planet/betas',
  crumb: { en: 'Beta tests', es: 'Betas', pt: 'Betas' },
  name: 'Petit Planet',
  updated: '2026-11-15',
  title: {
    en: 'Petit Planet Beta Tests: Coziness, Stardrift and Final Beta Changes',
    es: 'Betas de Petit Planet: novedades de la Coziness, la Stardrift y la beta final',
    pt: 'Betas de Petit Planet: novidades do Coziness, do Stardrift e do beta final',
  },
  description: {
    en: 'Petit Planet had three closed betas: the Coziness Test (Nov 2025), the Stardrift Test (Apr 2026) and the Final Beta (Sep 2026). What each one added, and whether there is another.',
    es: 'Petit Planet tuvo tres betas cerradas: la Coziness Test (nov. 2025), la Stardrift Test (abr. 2026) y la beta final (sep. 2026). Qué añadió cada una y si habrá otra.',
    pt: 'Petit Planet teve três betas fechados: o Coziness Test (nov. 2025), o Stardrift Test (abr. 2026) e o beta final (set. 2026). O que cada um trouxe e se haverá outro.',
  },
  h1: { en: 'Petit Planet beta tests', es: 'Las betas de Petit Planet', pt: 'Os betas de Petit Planet' },
  lede: {
    en: 'HoYoverse ran three closed betas before launch. All of them have ended, there is no open beta, and the next step is the full launch on 4 December 2026.',
    es: 'HoYoverse hizo tres betas cerradas antes del lanzamiento. Todas han terminado, no hay beta abierta y lo siguiente es el lanzamiento completo el 4 de diciembre de 2026.',
    pt: 'A HoYoverse fez três betas fechados antes do lançamento. Todos já terminaram, não há beta aberto e o próximo passo é o lançamento completo em 4 de dezembro de 2026.',
  },
  facts: [
    { label: { en: 'Coziness Test', es: 'Coziness Test', pt: 'Coziness Test' }, value: { en: 'From 7 November 2025', es: 'Desde el 7 de noviembre de 2025', pt: 'A partir de 7 de novembro de 2025' } },
    { label: { en: 'Stardrift Test', es: 'Stardrift Test', pt: 'Stardrift Test' }, value: { en: 'From 21 April 2026', es: 'Desde el 21 de abril de 2026', pt: 'A partir de 21 de abril de 2026' } },
    { label: { en: 'Final Beta', es: 'Beta final', pt: 'Beta final' }, value: { en: 'From 20 September 2026', es: 'Desde el 20 de septiembre de 2026', pt: 'A partir de 20 de setembro de 2026' } },
    { label: { en: 'Progress kept?', es: '¿Se guarda el progreso?', pt: 'O progresso fica salvo?' }, value: { en: 'No, beta data was wiped', es: 'No, los datos de las betas se borraron', pt: 'Não, os dados dos betas foram apagados' } },
  ],
  sections: [
    {
      id: 'coziness',
      h: { en: 'Coziness Test (November 2025)', es: 'Coziness Test (noviembre de 2025)', pt: 'Coziness Test (novembro de 2025)' },
      html: {
        en: '<p>The first closed beta introduced the core loop: tending your planet, growing the Luca tree, gathering, fishing and catching bugs, and the first Neighbors, including Yunguo and Msafiri.</p>',
        es: '<p>La primera beta cerrada presentó lo básico: cuidar tu planeta, hacer crecer el árbol Luca, recolectar, pescar, cazar insectos y los primeros vecinos, entre ellos Yunguo y Msafiri.</p>',
        pt: '<p>O primeiro beta fechado apresentou o básico: cuidar do seu planeta, fazer a árvore Luca crescer, coletar, pescar, pegar insetos e os primeiros vizinhos, entre eles Yunguo e Msafiri.</p>',
      },
    },
    {
      id: 'stardrift',
      h: { en: 'Stardrift Test (April 2026)', es: 'Stardrift Test (abril de 2026)', pt: 'Stardrift Test (abril de 2026)' },
      html: {
        en: '<p>The second beta added new Neighbors (Medowlyn among them, plus Harpeno, Rebella and Nerina) and expanded <b>Starsea Voyages</b>, the trips to islets powered by Lumia Batteries.</p>',
        es: '<p>La segunda beta añadió vecinos nuevos (entre ellos Medowlyn, además de Harpeno, Rebella y Nerina) y amplió los <b>viajes por el Mar Estelar</b>, las excursiones a islotes que funcionan con Baterías Lumia.</p>',
        pt: '<p>O segundo beta trouxe novos vizinhos (entre eles Medowlyn, além de Harpeno, Rebella e Nerina) e ampliou as <b>viagens pelo Mar Estelar</b>, as excursões a ilhotas movidas a Baterias Lumia.</p>',
      },
    },
    {
      id: 'final',
      h: { en: 'Final Beta (September 2026)', es: 'Beta final (septiembre de 2026)', pt: 'Beta final (setembro de 2026)' },
      html: {
        en: '<ul><li><b>Winter:</b> snow and new materials, unlocked after Luca Arbor level 9.</li><li><b>Season of Snowfall:</b> a seasonal story that unlocks after the "Melody of the Conch" quest, with Medowlyn and Rebella involved.</li><li><b>New Neighbors:</b> Heyu, Tika and Manman, met on Starsea Voyages.</li><li><b>Batch cooking:</b> make several of the same recipe at once.</li><li><b>Hair dye</b> made from flowers.</li><li><b>Flower crossbreeding</b> for more flower types.</li><li><b>Vignettes:</b> preset decoration scenes that set themselves up once you own every piece.</li></ul>',
        es: '<ul><li><b>Invierno:</b> nieve y materiales nuevos, a partir del nivel 9 del Árbol Luca.</li><li><b>Temporada de Nevadas:</b> una historia de temporada que se desbloquea tras la misión "Melody of the Conch", con Medowlyn y Rebella.</li><li><b>Vecinos nuevos:</b> Heyu, Tika y Manman, que aparecen en los viajes por el Mar Estelar.</li><li><b>Cocina por lotes:</b> preparar varias veces la misma receta de una vez.</li><li><b>Tinte de pelo</b> hecho con flores.</li><li><b>Cruce de flores</b> para conseguir más variedades.</li><li><b>Viñetas:</b> escenas de decoración prediseñadas que se montan solas cuando tienes todas las piezas.</li></ul>',
        pt: '<ul><li><b>Inverno:</b> neve e materiais novos, a partir do nível 9 da Árvore Luca.</li><li><b>Temporada de Neve:</b> uma história sazonal liberada depois da missão "Melody of the Conch", com Medowlyn e Rebella.</li><li><b>Novos vizinhos:</b> Heyu, Tika e Manman, que aparecem nas viagens pelo Mar Estelar.</li><li><b>Preparo em lote:</b> fazer a mesma receita várias vezes de uma vez.</li><li><b>Tintura de cabelo</b> feita com flores.</li><li><b>Cruzamento de flores</b> para conseguir mais variedades.</li><li><b>Vinhetas:</b> cenas de decoração prontas que se montam sozinhas quando você tem todas as peças.</li></ul>',
      },
    },
  ],
  faq: [
    {
      q: { en: 'Is there a Petit Planet beta now?', es: '¿Hay ahora una beta de Petit Planet?', pt: 'Tem beta de Petit Planet agora?' },
      a: { en: 'No. The final beta has ended and the game launches on 4 December 2026.', es: 'No. La beta final ya terminó y el juego sale el 4 de diciembre de 2026.', pt: 'Não. O beta final já terminou e o jogo chega em 4 de dezembro de 2026.' },
    },
    {
      q: { en: 'Does beta progress carry over?', es: '¿Se conserva el progreso de las betas?', pt: 'O progresso dos betas é mantido?' },
      a: { en: 'No. Beta data was wiped, so everyone starts fresh at launch.', es: 'No. Los datos de las betas se borraron, así que todo el mundo empieza de cero en el lanzamiento.', pt: 'Não. Os dados dos betas foram apagados, então todo mundo começa do zero no lançamento.' },
    },
  ],
  sources: [
    { label: 'PocketGamer.biz: Petit Planet entering closed beta on November 7th', url: 'https://www.pocketgamer.biz/hoyoverses-petit-planet-entering-closed-beta-on-november-7th' },
    { label: 'Siliconera: Petit Planet Stardrift closed beta test starts in April', url: 'https://siliconera.com/petit-planet-stardrift-closed-beta-test-starts-in-april/' },
    { label: 'PocketGamer.biz: closed beta features new neighbours and enhanced Starsea Voyages', url: 'https://www.pocketgamer.biz/closed-beta-for-hoyoverses-petit-planet-will-feature-new-neighbours-and-enhanced-starsea-voyages' },
    { label: 'Insider Gaming: Petit Planet final beta start time', url: 'https://insider-gaming.com/petit-planet-final-beta-start-time-end-date/' },
    { label: 'Siliconera: final beta test gets winter and Season of Snowfall', url: 'https://www.siliconera.com/petit-planet-final-beta-test-gets-winter-and-season-of-snowfall/' },
  ],
};

export const petitPlanetCodes: GamePageContent = {
  slug: 'petit-planet',
  path: '/petit-planet/codes',
  crumb: { en: 'Codes', es: 'Códigos', pt: 'Códigos' },
  name: 'Petit Planet',
  updated: '2026-11-15',
  title: {
    en: 'Petit Planet Codes (November 2026): Active Codes and How to Redeem',
    es: 'Códigos de Petit Planet (noviembre 2026): códigos activos y cómo canjearlos',
    pt: 'Códigos de Petit Planet (novembro 2026): códigos ativos e como resgatar',
  },
  description: {
    en: 'All Petit Planet redeem codes in one list, checked daily. No codes are live before the 4 December 2026 launch; this page will list them as soon as HoYoverse releases them.',
    es: 'Todos los códigos de Petit Planet en una lista revisada a diario. Antes del lanzamiento del 4 de diciembre de 2026 no hay códigos; esta página los mostrará en cuanto HoYoverse los publique.',
    pt: 'Todos os códigos de Petit Planet em uma lista revisada todo dia. Antes do lançamento de 4 de dezembro de 2026 não há códigos; esta página vai mostrá-los assim que a HoYoverse publicar.',
  },
  h1: { en: 'Petit Planet codes', es: 'Códigos de Petit Planet', pt: 'Códigos de Petit Planet' },
  lede: {
    en: 'There are no Petit Planet codes yet, because the game is not out. We will list every working code here from launch day, 4 December 2026.',
    es: 'Todavía no hay códigos de Petit Planet, porque el juego aún no ha salido. Desde el día del lanzamiento, el 4 de diciembre de 2026, pondremos aquí todos los códigos que funcionen.',
    pt: 'Ainda não há códigos de Petit Planet, porque o jogo ainda não foi lançado. A partir do dia do lançamento, 4 de dezembro de 2026, vamos listar aqui todos os códigos que funcionam.',
  },
  sections: [
    {
      id: 'active',
      h: { en: 'Active codes', es: 'Códigos activos', pt: 'Códigos ativos' },
      html: {
        en: '<p class="note">No active codes yet. Check back on 4 December.</p>',
        es: '<p class="note">Aún no hay códigos activos. Vuelve el 4 de diciembre.</p>',
        pt: '<p class="note">Ainda não há códigos ativos. Volte em 4 de dezembro.</p>',
      },
    },
    {
      id: 'where',
      h: { en: 'Where codes usually appear', es: 'Dónde suelen aparecer los códigos', pt: 'Onde os códigos costumam aparecer' },
      html: {
        en: '<p>In HoYoverse\'s other games, codes are given out during livestreams, on official social accounts and at launch. Petit Planet has not confirmed a code system yet, so we will explain how to redeem them once it is live.</p><p>Watch out for sites offering "codes" before launch, or asking for your account details: official codes never need your password.</p>',
        es: '<p>En los otros juegos de HoYoverse, los códigos se reparten en directos, en sus redes sociales oficiales y en el lanzamiento. Petit Planet todavía no ha confirmado un sistema de códigos, así que explicaremos cómo canjearlos en cuanto esté disponible.</p><p>Desconfía de webs que ofrezcan "códigos" antes del lanzamiento o te pidan los datos de tu cuenta: los códigos oficiales nunca necesitan tu contraseña.</p>',
        pt: '<p>Nos outros jogos da HoYoverse, os códigos são distribuídos em lives, nas redes sociais oficiais e no lançamento. Petit Planet ainda não confirmou um sistema de códigos, então vamos explicar como resgatar assim que estiver disponível.</p><p>Desconfie de sites que oferecem "códigos" antes do lançamento ou pedem os dados da sua conta: códigos oficiais nunca precisam da sua senha.</p>',
      },
    },
    {
      id: 'free',
      h: { en: 'Free rewards you can get now', es: 'Recompensas gratis que puedes conseguir ya', pt: 'Recompensas grátis que você pode pegar agora' },
      html: {
        en: '<ul><li><b>Pre-registration lucky draw</b> on the official site, with physical prizes and outfit sets.</li><li><b>"Besties, Made to Match!":</b> pre-register in a group of three and each of you gets an exclusive outfit item.</li><li><b>Seasonal Creation Event</b> from launch day, with in-game rewards for shared creations.</li></ul>',
        es: '<ul><li><b>Sorteo de prerregistro</b> en la web oficial, con premios físicos y conjuntos de ropa.</li><li><b>"Besties, Made to Match!":</b> prerregístrate en un grupo de tres y cada uno recibe una prenda exclusiva.</li><li><b>Evento de Creación de Temporada</b> desde el día del lanzamiento, con recompensas por compartir tus creaciones.</li></ul>',
        pt: '<ul><li><b>Sorteio de pré-registro</b> no site oficial, com prêmios físicos e conjuntos de roupas.</li><li><b>"Besties, Made to Match!":</b> faça o pré-registro em um grupo de três e cada um ganha uma roupa exclusiva.</li><li><b>Evento de Criação da Temporada</b> a partir do dia do lançamento, com recompensas por compartilhar suas criações.</li></ul>',
      },
    },
  ],
  faq: [
    {
      q: { en: 'Are there any Petit Planet codes?', es: '¿Hay códigos de Petit Planet?', pt: 'Existem códigos de Petit Planet?' },
      a: { en: 'Not yet. The game launches on 4 December 2026, and we will add codes here as soon as they are released.', es: 'Todavía no. El juego sale el 4 de diciembre de 2026 y añadiremos los códigos aquí en cuanto se publiquen.', pt: 'Ainda não. O jogo chega em 4 de dezembro de 2026 e vamos adicionar os códigos aqui assim que forem publicados.' },
    },
  ],
  sources: [
    { label: 'PocketGamer.biz: Petit Planet sets December 4th release date', url: 'https://www.pocketgamer.biz/hoyoverses-petit-planet-sets-december-4th-release-date/' },
  ],
};
