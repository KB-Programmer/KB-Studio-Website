import { useMemo, useState } from 'react'
import clsx from 'clsx'

import { projects } from '../content/projects.js'
import { useCurrentLocale, usePathBuilder, useTranslation } from '../hooks/useLocale.jsx'
import Container from '../components/common/Container.jsx'
import CTABand from '../components/common/CTABand.jsx'
import PageHero from '../components/common/PageHero.jsx'
import ProjectCard from '../components/common/ProjectCard.jsx'
import Section from '../components/common/Section.jsx'
import Seo from '../components/common/Seo.jsx'

const FILTERS = [
  { id: 'all', labelKey: 'portfolio.filterAll' },
  { id: 'business-documents', labelKey: 'portfolio.filterDocuments' },
  { id: 'graphic-design', labelKey: 'portfolio.filterDesign' },
  { id: 'web-development', labelKey: 'portfolio.filterWeb' },
]

export default function PortfolioPage() {
  const { t } = useTranslation()
  const locale = useCurrentLocale()
  const path = usePathBuilder()
  const [filter, setFilter] = useState('all')

  const visibleProjects = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  )

  return (
    <>
      <Seo
        title={t('portfolio.meta.title')}
        description={t('portfolio.meta.description')}
        canonicalPath="/portfolio"
      />

      <PageHero
        eyebrow={t('portfolio.eyebrow')}
        title={t('portfolio.title')}
        description={t('portfolio.description')}
        breadcrumbs={[{ label: t('portfolio.eyebrow') }]}
      />

      <Section>
        <Container>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={t('portfolio.filterLabel')}
          >
            {FILTERS.map((item) => {
              const isActive = filter === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  aria-pressed={isActive}
                  className={clsx(
                    'rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-kbs',
                    isActive
                      ? 'border-kbs-royal bg-kbs-royal text-white'
                      : 'border-kbs-line bg-white text-kbs-ink hover:border-kbs-royal hover:text-kbs-royal',
                  )}
                >
                  {t(item.labelKey)}
                </button>
              )
            })}
          </div>

          {visibleProjects.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => (
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
            <div className="mt-10 rounded-card border border-dashed border-kbs-line bg-kbs-mist p-10 text-center">
              <h2 className="font-display text-lg font-bold text-kbs-ink">
                {t('portfolio.emptyTitle')}
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-kbs-slate">
                {t('portfolio.emptyText')}
              </p>
            </div>
          )}
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
