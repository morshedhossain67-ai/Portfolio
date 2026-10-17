import { useId, useState } from 'react';
import { uploadMedia } from '../../lib/upload.js';

const ACCEPT = { image: 'image/webp,image/png,image/jpeg', pdf: 'application/pdf' };

// Upload a file to storage, or paste a link. Empty = use the built-in file.
export default function FileField({ field, value, onChange }) {
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      onChange(await uploadMedia(file, field.accept));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="ed-file">
      <input type="text" inputMode="url" value={value} aria-label={`${field.label} link`}
        placeholder="Upload a file or paste a link" onChange={(e) => onChange(e.target.value)} />
      <div className="ed-file-row">
        <label className="ed-add ed-upload" htmlFor={id}>
          {busy ? 'Uploading...' : 'Upload file'}
        </label>
        <input id={id} className="ed-file-input" type="file" accept={ACCEPT[field.accept]}
          onChange={onFile} disabled={busy} />
        {value && (
          <button type="button" className="ed-add" onClick={() => onChange('')}>Use default</button>
        )}
      </div>
      {error && <p className="ed-error" role="alert">{error}</p>}
    </div>
  );
}
