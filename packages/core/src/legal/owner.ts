import type { Owner } from '../lib/types';

/**
 * Site owner, shown in the legal notice (required by Spain's LSSI, art. 10).
 * Shared by every site. Values come from build env vars so personal data stays
 * out of the public repo: set them once per Cloudflare Pages project.
 */
export const OWNER: Owner = {
  name: process.env.OWNER_NAME || '',
  taxId: process.env.OWNER_TAX_ID || '',
  address: process.env.OWNER_ADDRESS || '',
  email: process.env.OWNER_EMAIL || '',
};
