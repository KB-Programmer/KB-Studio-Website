import { usePageMeta } from '../../lib/seo.js'

/**
 * Thin wrapper around `usePageMeta` so pages can simply render
 * `<Seo title="..." description="..." />`.
 */
export default function Seo({ title, description, canonicalPath, image, type = 'website' }) {
  usePageMeta({ title, description, canonicalPath, image, type })
  return null
}
