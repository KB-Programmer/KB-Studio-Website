import { useMemo, useState } from 'react'

import { useCurrentLocale, usePathBuilder, useTranslation } from '../../hooks/useLocale.jsx'
import { CONTACT_FORM_ID, isFormConfigured, submitToFormspree } from '../../lib/formspree.js'
import { Button } from '../common/Button.jsx'
import FormStatus from './FormStatus.jsx'
import {
  CheckboxField,
  SelectField,
  TextAreaField,
  TextField,
} from './FormControls.jsx'

const EMPTY_VALUES = {
  fullName: '',
  email: '',
  country: '',
  preferredLanguage: '',
  subject: '',
  message: '',
  consent: false,
  company: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function ContactForm() {
  const { t, tList } = useTranslation()
  const locale = useCurrentLocale()
  const path = usePathBuilder()

  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitting, setSubmitting] = useState(false)

  const subjectOptions = useMemo(
    () => tList('forms.options.subjects').map((value) => ({ value, label: value })),
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
    if (!values.subject) next.subject = t('forms.validation.required')
    if (!values.message.trim()) next.message = t('forms.validation.required')
    if (!values.consent) next.consent = t('forms.validation.consentRequired')

    return next
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (submitting) return

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
      Subject: values.subject,
      Message: values.message.trim(),
      'Submitted Language': locale,
      _subject: `Contact — ${values.subject}`,
      _gotcha: values.company,
    }

    const result = await submitToFormspree({ formId: CONTACT_FORM_ID, data: payload })

    setSubmitting(false)

    if (result.status === 'success') {
      setStatus('success')
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
        <div className="mt-6">
          <Button variant="secondary" onClick={() => setStatus('idle')}>
            {t('common.clear')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-card border border-kbs-line bg-white p-6 sm:p-8">
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

        <SelectField
          name="subject"
          label={t('forms.fields.subject')}
          value={values.subject}
          onChange={(value) => update('subject', value)}
          options={subjectOptions}
          placeholder={t('common.optional')}
          required
          error={errors.subject}
        />

        <TextAreaField
          name="message"
          label={t('forms.fields.message')}
          value={values.message}
          onChange={(value) => update('message', value)}
          required
          placeholder={t('forms.placeholders.message')}
          error={errors.message}
        />

        {/* Honeypot — hidden from people, tempting for bots. */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
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
          status={status}
          contactPath={path('/contact')}
        />

        <div className="flex flex-wrap items-center gap-4 border-t border-kbs-line pt-6">
          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? t('forms.states.submitting') : t('forms.submitContact')}
          </Button>

          {!isFormConfigured(CONTACT_FORM_ID) ? (
            <p className="text-xs text-kbs-slate">{t('forms.states.notConfiguredBody')}</p>
          ) : null}
        </div>

        <p className="text-xs leading-5 text-kbs-slate">{t('contact.responseNote')}</p>
      </div>
    </form>
  )
}
