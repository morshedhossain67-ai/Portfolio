import { useCallback, useEffect, useState } from 'react';

const KEY = 'mh-theme';
const THEMES = ['light', 'dark'];

const readStored = () => {
  try {
    const v = localStorage.getItem(KEY);
    return THEMES.includes(v) ? v : null;
  } catch {
    return null;
  }
};

const systemTheme = () =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const paint = (theme) => {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0F1420' : '#F4F1EA');
};

export const applyInitialTheme = () => paint(readStored() || systemTheme());

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');

  useEffect(() => {
    paint(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* storage blocked - theme still works for this visit */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
