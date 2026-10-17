import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { CSP_DIRECTIVES, SECURITY_HEADERS } from '../security.config.js';
import { config } from './config.js';

export function applySecurity(app) {
  app.disable('x-powered-by');
  if (config.isProd) app.set('trust proxy', 1);

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          ...CSP_DIRECTIVES,
          'frame-ancestors': ["'none'"],
          ...(config.forceHttps ? { 'upgrade-insecure-requests': [] } : {}),
        },
      },
      strictTransportSecurity: config.forceHttps
        ? { maxAge: 63072000, includeSubDomains: true, preload: true }
        : false,
      frameguard: { action: 'deny' },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      crossOriginOpenerPolicy: { policy: 'same-origin' },
      crossOriginResourcePolicy: { policy: 'same-origin' },
    })
  );

  app.use((req, res, next) => {
    res.set('Permissions-Policy', SECURITY_HEADERS['Permissions-Policy']);
    next();
  });

  // Global API throttle (contact route adds a stricter one).
  app.use(
    '/api',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
    })
  );
}
