import Icon from './Icon.jsx';
import SafeLink from './SafeLink.jsx';

export default function Button({ href, variant = 'primary', icon, children, ...rest }) {
  const cls = `btn btn--${variant}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} size={16} />}
    </>
  );
  return href ? (
    <SafeLink href={href} className={cls} {...rest}>{inner}</SafeLink>
  ) : (
    <button className={cls} type="button" {...rest}>{inner}</button>
  );
}
