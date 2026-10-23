/**
 * Small helpers for reading localised fields out of the content files.
 *
 * Every content entity (service, project, FAQ, testimonial...) may expose a
 * `locales` map:
 *
 *   { locales: { en: { name: '...' }, rw: { name: '...' }, fr: { name: '...' } } }
 *
 * `localizedField(entity, locale, 'name')` returns the value for the requested
 * locale and gracefully falls back to English (and then to the raw field) so
 * the site never renders `undefined`.
 */

export const DEFAULT_LOCALE = 'en'

export function localizedField(entity, locale = DEFAULT_LOCALE, field) {
  if (!entity) return ''

  const localized = entity.locales?.[locale]
  if (localized && typeof localized[field] === 'string' && localized[field].length > 0) {
    return localized[field]
  }

  const english = entity.locales?.[DEFAULT_LOCALE]
  if (english && typeof english[field] === 'string' && english[field].length > 0) {
    return english[field]
  }

  if (typeof entity[field] === 'string') return entity[field]

  if (Array.isArray(entity[field])) return entity[field]

  return ''
}

/**
 * Localised list field (arrays of strings).
 */
export function localizedList(entity, locale = DEFAULT_LOCALE, field) {
  const localized = entity.locales?.[locale]?.[field]
  if (Array.isArray(localized) && localized.length > 0) return localized

  const english = entity.locales?.[DEFAULT_LOCALE]?.[field]
  if (Array.isArray(english) && english.length > 0) return english

  return Array.isArray(entity[field]) ? entity[field] : []
}

/**
 * Localised value for an arbitrary key that may be a string or an array.
 */
export function localizedValue(entity, locale = DEFAULT_LOCALE, field) {
  const localized = entity.locales?.[locale]?.[field]
  if (localized !== undefined && localized !== null && localized !== '') return localized

  const english = entity.locales?.[DEFAULT_LOCALE]?.[field]
  if (english !== undefined && english !== null && english !== '') return english

  return entity[field] ?? ''
}
