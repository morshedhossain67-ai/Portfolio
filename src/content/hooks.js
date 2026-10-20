import { useMemo } from 'react';
import { useContent } from './ContentContext.jsx';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const useProfile = () => useContent().content.profile;
export const useExpertise = () => useContent().content.expertise;
export const useEducation = () => useContent().content.education;
export const useReferences = () => useContent().content.references;

// Administrative roles with safe defaults for fields the admin left empty.
export function useAdministration() {
  const { administration } = useContent().content;
  return useMemo(
    () =>
      (administration || [])
        .filter((r) => r && r.role)
        .map((r) => ({ ...r, group: r.group || 'Other', org: r.org || '', note: r.note || '', periods: r.periods || [] })),
    [administration]
  );
}

// Career entries with valid dates, newest first (admin can add in any order).
export function useExperience() {
  const { experience } = useContent().content;
  return useMemo(
    () =>
      experience
        .filter((e) => ISO_DATE.test(e.from || '') && (!e.to || ISO_DATE.test(e.to)))
        .map((e) => ({ ...e, to: e.to || null, points: e.points || [] }))
        .sort((a, b) => b.from.localeCompare(a.from)),
    [experience]
  );
}

// Publications with stable ids for React keys; years coerced to numbers.
export function usePublicationList() {
  const { publications } = useContent().content;
  return useMemo(
    () =>
      publications.map((p, i) => {
        const year = Number(p.year);
        return { ...p, id: `pub-${i}`, year: Number.isInteger(year) && year > 1900 ? year : null };
      }),
    [publications]
  );
}