import { useEffect, useMemo, useState } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import ThemeToggle from './ThemeToggle.jsx';
import NavMore from './NavMore.jsx';
import Icon from '../ui/Icon.jsx';
import SafeLink from '../ui/SafeLink.jsx';
import { useProfile } from '../../content/hooks.js';

export default function Navbar({ items }) {
  const profile = useProfile();
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const secondary = useMemo(() => items.filter((i) => !i.primary), [items]);
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <SafeLink href={profile.cv} className="nav-cv" download aria-label="Download CV">
          <Icon name="download" size={16} />
          <span><span className="nav-cv-long">Download </span>CV</span>
        </SafeLink>
        <nav className="nav-links" aria-label="Primary">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={[it.primary ? '' : 'is-secondary', active === it.id ? 'is-active' : '']
                .join(' ')
                .trim() || undefined}
              aria-current={active === it.id ? 'true' : undefined}
            >
              {it.label}
            </a>
          ))}
          <NavMore items={secondary} active={active} />
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
