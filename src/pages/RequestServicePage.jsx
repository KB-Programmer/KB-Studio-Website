import { MessageCircle } from 'lucide-react'

import { usePathBuilder, useTranslation } from '../hooks/useLocale.jsx'
import { openSupport } from '../lib/supportEvents.js'
import ServiceRequestForm from '../components/forms/ServiceRequestForm.jsx'
import Container from '../components/common/Container.jsx'
import PageHero from '../components/common/PageHero.jsx'
import Section from '../components/common/Section.jsx'
import Seo from '../components/common/Seo.jsx'

export default function RequestServicePage() {
  const { t } = useTranslation()
  const path = usePathBuilder()

  return (
    <>
      <Seo
        title={t('requestService.meta.title')}
        description={t('requestService.meta.description')}
        canonicalPath="/request-service"
      />

      <PageHero
        eyebrow={t('requestService.eyebrow')}
        title={t('requestService.title')}
        description={t('requestService.description')}
        breadcrumbs={[{ label: t('requestService.eyebrow') }]}
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 className="text-display-md text-kbs-ink">{t('requestService.formTitle')}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-kbs-slate">
                {t('requestService.responseNote')}
              </p>

              <div className="mt-8">
                <ServiceRequestForm />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-card border border-kbs-line bg-kbs-pale p-6">
                <h2 className="font-display text-base font-bold text-kbs-ink">
                  {t('requestService.assistTitle')}
                </h2>
                <p className="mt-2.5 text-sm leading-6 text-kbs-slate">
                  {t('requestService.assistText')}
                </p>
                <button
                  type="button"
                  onClick={() => openSupport()}
                  className="mt-5 inline-flex items-center gap-2 rounded-btn bg-kbs-royal px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 ease-kbs hover:bg-kbs-bright"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  {t('requestService.assistCta')}
                </button>
              </div>

              <div className="mt-6 rounded-card border border-kbs-line bg-white p-6 shadow-card">
                <h2 className="font-display text-base font-bold text-kbs-ink">
                  {t('forms.requiredLegend')}
                </h2>
                <ul className="mt-3 space-y-1.5 text-sm text-kbs-slate">
                  <li>{t('forms.fields.fullName')}</li>
                  <li>{t('forms.fields.email')}</li>
                  <li>{t('forms.fields.country')}</li>
                  <li>{t('forms.fields.serviceCategory')}</li>
                  <li>{t('forms.fields.projectDetails')}</li>
                </ul>
                <p className="mt-4 text-xs leading-5 text-kbs-slate">
                  {t('forms.hints.privacyConsent')}
                </p>
                <a
                  href={path('/privacy-policy')}
                  className="mt-2 inline-block text-xs font-semibold text-kbs-royal underline decoration-kbs-line underline-offset-4 hover:text-kbs-bright"
                >
                  {t('footer.privacyPolicy')}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
