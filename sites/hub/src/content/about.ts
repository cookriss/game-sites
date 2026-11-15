import type { L } from './types';

/** "About" page: who runs the site, how content is made and corrected. {name}, {contact} and {owner} are filled at build time. */
export const ABOUT: { title: L; description: L; h1: L; lede: L; sections: { h: L; html: L }[] } = {
  title: { en: 'About {name}: who we are and how we work', es: 'Acerca de {name}: quiénes somos y cómo trabajamos', pt: 'Sobre {name}: quem somos e como trabalhamos' },
  description: {
    en: '{name} is an independent site with guides, lists and maps for new games in English, Spanish and Portuguese. How we research, cite sources and correct mistakes.',
    es: '{name} es una web independiente con guías, listas y mapas de juegos nuevos en español, inglés y portugués. Cómo investigamos, citamos fuentes y corregimos errores.',
    pt: '{name} é um site independente com guias, listas e mapas de jogos novos em português, inglês e espanhol. Como pesquisamos, citamos fontes e corrigimos erros.',
  },
  h1: { en: 'About {name}', es: 'Acerca de {name}', pt: 'Sobre {name}' },
  lede: {
    en: 'Guides, lists and maps for new games, ready from launch day, in English, Spanish and Portuguese.',
    es: 'Guías, listas y mapas de juegos nuevos, listos desde el día del lanzamiento, en español, inglés y portugués.',
    pt: 'Guias, listas e mapas de jogos novos, prontos desde o dia do lançamento, em português, inglês e espanhol.',
  },
  sections: [
    {
      h: { en: 'Who we are', es: 'Quiénes somos', pt: 'Quem somos' },
      html: {
        en: '<p>{name} is an independent site {owner} for players who want clear, reliable help with new games. Many guides only exist in English, and often arrive weeks after launch. We want players in every language to have good guides from day one.</p>',
        es: '<p>{name} es una web independiente {owner} para jugadores que quieren ayuda clara y fiable con los juegos nuevos. Muchas guías solo existen en inglés y suelen llegar semanas después del lanzamiento. Queremos que los jugadores de cualquier idioma tengan buenas guías desde el primer día.</p>',
        pt: '<p>{name} é um site independente {owner} para jogadores que querem ajuda clara e confiável com jogos novos. Muitos guias só existem em inglês e costumam chegar semanas depois do lançamento. Queremos que jogadores de qualquer idioma tenham bons guias desde o primeiro dia.</p>',
      },
    },
    {
      h: { en: 'What we cover', es: 'Qué cubrimos', pt: 'O que cobrimos' },
      html: {
        en: '<p>Each game gets its own section with an overview, beginner guides and searchable lists (items, characters, recipes, maps and more). We pick games with a big upcoming launch and start covering them before release, so the section is ready when players need it.</p>',
        es: '<p>Cada juego tiene su propia sección con un resumen, guías para empezar y listas con buscador (objetos, personajes, recetas, mapas y más). Elegimos juegos con un gran lanzamiento por delante y empezamos a cubrirlos antes de que salgan, para que la sección esté lista cuando los jugadores la necesiten.</p>',
        pt: '<p>Cada jogo tem sua própria seção com um resumo, guias para começar e listas com busca (itens, personagens, receitas, mapas e mais). Escolhemos jogos com um grande lançamento pela frente e começamos a cobri-los antes de saírem, para que a seção esteja pronta quando os jogadores precisarem.</p>',
      },
    },
    {
      h: { en: 'How we work', es: 'Cómo trabajamos', pt: 'Como trabalhamos' },
      html: {
        en: '<ul><li><b>Sources first.</b> Before launch we only publish what the developer has announced or what reputable outlets have reported from previews and betas. Every page lists its sources at the bottom.</li><li><b>Beta information is labelled.</b> When something comes from a closed beta and could change at launch, we say so.</li><li><b>Played, not copied.</b> After launch, lists and guides are built from playing the game and checked against it. We never use leaks or datamined files.</li><li><b>Dated pages.</b> Every page shows when it was last updated.</li><li><b>No empty pages.</b> Lists that do not have data yet are marked "coming soon" and kept out of search engines until they are filled.</li></ul>',
        es: '<ul><li><b>Primero las fuentes.</b> Antes del lanzamiento solo publicamos lo que ha anunciado el desarrollador o lo que han contado medios de confianza a partir de avances y betas. Cada página enumera sus fuentes al final.</li><li><b>Lo que viene de betas va marcado.</b> Cuando algo viene de una beta cerrada y podría cambiar al salir el juego, lo decimos.</li><li><b>Jugado, no copiado.</b> Tras el lanzamiento, las listas y guías se hacen jugando y se comprueban en el juego. Nunca usamos filtraciones ni archivos extraídos del juego.</li><li><b>Páginas con fecha.</b> Cada página muestra cuándo se actualizó por última vez.</li><li><b>Sin páginas vacías.</b> Las listas que aún no tienen datos se marcan como «próximamente» y no se muestran a los buscadores hasta que están completas.</li></ul>',
        pt: '<ul><li><b>Primeiro as fontes.</b> Antes do lançamento só publicamos o que o desenvolvedor anunciou ou o que veículos confiáveis relataram a partir de prévias e betas. Cada página lista suas fontes no final.</li><li><b>O que vem de betas é sinalizado.</b> Quando algo vem de um beta fechado e pode mudar no lançamento, avisamos.</li><li><b>Jogado, não copiado.</b> Depois do lançamento, as listas e guias são feitos jogando e conferidos no jogo. Nunca usamos vazamentos nem arquivos extraídos do jogo.</li><li><b>Páginas com data.</b> Cada página mostra quando foi atualizada pela última vez.</li><li><b>Sem páginas vazias.</b> Listas que ainda não têm dados ficam marcadas como "em breve" e fora dos buscadores até estarem completas.</li></ul>',
      },
    },
    {
      h: { en: 'Corrections', es: 'Correcciones', pt: 'Correções' },
      html: {
        en: '<p>If you find a mistake or something out of date, write to {contact}. We check every report, fix confirmed errors as soon as possible and update the page date. Significant changes to facts, such as a release date, are noted on the page.</p>',
        es: '<p>Si encuentras un error o algo desactualizado, escríbenos a {contact}. Revisamos cada aviso, corregimos los errores confirmados lo antes posible y actualizamos la fecha de la página. Los cambios importantes en los datos, como una fecha de lanzamiento, se indican en la propia página.</p>',
        pt: '<p>Se encontrar um erro ou algo desatualizado, escreva para {contact}. Verificamos cada aviso, corrigimos os erros confirmados o quanto antes e atualizamos a data da página. Mudanças importantes nos dados, como uma data de lançamento, são indicadas na própria página.</p>',
      },
    },
    {
      h: { en: 'Independence and advertising', es: 'Independencia y publicidad', pt: 'Independência e publicidade' },
      html: {
        en: '<p>{name} is not affiliated with any game developer or publisher, and no one pays us to cover a game or to say something about it. The site is free and funded by ads, which never decide what we write.</p>',
        es: '<p>{name} no está afiliada a ningún desarrollador ni editor de videojuegos, y nadie nos paga por cubrir un juego ni por decir nada sobre él. La web es gratuita y se financia con anuncios, que nunca deciden lo que escribimos.</p>',
        pt: '<p>{name} não é afiliado a nenhum desenvolvedor ou editora de jogos, e ninguém nos paga para cobrir um jogo ou dizer algo sobre ele. O site é gratuito e financiado por anúncios, que nunca decidem o que escrevemos.</p>',
      },
    },
    {
      h: { en: 'Images and game content', es: 'Imágenes y contenido de los juegos', pt: 'Imagens e conteúdo dos jogos' },
      html: {
        en: '<p>Illustrations on the site are our own. Game screenshots are taken by us and used to inform and comment. All game names and content belong to their owners. Rights holders can ask us to remove or credit anything at {contact}.</p>',
        es: '<p>Las ilustraciones de la web son propias. Las capturas de los juegos las hacemos nosotros y se usan para informar y comentar. Todos los nombres y contenidos de los juegos pertenecen a sus propietarios. Los titulares de derechos pueden pedirnos que retiremos o atribuyamos cualquier contenido en {contact}.</p>',
        pt: '<p>As ilustrações do site são próprias. As capturas de tela dos jogos são feitas por nós e usadas para informar e comentar. Todos os nomes e conteúdos dos jogos pertencem aos seus donos. Titulares de direitos podem pedir a remoção ou atribuição de qualquer conteúdo em {contact}.</p>',
      },
    },
    {
      h: { en: 'Contact', es: 'Contacto', pt: 'Contato' },
      html: {
        en: '<p>Questions, corrections or suggestions for games to cover: {contact}. Legal details are in the <a href="{L}/legal">legal notice</a>.</p>',
        es: '<p>Dudas, correcciones o sugerencias de juegos que cubrir: {contact}. Los datos legales están en el <a href="{L}/legal">aviso legal</a>.</p>',
        pt: '<p>Dúvidas, correções ou sugestões de jogos para cobrir: {contact}. Os dados legais estão no <a href="{L}/legal">aviso legal</a>.</p>',
      },
    },
  ],
};
