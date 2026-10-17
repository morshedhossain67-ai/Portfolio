import { useEducation } from '../../content/hooks.js';
import Section from '../ui/Section.jsx';

export default function Education() {
  const education = useEducation();
  return (
    <Section
      id="education"
      title="Education"
      edit={[{ key: 'education', label: 'Edit education' }]}
    >
      <ol className="edu">
        {education.map((d, i) => (
          <li key={`${d.degree}-${i}`} className="edu-step card">
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
