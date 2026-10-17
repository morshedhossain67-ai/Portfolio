import { useDeferredValue, useMemo, useState } from 'react';

const MAX_QUERY = 60;

export function usePublications(items) {
  const [type, setType] = useState('all');
  const [query, setQueryRaw] = useState('');
  const [newestFirst, setNewestFirst] = useState(true);
  const deferred = useDeferredValue(query);

  // Search input is treated as plain text only (never HTML / regex).
  const setQuery = (v) => setQueryRaw(String(v).slice(0, MAX_QUERY));

  const counts = useMemo(() => {
    const c = { all: items.length };
    items.forEach((p) => (c[p.type] = (c[p.type] || 0) + 1));
    return c;
  }, [items]);

  const groups = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    const list = items.filter(
      (p) =>
        (type === 'all' || p.type === type) &&
        (!q || `${p.title} ${p.authors} ${p.venue} ${p.year ?? ''}`.toLowerCase().includes(q))
    );
    const byYear = new Map();
    list.forEach((p) => {
      const k = p.year ?? 'Theses';
      byYear.set(k, [...(byYear.get(k) || []), p]);
    });
    const keys = [...byYear.keys()].sort((a, b) => {
      if (typeof a !== 'number') return 1;
      if (typeof b !== 'number') return -1;
      return newestFirst ? b - a : a - b;
    });
    return { total: list.length, entries: keys.map((k) => [k, byYear.get(k)]) };
  }, [items, type, deferred, newestFirst]);

  return { type, setType, query, setQuery, newestFirst, setNewestFirst, counts, groups };
}
