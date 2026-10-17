import { useExpertise } from '../../content/hooks.js';
import Section from '../ui/Section.jsx';
import Chip from '../ui/Chip.jsx';

export default function Expertise() {
  const { cards = [], sectors = [], software = [] } = useExpertise();
  return (
    <Section
      id="expertise"
      title="Expertise"
      edit={[{ key: 'expertise', label: 'Edit expertise' }]}
    >
      <ol className="comp-grid">
        {cards.map((c, i) => (
          <li key={`${c.title}-${i}`} className="comp card">
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </li>
        ))}
      </ol>

      <div className="tag-panels">
        <div>
          <h3 className="panel-title">Technical sectors</h3>
          <div className="chips">
            {sectors.map((s, i) => (
              <Chip key={`${s}-${i}`}>{s}</Chip>
            ))}
          </div>
        </div>
        <div>
          <h3 className="panel-title">Software</h3>
          <div className="chips chips--mono">
            {software.map((s, i) => (
              <Chip key={`${s}-${i}`}>{s}</Chip>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
