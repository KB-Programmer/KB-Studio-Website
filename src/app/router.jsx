import { Route, Routes, useLocation } from 'react-router-dom'

import Layout from '../components/layout/Layout.jsx'
import { stripLocaleFromPath } from '../hooks/useLocale.jsx'
import AboutPage from '../pages/AboutPage.jsx'
import ContactPage from '../pages/ContactPage.jsx'
import FaqPage from '../pages/FaqPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import PortfolioPage from '../pages/PortfolioPage.jsx'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage.jsx'
import ProjectDetailPage from '../pages/ProjectDetailPage.jsx'
import RequestServicePage from '../pages/RequestServicePage.jsx'
import ServiceDetailPage from '../pages/ServiceDetailPage.jsx'
import ServicesPage from '../pages/ServicesPage.jsx'
import SupportPage from '../pages/SupportPage.jsx'
import TermsPage from '../pages/TermsPage.jsx'

/**
 * The route table.
 *
 * Every page is reachable in three ways:
 *   /services          (plain URL, uses the visitor's saved language)
 *   /en/services       (English)
 *   /rw/services       (Kinyarwanda)
 *   /fr/services       (French)
 *
 * The locale prefix is stripped before matching so a single set of routes
 * covers all of them.
 */
export default function AppRoutes() {
  const location = useLocation()
  const pathname = stripLocaleFromPath(location.pathname)

  return (
    <Routes location={{ pathname, search: location.search, hash: location.hash }}>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/request-service" element={<RequestServicePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
