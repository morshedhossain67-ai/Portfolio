import { useMemo } from 'react';
import { publications } from '../../data/publications.js';

const W = 520;
const H = 260;
const PAD = { l: 34, r: 14, t: 18, b: 30 };

// Economist-style "Fig. 1": publications per year (bars) + cumulative (line).
export default function IndicatorChart() {
  const { bars, line, ticks, maxCount, total, first, last } = useMemo(() => {
    const years = publications.map((p) => p.year).filter(Boolean);
    const first = Math.min(...years);
    const last = Math.max(...years);
    const span = last - first + 1;
    const counts = Array.from({ length: span }, (_, i) => years.filter((y) => y === first + i).length);
    const maxCount = Math.max(...counts);
    const total = counts.reduce((a, b) => a + b, 0);
    const iw = W - PAD.l - PAD.r;
    const ih = H - PAD.t - PAD.b;
    const step = iw / span;
    let run = 0;
    const pts = [];
    const bars = counts.map((c, i) => {
      run += c;
      const x = PAD.l + i * step;
      pts.push(`${(x + step / 2).toFixed(1)},${(PAD.t + ih - (run / total) * ih).toFixed(1)}`);
      const h = (c / maxCount) * ih * 0.62;
      return { key: first + i, x: x + step * 0.18, w: step * 0.64, y: PAD.t + ih - h, h, c };
    });
    const ticks = bars.filter((b) => b.key % 5 === 0 || b.key === first);
    return { bars, line: pts.join(' '), ticks, maxCount, total, first, last };
  }, []);

  const base = H - PAD.b;

  return (
    <svg
      className="chart"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Bar chart of ${total} dated publications from ${first} to ${last}, with cumulative line.`}
    >
      {[0.25, 0.5, 0.75, 1].map((f) => {
        const y = PAD.t + (base - PAD.t) * (1 - f);
        return <line key={f} className="chart-grid" x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} />;
      })}
      <line className="chart-axis" x1={PAD.l} x2={W - PAD.r} y1={base} y2={base} />
      {bars.map((b, i) => (
        <rect
          key={b.key}
          className={`chart-bar${b.c === maxCount ? ' is-peak' : ''}`}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="1.5"
          style={{ animationDelay: `${0.25 + i * 0.04}s` }}
        >
          <title>{`${b.key}: ${b.c} publication${b.c === 1 ? '' : 's'}`}</title>
        </rect>
      ))}
      <polyline className="chart-line" points={line} pathLength="1" />
      {ticks.map((t) => (
        <text key={t.key} className="chart-tick" x={t.x + t.w / 2} y={H - 10} textAnchor="middle">
          {t.key}
        </text>
      ))}
      <text className="chart-tick" x={PAD.l - 8} y={PAD.t + 4} textAnchor="end">{total}</text>
      <text className="chart-tick" x={PAD.l - 8} y={base} textAnchor="end">0</text>
    </svg>
  );
}
