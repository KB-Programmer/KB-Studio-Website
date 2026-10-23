import { site } from '../../content/site.js'
import { useTranslation } from '../../hooks/useLocale.jsx'
import Container from './Container.jsx'
import PageHero from './PageHero.jsx'
import Section from './Section.jsx'
import Seo from './Seo.jsx'

/**
 * Shared renderer for the legal pages (Privacy Policy, Terms of Use).
 *
 * The copy lives in the translation files under `<key>.sections`, which is an
 * array of `{ title, paragraphs }` objects.
 */
export default function LegalPage({ translationKey, metaKey, canonicalPath }) {
  const { t, tList } = useTranslation()

  const sections = tList(`${translationKey}.sections`)
  const lastUpdated = site.legal.policyLastUpdated

  return (
    <>
      <Seo title={t(`${metaKey}.title`)} description={t(`${metaKey}.description`)} canonicalPath={canonicalPath} />

      <PageHero
        eyebrow={t(`${translationKey}.eyebrow`)}
        title={t(`${translationKey}.title`)}
        description={t(`${metaKey}.description`)}
        breadcrumbs={[{ label: t(`${translationKey}.title`) }]}
      />

      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm text-kbs-slate">
              {t(`${translationKey}.updated`)}:{' '}
              <time dateTime={lastUpdated}>
                {new Date(`${lastUpdated}T00:00:00`).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </p>

            <div className="mt-8 space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-display-sm text-kbs-ink">{section.title}</h2>
                  <div className="kbs-prose mt-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
