import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { site } from '../../content/site.js'
import { services } from '../../content/services.js'
import { getActiveSocialLinks } from '../../content/socialLinks.js'
import { localizedField } from '../../utils/localize.js'
import { useCurrentLocale, usePathBuilder, useTranslation } from '../../hooks/useLocale.jsx'
import { openSupport } from '../../lib/supportEvents.js'
import Logo from '../common/Logo.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Footer() {
  const { t } = useTranslation()
  const path = usePathBuilder()
  const locale = useCurrentLocale()
  const socialLinks = getActiveSocialLinks()

  const hasContactDetails = Boolean(site.contact.email || site.contact.phone || site.contact.address)

  return (
    <footer className="bg-kbs-deep text-white">
      <div className="kbs-container grid gap-10 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo variant="light" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">{t('footer.description')}</p>

          {socialLinks.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={t('contact.socialTitle')}>
              {socialLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-btn border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors duration-200 ease-kbs hover:border-white hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white/60">
            {t('footer.servicesTitle')}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  to={path(`/services/${service.slug}`)}
                  className="text-white/80 transition-colors duration-200 ease-kbs hover:text-white"
                >
                  {localizedField(service, locale, 'name')}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white/60">
            {t('footer.navigationTitle')}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                to={path('/')}
                className="text-white/80 transition-colors duration-200 ease-kbs hover:text-white"
              >
                {t('nav.home')}
              </Link>
            </li>
            <li>
              <Link
                to={path('/services')}
                className="text-white/80 transition-colors duration-200 ease-kbs hover:text-white"
              >
                {t('nav.services')}
              </Link>
            </li>
            <li>
              <Link
                to={path('/portfolio')}
                className="text-white/80 transition-colors duration-200 ease-kbs hover:text-white"
              >
                {t('nav.portfolio')}
              </Link>
            </li>
            <li>
              <Link
                to={path('/about')}
                className="text-white/80 transition-colors duration-200 ease-kbs hover:text-white"
              >
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => openSupport()}
                className="inline-flex items-center gap-2 text-left text-white/80 transition-colors duration-200 ease-kbs hover:text-white"
              >
                <MessageCircle size={15} aria-hidden="true" />
                {t('nav.support')}
              </button>
            </li>
            <li>
              <Link
                to={path('/contact')}
                className="text-white/80 transition-colors duration-200 ease-kbs hover:text-white"
              >
                {t('nav.contact')}
              </Link>
            </li>
            <li>
              <Link
                to={path('/faq')}
                className="text-white/80 transition-colors duration-200 ease-kbs hover:text-white"
              >
                {t('faq.title')}
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white/60">
            {t('footer.contactTitle')}
          </h2>

          {hasContactDetails ? (
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {site.contact.email ? (
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-flex items-center gap-2 transition-colors duration-200 ease-kbs hover:text-white"
                  >
                    <Mail size={15} aria-hidden="true" />
                    {site.contact.email}
                  </a>
                </li>
              ) : null}
              {site.contact.phone ? (
                <li>
                  <a
                    href={`tel:${site.contact.phone}`}
                    className="inline-flex items-center gap-2 transition-colors duration-200 ease-kbs hover:text-white"
                  >
                    <Phone size={15} aria-hidden="true" />
                    {site.contact.phone}
                  </a>
                </li>
              ) : null}
              {site.contact.address ? (
                <li className="inline-flex items-start gap-2">
                  <MapPin size={15} className="mt-0.5" aria-hidden="true" />
                  {site.contact.address}
                </li>
              ) : null}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-6 text-white/60">{t('footer.notConfigured')}</p>
          )}

          <div className="mt-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white/60">
              {t('footer.languageTitle')}
            </h3>
            <LanguageSwitcher className="mt-3" />
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white/60">
            {t('footer.legalTitle')}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                to={path('/privacy-policy')}
                className="text-white/80 transition-colors duration-200 ease-kbs hover:text-white"
              >
                {t('footer.privacyPolicy')}
              </Link>
            </li>
            <li>
              <Link
                to={path('/terms')}
                className="text-white/80 transition-colors duration-200 ease-kbs hover:text-white"
              >
                {t('footer.terms')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="kbs-container flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. {t('footer.rights')}
          </p>
          <p>{site.country}</p>
        </div>
      </div>
    </footer>
  )
}
