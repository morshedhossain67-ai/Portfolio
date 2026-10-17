// Cleans admin input before it is stored: strips control characters,
// trims strings, caps length and drops empty list entries.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const MAX_STRING = 5000;
const MAX_DEPTH = 6;

export function sanitizeDeep(value, depth = 0) {
  if (depth > MAX_DEPTH) return null;
  if (typeof value === 'string') return value.replace(CONTROL, '').trim().slice(0, MAX_STRING);
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'boolean' || value === null) return value;
  if (Array.isArray(value)) {
    return value
      .map((v) => sanitizeDeep(v, depth + 1))
      .filter((v) => v !== '' && v !== null && v !== undefined);
  }
  if (typeof value === 'object') {
    const out = {};
    Object.entries(value).forEach(([k, v]) => {
      if (/^[a-zA-Z][a-zA-Z0-9_]{0,40}$/.test(k)) out[k] = sanitizeDeep(v, depth + 1);
    });
    return out;
  }
  return null;
}
