import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { CSP_META, SECURITY_HEADERS } from './security.config.js';

// Injects a strict CSP <meta> into the production build only.
// (Dev mode needs an inline React-refresh script, so CSP is enforced on build.)
const cspMeta = () => ({
  name: 'inject-csp-meta',
  apply: 'build',
  transformIndexHtml: (html) =>
    html.replace(
      '<!--CSP-->',
      `<meta http-equiv="Content-Security-Policy" content="${CSP_META}" />`
    ),
});

export default defineConfig({
  plugins: [react(), cspMeta()],
  server: {
    port: 5173,
    headers: SECURITY_HEADERS,
    proxy: { '/api': 'http://localhost:8787' },
  },
  preview: { port: 4173, headers: SECURITY_HEADERS },
  build: { sourcemap: false, assetsInlineLimit: 0 },
});
