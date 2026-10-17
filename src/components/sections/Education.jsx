import { education } from '../../data/education.js';
import Section from '../ui/Section.jsx';

export default function Education() {
  return (
    <Section
      id="education"
      title="Education"
    >
      <ol className="edu">
        {education.map((d) => (
          <li key={d.degree} className="edu-step card">
            <span className="edu-level">{d.level}</span>
            <h3>{d.degree}</h3>
            <p>{d.institution}</p>
            {d.year && <span className="edu-year">{d.year}</span>}
          </li>
        ))}
      </ol>
    </Section>
  );
}
