import { useReveal } from '../../hooks/useReveal.js';

// Reusable section block: serif title + optional lede.
export default function Section({ id, title, lede, className = '', children }) {
  const ref = useReveal();
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>
      <div ref={ref} className="container reveal">
        <header className="section-head">
          <h2 id={`${id}-title`} className="section-title">{title}</h2>
          {lede && <p className="section-lede">{lede}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
