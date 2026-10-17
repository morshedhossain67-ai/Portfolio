import crypto from 'node:crypto';

// Loads .env if present (Node 20.12+), no extra dependency needed.
try {
  process.loadEnvFile();
} catch {
  /* no .env file - fall back to defaults */
}

const isProd = process.argv.includes('--prod') || process.env.NODE_ENV === 'production';

let csrfSecret = process.env.CSRF_SECRET || '';
if (csrfSecret.length < 32 || csrfSecret.startsWith('change-me')) {
  csrfSecret = crypto.randomBytes(48).toString('hex');
  console.warn('[security] CSRF_SECRET missing/weak - using a random per-process secret.');
}

export const config = Object.freeze({
  isProd,
  port: Number(process.env.PORT) || 8787,
  csrfSecret,
  forceHttps: process.env.FORCE_HTTPS === '1',
  mailTo: process.env.MAIL_TO || 'drmorshed@brur.ac.bd',
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || '',
  },
  allowedOrigins: (process.env.ALLOWED_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
});
