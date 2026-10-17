import { createClient } from '@supabase/supabase-js';

// Configured through .env (VITE_ variables are public by design: the anon key
// can only do what the database's Row Level Security policies allow).
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const valid =
  typeof url === 'string' &&
  /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url.trim()) &&
  typeof anonKey === 'string' &&
  anonKey.trim().length > 20;

export const supabase = valid
  ? createClient(url.trim(), anonKey.trim(), {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    })
  : null;

export const cmsEnabled = Boolean(supabase);
