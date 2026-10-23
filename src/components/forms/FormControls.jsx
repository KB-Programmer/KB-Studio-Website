import { useId } from 'react'
import clsx from 'clsx'

/**
 * Shared form controls.
 *
 * Every control is labelled, optional descriptions are associated through
 * `aria-describedby`, and validation errors are announced with
 * `role="alert"` so screen-reader users are told what to fix.
 */

const baseControl =
  'w-full rounded-btn border bg-white px-3.5 py-2.5 text-sm text-kbs-ink outline-none transition-colors duration-200 ease-kbs placeholder:text-kbs-slate/70 focus:ring-2 focus:ring-kbs-bright/30 disabled:cursor-not-allowed disabled:bg-kbs-mist disabled:opacity-70'

function controlClass(hasError) {
  return clsx(
    baseControl,
    hasError ? 'border-red-500 focus:border-red-500' : 'border-kbs-line focus:border-kbs-bright',
  )
}

function FieldShell({ id, label, required, hint, error, children, legend }) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div>
      {legend ? (
        <legend className="text-sm font-semibold text-kbs-ink">
          {legend}
          {required ? (
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          ) : null}
        </legend>
      ) : (
        <label htmlFor={id} className="block text-sm font-semibold text-kbs-ink">
          {label}
          {required ? (
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      )}

      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs leading-5 text-kbs-slate">
          {hint}
        </p>
      ) : null}

      <div className="mt-1.5" data-described-by={describedBy || undefined}>
        {children}
      </div>

      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function TextField({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  hint,
  error,
  placeholder,
  autoComplete,
  name,
}) {
  const generatedId = useId()
  const id = name ?? generatedId

  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <input
        id={id}
        name={name ?? id}
        type={type}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={[hint ? `${id}-hint` : null, error ? `${id}-error` : null]
          .filter(Boolean)
          .join(' ') || undefined}
        className={controlClass(Boolean(error))}
      />
    </FieldShell>
  )
}

export function TextAreaField({
  label,
  value,
  onChange,
  required = false,
  hint,
  error,
  placeholder,
  rows = 6,
  name,
}) {
  const generatedId = useId()
  const id = name ?? generatedId

  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={id}
        name={name ?? id}
        rows={rows}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={[hint ? `${id}-hint` : null, error ? `${id}-error` : null]
          .filter(Boolean)
          .join(' ') || undefined}
        className={clsx(controlClass(Boolean(error)), 'resize-y')}
      />
    </FieldShell>
  )
}

export function SelectField({
  label,
  value,
  onChange,
  options = [],
  required = false,
  hint,
  error,
  placeholder,
  name,
}) {
  const generatedId = useId()
  const id = name ?? generatedId

  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <select
        id={id}
        name={name ?? id}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={[hint ? `${id}-hint` : null, error ? `${id}-error` : null]
          .filter(Boolean)
          .join(' ') || undefined}
        className={clsx(controlClass(Boolean(error)), 'appearance-none pr-9')}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value ?? option} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

/**
 * Checkbox group — used for the service categories, where more than one
 * option may be chosen.
 */
export function CheckboxGroupField({
  legend,
  options = [],
  values = [],
  onChange,
  required = false,
  hint,
  error,
  name,
}) {
  const generatedId = useId()
  const id = name ?? generatedId

  function toggle(optionValue) {
    if (values.includes(optionValue)) {
      onChange(values.filter((item) => item !== optionValue))
      return
    }
    onChange([...values, optionValue])
  }

  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined}>
      <FieldShell
        id={id}
        legend={legend}
        required={required}
        hint={hint}
        error={error}
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {options.map((option) => {
            const value = option.value ?? option
            const label = option.label ?? option
            const checked = values.includes(value)
            const optionId = `${id}-${String(value).replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`

            return (
              <label
                key={value}
                htmlFor={optionId}
                className={clsx(
                  'flex cursor-pointer items-start gap-2.5 rounded-btn border px-3.5 py-2.5 text-sm transition-colors duration-200 ease-kbs',
                  checked
                    ? 'border-kbs-royal bg-kbs-pale text-kbs-ink'
                    : 'border-kbs-line bg-white text-kbs-ink hover:border-kbs-bright',
                )}
              >
                <input
                  id={optionId}
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(value)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-kbs-line text-kbs-royal focus:ring-kbs-bright"
                />
                <span>{label}</span>
              </label>
            )
          })}
        </div>
      </FieldShell>
    </fieldset>
  )
}

export function CheckboxField({ label, checked, onChange, required = false, hint, error, name }) {
  const generatedId = useId()
  const id = name ?? generatedId

  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5 text-sm text-kbs-ink">
        <input
          id={id}
          name={name ?? id}
          type="checkbox"
          checked={Boolean(checked)}
          onChange={(event) => onChange(event.target.checked)}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={[hint ? `${id}-hint` : null, error ? `${id}-error` : null]
            .filter(Boolean)
            .join(' ') || undefined}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-kbs-line text-kbs-royal focus:ring-kbs-bright"
        />
        <span className="leading-6">{label}</span>
      </label>

      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs leading-5 text-kbs-slate">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default TextField
