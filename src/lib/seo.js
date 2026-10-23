/**
 * Small helpers for managing page metadata (title, description, canonical
 * URL, Open Graph tags) without pulling in a head-management dependency.
 */

import { useEffect } from 'react'

import { site } from '../content/site.js'

const OG_PROPERTY_PREFIX = 'og:'

function upsertMeta(selectorAttributes, content) {
  if (typeof document === 'undefined') return
  let element = document.head.querySelector(selectorAttributes)
  if (!element) {
    element = document.createElement('meta')
    for (const [key, value] of Object.entries(getAttributes(selectorAttributes))) {
      element.setAttribute(key, value)
    }
    document.head.appendChild(element)
  }
  element.setAttribute('content', content ?? '')
}

function getAttributes(selector) {
  const attributes = {}
  const pattern = /\[([a-zA-Z:_-]+)=["']([^"']*)["']\]/g
  let match = pattern.exec(selector)
  while (match) {
    attributes[match[1]] = match[2]
    match = pattern.exec(selector)
  }
  return attributes
}

function upsertLink(rel, href) {
  if (typeof document === 'undefined') return
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href ?? '')
}

export function buildCanonicalUrl(path = '/', baseUrl = site.url) {
  if (!baseUrl) return ''
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const suffix = cleanPath === '/' ? '' : cleanPath.replace(/\/$/, '')
  return `${baseUrl}${suffix}`
}

/**
 * Applies page-level metadata to the document head.
 */
export function usePageMeta({ title, description, canonicalPath, image, type = 'website' } = {}) {
  useEffect(() => {
    const finalTitle = title ? `${title}` : site.seo.defaultTitle
    const finalDescription = description || site.seo.defaultDescription

    if (typeof document !== 'undefined') {
      document.title = finalTitle
    }

    upsertMeta('meta[name="description"]', finalDescription)
    upsertMeta(`meta[property="${OG_PROPERTY_PREFIX}title"]`, finalTitle)
    upsertMeta(`meta[property="${OG_PROPERTY_PREFIX}description"]`, finalDescription)
    upsertMeta(`meta[property="${OG_PROPERTY_PREFIX}type"]`, type)
    upsertMeta('meta[name="twitter:title"]', finalTitle)
    upsertMeta('meta[name="twitter:description"]', finalDescription)
    upsertMeta('meta[name="twitter:card"]', 'summary_large_image')

    if (image) {
      upsertMeta(`meta[property="${OG_PROPERTY_PREFIX}image"]`, image)
      upsertMeta('meta[name="twitter:image"]', image)
    }

    const canonical = buildCanonicalUrl(canonicalPath ?? '/')
    if (canonical) {
      upsertLink('canonical', canonical)
      upsertMeta(`meta[property="${OG_PROPERTY_PREFIX}url"]`, canonical)
    }
  }, [title, description, canonicalPath, image, type])
}

export default usePageMeta
