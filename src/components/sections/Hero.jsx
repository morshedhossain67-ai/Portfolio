import { useProfile } from '../../content/hooks.js';
import Button from '../ui/Button.jsx';
import SafeLink from '../ui/SafeLink.jsx';
import EditButtons from '../admin/EditButtons.jsx';
import Portrait from './Portrait.jsx';

// "Md. Morshed Hossain" -> ["Md. Morshed", "Hossain"] (last name in accent colour)
const splitName = (name = '') => {
  const parts = name.trim().split(/\s+/);
  return [parts.slice(0, -1).join(' '), parts[parts.length - 1] || ''];
};

export default function Hero() {
  const profile = useProfile();
  const [first, last] = splitName(profile.name);
  return (
    <section id="top" className="hero" aria-labelledby="hero-name">
      <div className="container hero-grid">
        <div className="hero-head">
          <p className="hero-hon">{profile.honorific}</p>
          <h1 id="hero-name" className="hero-name">
            {first} <em>{last}</em>
          </h1>
          <EditButtons edits={[{ key: 'profile', label: 'Edit hero & profile' }]} />
        </div>

        <Portrait />

        <div className="hero-body">
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-cta">
            <Button href="#publications" icon="arrow">Read the research</Button>
            <Button href="#contact" variant="ghost">Contact me</Button>
          </div>
          <dl className="hero-stats">
            {(profile.stats || []).map((s, i) => (
              <div key={`${s.label}-${i}`} className={i === 0 ? 'stat stat--lead' : 'stat'}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="container partners" aria-label="Partner organisations">
        <span className="partners-label">Assignments with or for</span>
        <ul>
          {(profile.partners || []).map((p, i) => (
            <li key={`${p.name}-${i}`}>
              <SafeLink href={p.url}>{p.name}</SafeLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
