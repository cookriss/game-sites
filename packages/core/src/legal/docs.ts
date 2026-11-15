import type { SiteConfig } from '../lib/types';

/**
 * Legal pages shared by every site: legal notice (LSSI), privacy policy (GDPR),
 * cookie policy and terms of use. Written in English and Spanish (the owner is
 * based in Spain); other locales link to the English version.
 */
export type LegalDocId = 'legal' | 'privacy' | 'cookies' | 'terms';
export type LegalLang = 'en' | 'es';
export const LEGAL_DOCS: LegalDocId[] = ['legal', 'privacy', 'cookies', 'terms'];
export const LEGAL_LANGS: LegalLang[] = ['en', 'es'];
/** Bump when the texts change. */
export const LEGAL_UPDATED = '2026-11-15';

export interface LegalDoc { title: string; description: string; sections: { h?: string; html: string[] }[] }

export const legalLang = (lang: string): LegalLang => (lang.startsWith('es') ? 'es' : 'en');

export const LEGAL_LABELS: Record<LegalLang, Record<LegalDocId, string> & { cookieSettings: string; updated: string; contact: string }> = {
  en: { legal: 'Legal notice', privacy: 'Privacy', cookies: 'Cookies', terms: 'Terms', cookieSettings: 'Cookie settings', updated: 'Last updated', contact: 'Contact' },
  es: { legal: 'Aviso legal', privacy: 'Privacidad', cookies: 'Cookies', terms: 'Términos', cookieSettings: 'Configurar cookies', updated: 'Última actualización', contact: 'Contacto' },
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const mail = (e: string) => (e ? `<a href="mailto:${esc(e)}">${esc(e)}</a>` : '');

const GOOGLE_COOKIES = [
  ['__gads, __gpi, __eoi', 'Google AdSense', '13 months', '13 meses'],
  ['IDE, DSID, test_cookie', 'Google (doubleclick.net)', 'up to 13 months', 'hasta 13 meses'],
  ['FCCDCF, FCNEC', 'Google consent manager', '13 months', '13 meses'],
];

export function legalDoc(id: LegalDocId, lang: LegalLang, site: SiteConfig): LegalDoc {
  const o = site.owner ?? { name: '', taxId: '', address: '', email: '' };
  const host = site.url.replace(/^https?:\/\//, '');
  const src = site.dataSource;
  const ownerName = esc(o.name || site.name);
  const pubList = (site.publishers ?? []).map(esc).join(', ');
  const pubs = pubList || 'los editores de los juegos que cubre';
  const pubsEn = pubList || 'the publishers of the games it covers';
  const contact = o.email ? mail(o.email) : (lang === 'es' ? 'el correo indicado en el aviso legal' : 'the email in the legal notice');
  const ownerList = (labels: [string, string, string, string]) =>
    `<ul>${[
      o.name && `<li><b>${labels[0]}:</b> ${esc(o.name)}</li>`,
      o.taxId && `<li><b>${labels[1]}:</b> ${esc(o.taxId)}</li>`,
      o.address && `<li><b>${labels[2]}:</b> ${esc(o.address)}</li>`,
      o.email && `<li><b>${labels[3]}:</b> ${mail(o.email)}</li>`,
      `<li><b>Web:</b> ${esc(host)}</li>`,
    ].filter(Boolean).join('')}</ul>`;
  const cookieRows = (es: boolean) =>
    GOOGLE_COOKIES.map(([n, who, en, sp]) => `<tr><td>${n}</td><td>${who}</td><td>${es ? 'Publicidad (requiere consentimiento)' : 'Advertising (consent required)'}</td><td>${es ? sp : en}</td></tr>`).join('');
  const table = (es: boolean, localRow: string) => `<div class="table-wrap"><table class="legal-table"><thead><tr><th>${es ? 'Nombre' : 'Name'}</th><th>${es ? 'Titular' : 'Set by'}</th><th>${es ? 'Finalidad' : 'Purpose'}</th><th>${es ? 'Duración' : 'Duration'}</th></tr></thead><tbody>${localRow}${cookieRows(es)}</tbody></table></div>`;

  if (lang === 'es') {
    const docs: Record<LegalDocId, LegalDoc> = {
      legal: {
        title: 'Aviso legal',
        description: `Aviso legal e información del titular de ${site.name}.`,
        sections: [
          { h: 'Titular del sitio web', html: [`En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:`, ownerList(['Titular', 'NIF', 'Domicilio', 'Correo electrónico'])] },
          { h: 'Objeto', html: [`${esc(site.name)} es una web de fans gratuita con estadísticas, guías y herramientas sobre ${esc(site.game)}. El acceso es libre y no requiere registro. El sitio se financia con publicidad.`] },
          { h: 'Relación con los editores de los juegos', html: [`${esc(site.name)} es una web de fans independiente y no está afiliada, patrocinada ni respaldada por ${pubs}. Los nombres, imágenes y demás recursos de cada juego son marcas y contenidos de sus respectivos propietarios, y se usan aquí solo con fines informativos.`] },
          { h: 'Propiedad intelectual', html: [`El diseño, el código y los textos propios de este sitio pertenecen a su titular. Las estadísticas se calculan a partir de datos públicos de partidas${src ? ` facilitados por <a href="${src.url}" rel="noopener">${esc(src.label)}</a>` : ''}. Puedes citar o enlazar nuestras páginas indicando la fuente.`] },
          { h: 'Responsabilidad', html: ['La información se ofrece tal cual, con fines orientativos, y puede contener errores o no estar actualizada. El titular no se hace responsable de las decisiones tomadas a partir de ella ni del contenido de los sitios de terceros enlazados.'] },
          { h: 'Legislación aplicable', html: ['Este aviso se rige por la legislación española. Para cualquier controversia serán competentes los juzgados y tribunales que correspondan conforme a la normativa de consumidores y usuarios.'] },
        ],
      },
      privacy: {
        title: 'Política de privacidad',
        description: `Cómo trata ${site.name} tus datos personales, conforme al RGPD.`,
        sections: [
          { h: 'Responsable del tratamiento', html: [`El responsable es ${ownerName}${o.taxId ? ` (NIF ${esc(o.taxId)})` : ''}. Puedes escribir a ${contact} para cualquier asunto relacionado con tus datos.`] },
          { h: 'Qué datos tratamos', html: [`${esc(site.name)} no tiene cuentas de usuario, formularios ni boletines: no te pedimos ningún dato personal. Solo se tratan los datos técnicos que genera cualquier visita:`, `<ul><li><b>Registros del servidor y seguridad.</b> Cloudflare, que aloja el sitio, procesa tu dirección IP y los datos del navegador para servir las páginas y proteger el sitio frente a abusos. Base legal: interés legítimo (art. 6.1.f RGPD).</li><li><b>Estadísticas de uso.</b> Si se activa Cloudflare Web Analytics, se cuentan visitas de forma agregada, sin cookies y sin identificar a personas.</li><li><b>Publicidad.</b> El sitio muestra anuncios de Google AdSense. Google puede usar cookies e identificadores para mostrar y medir anuncios, y para personalizarlos si lo aceptas. Base legal: tu consentimiento (art. 6.1.a RGPD), que puedes retirar en cualquier momento desde «Configurar cookies» en el pie de página.</li>${src ? `<li><b>Datos de partidas en directo.</b> Algunas herramientas (filtros por rango, búsqueda de jugadores) hacen que tu navegador consulte directamente la API pública de <a href="${src.url}" rel="noopener">${esc(src.label)}</a>, que recibe tu dirección IP como en cualquier petición web.</li>` : ''}</ul>`] },
          { h: 'Encargados y transferencias internacionales', html: ['Los proveedores que tratan datos por cuenta nuestra son Cloudflare, Inc. (alojamiento y seguridad) y Google Ireland Ltd. / Google LLC (publicidad). Ambos pueden transferir datos a Estados Unidos y están adheridos al Marco de Privacidad de Datos UE-EE. UU., además de ofrecer cláusulas contractuales tipo de la Comisión Europea.'] },
          { h: 'Conservación', html: ['Los registros técnicos los conserva Cloudflare durante el tiempo limitado que necesita para seguridad. Las cookies publicitarias duran lo indicado en la <a href="cookies">política de cookies</a>.'] },
          { h: 'Tus derechos', html: [`Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${contact}. Si consideras que no hemos atendido bien tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" rel="noopener">aepd.es</a>).`] },
          { h: 'Personalización de anuncios', html: ['Además de nuestro gestor de consentimiento, puedes desactivar la publicidad personalizada de Google en <a href="https://adssettings.google.com" rel="noopener">Configuración de anuncios de Google</a>. Más información en <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">cómo usa Google los datos de los sitios asociados</a>.'] },
          { h: 'Menores', html: ['El sitio no está dirigido a menores de 14 años y no recogemos conscientemente datos de ellos.'] },
        ],
      },
      cookies: {
        title: 'Política de cookies',
        description: `Qué cookies usa ${site.name} y cómo gestionarlas.`,
        sections: [
          { h: 'Qué son las cookies', html: ['Las cookies y tecnologías similares (como el almacenamiento local del navegador) son pequeños ficheros que una web guarda en tu dispositivo. Según el artículo 22.2 de la LSSI y el RGPD, las que no son estrictamente necesarias requieren tu consentimiento previo.'] },
          { h: 'Cookies que usamos', html: [`${esc(site.name)} no instala cookies propias de seguimiento. Guardamos en el almacenamiento local de tu navegador las preferencias que eliges (por ejemplo, el filtro de rango), que son técnicas y no requieren consentimiento. Las cookies de terceros solo se instalan cuando hay anuncios y según lo que aceptes en el aviso de consentimiento:`, table(true, '<tr><td>rankFilter (almacenamiento local)</td><td>' + esc(site.name) + '</td><td>Técnica: recordar tu filtro</td><td>Hasta que la borres</td></tr>')] },
          { h: 'Gestor de consentimiento', html: ['A los visitantes del Espacio Económico Europeo, el Reino Unido y Suiza se les muestra un aviso de consentimiento de Google, certificado por el IAB Transparency & Consent Framework. Hasta que aceptes, no se usan cookies publicitarias personalizadas. Puedes cambiar tu elección cuando quieras desde el enlace «Configurar cookies» del pie de página.'] },
          { h: 'Cómo desactivarlas en tu navegador', html: ['También puedes bloquear o borrar cookies desde la configuración de tu navegador: <a href="https://support.google.com/chrome/answer/95647" rel="noopener">Chrome</a>, <a href="https://support.mozilla.org/kb/cookies-informacion-que-los-sitios-web-guardan-en-" rel="noopener">Firefox</a>, <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" rel="noopener">Safari</a>, <a href="https://support.microsoft.com/es-es/microsoft-edge" rel="noopener">Edge</a>. Bloquearlas puede hacer que veas anuncios menos relevantes, pero el sitio seguirá funcionando.'] },
        ],
      },
      terms: {
        title: 'Términos de uso',
        description: `Condiciones de uso de ${site.name}.`,
        sections: [
          { h: 'Aceptación', html: [`Al usar ${esc(site.name)} aceptas estos términos. Si no estás de acuerdo, no uses el sitio.`] },
          { h: 'Uso del servicio', html: ['El sitio es gratuito y se ofrece con fines informativos. No está permitido usarlo de forma que perjudique su funcionamiento, por ejemplo descargando páginas de forma masiva y automatizada, ni eludir la publicidad que lo financia mediante técnicas que alteren el sitio.'] },
          { h: 'Exactitud de los datos', html: ['Las estadísticas se calculan automáticamente con datos públicos y pueden contener errores, retrasos o lagunas. No garantizamos su exactitud ni su disponibilidad continua.'] },
          { h: 'Propiedad intelectual', html: [`Los contenidos de cada juego pertenecen a sus respectivos propietarios. Los contenidos propios del sitio pertenecen a su titular. Consulta el <a href="legal">aviso legal</a>.`] },
          { h: 'Cambios', html: ['Podemos modificar estos términos y el sitio en cualquier momento. La fecha de la última actualización figura en esta página.'] },
          { h: 'Ley aplicable', html: ['Estos términos se rigen por la legislación española.'] },
        ],
      },
    };
    return docs[id];
  }

  const docs: Record<LegalDocId, LegalDoc> = {
    legal: {
      title: 'Legal notice',
      description: `Legal notice and owner information for ${site.name}.`,
      sections: [
        { h: 'Website owner', html: ['As required by Spanish Law 34/2002 on Information Society Services (LSSI-CE), article 10, the owner of this website is:', ownerList(['Owner', 'Tax ID', 'Address', 'Email'])] },
        { h: 'Purpose', html: [`${esc(site.name)} is a free fan site with statistics, guides and tools for ${esc(site.game)}. Access is free and needs no account. The site is funded by advertising.`] },
        { h: 'Relationship with game publishers', html: [`${esc(site.name)} is an independent fan site and is not affiliated with, sponsored or endorsed by ${pubsEn}. Each game's names, images and other assets are trademarks and property of their respective owners and are used here for information only.`] },
        { h: 'Intellectual property', html: [`The design, code and original text of this site belong to its owner. Statistics are computed from public match data${src ? ` provided by <a href="${src.url}" rel="noopener">${esc(src.label)}</a>` : ''}. You may quote or link to our pages with attribution.`] },
        { h: 'Liability', html: ['Information is provided as is, for guidance only, and may contain errors or be out of date. The owner is not liable for decisions made based on it, nor for the content of linked third-party sites.'] },
        { h: 'Governing law', html: ['This notice is governed by Spanish law.'] },
      ],
    },
    privacy: {
      title: 'Privacy policy',
      description: `How ${site.name} handles personal data under the GDPR.`,
      sections: [
        { h: 'Data controller', html: [`The controller is ${ownerName}${o.taxId ? ` (tax ID ${esc(o.taxId)})` : ''}. You can write to ${contact} about anything related to your data.`] },
        { h: 'What data we process', html: [`${esc(site.name)} has no user accounts, forms or newsletters: we never ask for personal data. Only the technical data any visit creates is processed:`, `<ul><li><b>Server logs and security.</b> Cloudflare, which hosts the site, processes your IP address and browser data to serve pages and protect the site from abuse. Legal basis: legitimate interest (GDPR art. 6(1)(f)).</li><li><b>Usage statistics.</b> If Cloudflare Web Analytics is enabled, visits are counted in aggregate, without cookies and without identifying anyone.</li><li><b>Advertising.</b> The site shows Google AdSense ads. Google may use cookies and identifiers to serve and measure ads, and to personalise them if you agree. Legal basis: your consent (GDPR art. 6(1)(a)), which you can withdraw at any time from "Cookie settings" in the footer.</li>${src ? `<li><b>Live match data.</b> Some tools (rank filters, player search) make your browser query the public API of <a href="${src.url}" rel="noopener">${esc(src.label)}</a> directly, which receives your IP address like any web request.</li>` : ''}</ul>`] },
        { h: 'Processors and international transfers', html: ['Providers processing data on our behalf are Cloudflare, Inc. (hosting and security) and Google Ireland Ltd. / Google LLC (advertising). Both may transfer data to the United States and are certified under the EU-US Data Privacy Framework, and also offer the European Commission standard contractual clauses.'] },
        { h: 'Retention', html: ['Technical logs are kept by Cloudflare for the limited time it needs for security. Advertising cookies last as stated in the <a href="cookies">cookie policy</a>.'] },
        { h: 'Your rights', html: [`You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ${contact}. You may also complain to your data protection authority; in Spain, the AEPD (<a href="https://www.aepd.es" rel="noopener">aepd.es</a>).`] },
        { h: 'Ad personalisation', html: ['Besides our consent manager, you can turn off Google personalised advertising at <a href="https://adssettings.google.com" rel="noopener">Google Ads Settings</a>. See <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">how Google uses data from partner sites</a>.'] },
        { h: 'Children', html: ['The site is not directed at children under 14 and we do not knowingly collect their data.'] },
      ],
    },
    cookies: {
      title: 'Cookie policy',
      description: `Which cookies ${site.name} uses and how to manage them.`,
      sections: [
        { h: 'What cookies are', html: ['Cookies and similar technologies (such as browser local storage) are small files a website stores on your device. Under EU rules, those that are not strictly necessary need your prior consent.'] },
        { h: 'Cookies we use', html: [`${esc(site.name)} sets no tracking cookies of its own. We keep the preferences you pick (for example, the rank filter) in your browser's local storage; these are functional and need no consent. Third-party cookies are only set when ads are shown, and only as you allow in the consent message:`, table(false, '<tr><td>rankFilter (local storage)</td><td>' + esc(site.name) + '</td><td>Functional: remember your filter</td><td>Until you clear it</td></tr>')] },
        { h: 'Consent manager', html: ['Visitors from the European Economic Area, the UK and Switzerland see a Google consent message certified under the IAB Transparency & Consent Framework. No personalised advertising cookies are used until you accept. You can change your choice at any time from the "Cookie settings" link in the footer.'] },
        { h: 'Turning cookies off in your browser', html: ['You can also block or delete cookies in your browser settings: <a href="https://support.google.com/chrome/answer/95647" rel="noopener">Chrome</a>, <a href="https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox" rel="noopener">Firefox</a>, <a href="https://support.apple.com/guide/safari/sfri11471/mac" rel="noopener">Safari</a>, <a href="https://support.microsoft.com/microsoft-edge" rel="noopener">Edge</a>. Blocking them may make ads less relevant, but the site keeps working.'] },
      ],
    },
    terms: {
      title: 'Terms of use',
      description: `Terms of use for ${site.name}.`,
      sections: [
        { h: 'Acceptance', html: [`By using ${esc(site.name)} you accept these terms. If you do not agree, please do not use the site.`] },
        { h: 'Use of the service', html: ['The site is free and provided for information. You may not use it in ways that harm its operation, such as mass automated downloading of pages, or tamper with the advertising that funds it.'] },
        { h: 'Accuracy', html: ['Statistics are computed automatically from public data and may contain errors, delays or gaps. We do not guarantee their accuracy or continuous availability.'] },
        { h: 'Intellectual property', html: ['Game content belongs to its respective owners. Original site content belongs to its owner. See the <a href="legal">legal notice</a>.'] },
        { h: 'Changes', html: ['We may change these terms and the site at any time. The date of the last update is shown on this page.'] },
        { h: 'Governing law', html: ['These terms are governed by Spanish law.'] },
      ],
    },
  };
  return docs[id];
}
