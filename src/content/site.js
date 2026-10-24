/**
 * Centralised public site settings for King Business Studio.
 *
 * Everything the owner is likely to change (brand name, tagline, contact
 * details, legal entity details, SEO defaults, navigation) lives here so a
 * single business detail never needs to be edited in several components.
 *
 * IMPORTANT HONESTY RULE:
 * Any value that has not been confirmed by the business owner is left as an
 * empty string / null. The UI hides those entries instead of showing fake
 * contact information.
 */

const envUrl = (import.meta.env.VITE_SITE_URL ?? '').trim().replace(/\/$/, '')

export const site = {
  name: 'King Business Studio',
  abbreviation: 'KBS',
  legalName: 'King Business Studio',
  tagline: 'Professional Work. Powerful Impressions.',
  description:
    'King Business Studio helps businesses and individuals with professional business documents, memorable graphic design, and modern websites.',
  shortDescription:
    'From professional documents to memorable designs and modern websites, we help turn your ideas into practical business solutions.',
  country: 'Rwanda',
  founded: null,
  languages: ['en', 'rw', 'fr'],

  /**
   * Public site URL. Empty until the production domain is confirmed.
   * Used for canonical URLs, Open Graph tags and the sitemap.
   */
  url: envUrl,

  /** Default + supported locales. */
  defaultLocale: 'en',
  localeLabels: {
    en: { label: 'English', short: 'EN', flag: '🇬🇧' },
    rw: { label: 'Ikinyarwanda', short: 'RW', flag: '🇷🇼' },
    fr: { label: 'Français', short: 'FR', flag: '🇫🇷' },
  },

  /**
   * Verified contact details. EMPTY STRINGS ARE INTENTIONAL — the business
   * owner has not confirmed these yet, so they are not displayed anywhere.
   */
  contact: {
    email: 'kingbonheur02@gmail.com',
    phone: '+250794038238',
    whatsapp: 'https://t.me/250794038238',
    address: 'Remote, Kigali - Rwanda & Internation',
    hours: '24/7',
  },

  /** Legal details that must be completed before launch. */
  legal: {
    jurisdiction: '',
    registrationNumber: '',
    dataController: 'King Business Studio',
    /**
     * The date the privacy policy / terms text was last edited. Update this
     * whenever the wording changes so the published date stays truthful.
     */
    policyLastUpdated: '2026-10-22',
  },

  /** SEO defaults. */
  seo: {
    defaultTitle:
      'King Business Studio — Business Documents, Graphic Design & Web Development',
    defaultDescription:
      'King Business Studio (KBS) delivers professional business documents, memorable graphic design, and modern, responsive websites for businesses and individuals in Rwanda and internationally.',
    twitterHandle: '',
    ogImage: '/images/brand/og-image.svg',
  },
}

/** Primary navigation used by the header and the footer. */
export const mainNavigation = [
  { key: 'home', to: '/' },
  { key: 'services', to: '/services' },
  { key: 'portfolio', to: '/portfolio' },
  { key: 'about', to: '/about' },
  { key: 'support', to: '/support' },
  { key: 'contact', to: '/contact' },
]

export default site
