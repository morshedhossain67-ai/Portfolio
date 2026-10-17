import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext.jsx';
import { cmsEnabled } from '../../lib/supabase.js';
import Dialog from './Dialog.jsx';

// Admin sign-in. Opened by visiting the site with #admin at the end of the URL.
export default function LoginDialog({ onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(email.trim(), password);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      setPassword('');
    }
  };

  if (!cmsEnabled) {
    return (
      <Dialog title="Admin login" onClose={onClose}>
        <p>Editing is not set up yet. Add the Supabase keys to the .env file and rebuild the site.</p>
      </Dialog>
    );
  }

  return (
    <Dialog title="Admin login" onClose={onClose}>
      <form className="ed-form" onSubmit={submit}>
        <label className="ed-field" htmlFor="login-email">
          <span className="ed-label">Email</span>
          <input id="login-email" type="email" autoComplete="username" required maxLength={200}
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="ed-field" htmlFor="login-pass">
          <span className="ed-label">Password</span>
          <input id="login-pass" type="password" autoComplete="current-password" required maxLength={200}
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="ed-error" role="alert">{error}</p>}
        <div className="ed-actions">
          <button type="submit" className="btn btn--primary" disabled={busy}>
            {busy ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
