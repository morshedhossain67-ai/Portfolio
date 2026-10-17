import { useReferences } from '../../content/hooks.js';

export default function References() {
  const references = useReferences();
  if (!references.length) return <div />;
  return (
    <div className="refs">
      <h3 className="panel-title">Referees</h3>
      <ul>
        {references.map((r, i) => (
          <li key={`${r.name}-${i}`}>
            <strong>{r.name}</strong>
            <span>{r.role}</span>
            <small>{r.note}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
