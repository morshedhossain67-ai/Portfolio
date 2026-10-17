import { yearOf } from '../../utils/format.js';

// Labels under the timeline bar; each column is as wide as its bar segment.
export default function CareerLabels({ items }) {
  const cols = items.map((e) => `${Math.max(1, yearOf(e.to) - yearOf(e.from))}fr`).join(' ');

  return (
    <ol className="span-labels-row" style={{ '--cols': cols }}>
      {items.map((e, i) => (
        <li key={`${e.from}-${i}`} className={`span-label span-label--${i % 3}`}>
          <strong>{e.role}</strong>
          <span>{e.org}</span>
          <small>
            {yearOf(e.from)} - {e.to ? yearOf(e.to) : 'Present'}
          </small>
        </li>
      ))}
    </ol>
  );
}
