import type { SiteConfig } from '../lib/types';

/**
 * Legal pages shared by every site: legal notice (LSSI), privacy policy (GDPR),
 * cookie policy and terms of use, in English, Spanish and Portuguese.
 * The owner is based in Spain, so Spanish law applies.
 */
export type LegalDocId = 'legal' | 'privacy' | 'cookies' | 'terms';
export type LegalLang = 'en' | 'es' | 'pt';
export const LEGAL_DOCS: LegalDocId[] = ['legal', 'privacy', 'cookies', 'terms'];
export const LEGAL_LANGS: LegalLang[] = ['en', 'es', 'pt'];
/** Bump when the texts change. */
export const LEGAL_UPDATED = '2026-11-15';

export interface LegalDoc { title: string; description: string; sections: { h?: string; html: string[] }[] }

export const legalLang = (lang: string): LegalLang => (lang.startsWith('es') ? 'es' : lang.startsWith('pt') ? 'pt' : 'en');

export const LEGAL_LABELS: Record<LegalLang, Record<LegalDocId, string> & { cookieSettings: string; updated: string; contact: string }> = {
  en: { legal: 'Legal notice', privacy: 'Privacy', cookies: 'Cookies', terms: 'Terms', cookieSettings: 'Cookie settings', updated: 'Last updated', contact: 'Contact' },
  es: { legal: 'Aviso legal', privacy: 'Privacidad', cookies: 'Cookies', terms: 'Términos', cookieSettings: 'Configurar cookies', updated: 'Última actualización', contact: 'Contacto' },
  pt: { legal: 'Aviso legal', privacy: 'Privacidade', cookies: 'Cookies', terms: 'Termos', cookieSettings: 'Configurar cookies', updated: 'Última atualização', contact: 'Contato' },
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const mail = (e: string) => (e ? `<a href="mailto:${esc(e)}">${esc(e)}</a>` : '');
const a = (href: string, text: string) => `<a href="${href}" rel="noopener">${text}</a>`;
const ul = (items: (string | false | undefined)[]) => `<ul>${items.filter(Boolean).map((i) => `<li>${i}</li>`).join('')}</ul>`;
const table = (head: string[], rows: string[][]) =>
  `<div class="table-wrap"><table class="legal-table"><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

export function legalDoc(id: LegalDocId, lang: LegalLang, site: SiteConfig): LegalDoc {
  const o = site.owner ?? { name: '', taxId: '', address: '', email: '' };
  const host = site.url.replace(/^https?:\/\//, '');
  const name = esc(site.name);
  const owner = esc(o.name || site.name);
  const src = site.dataSource;
  const pubList = (site.publishers ?? []).map(esc).join(', ');
  const L = {
    en: { pubs: pubList || 'the publishers of the games it covers', contact: o.email ? mail(o.email) : 'the email address in the legal notice' },
    es: { pubs: pubList || 'los editores de los juegos que cubre', contact: o.email ? mail(o.email) : 'el correo indicado en el aviso legal' },
    pt: { pubs: pubList || 'as editoras dos jogos que cobre', contact: o.email ? mail(o.email) : 'o e-mail indicado no aviso legal' },
  }[lang];
  const ownerList = (labels: [string, string, string, string]) => ul([
    o.name && `<b>${labels[0]}:</b> ${esc(o.name)}`,
    o.taxId && `<b>${labels[1]}:</b> ${esc(o.taxId)}`,
    o.address && `<b>${labels[2]}:</b> ${esc(o.address)}`,
    o.email && `<b>${labels[3]}:</b> ${mail(o.email)}`,
    `<b>Web:</b> ${esc(host)}`,
  ]);
  const AEPD = a('https://www.aepd.es', 'aepd.es');
  const ADS_SETTINGS = 'https://adssettings.google.com';
  const PARTNER = 'https://policies.google.com/technologies/partner-sites';
  const GOOGLE_PRIVACY = 'https://policies.google.com/privacy';
  const CF_PRIVACY = 'https://www.cloudflare.com/privacypolicy/';

  // ---------------------------------------------------------------- Spanish
  if (lang === 'es') {
    const docs: Record<LegalDocId, LegalDoc> = {
      legal: {
        title: 'Aviso legal',
        description: `Aviso legal, datos del titular y condiciones generales de ${site.name}.`,
        sections: [
          { h: '1. Titular del sitio web', html: ['En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:', ownerList(['Titular', 'NIF', 'Domicilio', 'Correo electrónico'])] },
          { h: '2. Objeto del sitio', html: [`${name} es una web de fans gratuita con guías, listas, mapas y herramientas sobre ${esc(site.game)}. El acceso es libre, no requiere registro y no se vende ningún producto ni servicio. El sitio se financia con publicidad.`] },
          { h: '3. Relación con los editores de los juegos', html: [`${name} es una web independiente y no está afiliada, patrocinada ni respaldada por ${L.pubs}. Los nombres de los juegos, personajes, objetos, logotipos e imágenes son marcas y obras de sus respectivos titulares.`] },
          { h: '4. Propiedad intelectual', html: [`El diseño, el código, las ilustraciones propias y los textos originales de este sitio pertenecen a su titular. Puedes citar o enlazar nuestras páginas siempre que indiques la fuente con un enlace. No está permitido copiar de forma sistemática los textos, listas o bases de datos del sitio.`, `Las capturas de pantalla y los datos de los juegos se usan con fines informativos y de comentario, al amparo del derecho de cita (artículo 32 del Texto Refundido de la Ley de Propiedad Intelectual). Si eres titular de algún contenido y quieres que lo retiremos o lo atribuyamos de otra forma, escríbenos a ${L.contact} y lo atenderemos en un plazo máximo de 7 días.`] },
          { h: '5. Exactitud de la información', html: ['Revisamos y citamos las fuentes de lo que publicamos, pero la información sobre juegos cambia a menudo (actualizaciones, versiones beta, anuncios). Se ofrece tal cual, con fines orientativos, y puede contener errores o no estar actualizada. Si encuentras un error, avísanos y lo corregiremos.'] },
          { h: '6. Enlaces a otros sitios', html: ['El sitio incluye enlaces a fuentes y webs de terceros. No controlamos su contenido ni somos responsables de él. Si detectamos que un enlace lleva a contenido ilícito, lo retiraremos.'] },
          { h: '7. Responsabilidad', html: ['El titular no se responsabiliza de los daños derivados del uso de la información del sitio, de interrupciones del servicio por causas técnicas o de fuerza mayor, ni del contenido de los anuncios mostrados por redes publicitarias de terceros.'] },
          { h: '8. Legislación aplicable', html: ['Este aviso legal se rige por la legislación española. Para cualquier controversia serán competentes los juzgados y tribunales que correspondan según la normativa de protección de consumidores y usuarios.'] },
        ],
      },
      privacy: {
        title: 'Política de privacidad',
        description: `Cómo trata ${site.name} tus datos personales, conforme al RGPD y la LOPDGDD.`,
        sections: [
          { h: '1. Responsable del tratamiento', html: [`El responsable del tratamiento de tus datos es ${owner}${o.taxId ? ` (NIF ${esc(o.taxId)})` : ''}${o.address ? `, con domicilio en ${esc(o.address)}` : ''}. Contacto para cualquier asunto de privacidad: ${L.contact}.`] },
          { h: '2. Resumen', html: [`${name} no tiene cuentas de usuario, formularios ni boletines, y nunca te pedimos datos personales. Los únicos datos que se tratan son los técnicos que genera cualquier visita a una web, y los que usa Google para mostrar publicidad cuando das tu consentimiento.`] },
          { h: '3. Qué datos tratamos, para qué y con qué base legal', html: [table(['Tratamiento', 'Datos', 'Finalidad', 'Base legal', 'Conservación'], [
            ['Alojamiento y seguridad', 'Dirección IP, navegador, páginas solicitadas', 'Servir las páginas y proteger el sitio frente a ataques y abusos', 'Interés legítimo (art. 6.1.f RGPD)', 'El tiempo limitado que Cloudflare necesita para seguridad'],
            ['Estadísticas', 'Datos de visita agregados y anónimos', 'Saber qué páginas se leen más', 'Interés legítimo (art. 6.1.f RGPD)', 'Solo datos agregados, sin cookies'],
            ['Publicidad', 'Cookies e identificadores del dispositivo, IP', 'Mostrar y medir anuncios, y personalizarlos si lo aceptas', 'Consentimiento (art. 6.1.a RGPD)', 'Según la política de cookies'],
            ['Correos que nos envíes', 'Tu correo y lo que nos escribas', 'Responderte y atender tu solicitud', 'Interés legítimo / consentimiento', 'Hasta 12 meses tras cerrar el asunto'],
          ])] },
          { h: '4. Destinatarios', html: ['No vendemos ni cedemos tus datos. Los proveedores que tratan datos por cuenta nuestra son:', ul([
            `<b>Cloudflare, Inc.</b>: alojamiento, red de distribución y seguridad. ${a(CF_PRIVACY, 'Política de privacidad de Cloudflare')}.`,
            `<b>Google Ireland Ltd. / Google LLC</b>: publicidad (Google AdSense) y gestor de consentimiento. ${a(GOOGLE_PRIVACY, 'Política de privacidad de Google')} · ${a(PARTNER, 'Cómo usa Google los datos de los sitios asociados')}.`,
          ]), 'Las fuentes tipográficas e iconos del sitio se sirven desde nuestro propio servidor, así que no se envían datos a terceros por cargarlas.'] },
          { h: '5. Transferencias internacionales', html: ['Cloudflare y Google pueden tratar datos en Estados Unidos. Ambas empresas están adheridas al Marco de Privacidad de Datos UE-EE. UU. (Data Privacy Framework) y ofrecen además las cláusulas contractuales tipo aprobadas por la Comisión Europea.'] },
          { h: '6. Tus derechos', html: [`Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, y retirar tu consentimiento, escribiendo a ${L.contact}. Te responderemos en el plazo de un mes. Para retirar el consentimiento publicitario basta con usar el enlace «Configurar cookies» del pie de página.`, `Si crees que no hemos atendido bien tu solicitud, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (${AEPD}).`] },
          { h: '7. Publicidad personalizada', html: [`Además de nuestro gestor de consentimiento, puedes desactivar la publicidad personalizada de Google en ${a(ADS_SETTINGS, 'Configuración de anuncios de Google')}.`] },
          { h: '8. Menores', html: ['El sitio no está dirigido a menores de 14 años y no recogemos conscientemente datos suyos. A los usuarios que Google identifica como menores no se les muestran anuncios personalizados.'] },
          { h: '9. Seguridad', html: ['Todo el sitio se sirve mediante conexión cifrada (HTTPS) y no almacenamos datos personales en bases de datos propias.'] },
          { h: '10. Cambios en esta política', html: ['Si cambiamos esta política, actualizaremos la fecha que figura al principio de la página.'] },
        ],
      },
      cookies: {
        title: 'Política de cookies',
        description: `Qué cookies usa ${site.name}, para qué sirven y cómo gestionarlas.`,
        sections: [
          { h: '1. Qué son las cookies', html: ['Las cookies y tecnologías similares (como el almacenamiento local del navegador) son pequeños archivos que una web guarda en tu dispositivo para recordar información. Según el artículo 22.2 de la LSSI y el RGPD, las cookies que no son estrictamente necesarias solo pueden instalarse con tu consentimiento previo.'] },
          { h: '2. Cookies propias', html: [`${name} no instala cookies propias de seguimiento ni de análisis. Las estadísticas de visitas, si están activas, se obtienen sin cookies.`] },
          { h: '3. Cookies de terceros', html: ['Solo se instalan cuando el sitio muestra anuncios, y siempre según lo que elijas en el aviso de consentimiento:', table(['Nombre', 'Titular', 'Tipo y finalidad', 'Duración'], [
            ['FCCDCF, FCNEC', 'Google (gestor de consentimiento)', 'Técnica: guardar tu elección de cookies', '13 meses'],
            ['__gads, __gpi, __eoi', 'Google AdSense', 'Publicidad: mostrar y medir anuncios, limitar repeticiones', '13 meses'],
            ['IDE, DSID, test_cookie', 'Google (doubleclick.net)', 'Publicidad personalizada (solo si la aceptas)', 'Hasta 13 meses'],
          ]), `La lista exacta puede variar según los cambios que haga Google. Más información en ${a('https://policies.google.com/technologies/cookies', 'cómo usa Google las cookies')}.`] },
          { h: '4. Cómo aceptar, rechazar o cambiar tu elección', html: ['A los visitantes del Espacio Económico Europeo, el Reino Unido y Suiza se les muestra un aviso de consentimiento de Google, certificado por el IAB Transparency & Consent Framework. Puedes aceptar, rechazar o elegir por finalidades. Mientras no aceptes, no se usan cookies de publicidad personalizada. Puedes cambiar tu elección en cualquier momento desde «Configurar cookies» en el pie de página.'] },
          { h: '5. Cómo desactivarlas en tu navegador', html: [`También puedes bloquear o borrar las cookies desde tu navegador: ${a('https://support.google.com/chrome/answer/95647?hl=es', 'Chrome')}, ${a('https://support.mozilla.org/es/kb/Borrar%20cookies', 'Firefox')}, ${a('https://support.apple.com/es-es/guide/safari/sfri11471/mac', 'Safari')}, ${a('https://support.microsoft.com/es-es/microsoft-edge', 'Edge')}. Si las bloqueas, el sitio seguirá funcionando, aunque los anuncios pueden ser menos relevantes.`] },
          { h: '6. Actualizaciones', html: ['Revisamos esta política cuando cambian las cookies que se usan. La fecha de la última revisión figura al principio de la página.'] },
        ],
      },
      terms: {
        title: 'Términos de uso',
        description: `Condiciones de uso de ${site.name}.`,
        sections: [
          { h: '1. Aceptación', html: [`Al acceder y usar ${name} aceptas estos términos. Si no estás de acuerdo, no uses el sitio.`] },
          { h: '2. El servicio', html: [`${name} ofrece de forma gratuita guías, listas, mapas y herramientas sobre videojuegos, con fines informativos y de entretenimiento. Podemos añadir, cambiar o retirar contenidos y secciones en cualquier momento.`] },
          { h: '3. Uso permitido', html: ['Puedes leer, compartir y enlazar nuestras páginas libremente. No está permitido:', ul([
            'copiar de forma masiva o automatizada los textos, listas o bases de datos del sitio para publicarlos en otro lugar;',
            'usar robots o sistemas que sobrecarguen el sitio o perjudiquen su funcionamiento;',
            'manipular la publicidad del sitio o generar clics o impresiones fraudulentos;',
            'usar el sitio para fines ilícitos.',
          ])] },
          { h: '4. Exactitud de la información', html: ['Hacemos lo posible por que todo esté verificado y actualizado, y citamos nuestras fuentes. Aun así, los juegos cambian con cada actualización y la información previa al lanzamiento puede variar. No garantizamos que el contenido esté libre de errores ni que el servicio esté siempre disponible.'] },
          { h: '5. Propiedad intelectual', html: ['Los juegos, sus nombres, personajes e imágenes pertenecen a sus respectivos titulares. Los contenidos originales del sitio pertenecen a su titular. Más detalles en el <a href="legal">aviso legal</a>.'] },
          { h: '6. Publicidad y enlaces', html: ['El sitio muestra anuncios de terceros y enlaces a otras webs. No respondemos de los productos o servicios anunciados ni del contenido de las webs enlazadas.'] },
          { h: '7. Limitación de responsabilidad', html: ['En la medida permitida por la ley, el titular no será responsable de los daños derivados del uso o de la imposibilidad de uso del sitio.'] },
          { h: '8. Cambios en los términos', html: ['Podemos modificar estos términos. La fecha de la última actualización figura al principio de esta página, y el uso del sitio después de un cambio supone su aceptación.'] },
          { h: '9. Ley aplicable y contacto', html: [`Estos términos se rigen por la legislación española. Para cualquier duda, escríbenos a ${L.contact}.`] },
        ],
      },
    };
    return docs[id];
  }

  // ---------------------------------------------------------------- Portuguese
  if (lang === 'pt') {
    const docs: Record<LegalDocId, LegalDoc> = {
      legal: {
        title: 'Aviso legal',
        description: `Aviso legal, dados do titular e condições gerais de ${site.name}.`,
        sections: [
          { h: '1. Titular do site', html: ['Em cumprimento do artigo 10 da Lei espanhola 34/2002 de Serviços da Sociedade da Informação e Comércio Eletrônico (LSSI-CE), informamos os dados do titular deste site:', ownerList(['Titular', 'NIF', 'Endereço', 'E-mail'])] },
          { h: '2. Objetivo do site', html: [`${name} é um site de fãs gratuito com guias, listas, mapas e ferramentas sobre ${esc(site.game)}. O acesso é livre, não exige cadastro e nenhum produto ou serviço é vendido. O site é financiado por publicidade.`] },
          { h: '3. Relação com as editoras dos jogos', html: [`${name} é um site independente e não é afiliado, patrocinado nem endossado por ${L.pubs}. Os nomes dos jogos, personagens, itens, logotipos e imagens são marcas e obras de seus respectivos titulares.`] },
          { h: '4. Propriedade intelectual', html: ['O design, o código, as ilustrações próprias e os textos originais deste site pertencem ao seu titular. Você pode citar ou linkar nossas páginas desde que indique a fonte com um link. Não é permitido copiar de forma sistemática os textos, listas ou bancos de dados do site.', `As capturas de tela e os dados dos jogos são usados com fins informativos e de comentário, com base no direito de citação. Se você é titular de algum conteúdo e quer que ele seja removido ou atribuído de outra forma, escreva para ${L.contact} e atenderemos em até 7 dias.`] },
          { h: '5. Exatidão das informações', html: ['Revisamos e citamos as fontes do que publicamos, mas as informações sobre jogos mudam com frequência (atualizações, versões beta, anúncios). Elas são oferecidas como estão, para orientação, e podem conter erros ou estar desatualizadas. Se encontrar um erro, avise e vamos corrigir.'] },
          { h: '6. Links para outros sites', html: ['O site inclui links para fontes e sites de terceiros. Não controlamos nem respondemos pelo conteúdo deles. Se detectarmos que um link leva a conteúdo ilícito, vamos removê-lo.'] },
          { h: '7. Responsabilidade', html: ['O titular não se responsabiliza por danos decorrentes do uso das informações do site, por interrupções do serviço por causas técnicas ou de força maior, nem pelo conteúdo dos anúncios exibidos por redes de publicidade de terceiros.'] },
          { h: '8. Legislação aplicável', html: ['Este aviso legal é regido pela legislação espanhola, sem prejuízo dos direitos que a legislação do seu país de residência lhe garanta como consumidor.'] },
        ],
      },
      privacy: {
        title: 'Política de privacidade',
        description: `Como ${site.name} trata seus dados pessoais, conforme o RGPD e a LGPD.`,
        sections: [
          { h: '1. Controlador', html: [`O controlador dos seus dados é ${owner}${o.taxId ? ` (NIF ${esc(o.taxId)})` : ''}${o.address ? `, com endereço em ${esc(o.address)}` : ''}. Contato para qualquer assunto de privacidade: ${L.contact}.`] },
          { h: '2. Resumo', html: [`${name} não tem contas de usuário, formulários nem newsletters, e nunca pedimos dados pessoais. Os únicos dados tratados são os técnicos gerados por qualquer visita a um site e os que o Google usa para exibir publicidade quando você dá seu consentimento.`] },
          { h: '3. Quais dados tratamos, para quê e com qual base legal', html: [table(['Tratamento', 'Dados', 'Finalidade', 'Base legal', 'Conservação'], [
            ['Hospedagem e segurança', 'Endereço IP, navegador, páginas solicitadas', 'Servir as páginas e proteger o site contra ataques e abusos', 'Interesse legítimo (art. 6.1.f RGPD; art. 7, IX LGPD)', 'O tempo limitado que a Cloudflare precisa para segurança'],
            ['Estatísticas', 'Dados de visita agregados e anônimos', 'Saber quais páginas são mais lidas', 'Interesse legítimo', 'Apenas dados agregados, sem cookies'],
            ['Publicidade', 'Cookies e identificadores do dispositivo, IP', 'Exibir e medir anúncios, e personalizá-los se você aceitar', 'Consentimento (art. 6.1.a RGPD; art. 7, I LGPD)', 'Conforme a política de cookies'],
            ['E-mails que você nos enviar', 'Seu e-mail e o que você escrever', 'Responder e atender sua solicitação', 'Interesse legítimo / consentimento', 'Até 12 meses após encerrar o assunto'],
          ])] },
          { h: '4. Destinatários', html: ['Não vendemos nem cedemos seus dados. Os fornecedores que tratam dados em nosso nome são:', ul([
            `<b>Cloudflare, Inc.</b>: hospedagem, rede de distribuição e segurança. ${a(CF_PRIVACY, 'Política de privacidade da Cloudflare')}.`,
            `<b>Google Ireland Ltd. / Google LLC</b>: publicidade (Google AdSense) e gestor de consentimento. ${a(GOOGLE_PRIVACY, 'Política de privacidade do Google')} · ${a(PARTNER, 'Como o Google usa dados de sites parceiros')}.`,
          ]), 'As fontes e os ícones do site são servidos pelo nosso próprio servidor, então nenhum dado é enviado a terceiros para carregá-los.'] },
          { h: '5. Transferências internacionais', html: ['A Cloudflare e o Google podem tratar dados nos Estados Unidos. As duas empresas aderem ao Data Privacy Framework UE-EUA e oferecem também as cláusulas contratuais padrão aprovadas pela Comissão Europeia.'] },
          { h: '6. Seus direitos', html: [`Você pode exercer a qualquer momento seus direitos de acesso, correção, exclusão, oposição, limitação do tratamento e portabilidade, e revogar seu consentimento, escrevendo para ${L.contact}. Responderemos em até um mês. Para revogar o consentimento de publicidade, basta usar o link "Configurar cookies" no rodapé.`, `Se achar que não atendemos bem sua solicitação, você pode reclamar à autoridade de proteção de dados do seu país: no Brasil, a ANPD (${a('https://www.gov.br/anpd', 'gov.br/anpd')}); em Portugal, a CNPD (${a('https://www.cnpd.pt', 'cnpd.pt')}); na Espanha, a AEPD (${AEPD}).`] },
          { h: '7. Publicidade personalizada', html: [`Além do nosso gestor de consentimento, você pode desativar a publicidade personalizada do Google em ${a(ADS_SETTINGS, 'Configurações de anúncios do Google')}.`] },
          { h: '8. Menores', html: ['O site não é direcionado a menores de 14 anos e não coletamos conscientemente dados deles. Usuários que o Google identifica como menores não recebem anúncios personalizados.'] },
          { h: '9. Segurança', html: ['Todo o site é servido por conexão criptografada (HTTPS) e não armazenamos dados pessoais em bancos de dados próprios.'] },
          { h: '10. Mudanças nesta política', html: ['Se mudarmos esta política, vamos atualizar a data no início da página.'] },
        ],
      },
      cookies: {
        title: 'Política de cookies',
        description: `Quais cookies ${site.name} usa, para que servem e como gerenciá-los.`,
        sections: [
          { h: '1. O que são cookies', html: ['Cookies e tecnologias semelhantes (como o armazenamento local do navegador) são pequenos arquivos que um site guarda no seu dispositivo para lembrar informações. Pelas regras europeias, os cookies que não são estritamente necessários só podem ser instalados com seu consentimento prévio.'] },
          { h: '2. Cookies próprios', html: [`${name} não instala cookies próprios de rastreamento nem de análise. As estatísticas de visitas, quando ativas, são obtidas sem cookies.`] },
          { h: '3. Cookies de terceiros', html: ['Só são instalados quando o site exibe anúncios, e sempre conforme o que você escolher no aviso de consentimento:', table(['Nome', 'Titular', 'Tipo e finalidade', 'Duração'], [
            ['FCCDCF, FCNEC', 'Google (gestor de consentimento)', 'Técnico: guardar sua escolha de cookies', '13 meses'],
            ['__gads, __gpi, __eoi', 'Google AdSense', 'Publicidade: exibir e medir anúncios, limitar repetições', '13 meses'],
            ['IDE, DSID, test_cookie', 'Google (doubleclick.net)', 'Publicidade personalizada (só se você aceitar)', 'Até 13 meses'],
          ]), `A lista exata pode variar conforme as mudanças do Google. Mais informações em ${a('https://policies.google.com/technologies/cookies', 'como o Google usa cookies')}.`] },
          { h: '4. Como aceitar, recusar ou mudar sua escolha', html: ['Visitantes do Espaço Econômico Europeu, do Reino Unido e da Suíça veem um aviso de consentimento do Google, certificado pelo IAB Transparency & Consent Framework. Você pode aceitar, recusar ou escolher por finalidade. Enquanto não aceitar, nenhum cookie de publicidade personalizada é usado. Você pode mudar sua escolha a qualquer momento em "Configurar cookies" no rodapé.'] },
          { h: '5. Como desativá-los no navegador', html: [`Você também pode bloquear ou apagar cookies no seu navegador: ${a('https://support.google.com/chrome/answer/95647?hl=pt-BR', 'Chrome')}, ${a('https://support.mozilla.org/pt-BR/kb/limpe-cookies-e-dados-de-sites-no-firefox', 'Firefox')}, ${a('https://support.apple.com/pt-br/guide/safari/sfri11471/mac', 'Safari')}, ${a('https://support.microsoft.com/pt-br/microsoft-edge', 'Edge')}. Se bloqueá-los, o site continua funcionando, mas os anúncios podem ser menos relevantes.`] },
          { h: '6. Atualizações', html: ['Revisamos esta política quando os cookies usados mudam. A data da última revisão fica no início da página.'] },
        ],
      },
      terms: {
        title: 'Termos de uso',
        description: `Termos de uso de ${site.name}.`,
        sections: [
          { h: '1. Aceitação', html: [`Ao acessar e usar ${name} você aceita estes termos. Se não concordar, não use o site.`] },
          { h: '2. O serviço', html: [`${name} oferece gratuitamente guias, listas, mapas e ferramentas sobre videogames, com fins informativos e de entretenimento. Podemos adicionar, mudar ou retirar conteúdos e seções a qualquer momento.`] },
          { h: '3. Uso permitido', html: ['Você pode ler, compartilhar e linkar nossas páginas livremente. Não é permitido:', ul([
            'copiar de forma massiva ou automatizada os textos, listas ou bancos de dados do site para publicá-los em outro lugar;',
            'usar robôs ou sistemas que sobrecarreguem o site ou prejudiquem seu funcionamento;',
            'manipular a publicidade do site ou gerar cliques ou impressões fraudulentos;',
            'usar o site para fins ilícitos.',
          ])] },
          { h: '4. Exatidão das informações', html: ['Fazemos o possível para que tudo esteja verificado e atualizado, e citamos nossas fontes. Mesmo assim, os jogos mudam a cada atualização e as informações anteriores ao lançamento podem variar. Não garantimos que o conteúdo esteja livre de erros nem que o serviço esteja sempre disponível.'] },
          { h: '5. Propriedade intelectual', html: ['Os jogos, seus nomes, personagens e imagens pertencem a seus respectivos titulares. Os conteúdos originais do site pertencem ao seu titular. Mais detalhes no <a href="legal">aviso legal</a>.'] },
          { h: '6. Publicidade e links', html: ['O site exibe anúncios de terceiros e links para outros sites. Não respondemos pelos produtos ou serviços anunciados nem pelo conteúdo dos sites linkados.'] },
          { h: '7. Limitação de responsabilidade', html: ['Na medida permitida pela lei, o titular não será responsável por danos decorrentes do uso ou da impossibilidade de uso do site.'] },
          { h: '8. Mudanças nos termos', html: ['Podemos modificar estes termos. A data da última atualização fica no início desta página, e o uso do site após uma mudança implica sua aceitação.'] },
          { h: '9. Lei aplicável e contato', html: [`Estes termos são regidos pela legislação espanhola, sem prejuízo dos seus direitos como consumidor. Para qualquer dúvida, escreva para ${L.contact}.`] },
        ],
      },
    };
    return docs[id];
  }

  // ---------------------------------------------------------------- English
  const docs: Record<LegalDocId, LegalDoc> = {
    legal: {
      title: 'Legal notice',
      description: `Legal notice, owner details and general conditions of ${site.name}.`,
      sections: [
        { h: '1. Website owner', html: ['As required by article 10 of Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the owner of this website is:', ownerList(['Owner', 'Tax ID', 'Address', 'Email'])] },
        { h: '2. Purpose of the site', html: [`${name} is a free fan site with guides, lists, maps and tools for ${esc(site.game)}. Access is free, needs no account, and no products or services are sold. The site is funded by advertising.`] },
        { h: '3. Relationship with game publishers', html: [`${name} is independent and is not affiliated with, sponsored or endorsed by ${L.pubs}. Game names, characters, items, logos and images are trademarks and works of their respective owners.`] },
        { h: '4. Intellectual property', html: ['The design, code, original illustrations and original text of this site belong to its owner. You may quote or link to our pages as long as you credit the source with a link. Systematic copying of the site\'s text, lists or databases is not allowed.', `Game screenshots and game data are used for information and commentary under the right of quotation. If you hold the rights to any content and want it removed or credited differently, write to ${L.contact} and we will act within 7 days.`] },
        { h: '5. Accuracy', html: ['We check and cite the sources of what we publish, but game information changes often (updates, betas, announcements). It is provided as is, for guidance, and may contain errors or be out of date. If you spot a mistake, tell us and we will fix it.'] },
        { h: '6. Links to other sites', html: ['The site links to sources and third-party websites. We do not control and are not responsible for their content. If we find that a link leads to unlawful content, we will remove it.'] },
        { h: '7. Liability', html: ['The owner is not liable for damage arising from use of the information on the site, for service interruptions due to technical causes or force majeure, or for the content of ads served by third-party ad networks.'] },
        { h: '8. Governing law', html: ['This notice is governed by Spanish law, without prejudice to any consumer rights granted by the law of your country of residence.'] },
      ],
    },
    privacy: {
      title: 'Privacy policy',
      description: `How ${site.name} handles personal data under the GDPR.`,
      sections: [
        { h: '1. Data controller', html: [`The controller of your data is ${owner}${o.taxId ? ` (tax ID ${esc(o.taxId)})` : ''}${o.address ? `, ${esc(o.address)}` : ''}. Contact for any privacy matter: ${L.contact}.`] },
        { h: '2. Summary', html: [`${name} has no user accounts, forms or newsletters, and we never ask for personal data. The only data processed is the technical data any website visit creates, and the data Google uses to show ads when you consent.`] },
        { h: '3. What we process, why, and on what legal basis', html: [table(['Processing', 'Data', 'Purpose', 'Legal basis', 'Retention'], [
          ['Hosting and security', 'IP address, browser, requested pages', 'Serve pages and protect the site from attacks and abuse', 'Legitimate interest (GDPR art. 6(1)(f))', 'The limited time Cloudflare needs for security'],
          ['Statistics', 'Aggregated, anonymous visit data', 'Know which pages are read most', 'Legitimate interest (GDPR art. 6(1)(f))', 'Aggregated data only, no cookies'],
          ['Advertising', 'Cookies and device identifiers, IP', 'Show and measure ads, and personalise them if you agree', 'Consent (GDPR art. 6(1)(a))', 'See the cookie policy'],
          ['Emails you send us', 'Your email and what you write', 'Reply and handle your request', 'Legitimate interest / consent', 'Up to 12 months after the matter is closed'],
        ])] },
        { h: '4. Recipients', html: ['We do not sell or share your data. The providers that process data on our behalf are:', ul([
          `<b>Cloudflare, Inc.</b>: hosting, content delivery and security. ${a(CF_PRIVACY, 'Cloudflare privacy policy')}.`,
          `<b>Google Ireland Ltd. / Google LLC</b>: advertising (Google AdSense) and consent management. ${a(GOOGLE_PRIVACY, 'Google privacy policy')} · ${a(PARTNER, 'How Google uses data from partner sites')}.`,
        ]), 'Fonts and icons are served from our own server, so loading them sends no data to third parties.'] },
        { h: '5. International transfers', html: ['Cloudflare and Google may process data in the United States. Both are certified under the EU-US Data Privacy Framework and also offer the European Commission standard contractual clauses.'] },
        { h: '6. Your rights', html: [`You can exercise your rights of access, rectification, erasure, objection, restriction and portability, and withdraw your consent, at any time by writing to ${L.contact}. We will reply within one month. To withdraw advertising consent, use the "Cookie settings" link in the footer.`, `If you think we have not handled your request properly, you can complain to your data protection authority; in Spain, the AEPD (${AEPD}).`] },
        { h: '7. Ad personalisation', html: [`Besides our consent manager, you can turn off Google personalised ads at ${a(ADS_SETTINGS, 'Google Ads Settings')}.`] },
        { h: '8. Children', html: ['The site is not directed at children under 14 and we do not knowingly collect their data. Users Google identifies as minors are not shown personalised ads.'] },
        { h: '9. Security', html: ['The whole site is served over an encrypted connection (HTTPS) and we store no personal data in databases of our own.'] },
        { h: '10. Changes to this policy', html: ['If we change this policy, we will update the date at the top of the page.'] },
      ],
    },
    cookies: {
      title: 'Cookie policy',
      description: `Which cookies ${site.name} uses, what they do and how to manage them.`,
      sections: [
        { h: '1. What cookies are', html: ['Cookies and similar technologies (such as browser local storage) are small files a website stores on your device to remember information. Under EU rules, cookies that are not strictly necessary may only be set with your prior consent.'] },
        { h: '2. Our own cookies', html: [`${name} sets no tracking or analytics cookies of its own. Visit statistics, when enabled, are collected without cookies.`] },
        { h: '3. Third-party cookies', html: ['These are only set when the site shows ads, and always according to your choice in the consent message:', table(['Name', 'Set by', 'Type and purpose', 'Duration'], [
          ['FCCDCF, FCNEC', 'Google (consent manager)', 'Necessary: store your cookie choice', '13 months'],
          ['__gads, __gpi, __eoi', 'Google AdSense', 'Advertising: show and measure ads, cap repetition', '13 months'],
          ['IDE, DSID, test_cookie', 'Google (doubleclick.net)', 'Personalised advertising (only if you accept)', 'Up to 13 months'],
        ]), `The exact list may change as Google updates its systems. See ${a('https://policies.google.com/technologies/cookies', 'how Google uses cookies')}.`] },
        { h: '4. How to accept, reject or change your choice', html: ['Visitors from the European Economic Area, the UK and Switzerland see a Google consent message certified under the IAB Transparency & Consent Framework. You can accept, reject or choose by purpose. Until you accept, no personalised advertising cookies are used. You can change your choice at any time from "Cookie settings" in the footer.'] },
        { h: '5. Turning cookies off in your browser', html: [`You can also block or delete cookies in your browser: ${a('https://support.google.com/chrome/answer/95647', 'Chrome')}, ${a('https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox', 'Firefox')}, ${a('https://support.apple.com/guide/safari/sfri11471/mac', 'Safari')}, ${a('https://support.microsoft.com/microsoft-edge', 'Edge')}. The site keeps working if you block them, though ads may be less relevant.`] },
        { h: '6. Updates', html: ['We review this policy when the cookies in use change. The date of the last review is shown at the top of the page.'] },
      ],
    },
    terms: {
      title: 'Terms of use',
      description: `Terms of use of ${site.name}.`,
      sections: [
        { h: '1. Acceptance', html: [`By accessing and using ${name} you accept these terms. If you do not agree, please do not use the site.`] },
        { h: '2. The service', html: [`${name} provides free guides, lists, maps and tools about video games, for information and entertainment. We may add, change or remove content and sections at any time.`] },
        { h: '3. Acceptable use', html: ['You are welcome to read, share and link to our pages. You may not:', ul([
          'copy the site\'s text, lists or databases in bulk or by automated means to publish them elsewhere;',
          'use bots or systems that overload the site or harm its operation;',
          'tamper with the site\'s advertising or generate fraudulent clicks or impressions;',
          'use the site for unlawful purposes.',
        ])] },
        { h: '4. Accuracy', html: ['We do our best to keep everything checked and up to date, and we cite our sources. Still, games change with every update and pre-launch information may change. We do not guarantee that the content is error-free or that the service is always available.'] },
        { h: '5. Intellectual property', html: ['Games, their names, characters and images belong to their respective owners. Original site content belongs to the site owner. See the <a href="legal">legal notice</a>.'] },
        { h: '6. Ads and links', html: ['The site shows third-party ads and links to other websites. We are not responsible for advertised products or services or for the content of linked sites.'] },
        { h: '7. Limitation of liability', html: ['To the extent permitted by law, the owner is not liable for damage arising from the use of, or inability to use, the site.'] },
        { h: '8. Changes to these terms', html: ['We may change these terms. The date of the last update is shown at the top of this page, and using the site after a change means you accept it.'] },
        { h: '9. Governing law and contact', html: [`These terms are governed by Spanish law, without prejudice to your consumer rights. For any question, write to ${L.contact}.`] },
      ],
    },
  };
  return docs[id];
}
