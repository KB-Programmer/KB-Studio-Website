/**
 * KBS Customer Support Assistant — deterministic matching engine.
 *
 * This module is deliberately free of any network access. It matches the
 * visitor's message against the curated knowledge base in
 * `src/content/supportKnowledgeBase.js` and returns the best approved answer.
 *
 * HOW MATCHING WORKS
 * ------------------
 * 1. `normalizeText` lowercases, removes diacritics, strips punctuation and
 *    applies a very small amount of light stemming ("services" -> "service",
 *    "does" -> "do") so that spelling variations still match.
 * 2. The text is tokenised into words.
 * 3. Every intent has "concept groups" (`requires`). At least one group must
 *    match for the intent to be considered at all. This is what prevents a
 *    generic word appearing in an unrelated question from triggering an
 *    answer.
 * 4. Within an eligible intent, aliases are scored. Multi-word aliases score
 *    higher because they are more specific. Single-token aliases may also
 *    match with a small edit distance, which covers common typos.
 * 5. Only the three strongest alias matches are summed, so a long message
 *    cannot inflate every intent at once.
 * 6. The strongest intent wins, unless a second intent scores within
 *    `AMBIGUITY_RATIO` of it — in that case the assistant asks a clarifying
 *    question instead of guessing.
 * 7. If the strongest score is below `MIN_INTENT_SCORE`, the assistant uses
 *    the safe fallback.
 *
 * The engine can be replaced or extended later (for example by adding a
 * hosted AI provider) without touching the chat interface: the interface only
 * consumes the response object returned by `respondTo`.
 */

import {
  supportIntents,
  supportWelcome,
  supportQuickActions,
  supportDisclosure,
  supportPrivacyNotice,
  supportFallback,
  supportClarification,
  supportError,
} from '../content/supportKnowledgeBase.js'
import { site } from '../content/site.js'

/** Minimum score an intent must reach to be considered a confident match. */
export const MIN_INTENT_SCORE = 1.6

/** A second intent within this ratio of the best one triggers a clarification. */
export const AMBIGUITY_RATIO = 0.72

/** Maximum number of alias hits summed per intent. */
const MAX_ALIAS_HITS = 3

/** Minimum token length before fuzzy (edit-distance) matching is allowed. */
const FUZZY_MIN_LENGTH = 5
const FUZZY_MAX_DISTANCE = 1
const FUZZY_MAX_DISTANCE_LONG = 2
const FUZZY_LONG_LENGTH = 8

const DIACRITICS = /[\u0300-\u036f]/g

/**
 * Very small stop-list of function words that never carry intent on their
 * own. They are removed from aliases but NOT from the message, so that
 * multi-word phrases still line up.
 */
const LEMMA_MAP = {
  does: 'do',
  did: 'do',
  is: 'be',
  are: 'be',
  am: 'be',
  was: 'be',
  were: 'be',
  has: 'have',
  had: 'have',
  what: 'what',
  whats: 'what',
  how: 'how',
}

/**
 * Normalises a single word: lowercases, removes accents and applies the tiny
 * lemma map + light plural stripping.
 */
export function normalizeToken(raw) {
  let token = String(raw ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .replace(/[^a-z0-9]/g, '')

  if (!token) return ''

  if (LEMMA_MAP[token]) token = LEMMA_MAP[token]

  if (token.length >= 5 && token.endsWith('s') && !/(ss|us|is|as)$/.test(token)) {
    token = token.slice(0, -1)
  }

  return token
}

/**
 * Normalises a whole message or alias into a token array.
 */
export function normalizeText(text) {
  if (typeof text !== 'string') return []
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(normalizeToken)
    .filter(Boolean)
}

/** Levenshtein distance, bounded early for performance. */
function levenshtein(a, b) {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length

  let previous = Array.from({ length: b.length + 1 }, (_, i) => i)

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i]
    let rowMin = i
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      const value = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + cost)
      current.push(value)
      if (value < rowMin) rowMin = value
    }
    if (rowMin > 3) return 3
    previous = current
  }

  return previous[b.length]
}

/** True when `needle` appears as a contiguous run inside `haystack`. */
function containsSequence(haystack, needle) {
  if (needle.length === 0 || needle.length > haystack.length) return false
  for (let start = 0; start <= haystack.length - needle.length; start += 1) {
    let matched = true
    for (let offset = 0; offset < needle.length; offset += 1) {
      if (haystack[start + offset] !== needle[offset]) {
        matched = false
        break
      }
    }
    if (matched) return true
  }
  return false
}

/** Single-token fuzzy match used for small typos. */
function fuzzyTokenMatch(aliasToken, tokens) {
  if (aliasToken.length < FUZZY_MIN_LENGTH) return false
  const maxDistance =
    aliasToken.length >= FUZZY_LONG_LENGTH ? FUZZY_MAX_DISTANCE_LONG : FUZZY_MAX_DISTANCE
  return tokens.some((token) => {
    if (token === aliasToken) return true
    if (Math.abs(token.length - aliasToken.length) > maxDistance) return false
    return levenshtein(aliasToken, token) <= maxDistance
  })
}

/**
 * Scores a list of aliases against the tokenised message.
 * Returns the sum of the three strongest hits.
 */
export function scoreAliases(aliases, tokens) {
  if (!Array.isArray(aliases) || aliases.length === 0) return 0

  const hits = []

  for (const alias of aliases) {
    const aliasTokens = normalizeText(alias)
    if (aliasTokens.length === 0) continue

    if (aliasTokens.length === 1) {
      if (tokens.includes(aliasTokens[0])) {
        hits.push(1)
      } else if (fuzzyTokenMatch(aliasTokens[0], tokens)) {
        hits.push(0.6)
      }
      continue
    }

    if (containsSequence(tokens, aliasTokens)) {
      hits.push(1 + (aliasTokens.length - 1) * 0.9)
    }
  }

  hits.sort((a, b) => b - a)
  return hits.slice(0, MAX_ALIAS_HITS).reduce((sum, value) => sum + value, 0)
}

/**
 * Checks whether at least one concept group of an intent matches.
 * A group is a list of interchangeable terms; one match satisfies the group.
 */
function matchesRequires(requires, tokens) {
  if (!Array.isArray(requires) || requires.length === 0) return true
  return requires.some((group) => {
    if (!Array.isArray(group) || group.length === 0) return false
    return group.some((term) => {
      const termTokens = normalizeText(term)
      if (termTokens.length === 0) return false
      if (termTokens.length === 1) {
        return tokens.includes(termTokens[0]) || fuzzyTokenMatch(termTokens[0], tokens)
      }
      return containsSequence(tokens, termTokens)
    })
  })
}

function pick(value, locale) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[locale] ?? value.en ?? Object.values(value)[0] ?? ''
}

function localizeList(value, locale) {
  if (!value) return []
  if (Array.isArray(value)) return value
  const list = value[locale] ?? value.en ?? []
  return Array.isArray(list) ? list : []
}

export function getIntentById(id) {
  return supportIntents.find((intent) => intent.id === id) ?? null
}

export function getAllIntents() {
  return supportIntents
}

/**
 * Builds a response object for a known intent (and optional variant).
 */
export function buildIntentResponse(intent, variant, locale) {
  const source = variant ?? intent
  const links = (intent.links ?? []).map((link) => ({
    to: link.to,
    label: pick(link.label, locale),
  }))

  return {
    type: 'answer',
    intentId: intent.id,
    variantId: variant?.id ?? null,
    answer: pick(source.answer ?? intent.answer, locale),
    followUps: localizeList(source.followUps ?? intent.followUps, locale),
    links,
    quickActions: supportQuickActions,
  }
}

/**
 * Answers using a specific intent id — used by the quick action buttons and
 * by the guided request flow.
 */
export function answerIntent(intentId, locale = site.defaultLocale) {
  const intent = getIntentById(intentId)
  if (!intent) {
    return {
      type: 'fallback',
      intentId: null,
      answer: pick(supportFallback, locale),
      followUps: [],
      links: [
        { to: '/services', label: pick({ en: 'Explore our services', rw: 'Reba serivisi zacu', fr: 'Découvrir nos services' }, locale) },
        { to: '/faq', label: pick({ en: 'Read the FAQ', rw: 'Soma ibibazo bishingiye', fr: 'Lire la FAQ' }, locale) },
        { to: '/request-service', label: pick({ en: 'Request a service', rw: 'Saba serivisi', fr: 'Demander un service' }, locale) },
        { to: '/contact', label: pick({ en: 'Contact KBS', rw: 'Vugana na KBS', fr: 'Contacter KBS' }, locale) },
      ],
      quickActions: supportQuickActions,
    }
  }

  return buildIntentResponse(intent, intent.variants?.[0] ?? null, locale)
}

/**
 * Scores every eligible intent (and its variants) against a message.
 * @returns {Array<{ intent, variant, score }>} sorted by score descending
 */
export function rankIntents(message, locale = site.defaultLocale) {
  const tokens = normalizeText(message)
  if (tokens.length === 0) return []

  const ranked = []

  for (const intent of supportIntents) {
    if (!matchesRequires(intent.requires, tokens)) continue

    const aliases = intent.aliases?.[locale] ?? intent.aliases?.en ?? []
    const intentScore = scoreAliases(aliases, tokens)

    if (intentScore > 0) {
      ranked.push({ intent, variant: null, score: intentScore })
    }

    for (const variant of intent.variants ?? []) {
      const variantAliases = variant.aliases?.[locale] ?? variant.aliases?.en ?? []
      const variantScore = scoreAliases(variantAliases, tokens)

      if (variantScore > 0) {
        ranked.push({ intent, variant, score: variantScore })
      }
    }
  }

  // Keep the strongest entry per (intent, variant) pair.
  const deduped = new Map()
  for (const entry of ranked) {
    const key = `${entry.intent.id}:${entry.variant?.id ?? 'base'}`
    const existing = deduped.get(key)
    if (!existing || entry.score > existing.score) deduped.set(key, entry)
  }

  return [...deduped.values()].sort((a, b) => b.score - a.score)
}

/**
 * Produces the assistant's reply for a visitor message.
 *
 * @param {string} message raw visitor text
 * @param {string} locale  'en' | 'rw' | 'fr'
 * @returns {object} response object consumed by the chat interface
 */
export function respondTo(message, locale = site.defaultLocale) {
  const text = typeof message === 'string' ? message.trim() : ''

  if (!text) {
    return {
      type: 'fallback',
      intentId: null,
      answer: pick(supportFallback, locale),
      followUps: [],
      links: fallbackLinks(locale),
      quickActions: supportQuickActions,
    }
  }

  const ranked = rankIntents(text, locale)

  if (ranked.length === 0) {
    return {
      type: 'fallback',
      intentId: null,
      answer: pick(supportFallback, locale),
      followUps: [],
      links: fallbackLinks(locale),
      quickActions: supportQuickActions,
    }
  }

  const best = ranked[0]
  const second = ranked[1]

  if (best.score < MIN_INTENT_SCORE) {
    return {
      type: 'fallback',
      intentId: null,
      answer: pick(supportFallback, locale),
      followUps: [],
      links: fallbackLinks(locale),
      quickActions: supportQuickActions,
    }
  }

  if (second && second.score >= best.score * AMBIGUITY_RATIO) {
    const candidates = ranked
      .filter((entry) => entry.score >= best.score * AMBIGUITY_RATIO)
      .slice(0, 3)

    return {
      type: 'clarify',
      intentId: null,
      answer: pick(supportClarification, locale),
      options: candidates.map((entry) => ({
        intentId: entry.intent.id,
        variantId: entry.variant?.id ?? null,
        label: clarifyLabel(entry, locale),
      })),
      followUps: [],
      links: fallbackLinks(locale),
      quickActions: supportQuickActions,
    }
  }

  return buildIntentResponse(best.intent, best.variant, locale)
}

function clarifyLabel(entry, locale) {
  if (entry.variant?.label) return pick(entry.variant.label, locale)
  if (entry.intent.label) return pick(entry.intent.label, locale)

  const labels = {
    services_overview: { en: 'Which service are you asking about?', rw: 'Ni ubuhe serivisi wibaza?', fr: 'De quel service s’agit-il ?' },
    business_documents: { en: 'Business documents', rw: 'Amanduku y’ubucuruzi', fr: 'Documents professionnels' },
    graphic_design: { en: 'Graphic design', rw: 'Ugaragaza ibinyabiziga', fr: 'Design graphique' },
    web_development: { en: 'Web development', rw: 'Gushyira website', fr: 'Développement web' },
    pricing: { en: 'Pricing and quotes', rw: 'Igiciro n’imyaka', fr: 'Tarifs et devis' },
    timeline: { en: 'Project timelines', rw: 'Igihe cy’umushinga', fr: 'Délais' },
    request_howto: { en: 'Requesting a service', rw: 'Gusaba serivisi', fr: 'Demande de service' },
    revisions: { en: 'Revision policy', rw: 'Policy y’abuso', fr: 'Politique de révisions' },
    languages: { en: 'Languages supported', rw: 'Indimi zemewe', fr: 'Langues prises en charge' },
    portfolio: { en: 'Portfolio and projects', rw: 'Portfolio n’imishinga', fr: 'Portfolio et projets' },
    contact_info: { en: 'Contact details', rw: 'Imbaraga', fr: 'Coordonnées' },
    payment: { en: 'Payment arrangements', rw: 'Amayengo y’ishyura', fr: 'Modalités de paiement' },
    process: { en: 'How KBS works', rw: 'Uko KBS ikora', fr: 'Méthode de travail' },
    privacy: { en: 'Privacy and data', rw: 'Ubwibone n’amakuru', fr: 'Confidentialité' },
    faq_help: { en: 'Frequently asked questions', rw: 'Ibibazo bishingiye', fr: 'Questions fréquentes' },
    about_kbs: { en: 'About KBS', rw: 'KBS byiza', fr: 'À propos de KBS' },
    agent_capabilities: { en: 'What this assistant is', rw: 'Iki uyu mutesha ari', fr: 'Ce que fait cet assistant' },
    greeting: { en: 'Getting started', rw: 'Gutangira', fr: 'Pour commencer' },
    thanks: { en: 'Closing the conversation', rw: 'Gusoza ikiganiro', fr: 'Clôturer la conversation' },
    request_prepare: { en: 'Preparing a service request', rw: 'Gutegura ubusabe', fr: 'Préparer une demande' },
  }

  return labels[entry.intent.id]?.[locale] ?? labels[entry.intent.id]?.en ?? entry.intent.id
}

export function fallbackLinks(locale = site.defaultLocale) {
  return [
    { to: '/services', label: pick({ en: 'Explore our services', rw: 'Reba serivisi zacu', fr: 'Découvrir nos services' }, locale) },
    { to: '/faq', label: pick({ en: 'Read the FAQ', rw: 'Soma ibibazo bishingiye', fr: 'Lire la FAQ' }, locale) },
    { to: '/request-service', label: pick({ en: 'Request a service', rw: 'Saba serivisi', fr: 'Demander un service' }, locale) },
    { to: '/contact', label: pick({ en: 'Contact KBS', rw: 'Vugana na KBS', fr: 'Contacter KBS' }, locale) },
  ]
}

/* --------------------------------------------------------------------- */
/* Public helpers used by the chat interface                             */
/* --------------------------------------------------------------------- */

export function getWelcomeMessage(locale = site.defaultLocale) {
  return pick(supportWelcome, locale)
}

export function getDisclosure(locale = site.defaultLocale) {
  return pick(supportDisclosure, locale)
}

export function getPrivacyNotice(locale = site.defaultLocale) {
  return pick(supportPrivacyNotice, locale)
}

export function getFallbackMessage(locale = site.defaultLocale) {
  return pick(supportFallback, locale)
}

export function getErrorMessage(locale = site.defaultLocale) {
  return pick(supportError, locale)
}

export function getQuickActions() {
  return supportQuickActions
}

export default {
  respondTo,
  rankIntents,
  answerIntent,
  getIntentById,
  getAllIntents,
  getWelcomeMessage,
  getDisclosure,
  getPrivacyNotice,
  getFallbackMessage,
  getErrorMessage,
  getQuickActions,
  MIN_INTENT_SCORE,
  AMBIGUITY_RATIO,
}
