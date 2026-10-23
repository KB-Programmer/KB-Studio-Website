import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Globe } from 'lucide-react'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

import { site } from '../../content/site.js'
import { useCurrentLocale } from '../../hooks/useLocale.jsx'

const LOCALE_PREFIX = /^\/(en|rw|fr)(?=\/|$)/

/**
 * Language switcher. Every option is a real link to the same page in the
 * other language, so switching language keeps the visitor where they are.
 */
export default function LanguageSwitcher({ variant = 'desktop', className }) {
  const currentLocale = useCurrentLocale()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    function onPointerDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const current = site.localeLabels[currentLocale] ?? site.localeLabels[site.defaultLocale]
  const restOfPath = location.pathname.replace(LOCALE_PREFIX, '') || '/'

  return (
    <div ref={containerRef} className={clsx('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={site.localeLabels[currentLocale]?.label}
        className={clsx(
          'inline-flex items-center gap-2 rounded-btn border border-kbs-line bg-white px-3 py-2 text-sm font-semibold text-kbs-ink transition-colors duration-200 ease-kbs hover:border-kbs-royal hover:text-kbs-royal',
          variant === 'mobile' && 'w-full justify-between',
        )}
      >
        <span className="inline-flex items-center gap-2">
          <Globe size={16} aria-hidden="true" />
          <span>{current?.short ?? 'EN'}</span>
        </span>
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={clsx('transition-transform duration-200 ease-kbs', open ? 'rotate-180' : '')}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={current?.label}
          className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-card border border-kbs-line bg-white py-1 shadow-panel"
        >
          {Object.entries(site.localeLabels).map(([code, label]) => {
            const isCurrent = code === currentLocale
            return (
              <li key={code}>
                <Link
                  to={`/${code}${restOfPath === '/' ? '' : restOfPath}`}
                  role="option"
                  aria-selected={isCurrent}
                  lang={code}
                  hrefLang={code}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    'flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors duration-200 ease-kbs',
                    isCurrent
                      ? 'bg-kbs-pale font-semibold text-kbs-royal'
                      : 'text-kbs-ink hover:bg-kbs-mist',
                  )}
                >
                  <span>
                    <span className="block font-medium">{label.label}</span>
                    <span className="block text-xs text-kbs-slate">{label.short}</span>
                  </span>
                  {isCurrent ? <Check size={16} aria-hidden="true" /> : null}
                </Link>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
