import { experience } from '../../data/experience.js';
import { formatMonth, yearOf, yearsBetween } from '../../utils/format.js';
import Section from '../ui/Section.jsx';
import CareerSpan from './CareerSpan.jsx';
import CareerLabels from './CareerLabels.jsx';

export default function Experience() {
  const first = yearOf(experience[experience.length - 1].from);
  return (
    <Section
      id="experience"
      title="Career"
    >
      <div className="span-wrap card">
        <div className="span-labels">
          <span>{first}</span>
          <span>Today</span>
        </div>
        <CareerSpan />
        <CareerLabels />
      </div>

      <ol className="ledger">
        {experience.map((e) => (
          <li key={e.from} className="ledger-row">
            <div className="ledger-date">
              <span>{formatMonth(e.from)}</span>
              <span className="ledger-to">{formatMonth(e.to)}</span>
              <span className="ledger-dur">{yearsBetween(e.from, e.to).toFixed(1)} yrs</span>
            </div>
            <div className="ledger-body">
              <h3>{e.role}</h3>
              <p className="ledger-org">{e.org}</p>
              <ul className="ledger-points">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
