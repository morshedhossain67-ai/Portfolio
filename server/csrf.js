import crypto from 'node:crypto';
import { Router } from 'express';
import { config } from './config.js';

// Signed double-submit cookie pattern:
//  cookie  = token.HMAC(token)  (HttpOnly, SameSite=Strict)
//  header  = token              (sent by our JS only)
const COOKIE = config.isProd ? '__Host-csrf' : 'csrf';
const TTL_MS = 2 * 60 * 60 * 1000;

const sign = (token) =>
  crypto.createHmac('sha256', config.csrfSecret).update(token).digest('hex');

const safeEqual = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

export const csrfRouter = Router();

csrfRouter.get('/csrf-token', (req, res) => {
  const token = crypto.randomBytes(32).toString('hex');
  res.cookie(COOKIE, `${token}.${sign(token)}`, {
    httpOnly: true,
    sameSite: 'strict',
    secure: config.isProd,
    path: '/',
    maxAge: TTL_MS,
  });
  res.set('Cache-Control', 'no-store');
  res.json({ token });
});

export function verifyCsrf(req, res, next) {
  const header = req.get('x-csrf-token') || '';
  const [token, mac] = String(req.cookies?.[COOKIE] || '').split('.');
  const valid = Boolean(token && mac) && safeEqual(mac, sign(token)) && safeEqual(token, header);
  if (!valid) return res.status(403).json({ error: 'Security check failed. Refresh and try again.' });
  next();
}

// Defence in depth: state-changing requests must come from our own origin.
export function verifyOrigin(req, res, next) {
  const origin = req.get('origin');
  const self = `${req.protocol}://${req.get('host')}`;
  const allowed = origin && (origin === self || config.allowedOrigins.includes(origin));
  if (!allowed) return res.status(403).json({ error: 'Origin not allowed.' });
  next();
}
