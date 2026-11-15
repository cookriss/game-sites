import { makeT } from '@gamesites/core/lib/i18n';

const en = {
  language: 'Language', about: 'About', privacy: 'Privacy', nav_games: 'Games', nav_calendar: 'Release calendar',
  disclaimer: 'Partida is an independent fan site. It is not affiliated with or endorsed by any game publisher. Game names and assets belong to their respective owners.',
  home_title: 'Partida: Game Maps, Guides and Databases in Your Language',
  home_desc: 'Interactive maps, databases and guides for new games, in English, Spanish and Portuguese. Plus a calendar of the next big launches.',
  home_h1: 'Maps, guides and databases for new games',
  home_lede: 'We cover new games from day one, in English, Spanish and Portuguese: where everything is, what every item does and how to progress.',
  games_h2: 'Games we cover', soon_h2: 'Coming soon', status_live: 'Available', status_soon: 'In progress', status_upcoming: 'Launches {date}',
  days_left: '{n} days to go', released: 'Out now', platforms: 'Platforms', open_section: 'Open section',
  cal_note: 'Dates are the ones announced by each publisher and may change.',
  about_title: 'About Partida', about_desc: 'Who we are and how Partida works.',
  about_p1: 'Partida is a free, independent site with maps, databases and guides for new games. We focus on being ready on launch day and on covering every game in English, Spanish and Portuguese.',
  about_p2: 'Game data comes from public sources and from playing the games. Each section credits its sources.',
  nf_title: 'Page not found', nf_p: 'This page does not exist.', nf_home: 'Go to the home page',
};
type D = typeof en;

const es: Partial<D> = {
  language: 'Idioma', about: 'Acerca de', privacy: 'Privacidad', nav_games: 'Juegos', nav_calendar: 'Calendario de lanzamientos',
  disclaimer: 'Partida es una web de fans independiente, sin relación con ningún editor de videojuegos ni respaldada por ellos. Los nombres y recursos de cada juego pertenecen a sus propietarios.',
  home_title: 'Partida: mapas, guías y bases de datos de videojuegos en español',
  home_desc: 'Mapas interactivos, bases de datos y guías de los juegos nuevos, en español, inglés y portugués. Y un calendario con los próximos grandes lanzamientos.',
  home_h1: 'Mapas, guías y bases de datos de los juegos nuevos',
  home_lede: 'Cubrimos los juegos nuevos desde el primer día, en español, inglés y portugués: dónde está cada cosa, qué hace cada objeto y cómo avanzar.',
  games_h2: 'Juegos que cubrimos', soon_h2: 'Próximamente', status_live: 'Disponible', status_soon: 'En preparación', status_upcoming: 'Sale el {date}',
  days_left: 'Faltan {n} días', released: 'Ya disponible', platforms: 'Plataformas', open_section: 'Abrir sección',
  cal_note: 'Las fechas son las anunciadas por cada editor y pueden cambiar.',
  about_title: 'Acerca de Partida', about_desc: 'Quiénes somos y cómo funciona Partida.',
  about_p1: 'Partida es una web gratuita e independiente con mapas, bases de datos y guías de juegos nuevos. Nos centramos en estar listos el día del lanzamiento y en cubrir cada juego en español, inglés y portugués.',
  about_p2: 'Los datos de los juegos salen de fuentes públicas y de jugar. Cada sección cita sus fuentes.',
  nf_title: 'Página no encontrada', nf_p: 'Esta página no existe.', nf_home: 'Ir a la portada',
};
const pt: Partial<D> = {
  language: 'Idioma', about: 'Sobre', privacy: 'Privacidade', nav_games: 'Jogos', nav_calendar: 'Calendário de lançamentos',
  disclaimer: 'Partida é um site de fãs independente, sem vínculo com nenhuma editora de jogos nem endossado por elas. Os nomes e recursos de cada jogo pertencem aos seus donos.',
  home_title: 'Partida: mapas, guias e bancos de dados de jogos em português',
  home_desc: 'Mapas interativos, bancos de dados e guias dos jogos novos, em português, inglês e espanhol. E um calendário com os próximos grandes lançamentos.',
  home_h1: 'Mapas, guias e bancos de dados dos jogos novos',
  home_lede: 'Cobrimos os jogos novos desde o primeiro dia, em português, inglês e espanhol: onde está cada coisa, o que cada item faz e como avançar.',
  games_h2: 'Jogos que cobrimos', soon_h2: 'Em breve', status_live: 'Disponível', status_soon: 'Em preparação', status_upcoming: 'Lança em {date}',
  days_left: 'Faltam {n} dias', released: 'Já disponível', platforms: 'Plataformas', open_section: 'Abrir seção',
  cal_note: 'As datas são as anunciadas por cada editora e podem mudar.',
  about_title: 'Sobre o Partida', about_desc: 'Quem somos e como o Partida funciona.',
  about_p1: 'Partida é um site gratuito e independente com mapas, bancos de dados e guias de jogos novos. Nosso foco é estar pronto no dia do lançamento e cobrir cada jogo em português, inglês e espanhol.',
  about_p2: 'Os dados dos jogos vêm de fontes públicas e de jogar. Cada seção cita suas fontes.',
  nf_title: 'Página não encontrada', nf_p: 'Esta página não existe.', nf_home: 'Ir para a página inicial',
};

export const useT = makeT<D>({ '': en, es, pt }, en);
export type T = ReturnType<typeof useT>;
