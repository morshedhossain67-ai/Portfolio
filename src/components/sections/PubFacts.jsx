import { useMemo } from 'react';
import { usePublicationList } from '../../content/hooks.js';

const SOLO = /^(Dr\.\s)?(Md\.\s)?Morshed Hossain$/;

// Share bar: filled portion of all works (SVG, so no inline CSS needed).
function Meter({ value, total }) {
  return (
    <svg className="meter" viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden="true">
      <rect className="meter-track" width="100" height="6" />
      <rect className="meter-fill" width={(value / total) * 100} height="6" />
    </svg>
  );
}

// One square per year; filled when something was published that year.
function YearStrip({ years, first, last }) {
  const span = last - first + 1;
  const size = 100 / span;
  return (
    <svg className="year-strip" viewBox={`0 0 100 ${size}`} aria-hidden="true">
      {Array.from({ length: span }, (_, i) => (
        <rect
          key={i}
          className={years.has(first + i) ? 'ys-on' : 'ys-off'}
          x={i * size + size * 0.1}
          y={size * 0.1}
          width={size * 0.8}
          height={size * 0.8}
        />
      ))}
    </svg>
  );
}

export default function PubFacts() {
  const publications = usePublicationList();
  const d = useMemo(() => {
    const list = publications.map((p) => p.year).filter(Boolean);
    if (!publications.length || !list.length) return null;
    return {
      total: publications.length,
      journal: publications.filter((p) => p.type === 'journal').length,
      solo: publications.filter((p) => SOLO.test(p.authors)).length,
      years: new Set(list),
      first: Math.min(...list),
      last: Math.max(...list),
    };
  }, [publications]);

  if (!d) return null;
  return (
    <div className="pub-facts">
      <div className="fact fact--wide">
        <span className="fact-num">{d.journal}</span>
        <span className="fact-label">Journal articles</span>
        <Meter value={d.journal} total={d.total} />
        <span className="fact-note">of {d.total} works</span>
      </div>
      <div className="fact">
        <span className="fact-num">{d.solo}</span>
        <span className="fact-label">Single-authored works</span>
        <Meter value={d.solo} total={d.total} />
      </div>
      <div className="fact">
        <span className="fact-num">{d.first}-{String(d.last).slice(2)}</span>
        <span className="fact-label">Years of publishing</span>
        <YearStrip years={d.years} first={d.first} last={d.last} />
      </div>
    </div>
  );
}
