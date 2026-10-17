import { useEffect, useRef } from 'react';
import Icon from '../ui/Icon.jsx';

// Native modal <dialog>: focus trap, Escape and backdrop come from the browser.
export default function Dialog({ title, onClose, wide = false, children, footer }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (el && !el.open) el.showModal();
    const onCancel = (e) => {
      e.preventDefault();
      onClose();
    };
    el?.addEventListener('cancel', onCancel);
    return () => el?.removeEventListener('cancel', onCancel);
  }, [onClose]);

  return (
    <dialog ref={ref} className={`ed-dialog${wide ? ' ed-dialog--wide' : ''}`} aria-labelledby="ed-title">
      <header className="ed-head">
        <h2 id="ed-title">{title}</h2>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
      </header>
      <div className="ed-body">{children}</div>
      {footer && <footer className="ed-foot">{footer}</footer>}
    </dialog>
  );
}
