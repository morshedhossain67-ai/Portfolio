import { yearOf } from '../../utils/format.js';

// Proportional timeline of the whole career, drawn as SVG (no inline CSS needed).
export default function CareerSpan({ items }) {
  const start = yearOf(items[0].from);
  const end = Math.max(start + 1, new Date().getFullYear());
  const scale = (y) => ((Math.min(y, end) - start) / (end - start)) * 100;
  const marks = [];
  for (let y = Math.ceil(start / 5) * 5; y < end; y += 5) marks.push(y);

  return (
    <svg className="span" viewBox="0 0 100 14" preserveAspectRatio="none" role="img"
      aria-label={`Career timeline from ${start} to present`}>
      {items.map((e, i) => {
        const x = scale(yearOf(e.from));
        const w = Math.max(scale(yearOf(e.to)) - x, 0.5);
        return (
          <rect key={`${e.from}-${i}`} className={`span-seg span-seg--${i % 3}`} x={x} y="2" width={w} height="6">
            <title>{`${e.role}, ${yearOf(e.from)}-${e.to ? yearOf(e.to) : 'present'}`}</title>
          </rect>
        );
      })}
      {marks.map((m) => (
        <line key={m} className="span-mark" x1={scale(m)} x2={scale(m)} y1="0" y2="10" />
      ))}
    </svg>
  );
}
