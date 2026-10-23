import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { useTranslation } from '../../hooks/useLocale.jsx'
import SupportWidget from '../support/SupportWidget.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

/** Scrolls back to the top on every route change (unless there is a hash). */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default function Layout() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a href="#main-content" className="kbs-skip-link">
        {t('nav.skipToContent')}
      </a>

      <ScrollToTop />
      <Header />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <SupportWidget />
    </div>
  )
}
