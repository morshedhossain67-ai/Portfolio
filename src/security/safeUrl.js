// Only allow known-safe URL schemes in href attributes.
// Blocks javascript:, data:, vbscript: and other XSS vectors.
const ALLOWED = new Set(['https:', 'http:', 'mailto:', 'tel:']);

export function safeUrl(raw) {
  if (typeof raw !== 'string') return '#';
  const value = raw.trim();
  if (value.startsWith('#') || value.startsWith('/')) {
    return value.startsWith('//') ? '#' : value;
  }
  try {
    const url = new URL(value);
    return ALLOWED.has(url.protocol) ? url.href : '#';
  } catch {
    return '#';
  }
}

export const isExternal = (href) => /^https?:\/\//i.test(href);

export const doiUrl = (doi) =>
  /^10\.\d{4,9}\/[\w.\-;()/:]+$/i.test(doi || '') ? `https://doi.org/${doi}` : null;
