import Icon from '../ui/Icon.jsx';

// Up / down / delete buttons shared by both list editors.
export default function RowTools({ index, count, onMove, onRemove, label }) {
  return (
    <div className="ed-tools">
      <button type="button" className="ed-tool" onClick={() => onMove(index - 1)} disabled={index === 0}
        aria-label={`Move ${label} up`} title="Move up">
        <Icon name="up" size={15} />
      </button>
      <button type="button" className="ed-tool" onClick={() => onMove(index + 1)} disabled={index === count - 1}
        aria-label={`Move ${label} down`} title="Move down">
        <Icon name="down" size={15} />
      </button>
      <button type="button" className="ed-tool ed-tool--danger" onClick={onRemove}
        aria-label={`Delete ${label}`} title="Delete">
        <Icon name="trash" size={15} />
      </button>
    </div>
  );
}
