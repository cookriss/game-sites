import { SITE } from '../../site.config';
// Authorised sellers file for AdSense. Filled automatically once ADSENSE_CLIENT is set.
const pub = (SITE.adsenseClient || '').replace(/^ca-/, '');
export const GET = () => new Response(pub ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n` : '# ads.txt will list the AdSense publisher once ads are enabled\n', { headers: { 'Content-Type': 'text/plain' } });
