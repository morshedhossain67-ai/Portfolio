import { useReveal } from '../../hooks/useReveal.js';
import EditButtons from '../admin/EditButtons.jsx';

// Reusable section block: title, optional lede, and admin edit buttons.
// `edit` = [{ key: 'publications', label: 'Edit publications' }, ...]
export default function Section({ id, title, lede, className = '', edit, children }) {
  const ref = useReveal();
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>
      <div ref={ref} className="container reveal">
        <header className="section-head">
          <h2 id={`${id}-title`} className="section-title">{title}</h2>
          {lede && <p className="section-lede">{lede}</p>}
          {edit && <EditButtons edits={edit} />}
        </header>
        {children}
      </div>
    </section>
  );
}
