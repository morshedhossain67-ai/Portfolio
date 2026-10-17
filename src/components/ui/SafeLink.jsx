import { isExternal, safeUrl } from '../../security/safeUrl.js';

// Anchor that sanitises href and hardens external links (reverse-tabnabbing).
export default function SafeLink({ href, children, className, ...rest }) {
  const url = safeUrl(href);
  const external = isExternal(url);
  return (
    <a
      href={url}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer nofollow' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
