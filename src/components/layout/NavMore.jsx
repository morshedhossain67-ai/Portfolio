import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon.jsx';

// Phone-only hamburger menu holding the secondary section links.
export default function NavMore({ items, active }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const holdsActive = items.some((it) => it.id === active);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="nav-more" ref={ref}>
      <button
        type="button"
        className={`nav-more-btn${holdsActive ? ' is-active' : ''}`}
        aria-expanded={open}
        aria-controls="nav-more-menu"
        aria-label={open ? 'Close menu' : 'More sections'}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name={open ? 'close' : 'menu'} size={20} />
      </button>
      {open && (
        <ul id="nav-more-menu" className="nav-more-menu">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={active === it.id ? 'is-active' : undefined}
                aria-current={active === it.id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
