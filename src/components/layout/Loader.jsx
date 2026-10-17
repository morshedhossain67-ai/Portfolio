import { useEffect, useState } from 'react';
import { useContent } from '../../content/ContentContext.jsx';

const MIN_MS = 700; // keep it on screen long enough to read, never longer than needed
const FADE_MS = 450;

// Full-screen loading screen. Stays until saved content has arrived from
// Supabase (so visitors never see old text swap to new), then fades out.
export default function Loader() {
  const { status } = useContent();
  const [minDone, setMinDone] = useState(false);
  const [phase, setPhase] = useState('show'); // show -> fade -> gone

  useEffect(() => {
    const t = setTimeout(() => setMinDone(true), MIN_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (minDone && status !== 'loading') setPhase((p) => (p === 'show' ? 'fade' : p));
  }, [minDone, status]);

  useEffect(() => {
    if (phase !== 'fade') return undefined;
    const t = setTimeout(() => setPhase('gone'), FADE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    document.body.classList.toggle('is-loading', phase !== 'gone');
    return () => document.body.classList.remove('is-loading');
  }, [phase]);

  if (phase === 'gone') return null;
  return (
    <div className={`loader${phase === 'fade' ? ' is-done' : ''}`} role="status" aria-live="polite">
      <div className="loader-inner">
        <p className="loader-hon">Prof. Dr.</p>
        <p className="loader-name">
          Md. Morshed <span>Hossain</span>
        </p>
        <div className="loader-cubes" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span className="sr-only">Loading portfolio</span>
      </div>
    </div>
  );
}
