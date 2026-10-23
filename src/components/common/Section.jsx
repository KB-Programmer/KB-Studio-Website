import clsx from 'clsx'

/**
 * A page section with a consistent vertical rhythm and an optional
 * alternating background.
 */
export default function Section({
  as: Tag = 'section',
  tone = 'white',
  size = 'md',
  className,
  children,
  ...rest
}) {
  const tones = {
    white: 'bg-white',
    mist: 'bg-kbs-mist',
    pale: 'bg-kbs-pale',
    royal: 'bg-kbs-royal text-white',
    deep: 'bg-kbs-deep text-white',
  }

  const sizes = {
    sm: 'py-10 sm:py-12',
    md: 'py-14 sm:py-20',
    lg: 'py-20 sm:py-28',
  }

  return (
    <Tag className={clsx(tones[tone] ?? tone, sizes[size] ?? sizes.md, className)} {...rest}>
      {children}
    </Tag>
  )
}
