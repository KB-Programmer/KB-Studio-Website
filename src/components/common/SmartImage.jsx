import { useState } from 'react'
import clsx from 'clsx'

/**
 * Branded placeholder used when a project or service image is missing or
 * fails to load. It deliberately uses the KBS palette so the page never shows
 * a broken image or a generic grey box.
 */
export function BrandedPlaceholder({ label = 'KBS', className, ratio = 'aspect-[16/10]' }) {
  return (
    <div
      className={clsx(
        'relative flex w-full items-center justify-center overflow-hidden rounded-card bg-kbs-deep',
        ratio,
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 250"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="kbs-placeholder-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B2545" />
            <stop offset="100%" stopColor="#123B73" />
          </linearGradient>
        </defs>
        <rect width="400" height="250" fill="url(#kbs-placeholder-gradient)" />
        <circle cx="330" cy="34" r="120" fill="#3478F6" opacity="0.12" />
        <circle cx="60" cy="230" r="90" fill="#3478F6" opacity="0.1" />
        <path
          d="M40 200 L120 60 L200 200"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.07"
          strokeWidth="2"
        />
      </svg>
      <span className="relative font-display text-sm font-bold uppercase tracking-[0.2em] text-white/45">
        {label}
      </span>
    </div>
  )
}

/**
 * An image that gracefully degrades to a branded placeholder.
 */
export default function SmartImage({
  src,
  alt,
  label,
  className,
  imageClassName,
  ratio = 'aspect-[16/10]',
  loading = 'lazy',
  width,
  height,
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <BrandedPlaceholder label={label ?? alt} className={className} ratio={ratio} />
  }

  return (
    <div className={clsx('relative w-full overflow-hidden rounded-card', ratio, className)}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        width={width}
        height={height}
        onError={() => setFailed(true)}
        className={clsx('h-full w-full object-cover', imageClassName)}
      />
    </div>
  )
}
