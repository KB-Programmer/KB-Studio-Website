import { useMemo } from 'react'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { site } from '../content/site.js'
import { getActiveSocialLinks } from '../content/socialLinks.js'
import { usePathBuilder, useTranslation } from '../hooks/useLocale.jsx'
import { openSupport } from '../lib/supportEvents.js'
import ContactForm from '../components/forms/ContactForm.jsx'
import Container from '../components/common/Container.jsx'
import PageHero from '../components/common/PageHero.jsx'
import Section from '../components/common/Section.jsx'
import Seo from '../components/common/Seo.jsx'

export default function ContactPage() {
  const { t } = useTranslation()
  const path = usePathBuilder()

  const socialLinks = useMemo(() => getActiveSocialLinks(), [])
  const hasContactDetails = Boolean(site.contact.email || site.contact.phone || site.contact.address)

  return (
    <>
      <Seo title={t('contact.meta.title')} description={t('contact.meta.description')} canonicalPath="/contact" />

      <PageHero
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        description={t('contact.description')}
        breadcrumbs={[{ label: t('contact.eyebrow') }]}
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Form ------------------------------------------------------ */}
            <div className="lg:col-span-7">
              <h2 className="text-display-md text-kbs-ink">{t('contact.formTitle')}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-kbs-slate">
                {t('contact.responseNote')}
              </p>

              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Details --------------------------------------------------- */}
            <div className="lg:col-span-5">
              <div className="rounded-card border border-kbs-line bg-white p-6 shadow-card">
                <h2 className="font-display text-base font-bold text-kbs-ink">
                  {t('contact.detailsTitle')}
                </h2>

                {hasContactDetails ? (
                  <ul className="mt-4 space-y-3 text-sm text-kbs-slate">
                    {site.contact.email ? (
                      <li>
                        <a
                          href={`mailto:${site.contact.email}`}
                          className="inline-flex items-center gap-2 font-medium text-kbs-royal hover:text-kbs-bright"
                        >
                          <Mail size={16} aria-hidden="true" />
                          {site.contact.email}
                        </a>
                      </li>
                    ) : null}
                    {site.contact.phone ? (
                      <li>
                        <a
                          href={`tel:${site.contact.phone}`}
                          className="inline-flex items-center gap-2 font-medium text-kbs-royal hover:text-kbs-bright"
                        >
                          <Phone size={16} aria-hidden="true" />
                          {site.contact.phone}
                        </a>
                      </li>
                    ) : null}
                    {site.contact.address ? (
                      <li className="inline-flex items-start gap-2">
                        <MapPin size={16} className="mt-0.5" aria-hidden="true" />
                        {site.contact.address}
                      </li>
                    ) : null}
                  </ul>
                ) : (
                  <>
                    <h3 className="mt-4 font-display text-sm font-bold text-kbs-ink">
                      {t('contact.noDetailsTitle')}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-kbs-slate">
                      {t('contact.noDetailsText')}
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6 rounded-card border border-kbs-line bg-white p-6 shadow-card">
                <h2 className="font-display text-base font-bold text-kbs-ink">
                  {t('contact.socialTitle')}
                </h2>

                {socialLinks.length > 0 ? (
                  <>
                    <p className="mt-2 text-sm leading-6 text-kbs-slate">{t('contact.socialText')}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {socialLinks.map((link) => (
                        <li key={link.key}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded-btn border border-kbs-line px-3.5 py-2 text-sm font-semibold text-kbs-ink transition-colors duration-200 ease-kbs hover:border-kbs-royal hover:text-kbs-royal"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <h3 className="mt-4 font-display text-sm font-bold text-kbs-ink">
                      {t('contact.noSocialTitle')}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-kbs-slate">{t('contact.noSocialText')}</p>
                  </>
                )}
              </div>

              <div className="mt-6 rounded-card border border-kbs-line bg-kbs-pale p-6">
                <h2 className="font-display text-base font-bold text-kbs-ink">
                  {t('contact.supportTitle')}
                </h2>
                <p className="mt-2 text-sm leading-6 text-kbs-slate">{t('contact.supportText')}</p>
                <button
                  type="button"
                  onClick={() => openSupport()}
                  className="mt-4 inline-flex items-center gap-2 rounded-btn bg-kbs-royal px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 ease-kbs hover:bg-kbs-bright"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  {t('contact.supportCta')}
                </button>
              </div>

              <p className="mt-6 text-xs leading-5 text-kbs-slate">
                <a href={path('/privacy-policy')} className="kbs-link">
                  {t('footer.privacyPolicy')}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
