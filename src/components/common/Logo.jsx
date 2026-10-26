import clsx from 'clsx'

/**
 * King Business Studio logo.
 *
 * IMPORTANT: this is a CONCEPT logo created for the website build. It is an
 * editable SVG concept, not an approved official logo. The owner can replace
 * it with the official artwork by editing this file (or by pointing `src` at
 * an image in /public/images/brand).
 */

export function LogoMark({ className = 'h-10 w-10', title }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      focusable="false"
    >
      <rect width="48" height="48" rx="12" fill="#123B73" />
      <path
        d="M16.5 11.5v25"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M32 11.5 16.5 24 32 36.5"
        stroke="#3478F6"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="11.5" r="2.75" fill="#3478F6" />
      <circle cx="32" cy="36.5" r="2.75" fill="#3478F6" />
    </svg>
  )
}

export default function Logo({
  variant = 'default',
  showText = true,
  className,
  markClassName = 'h-12 w-15',
}) {
  const light = variant === 'light'

  return (
    <span className={clsx('inline-flex items-center gap-2.5', className)}>
      <img src="/images/brand/logo.png" className={markClassName} alt="" />
      {showText ? (
        <span className="flex flex-col leading-none">
          <span
            className={clsx(
              'font-display text-[1.0625rem] font-extrabold tracking-tight',
              light ? 'text-white' : 'text-kbs-royal',
            )}
          >
            King Business Studio
          </span>
          <span
            className={clsx(
              'mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em]',
              light ? 'text-white/70' : 'text-kbs-slate',
            )}
          >
            KB Studio
          </span>
        </span>
      ) : null}
    </span>
  )
}
