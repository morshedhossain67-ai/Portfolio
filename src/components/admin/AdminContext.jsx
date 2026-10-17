import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../auth/AuthContext.jsx';
import { SCHEMAS } from './schemas.js';
import EditorDialog from './EditorDialog.jsx';
import LoginDialog from './LoginDialog.jsx';
import AdminBar from './AdminBar.jsx';

const AdminContext = createContext({ openEditor: () => {} });
const isAdminHash = () => window.location.hash === '#admin';

// Owns the editor / login dialogs and the admin bar.
export function AdminProvider({ children }) {
  const { isAdmin } = useAuth();
  const [editing, setEditing] = useState(null);
  const [login, setLogin] = useState(isAdminHash);

  useEffect(() => {
    const onHash = () => isAdminHash() && setLogin(true);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const closeLogin = useCallback(() => {
    setLogin(false);
    if (isAdminHash()) window.history.replaceState(null, '', window.location.pathname);
  }, []);

  const closeEditor = useCallback(() => setEditing(null), []);
  const openEditor = useCallback((key) => {
    if (SCHEMAS[key]) setEditing(key);
  }, []);

  useEffect(() => {
    if (!isAdmin) setEditing(null);
  }, [isAdmin]);

  const value = useMemo(() => ({ openEditor, openLogin: () => setLogin(true) }), [openEditor]);

  return (
    <AdminContext.Provider value={value}>
      {children}
      {isAdmin && <AdminBar />}
      {login && !isAdmin && <LoginDialog onClose={closeLogin} />}
      {isAdmin && editing && <EditorDialog key={editing} sectionKey={editing} onClose={closeEditor} />}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
