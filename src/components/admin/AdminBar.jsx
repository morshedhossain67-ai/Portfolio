import { useAuth } from '../../auth/AuthContext.jsx';
import { useContent } from '../../content/ContentContext.jsx';
import Icon from '../ui/Icon.jsx';

// Fixed strip at the bottom of the screen while the admin is signed in.
export default function AdminBar() {
  const { user, logout } = useAuth();
  const { status } = useContent();
  return (
    <div className="admin-bar" role="region" aria-label="Admin mode">
      <span className="admin-bar-text">
        <Icon name="lock" size={15} />
        <strong>Admin mode</strong>
        <span className="admin-bar-user">{user?.email}</span>
        {status === 'error' && <span className="admin-bar-warn">Could not load saved content</span>}
      </span>
      <button type="button" className="admin-bar-btn" onClick={logout}>
        <Icon name="logout" size={15} />
        <span>Log out</span>
      </button>
    </div>
  );
}
