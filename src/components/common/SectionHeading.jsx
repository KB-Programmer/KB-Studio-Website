import clsx from 'clsx'

/**
 * Eyebrow + heading + optional lead paragraph, used at the top of sections.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className,
  children,
  as: Tag = 'h2',
}) {
  const alignments = {
    left: 'text-left',
    center: 'text-center mx-auto',
  }

  const tones = {
    dark: 'text-kbs-ink',
    light: 'text-white',
  }

  const descriptionTone = tone === 'light' ? 'text-white/80' : 'text-kbs-slate'

  return (
    <div
      className={clsx(
        'max-w-2xl',
        alignments[align],
        tone === 'light' ? 'text-white' : '',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={clsx(
            'mb-3 text-xs font-bold uppercase tracking-[0.16em]',
            tone === 'light' ? 'text-white/70' : 'text-kbs-bright',
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <Tag className={clsx('text-display-md', tones[tone])}>{title}</Tag>

      {description ? (
        <p className={clsx('mt-4 text-base leading-7', descriptionTone)}>{description}</p>
      ) : null}

      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  )
}
