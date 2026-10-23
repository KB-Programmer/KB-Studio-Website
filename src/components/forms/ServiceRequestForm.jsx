import { useEffect, useMemo, useState } from 'react'

import { services } from '../../content/services.js'
import { localizedField } from '../../utils/localize.js'
import { useCurrentLocale, usePathBuilder, useTranslation } from '../../hooks/useLocale.jsx'
import { SERVICE_FORM_ID, isFormConfigured, submitToFormspree } from '../../lib/formspree.js'
import { clearRequestDraft, readRequestDraft } from '../../lib/requestDraftStore.js'
import { Button } from '../common/Button.jsx'
import FormStatus from './FormStatus.jsx'
import {
  CheckboxField,
  CheckboxGroupField,
  SelectField,
  TextAreaField,
  TextField,
} from './FormControls.jsx'

const EMPTY_VALUES = {
  fullName: '',
  email: '',
  country: '',
  preferredLanguage: '',
  serviceCategories: [],
  projectTitle: '',
  projectDetails: '',
  budgetRange: '',
  desiredDeadline: '',
  preferredContactMethod: '',
  consent: false,
  company: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function ServiceRequestForm() {
  const { t, tList } = useTranslation()
  const locale = useCurrentLocale()
  const path = usePathBuilder()

  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitting, setSubmitting] = useState(false)
  const [handoff, setHandoff] = useState(null)

  useEffect(() => {
    const draft = readRequestDraft()
    if (!draft) return

    const categories = draft.service
      ? String(draft.service)
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      : []

    setValues((current) => ({
      ...current,
      projectTitle: current.projectTitle || draft.service || '',
      projectDetails: draft.details || draft.objective || '',
      desiredDeadline: draft.deadline || '',
      budgetRange: draft.budget || '',
      serviceCategories: categories,
    }))
    setHandoff(draft)
  }, [])

  const serviceOptions = useMemo(
    () =>
      services.map((service) => ({
        value: localizedField(service, locale, 'name'),
        label: localizedField(service, locale, 'name'),
      })),
    [locale],
  )

  const budgetOptions = useMemo(
    () => tList('forms.options.budgetRanges').map((value) => ({ value, label: value })),
    [tList],
  )

  const contactMethodOptions = useMemo(
    () => tList('forms.options.contactMethods').map((value) => ({ value, label: value })),
    [tList],
  )

  const languageOptions = useMemo(
    () => tList('forms.options.languages').map((value) => ({ value, label: value })),
    [tList],
  )

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  function validate() {
    const next = {}

    if (!values.fullName.trim()) next.fullName = t('forms.validation.required')
    if (!values.email.trim()) next.email = t('forms.validation.required')
    else if (!EMAIL_PATTERN.test(values.email.trim())) next.email = t('forms.validation.emailInvalid')
    if (!values.country.trim()) next.country = t('forms.validation.required')
    if (values.serviceCategories.length === 0) {
      next.serviceCategories = t('forms.validation.selectService')
    }
    if (!values.projectDetails.trim()) next.projectDetails = t('forms.validation.required')
    if (!values.consent) next.consent = t('forms.validation.consentRequired')

    return next
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (submitting) {
      setStatus('duplicate-blocked')
      return
    }

    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle')
      return
    }

    setSubmitting(true)
    setStatus('idle')

    const payload = {
      'Full Name': values.fullName.trim(),
      Email: values.email.trim(),
      Country: values.country.trim(),
      'Preferred Language': values.preferredLanguage,
      'Service Category': values.serviceCategories,
      'Project Title': values.projectTitle.trim(),
      'Project Details': values.projectDetails.trim(),
      'Budget Range': values.budgetRange,
      'Desired Deadline': values.desiredDeadline.trim(),
      'Preferred Contact Method': values.preferredContactMethod,
      'Submitted Language': locale,
      _subject: `Service request — ${values.projectTitle.trim() || values.fullName.trim()}`,
      _gotcha: values.company,
    }

    const result = await submitToFormspree({ formId: SERVICE_FORM_ID, data: payload })

    setSubmitting(false)

    if (result.status === 'success') {
      setStatus('success')
      clearRequestDraft()
      setHandoff(null)
      setValues(EMPTY_VALUES)
      return
    }

    if (result.status === 'not-configured') {
      setStatus('not-configured')
      return
    }

    if (result.status === 'network-error') {
      setStatus('network')
      return
    }

    setStatus('error')
  }

  if (status === 'success') {
    return (
      <div className="rounded-card border border-kbs-line bg-white p-6 sm:p-8">
        <FormStatus status="success" />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setStatus('idle')}>
            {t('common.clear')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-card border border-kbs-line bg-white p-6 sm:p-8">
      {handoff ? (
        <div className="mb-6 rounded-card border border-kbs-bright/40 bg-kbs-pale p-4">
          <h3 className="font-display text-sm font-bold text-kbs-ink">{t('requestService.handoffTitle')}</h3>
          <p className="mt-1.5 text-sm leading-6 text-kbs-slate">{t('requestService.handoffText')}</p>
          <button
            type="button"
            onClick={() => {
              clearRequestDraft()
              setHandoff(null)
              setValues(EMPTY_VALUES)
            }}
            className="mt-3 text-xs font-semibold text-kbs-royal underline decoration-kbs-line underline-offset-4 transition-colors duration-200 ease-kbs hover:text-kbs-bright"
          >
            {t('requestService.handoffDismiss')}
          </button>
        </div>
      ) : null}

      <div className="grid gap-5">
        <TextField
          name="fullName"
          label={t('forms.fields.fullName')}
          value={values.fullName}
          onChange={(value) => update('fullName', value)}
          required
          autoComplete="name"
          placeholder={t('forms.placeholders.fullName')}
          error={errors.fullName}
        />

        <TextField
          name="email"
          type="email"
          label={t('forms.fields.email')}
          value={values.email}
          onChange={(value) => update('email', value)}
          required
          autoComplete="email"
          placeholder={t('forms.placeholders.email')}
          error={errors.email}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            name="country"
            label={t('forms.fields.country')}
            value={values.country}
            onChange={(value) => update('country', value)}
            required
            autoComplete="country-name"
            placeholder={t('forms.placeholders.country')}
            hint={t('forms.hints.country')}
            error={errors.country}
          />

          <SelectField
            name="preferredLanguage"
            label={t('forms.fields.preferredLanguage')}
            value={values.preferredLanguage}
            onChange={(value) => update('preferredLanguage', value)}
            options={languageOptions}
            placeholder={t('common.optional')}
          />
        </div>

        <CheckboxGroupField
          name="serviceCategories"
          legend={t('forms.fields.serviceCategory')}
          options={serviceOptions}
          values={values.serviceCategories}
          onChange={(value) => update('serviceCategories', value)}
          required
          error={errors.serviceCategories}
        />

        <TextField
          name="projectTitle"
          label={t('forms.fields.projectTitle')}
          value={values.projectTitle}
          onChange={(value) => update('projectTitle', value)}
          placeholder={t('forms.placeholders.projectTitle')}
        />

        <TextAreaField
          name="projectDetails"
          label={t('forms.fields.projectDetails')}
          value={values.projectDetails}
          onChange={(value) => update('projectDetails', value)}
          required
          placeholder={t('forms.placeholders.projectDetails')}
          hint={t('forms.hints.projectDetails')}
          error={errors.projectDetails}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            name="budgetRange"
            label={t('forms.fields.budgetRange')}
            value={values.budgetRange}
            onChange={(value) => update('budgetRange', value)}
            options={budgetOptions}
            placeholder={t('common.optional')}
            hint={t('forms.hints.budgetRange')}
          />

          <TextField
            name="desiredDeadline"
            label={t('forms.fields.desiredDeadline')}
            value={values.desiredDeadline}
            onChange={(value) => update('desiredDeadline', value)}
            placeholder={t('common.optional')}
            hint={t('forms.hints.desiredDeadline')}
          />
        </div>

        <SelectField
          name="preferredContactMethod"
          label={t('forms.fields.preferredContactMethod')}
          value={values.preferredContactMethod}
          onChange={(value) => update('preferredContactMethod', value)}
          options={contactMethodOptions}
          placeholder={t('common.optional')}
        />

        {/* Honeypot — hidden from people, tempting for bots. */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(event) => update('company', event.target.value)}
          />
        </div>

        <CheckboxField
          name="consent"
          checked={values.consent}
          onChange={(value) => update('consent', value)}
          required
          label={
            <>
              {t('forms.hints.privacyConsent')}{' '}
              <a
                href={path('/privacy-policy')}
                className="font-medium text-kbs-royal underline decoration-kbs-line underline-offset-4 hover:text-kbs-bright"
              >
                {t('footer.privacyPolicy')}
              </a>
            </>
          }
          error={errors.consent}
        />

        <FormStatus
          status={status === 'duplicate-blocked' ? 'error' : status}
          contactPath={path('/contact')}
        />

        <div className="flex flex-wrap items-center gap-4 border-t border-kbs-line pt-6">
          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? t('forms.states.submitting') : t('forms.submit')}
          </Button>

          {!isFormConfigured(SERVICE_FORM_ID) ? (
            <p className="text-xs text-kbs-slate">{t('forms.states.notConfiguredBody')}</p>
          ) : null}
        </div>

        <p className="text-xs leading-5 text-kbs-slate">{t('requestService.responseNote')}</p>
      </div>
    </form>
  )
}
