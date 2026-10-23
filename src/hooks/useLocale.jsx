import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'

import en from '../content/translations/en.json'
import rw from '../content/translations/rw.json'
import fr from '../content/translations/fr.json'
import { site } from '../content/site.js'

export const dictionaries = { en, rw, fr }

const STORAGE_KEY = 'kbs.locale'

export const DEFAULT_LOCALE = site.defaultLocale

export function isSupportedLocale(code) {
  return typeof code === 'string' && Object.prototype.hasOwnProperty.call(dictionaries, code)
}

/**
 * Reads the locale out of a URL path.
 *
 * `/fr/services` -> 'fr'
 * `/services`    -> null (no locale prefix)
 */
export function getLocaleFromPath(pathname) {
  if (typeof pathname !== 'string') return null
  const [, first] = pathname.split('/')
  return isSupportedLocale(first) ? first : null
}

/**
 * Removes the locale prefix from a URL path.
 *
 * `/fr/services` -> '/services'
 * `/services`    -> '/services'
 */
export function stripLocaleFromPath(pathname) {
  if (typeof pathname !== 'string' || pathname === '') return '/'
  if (!getLocaleFromPath(pathname)) return pathname

  const segments = pathname.split('/').filter(Boolean)
  const rest = segments.slice(1).join('/')
  return rest ? `/${rest}` : '/'
}

function readStoredLocale() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isSupportedLocale(stored)) return stored
  } catch {
    /* Storage can be unavailable in private mode — fall back silently. */
  }
  return DEFAULT_LOCALE
}

const PreferredLocaleContext = createContext(null)
const ScopeLocaleContext = createContext(null)

/**
 * Resolves the active language.
 *
 * A locale in the URL always wins (so `/fr/services` renders in French
 * immediately, without waiting for an effect). When the URL has no locale
 * prefix the visitor's stored preference is used.
 */
export function LocaleProvider({ children }) {
  const location = useLocation()
  const urlLocale = getLocaleFromPath(location.pathname)
  const [preferredLocale, setPreferredLocaleState] = useState(readStoredLocale)

  const setPreferredLocale = useCallback((next) => {
    if (!isSupportedLocale(next)) return
    setPreferredLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  // Keep the stored preference in step with the language shown in the URL.
  useEffect(() => {
    if (urlLocale && urlLocale !== preferredLocale) {
      setPreferredLocaleState(urlLocale)
      try {
        window.localStorage.setItem(STORAGE_KEY, urlLocale)
      } catch {
        /* ignore */
      }
    }
  }, [urlLocale, preferredLocale])

  const activeLocale = urlLocale ?? preferredLocale

  const preferred = useMemo(
    () => ({ locale: activeLocale, setLocale: setPreferredLocale }),
    [activeLocale, setPreferredLocale],
  )

  const scope = useMemo(() => ({ locale: activeLocale }), [activeLocale])

  return (
    <PreferredLocaleContext.Provider value={preferred}>
      <ScopeLocaleContext.Provider value={scope}>{children}</ScopeLocaleContext.Provider>
    </PreferredLocaleContext.Provider>
  )
}

/**
 * Overrides the resolved locale for a subtree. The router uses this so that a
 * locale-prefixed URL renders in that language synchronously.
 */
export function LocaleScope({ locale, children }) {
  const value = useMemo(() => ({ locale }), [locale])
  return <ScopeLocaleContext.Provider value={value}>{children}</ScopeLocaleContext.Provider>
}

function resolvePath(dictionary, path) {
  if (!dictionary || typeof path !== 'string' || !path) return undefined
  const segments = path.split('.')
  let current = dictionary
  for (const segment of segments) {
    if (current === null || typeof current !== 'object' || !(segment in current)) return undefined
    current = current[segment]
  }
  return current
}

/** The locale currently rendered. */
export function useCurrentLocale() {
  const scope = useContext(ScopeLocaleContext)
  const preferred = useContext(PreferredLocaleContext)
  return scope?.locale ?? preferred?.locale ?? DEFAULT_LOCALE
}

/**
 * Translation helper: `t('nav.home')`.
 * Falls back to the default locale and then to the key itself.
 */
export function useTranslation() {
  const locale = useCurrentLocale()
  const dictionary = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]

  const t = useCallback(
    (path, fallback) => {
      const value = resolvePath(dictionary, path)
      if (typeof value === 'string') return value
      const fallbackValue = resolvePath(dictionaries[DEFAULT_LOCALE], path)
      if (typeof fallbackValue === 'string') return fallbackValue
      return fallback ?? path
    },
    [dictionary],
  )

  const tList = useCallback(
    (path) => {
      const value = resolvePath(dictionary, path)
      if (Array.isArray(value)) return value
      const fallbackValue = resolvePath(dictionaries[DEFAULT_LOCALE], path)
      return Array.isArray(fallbackValue) ? fallbackValue : []
    },
    [dictionary],
  )

  const tObject = useCallback(
    (path) => {
      const value = resolvePath(dictionary, path)
      if (value && typeof value === 'object' && !Array.isArray(value)) return value
      const fallbackValue = resolvePath(dictionaries[DEFAULT_LOCALE], path)
      return fallbackValue && typeof fallbackValue === 'object' ? fallbackValue : {}
    },
    [dictionary],
  )

  return { t, tList, tObject, locale }
}

/** Locale + setter (the user's chosen preference). */
export function useLocalePreference() {
  const preferred = useContext(PreferredLocaleContext)
  if (!preferred) {
    return { locale: DEFAULT_LOCALE, setLocale: () => {}, locales: site.localeLabels }
  }
  return { ...preferred, locales: site.localeLabels }
}

/**
 * Builds an internal link that keeps the active language in the URL.
 *
 * If the visitor is currently on a locale-prefixed URL (for example
 * `/fr/services`) the link keeps that prefix. If they are on a plain URL
 * (`/services`) the link stays plain, so the site never mixes the two
 * styles on the same page.
 */
export function usePathBuilder() {
  const locale = useCurrentLocale()
  const location = useLocation()
  const usesLocalePrefix = getLocaleFromPath(location.pathname) !== null

  return useCallback(
    (path = '/') => {
      if (!path.startsWith('/')) return `/${locale}/${path}`
      if (!usesLocalePrefix) return path
      return `/${locale}${path === '/' ? '' : path}`
    },
    [locale, usesLocalePrefix],
  )
}

export default LocaleProvider
