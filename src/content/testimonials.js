/**
 * Testimonials.
 *
 * HONESTY RULE: nothing is published unless the business owner has supplied a
 * real quote AND confirmed that we are allowed to publish it.
 *
 * `consentConfirmed: true` + `published: true` are both required before a
 * testimonial is rendered anywhere on the site. Until real, approved
 * testimonials exist the array stays empty and the UI shows a neutral
 * project-inquiry call to action instead of invented quotes.
 */

export const testimonials = [
  // Example of the expected shape once a genuine, approved quote exists:
  // {
  //   id: 't-001',
  //   name: 'Client display name',
  //   role: 'Role or organisation',
  //   quote: 'The exact, approved wording from the client.',
  //   service: 'web-development',
  //   date: '2025-04-12',
  //   avatar: '/images/testimonials/client-001.jpg',
  //   source: 'Email confirmation',
  //   rating: null,
  //   consentConfirmed: true,
  //   published: true,
  //   locale: 'en',
  // },
]

/**
 * Returns only genuine, approved testimonials for a given locale.
 * Falls back to `en` entries when no localisation exists yet.
 */
export function getPublishedTestimonials(locale = 'en') {
  const published = testimonials.filter(
    (item) => item && item.consentConfirmed === true && item.published === true,
  )
  const matching = published.filter((item) => item.locale === locale)
  const fallback = published.filter((item) => !item.locale || item.locale === 'en')
  return matching.length > 0 ? matching : fallback
}

export function hasPublishedTestimonials(locale = 'en') {
  return getPublishedTestimonials(locale).length > 0
}

export default testimonials
