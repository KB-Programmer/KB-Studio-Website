/**
 * Centralised social media configuration.
 *
 * Only links with a real, verified destination are rendered anywhere on the
 * site (header, footer, contact page, home page, portfolio share buttons).
 * Every entry below is intentionally empty until the owner confirms the
 * genuine profile URLs — the site never invents usernames or link handles.
 */

export const socialPlatforms = {
  linkedin: {
    label: 'LinkedIn',
    baseUrl: 'https://www.linkedin.com/company/',
    brandClass: 'hover:bg-[#0A66C2]',
  },
  facebook: {
    label: 'Facebook',
    baseUrl: 'https://www.facebook.com/',
    brandClass: 'hover:bg-[#1877F2]',
  },
  instagram: {
    label: 'Instagram',
    baseUrl: 'https://www.instagram.com/',
    brandClass: 'hover:bg-[#E1306C]',
  },
  tiktok: {
    label: 'TikTok',
    baseUrl: 'https://www.tiktok.com/@',
    brandClass: 'hover:bg-[#111111]',
  },
  youtube: {
    label: 'YouTube',
    baseUrl: 'https://www.youtube.com/',
    brandClass: 'hover:bg-[#FF0000]',
  },
  whatsapp: {
    label: 'WhatsApp Business',
    baseUrl: 'https://wa.me/',
    brandClass: 'hover:bg-[#25D366]',
  },
  telegram: {
    label: 'Telegram',
    baseUrl: 'https://t.me/',
    brandClass: 'hover:bg-[#26A5E4]',
  },
  github: {
    label: 'GitHub',
    baseUrl: 'https://github.com/',
    brandClass: 'hover:bg-[#171515]',
  },
}

/**
 * Configured destinations. A link is displayed ONLY when `url` is a
 * non-empty string that starts with https:// (or mailto:).
 */
export const socialLinks = {
  linkedin: { url: '', handle: '' },
  facebook: { url: '', handle: '' },
  instagram: { url: 'https://www.instagram.com/kingbusiness_studio', handle: 'kingbusiness_studio' },
  tiktok: { url: '', handle: '' },
  youtube: { url: '', handle: '' },
  whatsapp: { url: 'https://t.me/250794038238', handle: 'King Business' },
  telegram: { url: '', handle: '' },
  github: { url: 'https://github.com/KB-Programmer', handle: 'King Business' },
  email: { url: 'mailto:kingbonheur02@gmail.com', handle: 'King Business' },
}

/**
 * Returns the list of social links that are safe to display.
 * @returns {Array<{ key: string, label: string, url: string, platform: object }>}
 */
export function getActiveSocialLinks() {
  return Object.entries(socialLinks)
    .filter(([, config]) => isValidSocialUrl(config?.url))
    .map(([key, config]) => ({
      key,
      label: key === 'email' ? 'Email' : socialPlatforms[key]?.label ?? key,
      url: config.url.trim(),
      platform: socialPlatforms[key] ?? null,
    }))
}

export function isValidSocialUrl(url) {
  if (typeof url !== 'string') return false
  const value = url.trim()
  if (!value) return false
  if (value.startsWith('mailto:')) return value.length > 'mailto:'.length
  return /^https:\/\/[^\s]+$/i.test(value)
}

export default socialLinks
