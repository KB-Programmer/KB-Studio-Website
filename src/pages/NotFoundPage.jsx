import { MessageCircle } from 'lucide-react'

import { usePathBuilder, useTranslation } from '../hooks/useLocale.jsx'
import { openSupport } from '../lib/supportEvents.js'
import Container from '../components/common/Container.jsx'
import PageHero from '../components/common/PageHero.jsx'
import Section from '../components/common/Section.jsx'
import Seo from '../components/common/Seo.jsx'
import { ButtonLink } from '../components/common/Button.jsx'

export default function NotFoundPage() {
  const { t } = useTranslation()
  const path = usePathBuilder()

  return (
    <>
      <Seo title={t('notFound.meta.title')} description={t('notFound.meta.description')} />

      <PageHero
        eyebrow="404"
        title={t('notFound.title')}
        description={t('notFound.description')}
        breadcrumbs={[{ label: '404' }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink to={path('/')} variant="primary" size="lg">
            {t('notFound.primaryCta')}
          </ButtonLink>
          <ButtonLink to={path('/services')} variant="secondary" size="lg">
            {t('notFound.secondaryCta')}
          </ButtonLink>
        </div>
      </PageHero>

      <Section size="sm">
        <Container>
          <div className="max-w-2xl rounded-card border border-kbs-line bg-kbs-pale p-6">
            <h2 className="font-display text-base font-bold text-kbs-ink">
              {t('notFound.helpTitle')}
            </h2>
            <p className="mt-2 text-sm leading-6 text-kbs-slate">{t('notFound.helpText')}</p>
            <button
              type="button"
              onClick={() => openSupport()}
              className="mt-4 inline-flex items-center gap-2 rounded-btn bg-kbs-royal px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 ease-kbs hover:bg-kbs-bright"
            >
              <MessageCircle size={17} aria-hidden="true" />
              {t('nav.support')}
            </button>
          </div>
        </Container>
      </Section>
    </>
  )
}
