import { AlertTriangle, CheckCircle2, WifiOff } from 'lucide-react'

import { useTranslation } from '../../hooks/useLocale.jsx'
import { ButtonLink } from '../common/Button.jsx'

/**
 * Feedback panel shown after a form submission attempt.
 *
 * `status` values:
 *   success        — the provider accepted the submission
 *   error          — the provider rejected it
 *   network        — the provider could not be reached
 *   not-configured — no destination is configured yet (nothing was sent)
 */
export default function FormStatus({ status, onRetry, contactPath = '/contact' }) {
  const { t } = useTranslation()

  if (!status || status === 'idle') return null

  const config = {
    success: {
      icon: CheckCircle2,
      title: t('forms.states.successTitle'),
      body: t('forms.states.successBody'),
      tone: 'border-emerald-200 bg-emerald-50 text-emerald-900',
      iconTone: 'text-emerald-600',
    },
    error: {
      icon: AlertTriangle,
      title: t('forms.states.errorTitle'),
      body: t('forms.states.errorBody'),
      tone: 'border-red-200 bg-red-50 text-red-900',
      iconTone: 'text-red-600',
    },
    network: {
      icon: WifiOff,
      title: t('forms.states.networkTitle'),
      body: t('forms.states.networkBody'),
      tone: 'border-amber-200 bg-amber-50 text-amber-900',
      iconTone: 'text-amber-600',
    },
    'not-configured': {
      icon: AlertTriangle,
      title: t('forms.states.notConfiguredTitle'),
      body: t('forms.states.notConfiguredBody'),
      tone: 'border-amber-200 bg-amber-50 text-amber-900',
      iconTone: 'text-amber-600',
    },
  }[status]

  if (!config) return null

  const IconComponent = config.icon

  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-card border p-5 ${config.tone}`}
    >
      <div className="flex items-start gap-3">
        <IconComponent size={20} className={`mt-0.5 shrink-0 ${config.iconTone}`} aria-hidden="true" />
        <div>
          <h3 className="font-display text-base font-bold">{config.title}</h3>
          <p className="mt-1.5 text-sm leading-6 opacity-90">{config.body}</p>

          {status !== 'success' ? (
            <div className="mt-4 flex flex-wrap gap-3">
              {onRetry ? (
                <button
                  type="button"
                  onClick={onRetry}
                  className="rounded-btn bg-kbs-royal px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 ease-kbs hover:bg-kbs-bright"
                >
                  {t('common.retry')}
                </button>
              ) : null}
              <ButtonLink
                to={contactPath}
                variant="secondary"
                size="md"
              >
                {t('nav.contact')}
              </ButtonLink>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
