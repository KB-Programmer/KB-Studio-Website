import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, MessageCircle, X } from 'lucide-react'
import clsx from 'clsx'

import { mainNavigation } from '../../content/site.js'
import { usePathBuilder, useTranslation } from '../../hooks/useLocale.jsx'
import { openSupport } from '../../lib/supportEvents.js'
import Logo from '../common/Logo.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Header() {
  const { t } = useTranslation()
  const path = usePathBuilder()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return undefined

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navLinkClass = ({ isActive }) =>
    clsx(
      'relative rounded-btn px-3 py-2 text-sm font-semibold transition-colors duration-200 ease-kbs',
      isActive ? 'text-kbs-royal' : 'text-kbs-ink hover:text-kbs-royal',
    )

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 w-full border-b border-kbs-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85',
        scrolled ? 'shadow-header' : '',
      )}
    >
      <div className="kbs-container flex h-[72px] items-center justify-between gap-4">
        <Link
          to={path('/')}
          className="shrink-0 rounded-btn"
          aria-label={`${t('meta.siteTitle').split('—')[0].trim()} — ${t('nav.home')}`}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t('nav.primary')}>
          {mainNavigation.map((item) => {
            if (item.key === 'support') {
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => openSupport()}
                  className="inline-flex items-center gap-2 rounded-btn px-3 py-2 text-sm font-semibold text-kbs-ink transition-colors duration-200 ease-kbs hover:text-kbs-royal"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  {t(`nav.${item.key}`)}
                </button>
              )
            }

            return (
              <NavLink key={item.key} to={path(item.to)} end={item.to === '/'} className={navLinkClass}>
                {t(`nav.${item.key}`)}
              </NavLink>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            to={path('/request-service')}
            className="inline-flex items-center justify-center rounded-btn bg-kbs-royal px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 ease-kbs hover:bg-kbs-bright"
          >
            {t('nav.requestService')}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-controls="kbs-mobile-menu"
            aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-kbs-line bg-white text-kbs-ink transition-colors duration-200 ease-kbs hover:border-kbs-royal hover:text-kbs-royal"
          >
            {mobileOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="kbs-mobile-menu"
          ref={panelRef}
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-kbs-line bg-white shadow-panel lg:hidden"
        >
          <nav className="kbs-container flex flex-col gap-1 py-5" aria-label={t('nav.primary')}>
            {mainNavigation.map((item) => {
              if (item.key === 'support') {
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setMobileOpen(false)
                      openSupport()
                    }}
                    className="inline-flex items-center gap-2 rounded-btn px-3 py-3 text-left text-base font-semibold text-kbs-ink transition-colors duration-200 ease-kbs hover:bg-kbs-mist hover:text-kbs-royal"
                  >
                    <MessageCircle size={18} aria-hidden="true" />
                    {t(`nav.${item.key}`)}
                  </button>
                )
              }

              return (
                <NavLink
                  key={item.key}
                  to={path(item.to)}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    clsx(
                      'rounded-btn px-3 py-3 text-base font-semibold transition-colors duration-200 ease-kbs',
                      isActive
                        ? 'bg-kbs-pale text-kbs-royal'
                        : 'text-kbs-ink hover:bg-kbs-mist hover:text-kbs-royal',
                    )
                  }
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              )
            })}

            <Link
              to={path('/request-service')}
              className="mt-3 inline-flex items-center justify-center rounded-btn bg-kbs-royal px-4 py-3 text-base font-semibold text-white transition-colors duration-200 ease-kbs hover:bg-kbs-bright"
            >
              {t('nav.requestService')}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
