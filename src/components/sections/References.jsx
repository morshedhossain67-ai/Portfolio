import { references } from '../../data/references.js';

export default function References() {
  return (
    <div className="refs">
      <h3 className="panel-title">Referees</h3>
      <ul>
        {references.map((r) => (
          <li key={r.name}>
            <strong>{r.name}</strong>
            <span>{r.role}</span>
            <small>{r.note}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
