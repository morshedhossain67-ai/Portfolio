import { profile } from '../../data/profile.js';
import Section from '../ui/Section.jsx';
import Chip from '../ui/Chip.jsx';
import Icon from '../ui/Icon.jsx';

export default function About() {
  const [lead, ...rest] = profile.summary;
  return (
    <Section
      id="about"
      title="Profile"
    >
      <div className="about-grid">
        <div className="about-text">
          <p className="dropcap">{lead}</p>
          {rest.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
        <aside className="about-aside card" aria-label="Field profile">
          <h3 className="aside-title"><Icon name="pin" /> Geographic experience</h3>
          <p>{profile.geography}</p>
          <h3 className="aside-title"><Icon name="shield" /> Professional focus</h3>
          <div className="chips">
            {profile.focus.map((f) => (
              <Chip key={f}>{f}</Chip>
            ))}
          </div>
        </aside>
      </div>
    </Section>
  );
}
