import { services } from '../content/services.js'
import { useCurrentLocale, usePathBuilder, useTranslation } from '../hooks/useLocale.jsx'
import Container from '../components/common/Container.jsx'
import CTABand from '../components/common/CTABand.jsx'
import PageHero from '../components/common/PageHero.jsx'
import Section from '../components/common/Section.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'
import ServiceCard from '../components/common/ServiceCard.jsx'
import { ButtonLink } from '../components/common/Button.jsx'

export default function ServicesPage() {
  const { t, tList } = useTranslation()
  const locale = useCurrentLocale()
  const path = usePathBuilder()

  const processSteps = tList('home.process.steps')

  return (
    <>
      <Seo title={t('services.meta.title')} description={t('services.meta.description')} canonicalPath="/services" />

      <PageHero
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        description={t('services.description')}
        breadcrumbs={[{ label: t('services.eyebrow') }]}
      />

      <Section>
        <Container>
          <SectionHeading
            title={t('services.allServicesTitle')}
            description={t('services.description')}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                locale={locale}
                to={path(`/services/${service.slug}`)}
                ctaLabel={t('common.learnMore')}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow={t('home.process.eyebrow')}
            title={t('services.processTitle')}
            description={t('services.processDescription')}
          />

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <li key={step.title} className="rounded-card border border-kbs-line bg-white p-5 shadow-card">
                <span className="font-display text-sm font-bold text-kbs-bright">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-kbs-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-kbs-slate">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 rounded-card border border-kbs-line bg-white p-8 shadow-card lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="rounded-card bg-kbs-mist p-6">
                <h3 className="font-display text-base font-bold text-kbs-ink">
                  {service.locales?.[locale]?.name ?? service.locales?.en?.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-kbs-slate">
                  {service.locales?.[locale]?.summary ?? service.locales?.en?.summary}
                </p>
                <ButtonLink
                  to={path(`/services/${service.slug}`)}
                  variant="ghost"
                  size="sm"
                  className="mt-4"
                >
                  {t('services.chooseCta')}
                </ButtonLink>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        title={t('serviceDetail.ctaTitle')}
        description={t('serviceDetail.ctaBody')}
        buttonLabel={t('serviceDetail.ctaButton')}
        to="/request-service"
        secondaryTo="/contact"
        secondaryLabel={t('nav.contact')}
      />
    </>
  )
}
