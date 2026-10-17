import { PUB_TYPES } from '../../data/publications.js';
import Chip from '../ui/Chip.jsx';
import Icon from '../ui/Icon.jsx';

export default function PubFilters({ type, setType, query, setQuery, newestFirst, setNewestFirst, counts }) {
  return (
    <div className="pub-tools">
      <label className="search">
        <Icon name="search" />
        <span className="sr-only">Search publications</span>
        <input
          type="search"
          value={query}
          maxLength={60}
          autoComplete="off"
          spellCheck="false"
          placeholder="Search title, co-author, journal..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="chips" role="group" aria-label="Filter by type">
        {PUB_TYPES.filter((t) => counts[t.key]).map((t) => (
          <Chip key={t.key} as="button" active={type === t.key} count={counts[t.key]}
            onClick={() => setType(t.key)}>
            {t.label}
          </Chip>
        ))}
      </div>
      <button type="button" className="icon-btn icon-btn--label" onClick={() => setNewestFirst((v) => !v)}>
        <Icon name="sort" size={16} />
        {newestFirst ? 'Newest first' : 'Oldest first'}
      </button>
    </div>
  );
}
