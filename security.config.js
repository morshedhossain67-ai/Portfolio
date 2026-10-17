// Single source of truth for browser security policy (used by Vite + Express).
// Supabase (content, login, file storage) is the only outside host allowed.
const SUPABASE = 'https://*.supabase.co';
const SUPABASE_WS = 'wss://*.supabase.co';

export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'"],
  'style-src': ["'self'"],
  'img-src': ["'self'", 'data:', 'blob:', SUPABASE],
  'font-src': ["'self'"],
  'connect-src': ["'self'", SUPABASE, SUPABASE_WS],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'", 'mailto:'],
  'frame-src': ["'none'"],
};

const join = (d) =>
  Object.entries(d)
    .map(([k, v]) => `${k} ${v.join(' ')}`)
    .join('; ');

// frame-ancestors is ignored inside <meta>, so it lives in HTTP headers only.
export const CSP_META = join(CSP_DIRECTIVES);
export const CSP_HEADER = `${CSP_META}; frame-ancestors 'none'`;

export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};
