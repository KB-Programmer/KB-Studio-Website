import clsx from 'clsx'
import { Link } from 'react-router-dom'

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition-all duration-200 ease-kbs disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary:
    'bg-kbs-royal text-white shadow-sm hover:bg-kbs-bright focus-visible:ring-kbs-bright',
  bright:
    'bg-kbs-bright text-white shadow-sm hover:bg-kbs-royal focus-visible:ring-kbs-bright',
  secondary:
    'border border-kbs-line bg-white text-kbs-ink hover:border-kbs-royal hover:text-kbs-royal',
  onDark:
    'border border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20',
  ghost: 'text-kbs-royal hover:bg-kbs-pale',
}

const sizes = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

/** Plain button element. */
export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}) {
  return (
    <Tag
      type={Tag === 'button' ? type : undefined}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/**
 * Internal link that renders as a button. `to` may be a plain path — the
 * active locale is added automatically by the router helper when needed.
 */
export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}) {
  return (
    <Link to={to} className={clsx(baseStyles, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  )
}

export default Button
