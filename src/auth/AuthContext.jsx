import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const AuthContext = createContext({ isAdmin: false });

// Checks admin rights on the server (is_admin() SQL function), never trusts the client.
async function checkAdmin() {
  const { data, error } = await supabase.rpc('is_admin');
  return !error && data === true;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!supabase) return undefined;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let alive = true;
    if (!session) {
      setIsAdmin(false);
      return undefined;
    }
    checkAdmin().then((ok) => alive && setIsAdmin(ok));
    return () => {
      alive = false;
    };
  }, [session]);

  const login = useCallback(async (email, password) => {
    if (!supabase) throw new Error('Supabase is not configured yet.');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error('Email or password is incorrect.');
    if (!(await checkAdmin())) {
      await supabase.auth.signOut();
      throw new Error('This account does not have admin access.');
    }
  }, []);

  const logout = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
  }, []);

  const value = useMemo(
    () => ({ session, isAdmin, login, logout, user: session?.user ?? null }),
    [session, isAdmin, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
