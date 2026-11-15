import type { GamePageContent } from './types';

export const petitPlanet: GamePageContent = {
  slug: 'petit-planet',
  name: 'Petit Planet',
  updated: '2026-11-15',
  release: '2026-12-04',
  title: {
    en: 'Petit Planet: Release Date, Platforms, Gameplay and Launch Events',
    es: 'Petit Planet: fecha de lanzamiento, plataformas, cómo se juega y eventos',
    pt: 'Petit Planet: data de lançamento, plataformas, jogabilidade e eventos',
  },
  description: {
    en: 'Everything confirmed about HoYoverse\'s Petit Planet: global launch on 4 December 2026, PC and mobile, free to play, Neighbors, the Starsea and pre-registration rewards.',
    es: 'Todo lo confirmado de Petit Planet de HoYoverse: lanzamiento global el 4 de diciembre de 2026 en PC y móvil, gratis, vecinos, el Mar Estelar y recompensas de prerregistro.',
    pt: 'Tudo o que foi confirmado sobre Petit Planet da HoYoverse: lançamento global em 4 de dezembro de 2026 no PC e celular, grátis, vizinhos, o Mar Estelar e recompensas de pré-registro.',
  },
  h1: {
    en: 'Petit Planet: everything we know before launch',
    es: 'Petit Planet: todo lo que sabemos antes del lanzamiento',
    pt: 'Petit Planet: tudo o que sabemos antes do lançamento',
  },
  lede: {
    en: 'HoYoverse\'s free cozy life sim launches worldwide on 4 December 2026. Here is what is confirmed so far, with sources.',
    es: 'El simulador de vida relajada y gratuito de HoYoverse sale en todo el mundo el 4 de diciembre de 2026. Esto es lo confirmado hasta ahora, con fuentes.',
    pt: 'O simulador de vida tranquila e gratuito da HoYoverse chega no mundo todo em 4 de dezembro de 2026. Isto é o que já foi confirmado, com fontes.',
  },
  facts: [
    { label: { en: 'Release date', es: 'Fecha de lanzamiento', pt: 'Data de lançamento' }, value: { en: '4 December 2026 (global)', es: '4 de diciembre de 2026 (global)', pt: '4 de dezembro de 2026 (global)' } },
    { label: { en: 'Developer', es: 'Desarrollador', pt: 'Desenvolvedora' }, value: { en: 'HoYoverse (Genshin Impact, Honkai: Star Rail)', es: 'HoYoverse (Genshin Impact, Honkai: Star Rail)', pt: 'HoYoverse (Genshin Impact, Honkai: Star Rail)' } },
    { label: { en: 'Platforms', es: 'Plataformas', pt: 'Plataformas' }, value: { en: 'PC (HoYoPlay, Epic Games Store), iOS, Android. Switch 2 in 2027', es: 'PC (HoYoPlay, Epic Games Store), iOS y Android. Switch 2 en 2027', pt: 'PC (HoYoPlay, Epic Games Store), iOS e Android. Switch 2 em 2027' } },
    { label: { en: 'Price', es: 'Precio', pt: 'Preço' }, value: { en: 'Free to play', es: 'Gratis', pt: 'Grátis' } },
    { label: { en: 'Cross-progression', es: 'Progreso cruzado', pt: 'Progresso cruzado' }, value: { en: 'Yes, between PC and mobile', es: 'Sí, entre PC y móvil', pt: 'Sim, entre PC e celular' } },
    { label: { en: 'Genre', es: 'Género', pt: 'Gênero' }, value: { en: 'Cozy life sim with social features', es: 'Simulador de vida relajada con funciones sociales', pt: 'Simulador de vida tranquila com recursos sociais' } },
  ],
  sections: [
    {
      id: 'what',
      h: { en: 'What is Petit Planet?', es: '¿Qué es Petit Planet?', pt: 'O que é Petit Planet?' },
      html: {
        en: '<p>You play a <b>Planet Tender</b> who travels the Starsea with Oumuamua, a Starsea Spirit. You plant a <b>Luca Seed</b> that grows into a <b>Luca Arbor</b>, and as it grows your planet\'s landscape, seasons and ecosystem change.</p><p>Neighbors move in over time, each with their own story. The first two are Planet Coordinator <b>Mobai</b> and Starsea Racer <b>Elsasani</b>. You can sail the Starsea to explore small islets, and visit the <b>Galactic Bazaar</b> for minigames, auctions and sharing your creations.</p><p>More in our <a href="{L}/petit-planet/guide">beginner guide</a> and the <a href="{L}/petit-planet/neighbors">list of Neighbors</a>.</p>',
        es: '<p>Eres un <b>Cuidador de Planetas</b> que viaja por el Mar Estelar con Oumuamua, un Espíritu del Mar Estelar. Plantas una <b>Semilla Luca</b> que crece hasta convertirse en un <b>Árbol Luca</b>, y a medida que crece cambian el paisaje, las estaciones y el ecosistema de tu planeta.</p><p>Con el tiempo llegan vecinos, cada uno con su historia. Los dos primeros son <b>Mobai</b>, coordinador planetario, y <b>Elsasani</b>, que compite en carreras por el Mar Estelar. Puedes navegar por el Mar Estelar para explorar islotes y visitar el <b>Bazar Galáctico</b>, con minijuegos, subastas y un sitio para compartir tus creaciones.</p><p>Más detalles en la <a href="{L}/petit-planet/guide">guía para empezar</a> y en la <a href="{L}/petit-planet/neighbors">lista de vecinos</a>.</p>',
        pt: '<p>Você é um <b>Cuidador de Planetas</b> que viaja pelo Mar Estelar com Oumuamua, um Espírito do Mar Estelar. Você planta uma <b>Semente Luca</b> que cresce e vira uma <b>Árvore Luca</b>, e conforme ela cresce mudam a paisagem, as estações e o ecossistema do seu planeta.</p><p>Com o tempo chegam vizinhos, cada um com sua história. Os dois primeiros são <b>Mobai</b>, coordenador planetário, e <b>Elsasani</b>, que disputa corridas pelo Mar Estelar. Dá para navegar pelo Mar Estelar para explorar ilhotas e visitar o <b>Bazar Galáctico</b>, com minijogos, leilões e um lugar para compartilhar suas criações.</p><p>Mais detalhes no <a href="{L}/petit-planet/guide">guia para começar</a> e na <a href="{L}/petit-planet/neighbors">lista de vizinhos</a>.</p>',
      },
    },
    {
      id: 'collect',
      h: { en: 'Clothing, furniture and creations', es: 'Ropa, muebles y creaciones', pt: 'Roupas, móveis e criações' },
      html: {
        en: '<p>HoYoverse says there are <b>more than 1,000 clothing and furniture items</b> you can earn for free through normal play. Creations can be shared with other players, and the first <b>Seasonal Creation Event</b> starts on launch day with in-game rewards, cash prizes and official merchandise for selected entries.</p>',
        es: '<p>HoYoverse asegura que hay <b>más de 1.000 prendas y muebles</b> que se consiguen gratis jugando. Las creaciones se pueden compartir con otros jugadores, y el primer <b>Evento de Creación de Temporada</b> empieza el día del lanzamiento, con recompensas en el juego, premios en metálico y merchandising oficial para las creaciones elegidas.</p>',
        pt: '<p>A HoYoverse diz que há <b>mais de 1.000 roupas e móveis</b> que podem ser ganhos de graça jogando. As criações podem ser compartilhadas com outros jogadores, e o primeiro <b>Evento de Criação da Temporada</b> começa no dia do lançamento, com recompensas no jogo, prêmios em dinheiro e produtos oficiais para as criações escolhidas.</p>',
      },
    },
    {
      id: 'prereg',
      h: { en: 'Pre-registration and launch events', es: 'Prerregistro y eventos de lanzamiento', pt: 'Pré-registro e eventos de lançamento' },
      html: {
        en: '<ul><li><b>Pre-registration lucky draw</b> on the official website, with physical prizes and outfit sets.</li><li><b>"Besties, Made to Match!"</b>: pre-register with two friends and each of you gets an exclusive outfit item.</li><li><b>"Launch a Planet"</b> (from 1 November): design a planet on the event website for a chance at grand prizes.</li><li><b>Seasonal Creation Event</b> from launch day.</li></ul>',
        es: '<ul><li><b>Sorteo de prerregistro</b> en la web oficial, con premios físicos y conjuntos de ropa.</li><li><b>"Besties, Made to Match!"</b>: si te prerregistras con dos amigos, cada uno recibe una prenda exclusiva.</li><li><b>"Launch a Planet"</b> (desde el 1 de noviembre): diseña un planeta en la web del evento y opta a grandes premios.</li><li><b>Evento de Creación de Temporada</b> desde el día del lanzamiento.</li></ul>',
        pt: '<ul><li><b>Sorteio de pré-registro</b> no site oficial, com prêmios físicos e conjuntos de roupas.</li><li><b>"Besties, Made to Match!"</b>: pré-registre-se com dois amigos e cada um ganha uma roupa exclusiva.</li><li><b>"Launch a Planet"</b> (desde 1º de novembro): crie um planeta no site do evento e concorra a grandes prêmios.</li><li><b>Evento de Criação da Temporada</b> a partir do dia do lançamento.</li></ul>',
      },
    },
    {
      id: 'betas',
      h: { en: 'Closed betas', es: 'Betas cerradas', pt: 'Betas fechados' },
      html: {
        en: '<p>HoYoverse ran three closed betas: the <b>Coziness Test</b> (November 2025), the <b>Stardrift Test</b> (April 2026) and the <b>Final Beta</b> (September 2026), which added winter, a seasonal story, batch cooking and flower crossbreeding. All have ended and beta progress was wiped. <a href="{L}/petit-planet/betas">What each beta added</a>.</p>',
        es: '<p>HoYoverse hizo tres betas cerradas: la <b>Coziness Test</b> (noviembre de 2025), la <b>Stardrift Test</b> (abril de 2026) y la <b>beta final</b> (septiembre de 2026), que añadió el invierno, una historia de temporada, la cocina por lotes y el cruce de flores. Todas han terminado y el progreso se borró. <a href="{L}/petit-planet/betas">Qué añadió cada beta</a>.</p>',
        pt: '<p>A HoYoverse fez três betas fechados: o <b>Coziness Test</b> (novembro de 2025), o <b>Stardrift Test</b> (abril de 2026) e o <b>beta final</b> (setembro de 2026), que trouxe o inverno, uma história sazonal, o preparo em lote e o cruzamento de flores. Todos já terminaram e o progresso foi apagado. <a href="{L}/petit-planet/betas">O que cada beta trouxe</a>.</p>',
      },
    },
    {
      id: 'unknown',
      h: { en: 'Not announced yet', es: 'Lo que aún no se ha anunciado', pt: 'O que ainda não foi anunciado' },
      html: {
        en: '<p>The exact launch time, pre-download details, PC requirements, download size and full language list have not been published yet. We will add them here as soon as HoYoverse confirms them.</p>',
        es: '<p>Aún no se han publicado la hora exacta de lanzamiento, los detalles de la predescarga, los requisitos de PC, el tamaño de descarga ni la lista completa de idiomas. Los añadiremos aquí en cuanto HoYoverse los confirme.</p>',
        pt: '<p>Ainda não foram divulgados o horário exato de lançamento, os detalhes do pré-download, os requisitos de PC, o tamanho do download nem a lista completa de idiomas. Vamos adicioná-los aqui assim que a HoYoverse confirmar.</p>',
      },
    },
  ],
  faq: [
    {
      q: { en: 'When does Petit Planet come out?', es: '¿Cuándo sale Petit Planet?', pt: 'Quando Petit Planet será lançado?' },
      a: { en: 'Petit Planet launches worldwide on 4 December 2026 on PC, iOS and Android.', es: 'Petit Planet sale en todo el mundo el 4 de diciembre de 2026 en PC, iOS y Android.', pt: 'Petit Planet chega no mundo todo em 4 de dezembro de 2026 no PC, iOS e Android.' },
    },
    {
      q: { en: 'Is Petit Planet free?', es: '¿Petit Planet es gratis?', pt: 'Petit Planet é grátis?' },
      a: { en: 'Yes. It is free to play, and HoYoverse says over 1,000 clothing and furniture items can be earned through normal play.', es: 'Sí. Es gratuito, y HoYoverse asegura que más de 1.000 prendas y muebles se consiguen jugando.', pt: 'Sim. É gratuito, e a HoYoverse diz que mais de 1.000 roupas e móveis podem ser ganhos jogando.' },
    },
    {
      q: { en: 'Is Petit Planet coming to Switch?', es: '¿Saldrá Petit Planet en Switch?', pt: 'Petit Planet vai sair no Switch?' },
      a: { en: 'A Nintendo Switch 2 version is planned for 2027. There is no date yet.', es: 'Hay una versión para Nintendo Switch 2 prevista para 2027, todavía sin fecha.', pt: 'Uma versão para Nintendo Switch 2 está prevista para 2027, ainda sem data.' },
    },
    {
      q: { en: 'Does Petit Planet have cross-progression?', es: '¿Petit Planet tiene progreso cruzado?', pt: 'Petit Planet tem progresso cruzado?' },
      a: { en: 'Yes, progress carries over between PC and mobile.', es: 'Sí, el progreso se comparte entre PC y móvil.', pt: 'Sim, o progresso é compartilhado entre PC e celular.' },
    },
    {
      q: { en: 'Can I pre-download Petit Planet?', es: '¿Se puede predescargar Petit Planet?', pt: 'Dá para pré-baixar Petit Planet?' },
      a: { en: 'Not yet. HoYoverse has not announced pre-download. In its other games it usually opens one or two days before launch.', es: 'Todavía no. HoYoverse no ha anunciado la predescarga. En sus otros juegos suele abrirla uno o dos días antes del lanzamiento.', pt: 'Ainda não. A HoYoverse não anunciou o pré-download. Nos outros jogos dela, ele costuma abrir um ou dois dias antes do lançamento.' },
    },
    {
      q: { en: 'Where can I download it on PC?', es: '¿Dónde se descarga en PC?', pt: 'Onde baixar no PC?' },
      a: { en: 'On PC it will be on the HoYoPlay launcher and the Epic Games Store.', es: 'En PC estará en el launcher HoYoPlay y en la Epic Games Store.', pt: 'No PC estará no launcher HoYoPlay e na Epic Games Store.' },
    },
    {
      q: { en: 'Is there a beta I can join?', es: '¿Hay alguna beta a la que pueda apuntarme?', pt: 'Tem algum beta em que eu possa entrar?' },
      a: { en: 'No. The three closed betas have ended. The next step is the launch on 4 December.', es: 'No. Las tres betas cerradas ya terminaron. Lo siguiente es el lanzamiento del 4 de diciembre.', pt: 'Não. Os três betas fechados já terminaram. O próximo passo é o lançamento em 4 de dezembro.' },
    },
    {
      q: { en: 'Is Petit Planet multiplayer?', es: '¿Petit Planet es multijugador?', pt: 'Petit Planet é multijogador?' },
      a: { en: 'Yes. You can visit other players\' planets, meet in the Galactic Bazaar and exchange anonymous Star Notes. Your own planet is yours to tend, and you set what visitors can do.', es: 'Sí. Puedes visitar los planetas de otros jugadores, quedar en el Bazar Galáctico e intercambiar Notas Estelares anónimas. Tu planeta es solo tuyo, y tú decides qué pueden hacer las visitas.', pt: 'Sim. Você pode visitar os planetas de outros jogadores, se encontrar no Bazar Galáctico e trocar Notas Estelares anônimas. Seu planeta é só seu, e você decide o que os visitantes podem fazer.' },
    },
    {
      q: { en: 'Is there combat?', es: '¿Tiene combate?', pt: 'Tem combate?' },
      a: { en: 'No. Petit Planet is a life sim without combat.', es: 'No. Petit Planet es un simulador de vida sin combate.', pt: 'Não. Petit Planet é um simulador de vida sem combate.' },
    },
    {
      q: { en: 'Are there Petit Planet codes?', es: '¿Hay códigos de Petit Planet?', pt: 'Existem códigos de Petit Planet?' },
      a: { en: 'Not before launch. We will list them on our codes page from 4 December.', es: 'No antes del lanzamiento. Los pondremos en nuestra página de códigos a partir del 4 de diciembre.', pt: 'Não antes do lançamento. Vamos listá-los na nossa página de códigos a partir de 4 de dezembro.' },
    },
  ],
  sources: [
    { label: 'PocketGamer.biz: Petit Planet sets December 4th release date', url: 'https://www.pocketgamer.biz/hoyoverses-petit-planet-sets-december-4th-release-date/' },
    { label: 'PocketGamer.biz: Petit Planet entering closed beta on November 7th', url: 'https://www.pocketgamer.biz/hoyoverses-petit-planet-entering-closed-beta-on-november-7th' },
    { label: 'Siliconera: Petit Planet Stardrift closed beta test starts in April', url: 'https://siliconera.com/petit-planet-stardrift-closed-beta-test-starts-in-april/' },
    { label: 'PocketGamer.biz: closed beta features new neighbours and enhanced Starsea Voyages', url: 'https://www.pocketgamer.biz/closed-beta-for-hoyoverses-petit-planet-will-feature-new-neighbours-and-enhanced-starsea-voyages' },
    { label: 'Siliconera: final beta test gets winter and Season of Snowfall', url: 'https://www.siliconera.com/petit-planet-final-beta-test-gets-winter-and-season-of-snowfall/' },
    { label: 'Massively OP: Petit Planet introduces its characters, gameplay and multiplayer', url: 'https://massivelyop.com/2026/11/04/petit-planet-introduces-its-characters-gameplay-and-multiplayer-activities-ahead-of-its-december-launch/' },
    { label: 'MMOBomb: HoYoverse drops launch date for cozy MMO Petit Planet', url: 'https://www.mmobomb.com/news/hoyoverse-drops-launch-date-cozy-mmo-petit-planet' },
  ],
};
