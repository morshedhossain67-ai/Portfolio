import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase, cmsEnabled } from '../lib/supabase.js';
import { DEFAULTS, CONTENT_KEYS, normalize } from './defaults.js';
import { sanitizeDeep } from './sanitize.js';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULTS);
  const [status, setStatus] = useState(cmsEnabled ? 'loading' : 'local');

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase.from('content').select('key,data');
    if (error) {
      setStatus('error');
      return;
    }
    const next = { ...DEFAULTS };
    (data || []).forEach((row) => {
      if (CONTENT_KEYS.includes(row.key)) next[row.key] = normalize(row.key, row.data);
    });
    setContent(next);
    setStatus('ready');
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Writes are only accepted by the database for admin accounts (RLS).
  const save = useCallback(async (key, value) => {
    if (!supabase) throw new Error('Supabase is not configured.');
    if (!CONTENT_KEYS.includes(key)) throw new Error('Unknown section.');
    const clean = normalize(key, sanitizeDeep(value));
    const { error } = await supabase
      .from('content')
      .upsert({ key, data: clean, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    setContent((c) => ({ ...c, [key]: clean }));
  }, []);

  const value = useMemo(() => ({ content, status, save, reload: load }), [content, status, save, load]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>');
  return ctx;
}
