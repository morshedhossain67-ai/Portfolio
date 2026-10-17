import localPortrait from '../../assets/morshed-cutout.webp';
import { useProfile } from '../../content/hooks.js';
import { safeUrl } from '../../security/safeUrl.js';

// Cutout over an offset accent panel, with a solid name plate underneath.
// Uses the photo uploaded by the admin, or the built-in one.
export default function Portrait() {
  const profile = useProfile();
  const uploaded = profile.photo ? safeUrl(profile.photo) : '#';
  const src = uploaded !== '#' ? uploaded : localPortrait;
  return (
    <figure className="portrait">
      <div className="portrait-block" aria-hidden="true" />
      <div className="portrait-panel" aria-hidden="true" />
      <img
        className="portrait-img"
        src={src}
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
