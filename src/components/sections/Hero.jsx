import { profile } from '../../data/profile.js';
import Button from '../ui/Button.jsx';
import SafeLink from '../ui/SafeLink.jsx';
import Portrait from './Portrait.jsx';

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-name">
      <div className="container hero-grid">
        <div className="hero-head">
          <p className="hero-hon">{profile.honorific}</p>
          <h1 id="hero-name" className="hero-name">
            Md. Morshed <em>Hossain</em>
          </h1>
        </div>

        <Portrait />

        <div className="hero-body">
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-cta">
            <Button href="#publications" icon="arrow">Read the research</Button>
            <Button href="#contact" variant="ghost">Contact me</Button>
          </div>
          <dl className="hero-stats">
            {profile.stats.map((s, i) => (
              <div key={s.label} className={i === 0 ? 'stat stat--lead' : 'stat'}>
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
          {profile.partners.map((p) => (
            <li key={p.name}>
              <SafeLink href={p.url}>{p.name}</SafeLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
