import { useMemo } from 'react'
import { ArrowRight } from 'lucide-react'

import { services } from '../content/services.js'
import { localizedField } from '../utils/localize.js'
import { useCurrentLocale, usePathBuilder, useTranslation } from '../hooks/useLocale.jsx'
import { ButtonLink } from '../components/common/Button.jsx'
import Container from '../components/common/Container.jsx'
import CTABand from '../components/common/CTABand.jsx'
import PageHero from '../components/common/PageHero.jsx'
import Section from '../components/common/Section.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'
import Icon from '../components/common/Icon.jsx'

export default function AboutPage() {
  const { t, tList } = useTranslation()
  const locale = useCurrentLocale()
  const path = usePathBuilder()

  const values = tList('about.values')
  const approachSteps = tList('about.approachSteps')

  const valueIcons = useMemo(
    () => ['award', 'shield', 'wrench', 'wand', 'handshake'],
    [],
  )

  return (
    <>
      <Seo title={t('about.meta.title')} description={t('about.meta.description')} canonicalPath="/about" />

      <PageHero
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
        description={t('about.lead')}
        breadcrumbs={[{ label: t('about.eyebrow') }]}
      />

      {/* About ---------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-display-md text-kbs-ink">{t('about.aboutTitle')}</h2>
              <p className="mt-5 whitespace-pre-line text-base leading-7 text-kbs-slate">
                {t('about.aboutText')}
              </p>

              <p className="mt-6 rounded-card border border-kbs-line bg-kbs-mist px-4 py-3 text-xs leading-5 text-kbs-slate">
                {t('about.draftNotice')}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-4">
                <div className="rounded-card border border-kbs-line bg-white p-6 shadow-card">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-btn bg-kbs-pale text-kbs-royal">
                      <Icon name="target" size={18} />
                    </span>
                    <h3 className="font-display text-base font-bold text-kbs-ink">
                      {t('about.missionTitle')}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-kbs-slate">{t('about.missionText')}</p>
                </div>

                <div className="rounded-card border border-kbs-line bg-white p-6 shadow-card">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-btn bg-kbs-pale text-kbs-royal">
                      <Icon name="globe" size={18} />
                    </span>
                    <h3 className="font-display text-base font-bold text-kbs-ink">
                      {t('about.visionTitle')}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-kbs-slate">{t('about.visionText')}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values --------------------------------------------------------- */}
      <Section tone="mist">
        <Container>
          <SectionHeading title={t('about.valuesTitle')} />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <li
                key={value.title}
                className="rounded-card border border-kbs-line bg-white p-6 shadow-card"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-btn bg-kbs-pale text-kbs-royal">
                  <Icon name={valueIcons[index] ?? 'check'} size={18} />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-kbs-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-kbs-slate">{value.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Approach ------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading title={t('about.approachTitle')} description={t('about.approachText')} />
            </div>

            <div className="lg:col-span-7">
              <ol className="space-y-3">
                {approachSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 rounded-card border border-kbs-line bg-white px-5 py-4 shadow-card"
                  >
                    <span className="mt-0.5 font-display text-sm font-bold text-kbs-bright">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-6 text-kbs-ink">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services ------------------------------------------------------- */}
      <Section tone="mist">
        <Container>
          <SectionHeading title={t('about.servicesTitle')} description={t('about.servicesText')} />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="rounded-card border border-kbs-line bg-white p-6 shadow-card">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-btn bg-kbs-pale text-kbs-royal">
                  <Icon name={service.icon} size={18} />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-kbs-ink">
                  {localizedField(service, locale, 'name')}
                </h3>
                <p className="mt-2 text-sm leading-6 text-kbs-slate">
                  {localizedField(service, locale, 'summary')}
                </p>
                <ButtonLink
                  to={path(`/services/${service.slug}`)}
                  variant="ghost"
                  size="sm"
                  className="mt-4"
                >
                  {t('common.learnMore')}
                  <ArrowRight size={15} aria-hidden="true" />
                </ButtonLink>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        title={t('about.ctaTitle')}
        description={t('about.ctaText')}
        buttonLabel={t('about.ctaButton')}
        to="/request-service"
        secondaryTo="/contact"
        secondaryLabel={t('nav.contact')}
      />
    </>
  )
}
