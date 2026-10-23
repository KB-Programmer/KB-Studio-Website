import { ArrowRight } from 'lucide-react'

import { useTranslation } from '../../hooks/useLocale.jsx'
import { usePathBuilder } from '../../hooks/useLocale.jsx'
import { ButtonLink } from './Button.jsx'
import Container from './Container.jsx'

/**
 * Reusable final call-to-action band.
 */
export default function CTABand({
  title,
  description,
  buttonLabel,
  to = '/request-service',
  tone = 'royal',
  secondaryTo,
  secondaryLabel,
}) {
  const { t } = useTranslation()
  const path = usePathBuilder()

  const background =
    tone === 'deep' ? 'bg-kbs-deep' : tone === 'mist' ? 'bg-kbs-mist' : 'bg-kbs-royal'

  const isDark = tone === 'royal' || tone === 'deep'

  return (
    <section className={background}>
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2
              className={`text-display-md ${isDark ? 'text-white' : 'text-kbs-ink'}`}
            >
              {title}
            </h2>
            {description ? (
              <p className={`mt-3 text-base leading-7 ${isDark ? 'text-white/80' : 'text-kbs-slate'}`}>
                {description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {secondaryTo && secondaryLabel ? (
              <ButtonLink
                to={path(secondaryTo)}
                variant={isDark ? 'onDark' : 'secondary'}
                size="lg"
                className="group"
              >
                {secondaryLabel}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 ease-kbs group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </ButtonLink>
            ) : null}
            <ButtonLink
              to={path(to)}
              variant={isDark ? 'bright' : 'primary'}
              size="lg"
              className="group"
            >
              {buttonLabel ?? t('common.requestThisService')}
              <ArrowRight
                size={18}
                className="transition-transform duration-200 ease-kbs group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
