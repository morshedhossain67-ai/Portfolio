import { useExperience } from '../../content/hooks.js';
import { formatMonth, yearOf, yearsBetween } from '../../utils/format.js';
import Section from '../ui/Section.jsx';
import CareerSpan from './CareerSpan.jsx';
import CareerLabels from './CareerLabels.jsx';

export default function Experience() {
  const experience = useExperience();
  const oldestFirst = [...experience].reverse();

  return (
    <Section
      id="experience"
      title="Career"
      edit={[{ key: 'experience', label: 'Edit career' }]}
    >
      {experience.length > 0 && (
        <div className="span-wrap card">
          <div className="span-labels">
            <span>{yearOf(oldestFirst[0].from)}</span>
            <span>Today</span>
          </div>
          <CareerSpan items={oldestFirst} />
          <CareerLabels items={oldestFirst} />
        </div>
      )}

      <ol className="ledger">
        {experience.map((e, i) => (
          <li key={`${e.from}-${i}`} className="ledger-row">
            <div className="ledger-date">
              <span>{formatMonth(e.from)}</span>
              <span className="ledger-to">{formatMonth(e.to)}</span>
              <span className="ledger-dur">{yearsBetween(e.from, e.to).toFixed(1)} yrs</span>
            </div>
            <div className="ledger-body">
              <h3>{e.role}</h3>
              <p className="ledger-org">{e.org}</p>
              <ul className="ledger-points">
                {e.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
