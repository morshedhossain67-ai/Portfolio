import StringList from './StringList.jsx';
import ItemList from './ItemList.jsx';
import FileField from './FileField.jsx';
import DateField from './DateField.jsx';

const MAX = 5000;

// Renders one form control from a schema field. Values are plain text only;
// nothing here is ever rendered as HTML.
export default function Field({ field, value, onChange, id }) {
  const label = <span className="ed-label">{field.label}</span>;

  if (field.type === 'strings') {
    return (
      <fieldset className="ed-field">
        <legend className="ed-label">{field.label}</legend>
        <StringList field={field} value={value || []} onChange={onChange} />
      </fieldset>
    );
  }
  if (field.type === 'list') {
    return (
      <fieldset className="ed-field">
        <legend className="ed-label">{field.label}</legend>
        <ItemList config={field} value={value || []} onChange={onChange} />
      </fieldset>
    );
  }
  if (field.type === 'file') {
    return (
      <div className="ed-field">
        {label}
        <FileField field={field} value={value || ''} onChange={onChange} />
      </div>
    );
  }
  if (field.type === 'select') {
    return (
      <label className="ed-field" htmlFor={id}>
        {label}
        <select id={id} value={value || ''} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </label>
    );
  }
  if (field.type === 'textarea') {
    return (
      <label className="ed-field" htmlFor={id}>
        {label}
        <textarea id={id} rows="3" maxLength={MAX} value={value || ''} onChange={(e) => onChange(e.target.value)} />
      </label>
    );
  }
  if (field.type === 'date') {
    return (
      <label className="ed-field" htmlFor={id}>
        {label}
        <DateField id={id} value={value || ''} onChange={onChange} />
      </label>
    );
  }
  const type = field.type === 'email' ? 'email' : 'text';
  return (
    <label className="ed-field" htmlFor={id}>
      {label}
      <input
        id={id}
        type={type}
        inputMode={field.type === 'url' ? 'url' : undefined}
        maxLength={MAX}
        value={value || ''}
        placeholder={field.type === 'url' ? 'https://' : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
