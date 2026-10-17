// Built-in content: shown when Supabase is not configured, and used as the
// fallback for any section the admin has not edited yet.
import { profile } from '../data/profile.js';
import { competencies, sectors, software } from '../data/competencies.js';
import { experience } from '../data/experience.js';
import { education } from '../data/education.js';
import { publications } from '../data/publications.js';
import { references } from '../data/references.js';

export const DEFAULTS = {
  profile: { ...profile, photo: '' },
  expertise: {
    cards: competencies.map(({ title, text }) => ({ title, text })),
    sectors,
    software,
  },
  experience,
  education,
  publications: publications.map(({ id, ...rest }) => rest),
  references,
};

export const CONTENT_KEYS = Object.keys(DEFAULTS);

// Keep stored data the same shape as the defaults (object vs list).
export function normalize(key, data) {
  const base = DEFAULTS[key];
  if (Array.isArray(base)) return Array.isArray(data) ? data : base;
  if (data && typeof data === 'object' && !Array.isArray(data)) return { ...base, ...data };
  return base;
}
