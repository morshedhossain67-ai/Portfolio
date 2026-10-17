import { useMemo, useState } from 'react';
import { useContent } from '../../content/ContentContext.jsx';
import Dialog from './Dialog.jsx';
import FieldGroup from './FieldGroup.jsx';
import ItemList from './ItemList.jsx';
import { SCHEMAS } from './schemas.js';
import { validate } from './validate.js';

const clone = (v) => JSON.parse(JSON.stringify(v));

// Edits one content section on a copy; nothing changes until "Save".
export default function EditorDialog({ sectionKey, onClose }) {
  const { content, save } = useContent();
  const schema = SCHEMAS[sectionKey];
  const initial = useMemo(() => clone(content[sectionKey]), [content, sectionKey]);
  const [draft, setDraft] = useState(initial);
  const [errors, setErrors] = useState([]);
  const [busy, setBusy] = useState(false);
  const dirty = JSON.stringify(draft) !== JSON.stringify(initial);

  const close = () => {
    if (dirty && !window.confirm('Discard your unsaved changes?')) return;
    onClose();
  };

  const submit = async (e) => {
    e.preventDefault();
    const problems = validate(schema, draft);
    setErrors(problems);
    if (problems.length) return;
    setBusy(true);
    try {
      await save(sectionKey, draft);
      onClose();
    } catch (err) {
      setErrors([err.message || 'Could not save. Please try again.']);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog title={`Edit: ${schema.title}`} onClose={close} wide>
      <form className="ed-form" onSubmit={submit} noValidate>
        {schema.list ? (
          <ItemList config={schema.list} value={draft} onChange={setDraft} />
        ) : (
          <FieldGroup fields={schema.fields} value={draft} onChange={setDraft} idPrefix={sectionKey} />
        )}
        {errors.length > 0 && (
          <ul className="ed-errors" role="alert">
            {errors.map((m) => <li key={m}>{m}</li>)}
          </ul>
        )}
        <div className="ed-actions">
          <button type="button" className="btn btn--ghost" onClick={close}>Cancel</button>
          <button type="submit" className="btn btn--primary" disabled={busy || !dirty}>
            {busy ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
