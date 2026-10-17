import { experience } from '../../data/experience.js';
import { yearOf } from '../../utils/format.js';

// Labels under the timeline bar; each column is as wide as its bar segment.
export default function CareerLabels() {
  const items = [...experience].reverse();
  const cols = items.map((e) => `${yearOf(e.to) - yearOf(e.from)}fr`).join(' ');

  return (
    <ol className="span-labels-row" style={{ '--cols': cols }}>
      {items.map((e, i) => (
        <li key={e.from} className={`span-label span-label--${i}`}>
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
