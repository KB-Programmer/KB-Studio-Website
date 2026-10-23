import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { MessageCircle } from 'lucide-react'

import { faqCategories, faqs } from '../content/faq.js'
import { localizedField } from '../utils/localize.js'
import { useCurrentLocale, usePathBuilder, useTranslation } from '../hooks/useLocale.jsx'
import { openSupport } from '../lib/supportEvents.js'
import Accordion from '../components/common/Accordion.jsx'
import Container from '../components/common/Container.jsx'
import PageHero from '../components/common/PageHero.jsx'
import Section from '../components/common/Section.jsx'
import Seo from '../components/common/Seo.jsx'
import { ButtonLink } from '../components/common/Button.jsx'

const CATEGORY_LABEL_KEYS = {
  general: 'faq.categoryGeneral',
  'business-documents': 'faq.categoryDocuments',
  'graphic-design': 'faq.categoryDesign',
  'web-development': 'faq.categoryWeb',
  pricing: 'faq.categoryPricing',
  process: 'faq.categoryProcess',
  privacy: 'faq.categoryPrivacy',
}

export default function FaqPage() {
  const { t } = useTranslation()
  const locale = useCurrentLocale()
  const path = usePathBuilder()
  const [filter, setFilter] = useState('all')

  const visibleFaqs = useMemo(
    () => (filter === 'all' ? faqs : faqs.filter((faq) => faq.category === filter)),
    [filter],
  )

  const items = visibleFaqs.map((faq) => ({
    id: faq.id,
    question: localizedField(faq, locale, 'question'),
    answer: localizedField(faq, locale, 'answer'),
  }))

  return (
    <>
      <Seo title={t('faq.meta.title')} description={t('faq.meta.description')} canonicalPath="/faq" />

      <PageHero
        eyebrow={t('faq.eyebrow')}
        title={t('faq.title')}
        description={t('faq.description')}
        breadcrumbs={[{ label: t('faq.eyebrow') }]}
      />

      <Section>
        <Container>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t('faq.filterLabel')}>
            <button
              type="button"
              onClick={() => setFilter('all')}
              aria-pressed={filter === 'all'}
              className={clsx(
                'rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-kbs',
                filter === 'all'
                  ? 'border-kbs-royal bg-kbs-royal text-white'
                  : 'border-kbs-line bg-white text-kbs-ink hover:border-kbs-royal hover:text-kbs-royal',
              )}
            >
              {t('faq.filterAll')}
            </button>

            {faqCategories.map((category) => {
              const isActive = filter === category.id
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFilter(category.id)}
                  aria-pressed={isActive}
                  className={clsx(
                    'rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-kbs',
                    isActive
                      ? 'border-kbs-royal bg-kbs-royal text-white'
                      : 'border-kbs-line bg-white text-kbs-ink hover:border-kbs-royal hover:text-kbs-royal',
                  )}
                >
                  {t(CATEGORY_LABEL_KEYS[category.id] ?? 'faq.filterAll')}
                </button>
              )
            })}
          </div>

          <div className="mt-10 max-w-3xl">
            {items.length > 0 ? (
              <Accordion items={items} />
            ) : (
              <p className="rounded-card border border-dashed border-kbs-line bg-kbs-mist p-8 text-center text-sm text-kbs-slate">
                {t('portfolio.emptyText')}
              </p>
            )}
          </div>
        </Container>
      </Section>

      {/* Still have a question ------------------------------------------- */}
      <Section tone="mist">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-card border border-kbs-line bg-white p-7 shadow-card">
              <h2 className="font-display text-lg font-bold text-kbs-ink">{t('faq.stillTitle')}</h2>
              <p className="mt-2.5 text-sm leading-6 text-kbs-slate">{t('faq.stillText')}</p>
              <div className="mt-5">
                <ButtonLink to={path('/contact')} variant="primary">
                  {t('faq.stillCta')}
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-card border border-kbs-line bg-kbs-pale p-7">
              <h2 className="font-display text-lg font-bold text-kbs-ink">{t('faq.supportTitle')}</h2>
              <p className="mt-2.5 text-sm leading-6 text-kbs-slate">{t('faq.supportText')}</p>
              <button
                type="button"
                onClick={() => openSupport()}
                className="mt-5 inline-flex items-center gap-2 rounded-btn bg-kbs-royal px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 ease-kbs hover:bg-kbs-bright"
              >
                <MessageCircle size={17} aria-hidden="true" />
                {t('faq.supportCta')}
              </button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
