import { useEffect, useMemo, useState } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import ThemeToggle from './ThemeToggle.jsx';
import Icon from '../ui/Icon.jsx';
import SafeLink from '../ui/SafeLink.jsx';
import { profile } from '../../data/profile.js';

export default function Navbar({ items }) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <SafeLink href={profile.cv} className="nav-cv" download>
          <Icon name="download" size={16} />
          <span>Download CV</span>
        </SafeLink>
        <nav id="primary-nav" className={`nav-links${open ? ' is-open' : ''}`} aria-label="Primary">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={active === it.id ? 'is-active' : undefined}
              aria-current={active === it.id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {it.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn nav-burger"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}
