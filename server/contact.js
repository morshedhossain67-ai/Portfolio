import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { verifyCsrf, verifyOrigin } from './csrf.js';
import { validateContact } from '../shared/contactSchema.js';
import { forwardMessage, mailEnabled } from './mailer.js';

const DATA_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data');
const INBOX = path.join(DATA_DIR, 'messages.jsonl');
const MIN_FILL_MS = 3000;

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many messages. Please try again later.' },
});

export const contactRouter = Router();

contactRouter.post('/contact', contactLimiter, verifyOrigin, verifyCsrf, async (req, res) => {
  if (!req.is('application/json')) {
    return res.status(415).json({ error: 'Unsupported content type.' });
  }
  const { website, startedAt, ...fields } = req.body || {};

  // Honeypot filled => bot. Pretend success, store nothing.
  if (website) return res.json({ ok: true });
  if (!Number.isFinite(Number(startedAt)) || Date.now() - Number(startedAt) < MIN_FILL_MS) {
    return res.status(400).json({ error: 'Please take a moment before sending.' });
  }

  const { ok, data, errors } = validateContact(fields);
  if (!ok) return res.status(422).json({ error: 'Please fix the highlighted fields.', errors });

  // Always keep a local copy, then forward by email.
  await fs.mkdir(DATA_DIR, { recursive: true });
  const record = { ...data, ip: req.ip, receivedAt: new Date().toISOString() };
  await fs.appendFile(INBOX, JSON.stringify(record) + '\n', 'utf8');

  if (mailEnabled) {
    try {
      await forwardMessage(data);
    } catch (err) {
      console.error('[mail] send failed:', err.message);
      return res.status(502).json({ error: 'Message saved, but email delivery failed. Please email directly.' });
    }
  }
  res.status(201).json({ ok: true });
});
