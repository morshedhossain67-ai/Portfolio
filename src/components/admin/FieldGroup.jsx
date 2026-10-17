import Field from './Field.jsx';

// A set of fields bound to one object value.
export default function FieldGroup({ fields, value, onChange, idPrefix }) {
  const set = (name) => (v) => onChange({ ...value, [name]: v });
  return (
    <div className="ed-group">
      {fields.map((field) => (
        <Field
          key={field.name}
          id={`${idPrefix}-${field.name}`}
          field={field}
          value={value?.[field.name]}
          onChange={set(field.name)}
        />
      ))}
    </div>
  );
}
