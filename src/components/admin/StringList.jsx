import RowTools from './RowTools.jsx';
import { moveItem, removeAt, replaceAt } from './move.js';

// Editable list of plain strings (paragraphs, tags, bullet points).
export default function StringList({ field, value, onChange }) {
  const name = field.item || 'item';
  return (
    <div className="ed-strings">
      {value.map((text, i) => (
        <div key={i} className="ed-string">
          {field.multiline ? (
            <textarea rows="3" maxLength={5000} value={text} aria-label={`${name} ${i + 1}`}
              onChange={(e) => onChange(replaceAt(value, i, e.target.value))} />
          ) : (
            <input type="text" maxLength={300} value={text} aria-label={`${name} ${i + 1}`}
              onChange={(e) => onChange(replaceAt(value, i, e.target.value))} />
          )}
          <RowTools index={i} count={value.length} label={`${name} ${i + 1}`}
            onMove={(to) => onChange(moveItem(value, i, to))}
            onRemove={() => onChange(removeAt(value, i))} />
        </div>
      ))}
      <button type="button" className="ed-add" onClick={() => onChange([...value, ''])}>
        + Add {name}
      </button>
    </div>
  );
}
