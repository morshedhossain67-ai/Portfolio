import portrait from '../../assets/morshed-cutout.webp';
import { profile } from '../../data/profile.js';

// Cutout over an offset accent panel, with a solid name plate underneath.
export default function Portrait() {
  return (
    <figure className="portrait">
      <div className="portrait-block" aria-hidden="true" />
      <div className="portrait-panel" aria-hidden="true" />
      <img
        className="portrait-img"
        src={portrait}
        width="640"
        height="640"
        alt={`Portrait of ${profile.honorific} ${profile.name}`}
        decoding="async"
        draggable="false"
      />
      <figcaption className="portrait-plate">
        <strong>{profile.honorific} {profile.name}</strong>
        <span>{profile.title} &middot; {profile.university}</span>
      </figcaption>
    </figure>
  );
}
