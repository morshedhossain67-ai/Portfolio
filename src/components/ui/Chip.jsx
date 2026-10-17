export default function Chip({ children, active, onClick, count, as = 'span' }) {
  if (as === 'button') {
    return (
      <button
        type="button"
        className={`chip chip--btn${active ? ' is-active' : ''}`}
        aria-pressed={active}
        onClick={onClick}
      >
        {children}
        {count != null && <span className="chip-count">{count}</span>}
      </button>
    );
  }
  return <span className="chip">{children}</span>;
}
