import { useState } from 'react';
import FieldGroup from './FieldGroup.jsx';
import RowTools from './RowTools.jsx';
import { blankItem } from './schemas.js';
import { moveItem, removeAt, replaceAt } from './move.js';

let uid = 0;

// Editable list of objects (career entries, publications ...). Each item
// collapses to a one-line summary so long lists stay manageable.
export default function ItemList({ config, value, onChange }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [prefix] = useState(() => `il${(uid += 1)}`);
  const name = config.item || 'item';

  const add = () => {
    const item = blankItem(config.fields);
    onChange(config.prepend ? [item, ...value] : [...value, item]);
    setOpenIndex(config.prepend ? 0 : value.length);
  };

  const move = (i, to) => {
    onChange(moveItem(value, i, to));
    if (openIndex === i) setOpenIndex(to);
  };

  const remove = (i) => {
    const title = value[i]?.[config.summary] || `${name} ${i + 1}`;
    if (!window.confirm(`Delete "${title}"?`)) return;
    onChange(removeAt(value, i));
    setOpenIndex(null);
  };

  const addButton = (
    <button type="button" className="ed-add" onClick={add}>+ Add {name}</button>
  );

  return (
    <div className="ed-items">
      {config.prepend && addButton}
      {value.map((item, i) => {
        const open = openIndex === i;
        const title = item?.[config.summary] || `New ${name}`;
        return (
          <div key={i} className={`ed-item${open ? ' is-open' : ''}`}>
            <div className="ed-item-head">
              <button type="button" className="ed-item-toggle" aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : i)}>
                <span className="ed-item-num">{i + 1}</span>
                <span className="ed-item-title">{title}</span>
              </button>
              <RowTools index={i} count={value.length} label={title}
                onMove={(to) => move(i, to)} onRemove={() => remove(i)} />
            </div>
            {open && (
              <FieldGroup
                fields={config.fields}
                value={item}
                idPrefix={`${prefix}-${i}`}
                onChange={(next) => onChange(replaceAt(value, i, next))}
              />
            )}
          </div>
        );
      })}
      {!config.prepend && addButton}
    </div>
  );
}
