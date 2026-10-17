import { useState } from 'react';
import { usePublications } from '../../hooks/usePublications.js';
import Section from '../ui/Section.jsx';
import PubOverview from './PubOverview.jsx';
import PubFilters from './PubFilters.jsx';
import PubItem from './PubItem.jsx';
import Button from '../ui/Button.jsx';
import { useProfile, usePublicationList } from '../../content/hooks.js';

const INITIAL_GROUPS = 5;

export default function Publications() {
  const publications = usePublicationList();
  const researchGate = useProfile().social?.find((s) => s.label === 'ResearchGate')?.href;
  const state = usePublications(publications);
  const [expanded, setExpanded] = useState(false);
  const { entries, total } = state.groups;
  const filtering = state.query.trim() || state.type !== 'all';
  const visible = expanded || filtering ? entries : entries.slice(0, INITIAL_GROUPS);

  return (
    <Section
      id="publications"
      title="Research"
      edit={[{ key: 'publications', label: 'Edit publications' }]}
    >
      <PubOverview />
      <PubFilters {...state} />
      <p className="pub-count" aria-live="polite">
        Showing <strong>{total}</strong> of {publications.length} works
      </p>

      {total === 0 ? (
        <p className="empty">No works match that search. Try a co-author, journal or year.</p>
      ) : (
        <div className="pub-index">
          {visible.map(([year, items]) => (
            <section key={year} className="pub-year" aria-label={String(year)}>
              <h3 className="pub-year-label">{year}</h3>
              <ul className="pub-list">
                {items.map((p) => (
                  <PubItem key={p.id} pub={p} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <div className="pub-more">
        {!filtering && entries.length > INITIAL_GROUPS && (
          <button type="button" className="btn btn--ghost" onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}>
            {expanded ? 'Show fewer' : `Show all ${publications.length} works`}
          </button>
        )}
        {researchGate && (
          <Button href={researchGate} variant="ghost" icon="ext">View on ResearchGate</Button>
        )}
      </div>
    </Section>
  );
}
