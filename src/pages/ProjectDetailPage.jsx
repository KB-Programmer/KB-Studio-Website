import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowRight, Check, Copy, ExternalLink } from 'lucide-react'

import { getProjectBySlug, projects } from '../content/projects.js'
import { getServiceById } from '../content/services.js'
import { localizedField, localizedList } from '../utils/localize.js'
import { useCurrentLocale, usePathBuilder, useTranslation } from '../hooks/useLocale.jsx'
import { ButtonLink } from '../components/common/Button.jsx'
import Container from '../components/common/Container.jsx'
import CTABand from '../components/common/CTABand.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ProjectCard from '../components/common/ProjectCard.jsx'
import Section from '../components/common/Section.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'
import SmartImage from '../components/common/SmartImage.jsx'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const locale = useCurrentLocale()
  const path = usePathBuilder()
  const [copied, setCopied] = useState(false)

  const project = getProjectBySlug(slug)

  const relatedProjects = useMemo(
    () => projects.filter((item) => item.slug !== slug).slice(0, 3),
    [slug],
  )

  if (!project) {
    return (
      <>
        <Seo title={t('notFound.meta.title')} description={t('notFound.meta.description')} />
        <PageHero
          eyebrow={t('projectDetail.notFoundTitle')}
          title={t('projectDetail.notFoundTitle')}
          description={t('projectDetail.notFoundText')}
          breadcrumbs={[{ label: t('projectDetail.notFoundTitle') }]}
        >
          <ButtonLink to={path('/portfolio')} variant="primary">
            {t('common.backToPortfolio')}
          </ButtonLink>
        </PageHero>
      </>
    )
  }

  const title = localizedField(project, locale, 'title')
  const description = localizedField(project, locale, 'description')
  const objectives = localizedList(project, locale, 'objectives')
  const outcomes = localizedList(project, locale, 'outcomes')
  const note = localizedField(project, locale, 'note')
  const service = getServiceById(project.category)
  const statusLabel =
    project.status === 'demo' ? t('common.demoProject') : t('common.conceptProject')

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <Seo
        title={`${title} | King Business Studio`}
        description={description}
        canonicalPath={`/portfolio/${project.slug}`}
        type="article"
      />

      <PageHero
        eyebrow={service ? localizedField(service, locale, 'name') : t('portfolio.eyebrow')}
        title={title}
        description={description}
        breadcrumbs={[
          { label: t('portfolio.eyebrow'), to: '/portfolio' },
          { label: title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-kbs-deep px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white">
            {statusLabel}
          </span>
          <span className="rounded-full border border-kbs-line bg-white px-3 py-1.5 text-xs font-semibold text-kbs-ink">
            {t('portfolio.categoryLabel')}: {service ? localizedField(service, locale, 'name') : '—'}
          </span>
        </div>
      </PageHero>

      {/* Gallery -------------------------------------------------------- */}
      <Section size="sm">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SmartImage
                src={project.previewImage}
                alt={title}
                label={title}
                ratio="aspect-[16/10]"
                loading="eager"
              />
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-card border border-kbs-line bg-white p-6 shadow-card">
                <h2 className="font-display text-base font-bold text-kbs-ink">
                  {t('portfolio.shareTitle')}
                </h2>

                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-kbs-slate">{t('portfolio.categoryLabel')}</dt>
                    <dd className="font-medium text-kbs-ink">
                      {service ? localizedField(service, locale, 'name') : '—'}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-kbs-slate">{t('portfolio.statusLabel')}</dt>
                    <dd className="font-medium text-kbs-ink">{statusLabel}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-kbs-slate">{t('portfolio.yearLabel')}</dt>
                    <dd className="font-medium text-kbs-ink">
                      {project.year ? project.year : t('portfolio.notPublished')}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-kbs-slate">{t('portfolio.clientLabel')}</dt>
                    <dd className="font-medium text-kbs-ink">
                      {project.client ?? t('portfolio.notPublished')}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="mt-5 inline-flex items-center gap-2 rounded-btn border border-kbs-line px-3.5 py-2 text-sm font-semibold text-kbs-ink transition-colors duration-200 ease-kbs hover:border-kbs-royal hover:text-kbs-royal"
                >
                  <Copy size={15} aria-hidden="true" />
                  {copied ? t('portfolio.shareCopied') : t('portfolio.copyLink')}
                </button>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-btn border border-kbs-line px-3.5 py-2 text-sm font-semibold text-kbs-ink transition-colors duration-200 ease-kbs hover:border-kbs-royal hover:text-kbs-royal"
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                    {t('portfolio.liveSite')}
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          {project.galleryImages && project.galleryImages.length > 1 ? (
            <div className="mt-6">
              <h2 className="font-display text-base font-bold text-kbs-ink">
                {t('portfolio.galleryTitle')}
              </h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                {project.galleryImages.map((image) => (
                  <SmartImage key={image} src={image} alt={title} label={title} ratio="aspect-[16/10]" />
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </Section>

      {/* Detail --------------------------------------------------------- */}
      <Section tone="mist">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-card border border-kbs-line bg-white p-6 shadow-card">
              <h2 className="font-display text-base font-bold text-kbs-ink">
                {t('portfolio.objectivesTitle')}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {objectives.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-kbs-slate">
                    <Check size={16} className="mt-1 shrink-0 text-kbs-bright" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-kbs-line bg-white p-6 shadow-card">
              <h2 className="font-display text-base font-bold text-kbs-ink">
                {t('portfolio.outcomesTitle')}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-kbs-slate">
                    <Check size={16} className="mt-1 shrink-0 text-kbs-bright" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-kbs-line bg-white p-6 shadow-card">
              <h2 className="font-display text-base font-bold text-kbs-ink">
                {t('portfolio.toolsTitle')}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-kbs-line bg-kbs-mist px-3 py-1.5 text-xs font-semibold text-kbs-ink"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {note ? (
            <p className="mt-6 rounded-card border border-kbs-line bg-white px-4 py-3 text-xs leading-5 text-kbs-slate">
              {note}
            </p>
          ) : null}
        </Container>
      </Section>

      {/* Related -------------------------------------------------------- */}
      <Section size="sm">
        <Container>
          <SectionHeading title={t('portfolio.relatedProjectsTitle')} />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((item) => (
              <ProjectCard
                key={item.id}
                project={item}
                locale={locale}
                to={path(`/portfolio/${item.slug}`)}
                ctaLabel={t('common.viewProject')}
                statusLabel={t(item.status === 'demo' ? 'common.demoProject' : 'common.conceptProject')}
              />
            ))}
          </div>

          <div className="mt-8">
            <ButtonLink to={path('/portfolio')} variant="secondary">
              {t('common.backToPortfolio')}
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <CTABand
        title={t('home.finalCta.title')}
        description={t('home.finalCta.description')}
        buttonLabel={t('home.finalCta.button')}
        to="/request-service"
        secondaryTo="/contact"
        secondaryLabel={t('nav.contact')}
      />
    </>
  )
}
