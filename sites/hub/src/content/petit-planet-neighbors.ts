import type { GamePageContent, L, Lang } from './types';
import { avatar, type Species } from './pp/art';

/**
 * Neighbors seen in official trailers and the three closed betas.
 * Birthdays, species and home galaxies come from beta builds and character teasers:
 * the page says they may change at launch.
 */
interface Neighbor {
  name: string;
  aka?: string;
  role: L;
  /** MM-DD */
  birthday?: string;
  species?: L;
  /** Drawn avatar style; others get an initial badge */
  kind?: Species;
  /** Real portrait path (e.g. /img/pp/mobai.webp) to replace the drawn avatar */
  image?: string;
  galaxy?: string;
  note?: L;
}

const NEIGHBORS: Neighbor[] = [
  { name: 'Mobai', kind: 'dog', role: { en: 'Life Coordinator', es: 'Coordinador de vida', pt: 'Coordenador de vida' }, birthday: '02-19', species: { en: 'Dog', es: 'Perro', pt: 'Cachorro' },
    note: { en: 'Your first contact. He represents the company that registers your planet and helps you settle in.', es: 'Tu primer contacto. Representa a la empresa que registra tu planeta y te ayuda a instalarte.', pt: 'Seu primeiro contato. Representa a empresa que registra seu planeta e ajuda você a se instalar.' } },
  { name: 'Elsasani', aka: 'Esassani', role: { en: 'Starsea Racer', es: 'Carreras por el Mar Estelar', pt: 'Corridas pelo Mar Estelar' }, birthday: '02-14',
    note: { en: 'Part of your starting support team. The 2025 reveal spelled the name Esassani.', es: 'Forma parte de tu equipo inicial. En el anuncio de 2025 su nombre aparecía como Esassani.', pt: 'Faz parte da sua equipe inicial. No anúncio de 2025 o nome aparecia como Esassani.' } },
  { name: 'Glenn', role: { en: 'Shopkeeper', es: 'Tienda', pt: 'Loja' }, birthday: '05-01',
    note: { en: 'Runs the shop where you buy items. Arrives early with Mobai and Elsasani.', es: 'Lleva la tienda donde compras objetos. Llega pronto, con Mobai y Elsasani.', pt: 'Cuida da loja onde você compra itens. Chega cedo, com Mobai e Elsasani.' } },
  { name: 'Yunguo', kind: 'red-panda', role: { en: 'Cultivator', es: 'Cultivadora', pt: 'Cultivadora' }, birthday: '09-19', species: { en: 'Red panda', es: 'Panda rojo', pt: 'Panda-vermelho' }, galaxy: 'Hexia',
    note: { en: 'Shy and loves plants. Her requests teach you to grow crops.', es: 'Tímida y amante de las plantas. Sus encargos te enseñan a cultivar.', pt: 'Tímida e apaixonada por plantas. Os pedidos dela ensinam você a cultivar.' } },
  { name: 'Isaki', role: { en: 'Beetle Trainer', es: 'Entrenamiento de escarabajos', pt: 'Treino de besouros' }, birthday: '07-22', galaxy: 'Hexia' },
  { name: 'Medowlyn', kind: 'sheep', role: { en: 'Plushie Designer', es: 'Diseñadora de peluches', pt: 'Designer de pelúcias' }, birthday: '07-05', species: { en: 'Sheep', es: 'Oveja', pt: 'Ovelha' }, galaxy: 'Norvan',
    note: { en: 'Linked to the Season of Snowfall story added in the final beta.', es: 'Ligada a la historia de la Temporada de Nevadas que llegó en la última beta.', pt: 'Ligada à história da Temporada de Neve que chegou no último beta.' } },
  { name: 'Msafiri', kind: 'caracal', role: { en: 'Adventure Guide', es: 'Guía de aventuras', pt: 'Guia de aventuras' }, birthday: '08-08', species: { en: 'Caracal', es: 'Caracal', pt: 'Caracal' }, galaxy: 'Taffeh' },
  { name: 'Frostia', role: { en: 'Mystic Scholar', es: 'Saber místico', pt: 'Saber místico' }, birthday: '09-09', galaxy: 'Norvan' },
  { name: 'Dorjelang', role: { en: 'Hatmaker', es: 'Sombrerería', pt: 'Chapelaria' }, birthday: '05-02', galaxy: 'Hexia',
    note: { en: 'Met on a Starsea Voyage in the betas.', es: 'En las betas se le encontraba en un viaje por el Mar Estelar.', pt: 'Nos betas aparecia em uma viagem pelo Mar Estelar.' } },
  { name: 'Mors', role: { en: 'Omni-Gallery Curator', es: 'Conservación de la Omnigalería', pt: 'Curadoria da Omnigaleria' }, birthday: '12-08',
    note: { en: 'Looks after the museum where your collection is displayed.', es: 'Cuida del museo donde se expone tu colección.', pt: 'Cuida do museu onde sua coleção fica exposta.' } },
  { name: 'Harpeno', role: { en: 'Starsea Patrol Officer', es: 'Patrulla del Mar Estelar', pt: 'Patrulha do Mar Estelar' }, birthday: '12-07', galaxy: 'Taffeh' },
  { name: 'Rebella', role: { en: 'Gemsmith', es: 'Gemas y joyería', pt: 'Gemas e joias' }, birthday: '02-09', galaxy: 'Norvan' },
  { name: 'Nerina', role: { en: 'Composer', es: 'Composición musical', pt: 'Composição musical' }, birthday: '06-08', galaxy: 'Pashah' },
  { name: 'Heyu', role: { en: 'Hot Spring Innkeeper', es: 'Posada de aguas termales', pt: 'Pousada de fonte termal' },
    note: { en: 'New in the final beta. Found on Starsea Voyages and can be invited to your planet.', es: 'Novedad de la última beta. Aparece en los viajes por el Mar Estelar y se le puede invitar a tu planeta.', pt: 'Novidade do último beta. Aparece nas viagens pelo Mar Estelar e dá para convidar para o seu planeta.' } },
  { name: 'Tika', role: { en: 'Agriculture Student', es: 'Estudios de agricultura', pt: 'Estudos de agricultura' },
    note: { en: 'New in the final beta. Found on Starsea Voyages.', es: 'Novedad de la última beta. Aparece en los viajes por el Mar Estelar.', pt: 'Novidade do último beta. Aparece nas viagens pelo Mar Estelar.' } },
  { name: 'Manna', aka: 'Manman', role: { en: 'Action Actor', es: 'Cine de acción', pt: 'Cinema de ação' },
    note: { en: 'New in the final beta. The beta notes say "Manman" and the official site says "Manna"; it is not yet clear if they are the same character.', es: 'Novedad de la última beta. Las notas de la beta dicen "Manman" y la web oficial "Manna"; aún no está claro si son el mismo personaje.', pt: 'Novidade do último beta. As notas do beta dizem "Manman" e o site oficial "Manna"; ainda não está claro se são o mesmo personagem.' } },
];

const T = {
  birthday: { en: 'Birthday', es: 'Cumpleaños', pt: 'Aniversário' },
  galaxy: { en: 'Home galaxy', es: 'Galaxia', pt: 'Galáxia' },
  aka: { en: 'also written', es: 'también aparece como', pt: 'também aparece como' },
};
const LOCALE: Record<Lang, string> = { en: 'en-GB', es: 'es-ES', pt: 'pt-BR' };
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function cards(lang: Lang): string {
  const day = (mmdd: string) => new Intl.DateTimeFormat(LOCALE[lang], { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(`2026-${mmdd}T00:00:00Z`));
  return '<div class="cards">' + NEIGHBORS.map((n) => {
    const id = n.name.toLowerCase();
    const meta = [
      n.species?.[lang],
      n.birthday && `${T.birthday[lang]}: ${day(n.birthday)}`,
      n.galaxy && `${T.galaxy[lang]}: ${n.galaxy}`,
    ].filter(Boolean).join(' · ');
    const pic = n.image ? `<img class="avatar" src="${n.image}" alt="${esc(n.name)}" width="72" height="72" loading="lazy">` : avatar(n.name, n.kind);
    return `<div class="ncard" id="${id}"><div class="nhead">${pic}<div><h3>${esc(n.name)}</h3><div class="role">${esc(n.role[lang])}</div></div></div>`
      + (meta ? `<p class="muted">${esc(meta)}</p>` : '')
      + (n.note ? `<p>${esc(n.note[lang])}</p>` : '')
      + (n.aka ? `<p class="muted small">${T.aka[lang]}: ${esc(n.aka)}</p>` : '')
      + '</div>';
  }).join('') + '</div>';
}

const count = NEIGHBORS.length;

export const petitPlanetNeighbors: GamePageContent = {
  slug: 'petit-planet',
  path: '/petit-planet/neighbors',
  crumb: { en: 'Neighbors', es: 'Vecinos', pt: 'Vizinhos' },
  name: 'Petit Planet',
  updated: '2026-11-15',
  title: {
    en: `Petit Planet Neighbors: All ${count} Known Characters, Roles and Birthdays`,
    es: `Vecinos de Petit Planet: los ${count} personajes conocidos, profesiones y cumpleaños`,
    pt: `Vizinhos de Petit Planet: os ${count} personagens conhecidos, profissões e aniversários`,
  },
  description: {
    en: `Every Petit Planet Neighbor revealed so far: Mobai, Yunguo, Medowlyn, Msafiri and ${count - 4} more, with profession, birthday and home galaxy from the betas.`,
    es: `Todos los vecinos de Petit Planet revelados hasta ahora: Mobai, Yunguo, Medowlyn, Msafiri y ${count - 4} más, con su profesión, cumpleaños y galaxia según las betas.`,
    pt: `Todos os vizinhos de Petit Planet revelados até agora: Mobai, Yunguo, Medowlyn, Msafiri e mais ${count - 4}, com profissão, aniversário e galáxia segundo os betas.`,
  },
  h1: { en: 'Petit Planet Neighbors', es: 'Vecinos de Petit Planet', pt: 'Vizinhos de Petit Planet' },
  lede: {
    en: `Neighbors are the animal characters who move to your planet. These are the ${count} revealed in trailers and the closed betas.`,
    es: `Los vecinos son los personajes animales que se mudan a tu planeta. Estos son los ${count} que se han visto en tráilers y en las betas cerradas.`,
    pt: `Os vizinhos são os personagens animais que se mudam para o seu planeta. Estes são os ${count} vistos em trailers e nos betas fechados.`,
  },
  sections: [
    {
      id: 'list',
      h: { en: 'All known Neighbors', es: 'Todos los vecinos conocidos', pt: 'Todos os vizinhos conhecidos' },
      html: {
        en: cards('en') + '<p class="note">Birthdays and galaxies come from the betas and character teasers and could change at launch. We will update this list, and add each Neighbor\'s favorite gifts, from 4 December.</p>',
        es: cards('es') + '<p class="note">Los cumpleaños y las galaxias vienen de las betas y de los avances de personajes, y podrían cambiar en el lanzamiento. Actualizaremos la lista, y añadiremos los regalos favoritos de cada vecino, a partir del 4 de diciembre.</p>',
        pt: cards('pt') + '<p class="note">Os aniversários e as galáxias vêm dos betas e das prévias de personagens, e podem mudar no lançamento. Vamos atualizar a lista, e adicionar os presentes favoritos de cada vizinho, a partir de 4 de dezembro.</p>',
      },
    },
    {
      id: 'how',
      h: { en: 'How Neighbors work', es: 'Cómo funcionan los vecinos', pt: 'Como os vizinhos funcionam' },
      html: {
        en: '<ul><li><b>Arriving:</b> a few come at the start, more join as your Luca Arbor grows, and others are found on islets during Starsea Voyages and invited to move in.</li><li><b>Friendship:</b> talk to them, give gifts they like and complete their requests. Higher friendship unlocks their story, new items, recipes and services.</li><li><b>Gifts:</b> each Neighbor has likes and dislikes. A disliked gift, or handing back something they just gave you, upsets them.</li><li><b>Voyages:</b> you can take a Neighbor with you on a Starsea Voyage, and they gather resources based on their skills.</li></ul>',
        es: '<ul><li><b>Cómo llegan:</b> algunos están desde el principio, otros se unen a medida que crece tu Árbol Luca y otros se encuentran en islotes durante los viajes por el Mar Estelar y se les invita a mudarse.</li><li><b>Amistad:</b> habla con ellos, hazles regalos que les gusten y cumple sus encargos. Con más amistad desbloqueas su historia, objetos nuevos, recetas y servicios.</li><li><b>Regalos:</b> cada vecino tiene gustos y manías. Un regalo que no le gusta, o devolverle algo que te acaba de dar, le molesta.</li><li><b>Viajes:</b> puedes llevar a un vecino en los viajes por el Mar Estelar, y recoge recursos según sus habilidades.</li></ul>',
        pt: '<ul><li><b>Como chegam:</b> alguns estão desde o começo, outros chegam conforme sua Árvore Luca cresce e outros são encontrados em ilhotas nas viagens pelo Mar Estelar e convidados a se mudar.</li><li><b>Amizade:</b> converse com eles, dê presentes de que gostem e cumpra os pedidos deles. Com mais amizade você desbloqueia a história deles, novos itens, receitas e serviços.</li><li><b>Presentes:</b> cada vizinho tem gostos e manias. Um presente de que não gosta, ou devolver algo que ele acabou de te dar, o deixa chateado.</li><li><b>Viagens:</b> você pode levar um vizinho nas viagens pelo Mar Estelar, e ele coleta recursos de acordo com suas habilidades.</li></ul>',
      },
    },
    {
      id: 'others',
      h: { en: 'Other characters', es: 'Otros personajes', pt: 'Outros personagens' },
      html: {
        en: '<p><b>Oumuamua</b> is a Starsea Spirit who travels with you, not a Neighbor. <b>Nalo</b> staffs the café in the Galactic Bazaar. <b>Tala</b> and <b>Tata</b> were spotted in the betas but have not been confirmed as Neighbors.</p>',
        es: '<p><b>Oumuamua</b> es un Espíritu del Mar Estelar que viaja contigo, no un vecino. <b>Nalo</b> atiende la cafetería del Bazar Galáctico. <b>Tala</b> y <b>Tata</b> se vieron en las betas, pero no se ha confirmado que sean vecinos.</p>',
        pt: '<p><b>Oumuamua</b> é um Espírito do Mar Estelar que viaja com você, não um vizinho. <b>Nalo</b> atende o café do Bazar Galáctico. <b>Tala</b> e <b>Tata</b> foram vistos nos betas, mas não foi confirmado que são vizinhos.</p>',
      },
    },
  ],
  faq: [
    {
      q: { en: 'How many Neighbors are in Petit Planet?', es: '¿Cuántos vecinos hay en Petit Planet?', pt: 'Quantos vizinhos tem Petit Planet?' },
      a: { en: `${count} Neighbors have been shown so far. HoYoverse has said more will move in over time.`, es: `Hasta ahora se han mostrado ${count} vecinos. HoYoverse ha dicho que irán llegando más.`, pt: `Até agora foram mostrados ${count} vizinhos. A HoYoverse disse que mais vão chegar com o tempo.` },
    },
    {
      q: { en: 'Who is the first Neighbor?', es: '¿Quién es el primer vecino?', pt: 'Quem é o primeiro vizinho?' },
      a: { en: 'Mobai, the Life Coordinator, meets you when you arrive, together with Glenn and Elsasani.', es: 'Mobai, el coordinador de vida, te recibe al llegar, junto con Glenn y Elsasani.', pt: 'Mobai, o coordenador de vida, recebe você na chegada, junto com Glenn e Elsasani.' },
    },
    {
      q: { en: 'Can you take Neighbors on Starsea Voyages?', es: '¿Puedes llevar vecinos en los viajes por el Mar Estelar?', pt: 'Dá para levar vizinhos nas viagens pelo Mar Estelar?' },
      a: { en: 'Yes. In the betas you could bring a Neighbor along, and they helped gather resources using their skills.', es: 'Sí. En las betas podías llevar a un vecino y te ayudaba a recoger recursos con sus habilidades.', pt: 'Sim. Nos betas dava para levar um vizinho, e ele ajudava a coletar recursos com suas habilidades.' },
    },
  ],
  sources: [
    { label: 'Siliconera: character trailers introduce Medowlyn, Msafiri and Yunguo', url: 'https://www.siliconera.com/petit-planet-character-trailers-introduce-medowlyn-msafiri-and-yunguo/' },
    { label: 'Siliconera: final beta test gets winter and Season of Snowfall', url: 'https://www.siliconera.com/petit-planet-final-beta-test-gets-winter-and-season-of-snowfall/' },
    { label: 'TheSixthAxis: Petit Planet preview', url: 'https://www.thesixthaxis.com/2026/04/21/petit-planet-preview-taking-a-cosy-break-from-your-genshin-impact/' },
    { label: 'TechWiser: Petit Planet Neighbors (beta data)', url: 'https://techwiser.com/petit-planet-neighbors/' },
    { label: 'The Games Wiki: Neighbors', url: 'https://thegameswiki.com/petit-planet/wiki/neighbors' },
  ],
};
