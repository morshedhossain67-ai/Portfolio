import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from './config.js';
import { applySecurity } from './security.js';
import { csrfRouter } from './csrf.js';
import { contactRouter } from './contact.js';
import { verifyMailer } from './mailer.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const app = express();

applySecurity(app);
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use('/api', csrfRouter, contactRouter);
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

if (config.isProd) {
  app.use(
    '/assets',
    express.static(path.join(DIST, 'assets'), { immutable: true, maxAge: '1y' })
  );
  app.use(express.static(DIST, { index: false, dotfiles: 'deny' }));
  app.get('*', (req, res) => res.sendFile(path.join(DIST, 'index.html')));
}

// Never leak stack traces to the client.
app.use((err, req, res, next) => {
  console.error('[error]', err.message);
  const status = err.type === 'entity.too.large' ? 413 : err.status || 500;
  res.status(status).json({ error: status === 500 ? 'Server error' : 'Bad request' });
});

app.listen(config.port, () => {
  const mode = config.isProd ? 'production' : 'development';
  console.log(`[api] ${mode} server on http://localhost:${config.port}`);
  verifyMailer();
});
