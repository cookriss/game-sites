import type { GamePageContent } from './types';

export const petitPlanetGuide: GamePageContent = {
  slug: 'petit-planet',
  path: '/petit-planet/guide',
  crumb: { en: 'Beginner guide', es: 'Guía para empezar', pt: 'Guia para começar' },
  name: 'Petit Planet',
  updated: '2026-11-15',
  title: {
    en: 'Petit Planet Beginner Guide: Luca Arbor, Starsea Voyages, Bazaar and Currencies',
    es: 'Guía de Petit Planet para empezar: Árbol Luca, viajes por el Mar Estelar, Bazar y monedas',
    pt: 'Guia de Petit Planet para começar: Árvore Luca, viagens pelo Mar Estelar, Bazar e moedas',
  },
  description: {
    en: 'How Petit Planet works, based on the closed betas: growing the Luca Arbor, daily activities, Dough and Loomi, Lumia Batteries for Starsea Voyages, the Galactic Bazaar and Star Notes.',
    es: 'Cómo funciona Petit Planet según las betas cerradas: hacer crecer el Árbol Luca, actividades diarias, Dough y Loomi, baterías Lumia para el Mar Estelar, el Bazar Galáctico y las Notas Estelares.',
    pt: 'Como Petit Planet funciona segundo os betas fechados: fazer a Árvore Luca crescer, atividades diárias, Dough e Loomi, baterias Lumia para o Mar Estelar, o Bazar Galáctico e as Notas Estelares.',
  },
  h1: { en: 'Petit Planet beginner guide', es: 'Guía de Petit Planet para empezar', pt: 'Guia de Petit Planet para começar' },
  lede: {
    en: 'What to expect in your first days, based on the three closed betas and HoYoverse\'s pre-launch showcase. Details may change at launch, and we will update this guide from 4 December.',
    es: 'Qué esperar en tus primeros días, según las tres betas cerradas y la presentación de HoYoverse antes del lanzamiento. Algunos detalles pueden cambiar al salir, y actualizaremos la guía a partir del 4 de diciembre.',
    pt: 'O que esperar nos primeiros dias, segundo os três betas fechados e a apresentação da HoYoverse antes do lançamento. Alguns detalhes podem mudar no lançamento, e vamos atualizar o guia a partir de 4 de dezembro.',
  },
  sections: [
    {
      id: 'start',
      h: { en: 'Your first day', es: 'Tu primer día', pt: 'Seu primeiro dia' },
      html: {
        en: '<p>You arrive as a <b>Planet Tender</b> and are greeted by Mobai, who registers your planet. The first tutorials teach you to <b>gather fruit, fish and catch bugs</b>. Some buildings, like your house and the museum, finish the next day, so part of the progress is paced in real time. Don\'t worry about rushing: most tools are available right away.</p>',
        es: '<p>Llegas como <b>Cuidador de Planetas</b> y te recibe Mobai, que registra tu planeta. Los primeros tutoriales te enseñan a <b>recoger fruta, pescar y cazar insectos</b>. Algunos edificios, como tu casa y el museo, se terminan al día siguiente, así que parte del avance va a ritmo real. No hace falta correr: casi todas las herramientas están disponibles desde el principio.</p>',
        pt: '<p>Você chega como <b>Cuidador de Planetas</b> e é recebido por Mobai, que registra seu planeta. Os primeiros tutoriais ensinam a <b>colher frutas, pescar e pegar insetos</b>. Algumas construções, como sua casa e o museu, ficam prontas no dia seguinte, então parte do progresso segue o tempo real. Não precisa ter pressa: quase todas as ferramentas estão disponíveis desde o começo.</p>',
      },
    },
    {
      id: 'luca',
      h: { en: 'Growing the Luca Arbor', es: 'Hacer crecer el Árbol Luca', pt: 'Fazer a Árvore Luca crescer' },
      html: {
        en: '<p>The <b>Luca Arbor</b> in your main plaza is the heart of your progress. Completing tasks, main story quests and Neighbor requests fills jars of <b>Luca</b>, which you pour onto the tree. Each new level expands your planet: the beach opens, farming unlocks, new Neighbors arrive and you get Luca Fruits for decoration. In the final beta, <b>winter</b> (with snow and new materials) unlocked after Luca Arbor level 9.</p>',
        es: '<p>El <b>Árbol Luca</b> de tu plaza principal es el centro de tu progreso. Al completar tareas, misiones de la historia y encargos de los vecinos llenas tarros de <b>Luca</b>, que viertes sobre el árbol. Cada nivel amplía tu planeta: se abre la playa, se desbloquea el cultivo, llegan vecinos nuevos y consigues Frutos Luca para decorar. En la última beta, el <b>invierno</b> (con nieve y materiales nuevos) se desbloqueaba al pasar del nivel 9 del Árbol Luca.</p>',
        pt: '<p>A <b>Árvore Luca</b> da sua praça principal é o centro do seu progresso. Ao completar tarefas, missões da história e pedidos dos vizinhos você enche potes de <b>Luca</b>, que despeja na árvore. Cada nível amplia seu planeta: a praia abre, o cultivo é liberado, novos vizinhos chegam e você ganha Frutos Luca para decorar. No último beta, o <b>inverno</b> (com neve e materiais novos) era liberado depois do nível 9 da Árvore Luca.</p>',
      },
    },
    {
      id: 'activities',
      h: { en: 'Daily activities', es: 'Actividades del día a día', pt: 'Atividades do dia a dia' },
      html: {
        en: '<ul><li><b>Gathering:</b> fruit, wood, stone and flowers.</li><li><b>Fishing and bug catching:</b> catches go into your Ecotank, and later into the museum.</li><li><b>Farming:</b> unlocked as the Luca Arbor grows. Yunguo\'s requests teach the basics. The final beta added <b>flower crossbreeding</b> for new flower types.</li><li><b>Cooking:</b> the final beta added batch cooking, so you can make several of the same recipe at once.</li><li><b>Building and decorating:</b> place furniture, reshape the terrain and use <b>Vignettes</b>, preset scenes that build themselves once you have every piece.</li><li><b>Style:</b> over 1,000 clothing and furniture items can be earned by playing, and you can dye your hair using flowers.</li></ul>',
        es: '<ul><li><b>Recolectar:</b> fruta, madera, piedra y flores.</li><li><b>Pescar y cazar insectos:</b> lo que atrapas va a tu Ecotanque y más adelante al museo.</li><li><b>Cultivar:</b> se desbloquea al crecer el Árbol Luca. Los encargos de Yunguo te enseñan lo básico. La última beta añadió el <b>cruce de flores</b> para conseguir variedades nuevas.</li><li><b>Cocinar:</b> la última beta añadió la cocina por lotes, para hacer varias veces la misma receta de una vez.</li><li><b>Construir y decorar:</b> coloca muebles, modifica el terreno y usa las <b>Viñetas</b>, escenas prediseñadas que se montan solas cuando tienes todas las piezas.</li><li><b>Estilo:</b> hay más de 1.000 prendas y muebles que se ganan jugando, y puedes teñirte el pelo con flores.</li></ul>',
        pt: '<ul><li><b>Coletar:</b> frutas, madeira, pedra e flores.</li><li><b>Pescar e pegar insetos:</b> o que você pega vai para o seu Ecotanque e depois para o museu.</li><li><b>Cultivar:</b> é liberado quando a Árvore Luca cresce. Os pedidos de Yunguo ensinam o básico. O último beta trouxe o <b>cruzamento de flores</b> para conseguir variedades novas.</li><li><b>Cozinhar:</b> o último beta trouxe o preparo em lote, para fazer a mesma receita várias vezes de uma vez.</li><li><b>Construir e decorar:</b> coloque móveis, mude o terreno e use as <b>Vinhetas</b>, cenas prontas que se montam sozinhas quando você tem todas as peças.</li><li><b>Estilo:</b> mais de 1.000 roupas e móveis podem ser ganhos jogando, e dá para tingir o cabelo com flores.</li></ul>',
      },
    },
    {
      id: 'money',
      h: { en: 'Currencies', es: 'Monedas', pt: 'Moedas' },
      html: {
        en: '<ul><li><b>Dough:</b> the main currency. Earn it by selling fish, fruit and food, and through small food delivery quests.</li><li><b>Loomi:</b> earned by filling your daily Footprints Journal, and spent at a vending machine.</li><li><b>Lumia Batteries:</b> power for Starsea Voyages, with a limited number each day.</li><li><b>Jellies:</b> earned in Galactic Bazaar minigames and events, and traded for items.</li></ul><p class="note">These names come from the betas. We will confirm them, and list any paid currency, on launch day.</p>',
        es: '<ul><li><b>Dough:</b> la moneda principal. Se gana vendiendo pescado, fruta y comida, y con pequeñas misiones de reparto de comida.</li><li><b>Loomi:</b> se gana completando tu Diario de Huellas diario y se gasta en una máquina expendedora.</li><li><b>Baterías Lumia:</b> la energía de los viajes por el Mar Estelar, con un número limitado al día.</li><li><b>Gominolas:</b> se ganan en los minijuegos y eventos del Bazar Galáctico y se cambian por objetos.</li></ul><p class="note">Estos nombres son los de las betas. Los confirmaremos el día del lanzamiento, junto con cualquier moneda de pago.</p>',
        pt: '<ul><li><b>Dough:</b> a moeda principal. Você ganha vendendo peixe, frutas e comida, e com pequenas missões de entrega de comida.</li><li><b>Loomi:</b> ganho completando seu Diário de Pegadas diário e gasto em uma máquina de venda.</li><li><b>Baterias Lumia:</b> a energia das viagens pelo Mar Estelar, com um número limitado por dia.</li><li><b>Gelatinas:</b> ganhas nos minijogos e eventos do Bazar Galáctico e trocadas por itens.</li></ul><p class="note">Esses nomes são os dos betas. Vamos confirmá-los no dia do lançamento, junto com qualquer moeda paga.</p>',
      },
    },
    {
      id: 'starsea',
      h: { en: 'Starsea Voyages', es: 'Viajes por el Mar Estelar', pt: 'Viagens pelo Mar Estelar' },
      html: {
        en: '<p>Once unlocked, a flying van takes you across the Starsea to small <b>islets</b> with resources your planet doesn\'t have, such as quartz and new plants and fruit. Each trip uses a <b>Lumia Battery</b> and covers a couple of islets. You can bring one Neighbor, who gathers based on their skills, and you can meet new Neighbors on islets and invite them to your planet. Ranking up a Neighbor\'s own small planet, their <b>Planette</b>, rewards more Lumia Batteries.</p>',
        es: '<p>Cuando lo desbloqueas, una furgoneta voladora te lleva por el Mar Estelar a pequeños <b>islotes</b> con recursos que tu planeta no tiene, como cuarzo, plantas y frutas nuevas. Cada viaje gasta una <b>Batería Lumia</b> y recorre un par de islotes. Puedes llevar a un vecino, que recoge según sus habilidades, y en los islotes puedes conocer vecinos nuevos e invitarlos a tu planeta. Subir de rango el pequeño planeta propio de un vecino, su <b>Planetita</b>, da más Baterías Lumia.</p>',
        pt: '<p>Quando liberada, uma van voadora leva você pelo Mar Estelar até pequenas <b>ilhotas</b> com recursos que seu planeta não tem, como quartzo, plantas e frutas novas. Cada viagem gasta uma <b>Bateria Lumia</b> e passa por algumas ilhotas. Você pode levar um vizinho, que coleta de acordo com suas habilidades, e nas ilhotas dá para conhecer novos vizinhos e convidá-los para o seu planeta. Subir o nível do pequeno planeta de um vizinho, o <b>Planetinha</b>, dá mais Baterias Lumia.</p>',
      },
    },
    {
      id: 'social',
      h: { en: 'Galactic Bazaar and multiplayer', es: 'Bazar Galáctico y multijugador', pt: 'Bazar Galáctico e multijogador' },
      html: {
        en: '<p>The <b>Galactic Bazaar</b> is the shared hub: a stage, instruments, a café, social minigames, auctions and events that pay out jellies. Outside the Bazaar, you connect with other players by sending and receiving anonymous <b>Star Notes</b>, which can lead to visiting each other\'s planets. What visitors can do on your planet depends on the permissions you set. Public chat is limited to certain spaces.</p>',
        es: '<p>El <b>Bazar Galáctico</b> es la zona común: un escenario, instrumentos, una cafetería, minijuegos sociales, subastas y eventos que dan gominolas. Fuera del Bazar, conectas con otros jugadores enviando y recibiendo <b>Notas Estelares</b> anónimas, que pueden acabar en visitas a vuestros planetas. Lo que pueden hacer las visitas en tu planeta depende de los permisos que pongas. El chat público solo funciona en algunas zonas.</p>',
        pt: '<p>O <b>Bazar Galáctico</b> é a área compartilhada: um palco, instrumentos, um café, minijogos sociais, leilões e eventos que dão gelatinas. Fora do Bazar, você se conecta com outros jogadores enviando e recebendo <b>Notas Estelares</b> anônimas, que podem levar a visitas aos planetas um do outro. O que os visitantes podem fazer no seu planeta depende das permissões que você definir. O chat público só funciona em alguns espaços.</p>',
      },
    },
    {
      id: 'tips',
      h: { en: 'Tips for launch day', es: 'Consejos para el día del lanzamiento', pt: 'Dicas para o dia do lançamento' },
      html: {
        en: '<ul><li>Pour Luca onto the Arbor as soon as you have it: every level opens up more of the planet.</li><li>Use your daily Lumia Batteries, since the daily amount is limited.</li><li>Talk to every Neighbor each day and note what they like before giving gifts.</li><li>Don\'t sell all your fruit and flowers early: some are needed for cooking, crossbreeding and Neighbor requests.</li><li>Join the Seasonal Creation Event, which starts on launch day, if you enjoy decorating.</li></ul>',
        es: '<ul><li>Vierte el Luca en el Árbol en cuanto lo tengas: cada nivel abre más planeta.</li><li>Gasta las Baterías Lumia de cada día, porque la cantidad diaria es limitada.</li><li>Habla con todos los vecinos cada día y fíjate en lo que les gusta antes de hacerles regalos.</li><li>No vendas toda la fruta y las flores al principio: algunas hacen falta para cocinar, cruzar flores y cumplir encargos.</li><li>Si te gusta decorar, participa en el Evento de Creación de Temporada, que empieza el día del lanzamiento.</li></ul>',
        pt: '<ul><li>Despeje o Luca na Árvore assim que tiver: cada nível abre mais do planeta.</li><li>Use as Baterias Lumia de cada dia, porque a quantidade diária é limitada.</li><li>Converse com todos os vizinhos todo dia e repare do que gostam antes de dar presentes.</li><li>Não venda todas as frutas e flores no começo: algumas são necessárias para cozinhar, cruzar flores e cumprir pedidos.</li><li>Se você gosta de decorar, participe do Evento de Criação da Temporada, que começa no dia do lançamento.</li></ul>',
      },
    },
  ],
  faq: [
    {
      q: { en: 'Is there combat in Petit Planet?', es: '¿Hay combate en Petit Planet?', pt: 'Tem combate em Petit Planet?' },
      a: { en: 'No. It is a life sim without combat.', es: 'No. Es un simulador de vida sin combate.', pt: 'Não. É um simulador de vida sem combate.' },
    },
    {
      q: { en: 'What are Lumia Batteries for?', es: '¿Para qué sirven las Baterías Lumia?', pt: 'Para que servem as Baterias Lumia?' },
      a: { en: 'They power Starsea Voyages to islets. You get a limited number each day, and more by ranking up Neighbors\' Planettes.', es: 'Son la energía de los viajes a los islotes del Mar Estelar. Recibes un número limitado al día, y más al subir de rango las Planetitas de los vecinos.', pt: 'São a energia das viagens às ilhotas do Mar Estelar. Você recebe um número limitado por dia, e mais ao subir o nível dos Planetinhas dos vizinhos.' },
    },
    {
      q: { en: 'Can friends visit my planet?', es: '¿Mis amigos pueden visitar mi planeta?', pt: 'Meus amigos podem visitar meu planeta?' },
      a: { en: 'Yes. Players can visit each other\'s planets, and you choose what visitors are allowed to do.', es: 'Sí. Los jugadores pueden visitar los planetas de otros, y tú decides lo que pueden hacer las visitas.', pt: 'Sim. Os jogadores podem visitar os planetas uns dos outros, e você decide o que os visitantes podem fazer.' },
    },
  ],
  sources: [
    { label: 'TheSixthAxis: Petit Planet preview (Stardrift Test)', url: 'https://www.thesixthaxis.com/2026/04/21/petit-planet-preview-taking-a-cosy-break-from-your-genshin-impact/' },
    { label: 'MP1st: Petit Planet hands-on preview', url: 'https://mp1st.com/previews/petit-planet-hands-on-preview-cozy-life-on-a-distant-planet' },
    { label: 'Siliconera: final beta test gets winter and Season of Snowfall', url: 'https://www.siliconera.com/petit-planet-final-beta-test-gets-winter-and-season-of-snowfall/' },
    { label: 'Massively OP: Petit Planet introduces its characters, gameplay and multiplayer', url: 'https://massivelyop.com/2026/11/04/petit-planet-introduces-its-characters-gameplay-and-multiplayer-activities-ahead-of-its-december-launch/' },
    { label: 'PocketGamer.biz: Petit Planet sets December 4th release date', url: 'https://www.pocketgamer.biz/hoyoverses-petit-planet-sets-december-4th-release-date/' },
    { label: 'The Games Wiki: Neighbors (Planettes)', url: 'https://thegameswiki.com/petit-planet/wiki/neighbors' },
  ],
};
