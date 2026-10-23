import { useMemo } from 'react'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'

import { projects } from '../content/projects.js'
import { services } from '../content/services.js'
import { getPublishedTestimonials } from '../content/testimonials.js'
import { getActiveSocialLinks } from '../content/socialLinks.js'
import { useCurrentLocale, usePathBuilder, useTranslation } from '../hooks/useLocale.jsx'
import { openSupport } from '../lib/supportEvents.js'
import Container from '../components/common/Container.jsx'
import ProjectCard from '../components/common/ProjectCard.jsx'
import Seo from '../components/common/Seo.jsx'
import Section from '../components/common/Section.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import ServiceCard from '../components/common/ServiceCard.jsx'
import CTABand from '../components/common/CTABand.jsx'
import { ButtonLink } from '../components/common/Button.jsx'

export default function HomePage() {
  const { t, tList } = useTranslation()
  const locale = useCurrentLocale()
  const path = usePathBuilder()

  const heroPoints = tList('home.hero.points')
  const whyItems = tList('home.why.items')
  const processSteps = tList('home.process.steps')
  const supportPoints = tList('home.support.points')
  const testimonials = useMemo(() => getPublishedTestimonials(locale), [locale])
  const socialLinks = useMemo(() => getActiveSocialLinks(), [])

  return (
    <>
      <Seo title={t('home.meta.title')} description={t('home.meta.description')} canonicalPath="/" />

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-kbs-deep">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'radial-gradient(circle at 12% 18%, rgba(52,120,246,0.28), transparent 42%), radial-gradient(circle at 88% 12%, rgba(52,120,246,0.18), transparent 38%)',
          }}
          aria-hidden="true"
        />

        <Container className="relative py-20 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-kbs-bright">
                {t('home.hero.eyebrow')}
              </p>

              <h1 className="mt-5 text-display-xl text-white">{t('home.hero.title')}</h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                {t('home.hero.description')}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink to={path('/request-service')} variant="bright" size="lg">
                  {t('home.hero.primaryCta')}
                  <ArrowRight size={18} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink to={path('/portfolio')} variant="onDark" size="lg">
                  {t('home.hero.secondaryCta')}
                </ButtonLink>
              </div>

              {heroPoints.length > 0 ? (
                <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                  {heroPoints.map((point) => (
                    <li key={point} className="inline-flex items-center gap-2 text-sm text-white/85">
                      <Check size={16} className="text-kbs-bright" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-card border border-white/12 bg-white/[0.06] p-7 backdrop-blur">
                <h2 className="font-display text-base font-bold text-white">
                  {t('home.support.title')}
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/75">{t('home.support.tagline')}</p>

                <button
                  type="button"
                  onClick={() => openSupport()}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-btn bg-white px-4 py-3 text-sm font-semibold text-kbs-royal transition-colors duration-200 ease-kbs hover:bg-kbs-pale"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  {t('home.support.cta')}
                </button>

                <p className="mt-4 text-xs leading-5 text-white/60">{t('home.support.disclosure')}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Services                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={t('home.services.eyebrow')}
            title={t('home.services.title')}
            description={t('home.services.description')}
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

          <div className="mt-10">
            <ButtonLink to={path('/services')} variant="secondary">
              {t('home.services.cta')}
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Why KBS                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="mist">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={t('home.why.eyebrow')}
                title={t('home.why.title')}
                description={t('home.why.description')}
              />
            </div>

            <div className="lg:col-span-7">
              <ul className="grid gap-4 sm:grid-cols-2">
                {whyItems.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-card border border-kbs-line bg-white p-5 shadow-card"
                  >
                    <h3 className="font-display text-base font-bold text-kbs-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-kbs-slate">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Portfolio preview                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={t('home.portfolio.eyebrow')}
            title={t('home.portfolio.title')}
            description={t('home.portfolio.description')}
          />

          <p className="mt-4 max-w-3xl rounded-card border border-kbs-line bg-kbs-mist px-4 py-3 text-xs leading-5 text-kbs-slate">
            {t('home.portfolio.conceptNotice')}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
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

          <div className="mt-10">
            <ButtonLink to={path('/portfolio')} variant="secondary">
              {t('home.portfolio.cta')}
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Process                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="royal">
        <Container>
          <SectionHeading
            eyebrow={t('home.process.eyebrow')}
            title={t('home.process.title')}
            description={t('home.process.description')}
            tone="light"
          />

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-card border border-white/12 bg-white/[0.06] p-5"
              >
                <span className="font-display text-sm font-bold text-kbs-bright">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Support assistant                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="pale">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow={t('home.support.eyebrow')}
                title={t('home.support.title')}
                description={t('home.support.description')}
              />

              <ul className="mt-6 space-y-2.5">
                {supportPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-kbs-ink">
                    <Check size={17} className="mt-0.5 shrink-0 text-kbs-bright" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>

              <p className="mt-6 max-w-2xl rounded-card border border-kbs-line bg-white px-4 py-3 text-xs leading-5 text-kbs-slate">
                {t('home.support.disclosure')}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-card border border-kbs-line bg-white p-7 shadow-card">
                <h3 className="font-display text-base font-bold text-kbs-ink">
                  {t('home.support.tagline')}
                </h3>
                <p className="mt-2 text-sm leading-6 text-kbs-slate">
                  {t('faq.supportText')}
                </p>
                <button
                  type="button"
                  onClick={() => openSupport()}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-btn bg-kbs-royal px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 ease-kbs hover:bg-kbs-bright"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  {t('home.support.cta')}
                </button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Testimonials                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={t('home.testimonials.eyebrow')}
            title={t('home.testimonials.title')}
            description={t('home.testimonials.description')}
          />

          {testimonials.length > 0 ? (
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((item) => (
                <li
                  key={item.id}
                  className="rounded-card border border-kbs-line bg-white p-6 shadow-card"
                >
                  <blockquote className="text-sm leading-6 text-kbs-ink">“{item.quote}”</blockquote>
                  <p className="mt-4 text-sm font-semibold text-kbs-ink">{item.name}</p>
                  {item.role ? <p className="text-xs text-kbs-slate">{item.role}</p> : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 rounded-card border border-dashed border-kbs-line bg-kbs-mist p-8 text-center">
              <h3 className="font-display text-lg font-bold text-kbs-ink">
                {t('home.testimonials.emptyTitle')}
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-kbs-slate">
                {t('home.testimonials.emptyText')}
              </p>
              <div className="mt-6">
                <ButtonLink to={path('/request-service')} variant="primary">
                  {t('home.testimonials.emptyCta')}
                </ButtonLink>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Social                                                            */}
      {/* ---------------------------------------------------------------- */}
      {socialLinks.length > 0 ? (
        <Section tone="mist" size="sm">
          <Container>
            <SectionHeading
              eyebrow={t('home.social.eyebrow')}
              title={t('home.social.title')}
              description={t('home.social.description')}
              align="center"
            />
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {socialLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-btn border border-kbs-line bg-white px-4 py-2 text-sm font-semibold text-kbs-ink transition-colors duration-200 ease-kbs hover:border-kbs-royal hover:text-kbs-royal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

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
