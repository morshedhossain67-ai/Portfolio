import { useAuth } from '../../auth/AuthContext.jsx';
import { useAdmin } from './AdminContext.jsx';
import Icon from '../ui/Icon.jsx';

// Shown only to a signed-in admin. Viewers never see these buttons, and the
// database rejects writes from anyone else anyway (row level security).
export default function EditButtons({ edits = [] }) {
  const { isAdmin } = useAuth();
  const { openEditor } = useAdmin();
  if (!isAdmin || !edits.length) return null;
  return (
    <div className="ed-buttons">
      {edits.map((e) => (
        <button key={e.key + e.label} type="button" className="ed-btn" onClick={() => openEditor(e.key)}>
          <Icon name="edit" size={15} />
          <span>{e.label}</span>
        </button>
      ))}
    </div>
  );
}
