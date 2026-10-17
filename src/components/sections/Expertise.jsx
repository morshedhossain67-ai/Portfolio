import { competencies, sectors, software } from '../../data/competencies.js';
import Section from '../ui/Section.jsx';
import Chip from '../ui/Chip.jsx';

export default function Expertise() {
  return (
    <Section
      id="expertise"
      title="Expertise"
    >
      <ol className="comp-grid">
        {competencies.map((c) => (
          <li key={c.key} className="comp card">
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </li>
        ))}
      </ol>

      <div className="tag-panels">
        <div>
          <h3 className="panel-title">Technical sectors</h3>
          <div className="chips">
            {sectors.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
        <div>
          <h3 className="panel-title">Software</h3>
          <div className="chips chips--mono">
            {software.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
