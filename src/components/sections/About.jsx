import { useProfile } from '../../content/hooks.js';
import Section from '../ui/Section.jsx';
import Chip from '../ui/Chip.jsx';
import Icon from '../ui/Icon.jsx';

export default function About() {
  const profile = useProfile();
  const [lead, ...rest] = profile.summary || [];
  return (
    <Section
      id="about"
      title="Profile"
      edit={[{ key: 'profile', label: 'Edit profile' }]}
    >
      <div className="about-grid">
        <div className="about-text">
          {lead && <p className="dropcap">{lead}</p>}
          {rest.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <aside className="about-aside card" aria-label="Field profile">
          <h3 className="aside-title"><Icon name="pin" /> Geographic experience</h3>
          <p>{profile.geography}</p>
          <h3 className="aside-title"><Icon name="shield" /> Professional focus</h3>
          <div className="chips">
            {(profile.focus || []).map((f, i) => (
              <Chip key={`${f}-${i}`}>{f}</Chip>
            ))}
          </div>
        </aside>
      </div>
    </Section>
  );
}
