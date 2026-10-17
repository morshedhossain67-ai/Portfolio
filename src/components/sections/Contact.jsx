import { useProfile } from '../../content/hooks.js';
import Section from '../ui/Section.jsx';
import SafeLink from '../ui/SafeLink.jsx';
import Icon from '../ui/Icon.jsx';
import References from './References.jsx';

export default function Contact() {
  const profile = useProfile();
  const channels = [
    { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    ...(profile.social || []),
    {
      icon: 'pin',
      label: 'Office',
      value: `${profile.department}, ${profile.university}, ${profile.address}`,
    },
  ];

  return (
    <Section
      id="contact"
      title="Contact me"
      className="section--contact"
      edit={[
        { key: 'profile', label: 'Edit contact links' },
        { key: 'references', label: 'Edit referees' },
      ]}
    >
      <div className="contact-grid">
        <ul className="channels">
          {channels.map((c, i) => (
            <li key={`${c.label}-${i}`} className="channel">
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
