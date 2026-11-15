/** Games the hub covers or will cover. Order = order on the home page. */
export interface Game {
  slug: string;
  name: string;
  publisher: string;
  /** ISO date of launch; undefined = playable already (alpha/early access). */
  release?: string;
  /** 'live' = section published, 'soon' = section being built, 'upcoming' = tracked launch. */
  status: 'live' | 'soon' | 'upcoming';
  platforms: string;
  color: string;
  blurb: Record<'en' | 'es' | 'pt', string>;
}

export const GAMES: Game[] = [
  {
    slug: 'soulframe', name: 'Soulframe', publisher: 'Digital Extremes', status: 'soon', platforms: 'PC', color: '#7a9a6a',
    blurb: {
      en: 'Free fantasy action RPG from the makers of Warframe. Open to every PC player since 6 November 2026.',
      es: 'RPG de acción de fantasía gratuito de los creadores de Warframe. Abierto a todos en PC desde el 6 de noviembre de 2026.',
      pt: 'RPG de ação de fantasia gratuito dos criadores de Warframe. Aberto a todos no PC desde 6 de novembro de 2026.',
    },
  },
  {
    slug: 'petit-planet', name: 'Petit Planet', publisher: 'HoYoverse', release: '2026-12-04', status: 'upcoming', platforms: 'PC, iOS, Android', color: '#6fb6d6',
    blurb: {
      en: 'Free cozy life-sim MMO from the studio behind Genshin Impact.',
      es: 'MMO gratuito de vida relajada del estudio de Genshin Impact.',
      pt: 'MMO gratuito de vida tranquila do estúdio de Genshin Impact.',
    },
  },
  {
    slug: 'silver-palace', name: 'Silver Palace', publisher: 'Elementa', release: '2026-12-14', status: 'upcoming', platforms: 'PC, PS5, iOS, Android', color: '#9a8ac2',
    blurb: {
      en: 'Free Victorian detective action RPG with an open world.',
      es: 'RPG de acción gratuito de detectives en un mundo abierto victoriano.',
      pt: 'RPG de ação gratuito de detetives em um mundo aberto vitoriano.',
    },
  },
  {
    slug: 'ananta', name: 'Ananta', publisher: 'NetEase', release: '2027-01-15', status: 'upcoming', platforms: 'PC, PS5, iOS, Android', color: '#e07a5f',
    blurb: {
      en: 'Free urban open-world action game. Over 17 million pre-registrations.',
      es: 'Juego de acción gratuito en una ciudad de mundo abierto. Más de 17 millones de prerregistros.',
      pt: 'Jogo de ação gratuito em uma cidade de mundo aberto. Mais de 17 milhões de pré-registros.',
    },
  },
  {
    slug: 'witchbrook', name: 'Witchbrook', publisher: 'Chucklefish', release: '2027-01-28', status: 'upcoming', platforms: 'PC', color: '#c98bb9',
    blurb: {
      en: 'Life sim at a magic school, one of the most wishlisted games on Steam.',
      es: 'Simulador de vida en una escuela de magia, de los más deseados en Steam.',
      pt: 'Simulador de vida em uma escola de magia, um dos mais desejados na Steam.',
    },
  },
];
