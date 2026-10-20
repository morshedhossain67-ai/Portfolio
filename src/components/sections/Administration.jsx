import { useMemo, useState } from 'react';
import { useAdministration } from '../../content/hooks.js';
import { ADMIN_GROUPS } from '../../data/administration.js';
import Section from '../ui/Section.jsx';
import Chip from '../ui/Chip.jsx';

const ALL = 'All';
const isCurrent = (r) => r.periods.some((p) => /present|till date/i.test(p));

export default function Administration() {
  const roles = useAdministration();
  const [group, setGroup] = useState(ALL);

  const groups = useMemo(() => {
    const present = new Set(roles.map((r) => r.group));
    const known = ADMIN_GROUPS.filter((g) => present.has(g));
    const extra = [...present].filter((g) => !ADMIN_GROUPS.includes(g));
    return [...known, ...extra].map((g) => ({ name: g, count: roles.filter((r) => r.group === g).length }));
  }, [roles]);

  const shown = group === ALL ? roles : roles.filter((r) => r.group === group);
  const deanTerms = roles.filter((r) => /^dean/i.test(r.role)).reduce((n, r) => n + r.periods.length, 0);
  const headships = roles.filter((r) => r.group === 'Department Head').reduce((n, r) => n + Math.max(1, r.periods.length), 0);
  const journals = roles.filter((r) => r.group === 'Editorial').length;

  return (
    <Section
      id="administration"
      title="Administration"
      edit={[{ key: 'administration', label: 'Edit administration' }]}
    >
      {roles.length > 0 && (
        <>
          <dl className="adm-facts">
            <div><dt>{roles.length}</dt><dd>Administrative roles</dd></div>
            {deanTerms > 0 && <div><dt>{deanTerms}&times;</dt><dd>Dean, Faculty of Social Sciences</dd></div>}
            {headships > 0 && <div><dt>{headships}</dt><dd>Department headship terms</dd></div>}
            {journals > 0 && <div><dt>{journals}</dt><dd>Editorial positions</dd></div>}
          </dl>

          <div className="chips adm-filter" role="group" aria-label="Filter roles">
            <Chip as="button" active={group === ALL} onClick={() => setGroup(ALL)} count={roles.length}>{ALL}</Chip>
            {groups.map((g) => (
              <Chip key={g.name} as="button" active={group === g.name} onClick={() => setGroup(g.name)} count={g.count}>
                {g.name}
              </Chip>
            ))}
          </div>
        </>
      )}

      <ul className="adm-grid">
        {shown.map((r, i) => (
          <li key={`${r.role}-${i}`} className={`adm-card card${isCurrent(r) ? ' is-current' : ''}`}>
            <div className="adm-top">
              <span className="adm-group">{r.group}</span>
              {isCurrent(r) && <span className="adm-badge">Current</span>}
              {r.periods.length > 1 && <span className="adm-terms">{r.periods.length} terms</span>}
            </div>
            <h3>{r.role}</h3>
            {r.org && <p className="adm-org">{r.org}</p>}
            {r.periods.length > 0 && (
              <ul className="adm-periods">
                {r.periods.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            )}
            {r.note && <p className="adm-note">{r.note}</p>}
          </li>
        ))}
      </ul>
    </Section>
  );
}