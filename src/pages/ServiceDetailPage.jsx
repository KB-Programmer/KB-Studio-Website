import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

import { getServiceBySlug, services } from '../content/services.js'
import { getFaqsByIds } from '../content/faq.js'
import { getProjectsByCategory } from '../content/projects.js'
import { localizedField, localizedList } from '../utils/localize.js'
import { useCurrentLocale, usePathBuilder, useTranslation } from '../hooks/useLocale.jsx'
import Accordion from '../components/common/Accordion.jsx'
import { ButtonLink } from '../components/common/Button.jsx'
import Container from '../components/common/Container.jsx'
import CTABand from '../components/common/CTABand.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ProjectCard from '../components/common/ProjectCard.jsx'
import Section from '../components/common/Section.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'
import SmartImage from '../components/common/SmartImage.jsx'

function ListBlock({ title, items, icon }) {
  if (!items || items.length === 0) return null

  return (
    <div className="rounded-card border border-kbs-line bg-white p-6 shadow-card">
      <div className="flex items-center gap-2.5">
        {icon ? (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-btn bg-kbs-pale text-kbs-royal">
            {icon}
          </span>
        ) : null}
        <h3 className="font-display text-base font-bold text-kbs-ink">{title}</h3>
      </div>

      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-kbs-slate">
            <Check size={16} className="mt-1 shrink-0 text-kbs-bright" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const locale = useCurrentLocale()
  const path = usePathBuilder()

  const service = getServiceBySlug(slug)

  const relatedFaqs = useMemo(
    () => (service ? getFaqsByIds(service.relatedFaqs) : []),
    [service],
  )

  const relatedProjects = useMemo(
    () => (service ? getProjectsByCategory(service.id) : []),
    [service],
  )

  const otherServices = useMemo(
    () => services.filter((item) => item.slug !== slug),
    [slug],
  )

  if (!service) {
    return (
      <>
        <Seo title={t('notFound.meta.title')} description={t('notFound.meta.description')} />
        <PageHero
          eyebrow={t('notFound.title')}
          title={t('notFound.title')}
          description={t('notFound.description')}
          breadcrumbs={[{ label: t('notFound.title') }]}
        >
          <ButtonLink to={path('/services')} variant="primary">
            {t('notFound.secondaryCta')}
          </ButtonLink>
        </PageHero>
      </>
    )
  }

  const name = localizedField(service, locale, 'name')
  const headline = localizedField(service, locale, 'headline')
  const summary = localizedField(service, locale, 'summary')
  const description = localizedField(service, locale, 'description')
  const deliverables = localizedList(service, locale, 'deliverables')
  const suitableFor = localizedList(service, locale, 'suitableFor')
  const provide = localizedList(service, locale, 'provide')
  const outcomes = localizedList(service, locale, 'outcomes')

  const faqItems = relatedFaqs.map((faq) => ({
    id: faq.id,
    question: localizedField(faq, locale, 'question'),
    answer: localizedField(faq, locale, 'answer'),
  }))

  return (
    <>
      <Seo
        title={`${name} — ${t('serviceDetail.meta.titleSuffix')}`}
        description={summary}
        canonicalPath={`/services/${service.slug}`}
      />

      <PageHero
        eyebrow={t('services.eyebrow')}
        title={name}
        description={headline || summary}
        breadcrumbs={[
          { label: t('services.eyebrow'), to: '/services' },
          { label: name },
        ]}
      />

      {/* Overview ------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-display-md text-kbs-ink">{name}</h2>
              <p className="mt-5 whitespace-pre-line text-base leading-7 text-kbs-slate">
                {description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink to={path('/request-service')} variant="primary" size="lg">
                  {t('services.chooseCta')}
                  <ArrowRight size={18} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink to={path('/contact')} variant="secondary" size="lg">
                  {t('nav.contact')}
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <SmartImage
                src={service.image}
                alt={name}
                label={name}
                ratio="aspect-[4/3]"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Details -------------------------------------------------------- */}
      <Section tone="mist">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <ListBlock title={t('serviceDetail.deliverablesTitle')} items={deliverables} />
            <ListBlock title={t('serviceDetail.suitableForTitle')} items={suitableFor} />
            <ListBlock title={t('serviceDetail.provideTitle')} items={provide} />
            <ListBlock title={t('serviceDetail.outcomesTitle')} items={outcomes} />
          </div>
        </Container>
      </Section>

      {/* Pricing -------------------------------------------------------- */}
      <Section size="sm">
        <Container>
          <div className="rounded-card border border-kbs-line bg-kbs-pale p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold text-kbs-ink">
              {t('serviceDetail.pricingTitle')}
            </h2>
            <p className="mt-2.5 max-w-3xl text-sm leading-6 text-kbs-slate">
              {t('serviceDetail.pricingBody')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Related projects ----------------------------------------------- */}
      <Section tone="mist" size="sm">
        <Container>
          <SectionHeading title={t('serviceDetail.relatedProjectsTitle')} />

          {relatedProjects.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  locale={locale}
                  to={path(`/portfolio/${project.slug}`)}
                  ctaLabel={t('common.viewProject')}
                  statusLabel={t(
                    project.status === 'demo' ? 'common.demoProject' : 'common.conceptProject',
                  )}
                />
              ))}
            </div>
          ) : (
            <p className="mt-6 max-w-2xl text-sm leading-6 text-kbs-slate">
              {t('serviceDetail.noRelatedProjects')}
            </p>
          )}
        </Container>
      </Section>

      {/* Related FAQs --------------------------------------------------- */}
      {faqItems.length > 0 ? (
        <Section size="sm">
          <Container>
            <SectionHeading title={t('serviceDetail.relatedFaqsTitle')} />
            <div className="mt-8 max-w-3xl">
              <Accordion items={faqItems} />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Other services ------------------------------------------------- */}
      <Section tone="mist" size="sm">
        <Container>
          <SectionHeading title={t('serviceDetail.otherServicesTitle')} />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {otherServices.map((item) => (
              <div key={item.id} className="rounded-card border border-kbs-line bg-white p-6 shadow-card">
                <h3 className="font-display text-base font-bold text-kbs-ink">
                  {localizedField(item, locale, 'name')}
                </h3>
                <p className="mt-2 text-sm leading-6 text-kbs-slate">
                  {localizedField(item, locale, 'summary')}
                </p>
                <ButtonLink
                  to={path(`/services/${item.slug}`)}
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
