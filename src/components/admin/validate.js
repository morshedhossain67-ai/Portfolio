import { safeUrl } from '../../security/safeUrl.js';

const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

// Returns a list of readable problems; empty list = ok to save.
function check(fields, value, path, out) {
  fields.forEach((f) => {
    const v = value?.[f.name];
    const where = `${path}${f.label}`;
    if ((f.type === 'url' || f.type === 'file') && v && safeUrl(v) === '#') {
      out.push(`${where}: link must start with https:// (or /)`);
    }
    if (f.type === 'email' && v && !EMAIL.test(v)) out.push(`${where}: not a valid email`);
    if (f.type === 'date' && v && !DATE.test(v)) out.push(`${where}: use dd/mm/yyyy, e.g. 17/04/2015`);
    if (f.type === 'list' && Array.isArray(v)) {
      v.forEach((item, i) => check(f.fields, item, `${f.label} #${i + 1} - `, out));
    }
  });
}

export function validate(schema, draft) {
  const out = [];
  if (schema.list) {
    draft.forEach((item, i) => {
      check(schema.list.fields, item, `${schema.title} #${i + 1} - `, out);
      if (schema.list.fields.some((f) => f.name === 'from') && !item.from) {
        out.push(`${schema.title} #${i + 1}: start date is required`);
      }
    });
  } else {
    check(schema.fields, draft, '', out);
  }
  return out.slice(0, 6);
}
