import { useMemo } from 'react'
import { Check, MessageCircle, ShieldCheck } from 'lucide-react'

import { getQuickActions } from '../lib/supportEngine.js'
import { useCurrentLocale, usePathBuilder, useTranslation } from '../hooks/useLocale.jsx'
import { openSupport } from '../lib/supportEvents.js'
import { ButtonLink } from '../components/common/Button.jsx'
import Container from '../components/common/Container.jsx'
import PageHero from '../components/common/PageHero.jsx'
import Section from '../components/common/Section.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'

export default function SupportPage() {
  const { t, tList } = useTranslation()
  const locale = useCurrentLocale()
  const path = usePathBuilder()

  const quickActions = useMemo(() => getQuickActions(), [])
  const supportPoints = tList('home.support.points')

  return (
    <>
      <Seo
        title={t('home.support.title')}
        description={t('home.support.description')}
        canonicalPath="/support"
      />

      <PageHero
        eyebrow={t('home.support.eyebrow')}
        title={t('home.support.title')}
        description={t('home.support.description')}
        breadcrumbs={[{ label: t('nav.support') }]}
      >
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => openSupport()}
            className="inline-flex items-center justify-center gap-2 rounded-btn bg-kbs-royal px-6 py-3 text-base font-semibold text-white transition-colors duration-200 ease-kbs hover:bg-kbs-bright"
          >
            <MessageCircle size={18} aria-hidden="true" />
            {t('home.support.cta')}
          </button>
          <ButtonLink to={path('/request-service')} variant="secondary" size="lg">
            {t('nav.requestService')}
          </ButtonLink>
        </div>
      </PageHero>

      {/* What it can do -------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading title={t('home.support.title')} description={t('home.support.tagline')} />

              <ul className="mt-6 space-y-3">
                {supportPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm leading-6 text-kbs-ink">
                    <Check size={17} className="mt-1 shrink-0 text-kbs-bright" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-card border border-kbs-line bg-white p-7 shadow-card">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-btn bg-kbs-pale text-kbs-royal">
                    <ShieldCheck size={18} />
                  </span>
                  <h2 className="font-display text-base font-bold text-kbs-ink">
                    {t('support.disclosureLabel')}
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-kbs-slate">{t('home.support.disclosure')}</p>
                <p className="mt-3 text-sm leading-6 text-kbs-slate">
                  {t('support.assistantNature')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick questions -------------------------------------------------- */}
      <Section tone="mist">
        <Container>
          <SectionHeading title={t('support.quickActionsTitle')} />

          <ul className="mt-8 flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <li key={action.id}>
                <button
                  type="button"
                  onClick={() => openSupport()}
                  className="rounded-full border border-kbs-line bg-white px-4 py-2 text-sm font-semibold text-kbs-ink transition-colors duration-200 ease-kbs hover:border-kbs-royal hover:text-kbs-royal"
                >
                  {action.label?.[locale] ?? action.label?.en ?? ''}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => openSupport()}
              className="inline-flex items-center gap-2 rounded-btn bg-kbs-royal px-6 py-3 text-base font-semibold text-white transition-colors duration-200 ease-kbs hover:bg-kbs-bright"
            >
              <MessageCircle size={18} aria-hidden="true" />
              {t('home.support.cta')}
            </button>
          </div>
        </Container>
      </Section>
    </>
  )
}
