import { useEffect, useState } from 'react';

// Date typed as dd/mm/yyyy, stored as yyyy-mm-dd (so sorting keeps working).
const toDisplay = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso || '';
};

const toIso = (text) => {
  const m = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/.exec(text.trim());
  if (!m) return null;
  const [d, mo, y] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  if (date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) return null;
  return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
};

export default function DateField({ id, value, onChange }) {
  const [text, setText] = useState(toDisplay(value));

  useEffect(() => {
    if (toIso(text) !== value && !(text === '' && !value)) setText(toDisplay(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const change = (e) => {
    const next = e.target.value.replace(/[^\d/.-]/g, '').slice(0, 10);
    setText(next);
    // Valid date -> ISO; empty -> ''; half-typed -> raw text (flagged on save).
    onChange(next === '' ? '' : toIso(next) || next);
  };

  return (
    <input id={id} type="text" inputMode="numeric" placeholder="dd/mm/yyyy" maxLength={10}
      autoComplete="off" value={text} onChange={change} />
  );
}
