import { describe, expect, it } from 'vitest'

import en from '../src/content/translations/en.json'
import rw from '../src/content/translations/rw.json'
import fr from '../src/content/translations/fr.json'
import { site } from '../src/content/site.js'

function flattenKeys(value, prefix = '') {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return [prefix]

  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return flattenKeys(child, path)
  })
}

function collectEmptyStrings(value, prefix = '', output = []) {
  if (typeof value === 'string') {
    if (value.trim().length === 0) output.push(prefix)
    return output
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectEmptyStrings(item, `${prefix}[${index}]`, output))
    return output
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, child]) =>
      collectEmptyStrings(child, prefix ? `${prefix}.${key}` : key, output),
    )
  }

  return output
}

const dictionaries = { en, rw, fr }

describe('translation files', () => {
  const referenceKeys = flattenKeys(en).sort()

  it('has the same keys in every language', () => {
    site.languages.forEach((locale) => {
      const keys = flattenKeys(dictionaries[locale]).sort()
      expect(keys, `missing keys in ${locale}`).toEqual(referenceKeys)
    })
  })

  it('has no empty strings', () => {
    site.languages.forEach((locale) => {
      const empty = collectEmptyStrings(dictionaries[locale])
      expect(empty, `empty strings in ${locale}`).toEqual([])
    })
  })

  it('has no CJK characters (encoding sanity check)', () => {
    site.languages.forEach((locale) => {
      const serialised = JSON.stringify(dictionaries[locale])
      expect(serialised, `unexpected CJK characters in ${locale}`).not.toMatch(
        /[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/,
      )
    })
  })

  it('translates the main navigation in every language', () => {
    site.languages.forEach((locale) => {
      expect(dictionaries[locale].nav.home.length).toBeGreaterThan(0)
      expect(dictionaries[locale].nav.services.length).toBeGreaterThan(0)
      expect(dictionaries[locale].nav.contact.length).toBeGreaterThan(0)
      expect(dictionaries[locale].nav.requestService.length).toBeGreaterThan(0)
    })
  })
})
