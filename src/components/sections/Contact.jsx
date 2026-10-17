import { profile } from '../../data/profile.js';
import Section from '../ui/Section.jsx';
import SafeLink from '../ui/SafeLink.jsx';
import Icon from '../ui/Icon.jsx';
import References from './References.jsx';

const CHANNELS = [
  { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  ...profile.social,
  {
    icon: 'pin',
    label: 'Office',
    value: `${profile.department}, ${profile.university}, ${profile.address}`,
  },
];

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Contact me"
      className="section--contact"
    >
      <div className="contact-grid">
        <ul className="channels">
          {CHANNELS.map((c) => (
            <li key={c.label} className="channel">
              <span className="channel-icon"><Icon name={c.icon} /></span>
              <span>
                <small>{c.label}</small>
                {c.href ? <SafeLink href={c.href}>{c.value}</SafeLink> : <span>{c.value}</span>}
              </span>
            </li>
          ))}
        </ul>
        <References />
      </div>
    </Section>
  );
}
