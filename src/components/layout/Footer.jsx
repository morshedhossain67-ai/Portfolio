import { useProfile } from '../../content/hooks.js';
import SafeLink from '../ui/SafeLink.jsx';

export default function Footer() {
  const profile = useProfile();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{profile.honorific} {profile.name}</p>
          <p className="footer-meta">{profile.title} &middot; {profile.university}</p>
        </div>
        <div className="footer-right">
          <SafeLink href={`mailto:${profile.email}`}>{profile.email}</SafeLink>
        </div>
      </div>
    </footer>
  );
}
