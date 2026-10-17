import IndicatorChart from './IndicatorChart.jsx';
import PubFacts from './PubFacts.jsx';

// Research-output chart plus the key-facts panel.
export default function PubOverview() {
  return (
    <div className="pub-overview">
      <figure className="fig-card card">
        <div className="figure-head">
          <span className="figure-legend">
            <i className="lg-bar" aria-hidden="true" /> per year
            <i className="lg-line" aria-hidden="true" /> cumulative
          </span>
        </div>
        <IndicatorChart />
        <figcaption>
          Research output by year. Migration, poverty and regional development in
          north-west Bangladesh remain the through-line.
        </figcaption>
      </figure>
      <PubFacts />
    </div>
  );
}
