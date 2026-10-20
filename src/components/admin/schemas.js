import { ADMIN_GROUPS } from '../../data/administration.js';

// What the admin can edit, per content section. Field types:
// text | textarea | url | email | date | select | strings | list | file
const TYPES = ['journal', 'book', 'conference', 'article', 'thesis'];
const ICONS = ['facebook', 'whatsapp', 'linkedin', 'research', 'mail', 'ext'];

const f = (name, label, type = 'text', extra = {}) => ({ name, label, type, ...extra });

export const SCHEMAS = {
  profile: {
    title: 'Profile & contact',
    fields: [
      f('honorific', 'Honorific (e.g. Prof. Dr.)'),
      f('name', 'Full name'),
      f('title', 'Job title'),
      f('department', 'Department'),
      f('university', 'University'),
      f('address', 'Address'),
      f('email', 'Email', 'email'),
      f('tagline', 'Hero sentence', 'textarea'),
      f('photo', 'Portrait photo (transparent WebP/PNG works best)', 'file', { accept: 'image' }),
      f('cv', 'CV (PDF)', 'file', { accept: 'pdf' }),
      f('summary', 'About paragraphs', 'strings', { multiline: true, item: 'paragraph' }),
      f('geography', 'Geographic experience', 'textarea'),
      f('focus', 'Professional focus', 'strings', { item: 'focus' }),
      f('stats', 'Hero numbers', 'list', {
        item: 'number', summary: 'label',
        fields: [f('value', 'Value (e.g. 33+)'), f('label', 'Label')],
      }),
      f('partners', 'Partner organisations', 'list', {
        item: 'partner', summary: 'name',
        fields: [f('name', 'Name'), f('url', 'Website', 'url')],
      }),
      f('social', 'Contact links', 'list', {
        item: 'link', summary: 'label',
        fields: [
          f('icon', 'Icon', 'select', { options: ICONS }),
          f('label', 'Label (e.g. LinkedIn)'),
          f('value', 'Text shown'),
          f('href', 'Link', 'url'),
        ],
      }),
    ],
  },
  expertise: {
    title: 'Expertise',
    fields: [
      f('cards', 'Expertise cards', 'list', {
        item: 'card', summary: 'title',
        fields: [f('title', 'Title'), f('text', 'Description', 'textarea')],
      }),
      f('sectors', 'Technical sectors', 'strings', { item: 'sector' }),
      f('software', 'Software', 'strings', { item: 'software' }),
    ],
  },
  experience: {
    title: 'Career',
    list: {
      item: 'position', summary: 'role',
      fields: [
        f('role', 'Position'),
        f('org', 'Organisation'),
        f('from', 'Start date', 'date'),
        f('to', 'End date (leave empty if current)', 'date'),
        f('points', 'Responsibilities', 'strings', { multiline: true, item: 'point' }),
      ],
    },
  },
  administration: {
    title: 'Administration',
    list: {
      item: 'role', summary: 'role',
      fields: [
        f('group', 'Category', 'select', { options: ADMIN_GROUPS }),
        f('role', 'Role / position'),
        f('org', 'Organisation'),
        f('periods', 'Terms (e.g. Jun 2023 \u2013 Jun 2025, or "Aug 2009 \u2013 Present")', 'strings', { item: 'term' }),
        f('note', 'Note (optional, e.g. ISSN)'),
      ],
    },
  },
  education: {
    title: 'Education',
    list: {
      item: 'degree', summary: 'degree',
      fields: [
        f('degree', 'Degree'),
        f('institution', 'Institution'),
        f('level', 'Level (e.g. Doctorate)'),
        f('year', 'Year (optional)'),
      ],
    },
  },
  publications: {
    title: 'Publications',
    list: {
      item: 'publication', summary: 'title', prepend: true,
      fields: [
        f('year', 'Year'),
        f('type', 'Type', 'select', { options: TYPES }),
        f('title', 'Title', 'textarea'),
        f('authors', 'Authors (comma separated)'),
        f('venue', 'Journal / publisher'),
        f('doi', 'DOI (optional, e.g. 10.1234/abc)'),
      ],
    },
  },
  references: {
    title: 'Referees',
    list: {
      item: 'referee', summary: 'name',
      fields: [f('name', 'Name'), f('role', 'Position'), f('note', 'Note', 'textarea')],
    },
  },
};

// Empty value for a new item of the given fields.
export const blankItem = (fields) =>
  Object.fromEntries(fields.map((x) => [x.name, x.type === 'strings' || x.type === 'list' ? [] : x.type === 'select' ? x.options[0] : '']));