import { describe, expect, it } from 'vitest'

import {
  AMBIGUITY_RATIO,
  MIN_INTENT_SCORE,
  answerIntent,
  getAllIntents,
  getQuickActions,
  normalizeText,
  rankIntents,
  respondTo,
} from '../src/lib/supportEngine.js'
import { site } from '../src/content/site.js'

describe('normalizeText', () => {
  it('lowercases and strips punctuation', () => {
    expect(normalizeText('What are your PRICING options?')).toEqual([
      'what',
      'are',
      'your',
      'pricing',
      'option',
    ])
  })

  it('removes accents so French questions still match', () => {
    expect(normalizeText('créer une identité visuelle')).toContain('creer')
  })

  it('returns an empty list for empty input', () => {
    expect(normalizeText('')).toEqual([])
    expect(normalizeText(null)).toEqual([])
  })
})

describe('respondTo', () => {
  it('answers a pricing question with the approved pricing answer', () => {
    const response = respondTo('How much does a logo cost?', 'en')
    expect(response.type).toBe('answer')
    expect(response.answer.toLowerCase()).toContain('quotation')
    expect(response.links.length).toBeGreaterThan(0)
  })

  it('answers in the requested language', () => {
    const response = respondTo('Combien coûte un logo ?', 'fr')
    expect(response.type).toBe('answer')
    expect(response.answer.length).toBeGreaterThan(0)
    expect(response.answer).not.toBe(respondTo('Combien coûte un logo ?', 'en').answer)
  })

  it('uses the safe fallback for an unrelated question', () => {
    const response = respondTo('qwertyuiop asdfghjkl', 'en')
    expect(response.type).toBe('fallback')
    expect(response.answer.length).toBeGreaterThan(0)
  })

  it('uses the safe fallback for an empty message', () => {
    expect(respondTo('   ', 'en').type).toBe('fallback')
  })

  it('never returns an empty answer', () => {
    const questions = [
      'hello',
      'what services do you offer?',
      'do you offer website maintenance?',
      'can you help with a CV?',
      'what languages do you work in?',
      'how do I request a service?',
    ]

    questions.forEach((question) => {
      const response = respondTo(question, 'en')
      expect(typeof response.answer).toBe('string')
      expect(response.answer.trim().length).toBeGreaterThan(0)
    })
  })

  it('does not leak an internal prompt or claim to be a real person', () => {
    const response = respondTo('hello', 'en')
    expect(response.answer.toLowerCase()).not.toContain('system prompt')
    expect(response.answer.toLowerCase()).not.toContain('you are an ai')
  })
})

describe('rankIntents', () => {
  it('ranks the strongest intent first', () => {
    const ranked = rankIntents('I need a company profile document', 'en')
    expect(ranked.length).toBeGreaterThan(0)
    expect(ranked[0].score).toBeGreaterThanOrEqual(MIN_INTENT_SCORE)
    expect(ranked[0].score).toBeGreaterThanOrEqual(ranked[1]?.score ?? 0)
  })

  it('returns nothing for a message with no matching words', () => {
    expect(rankIntents('zzzqqqxxx', 'en')).toEqual([])
  })
})

describe('answerIntent', () => {
  it('returns the answer for a known intent', () => {
    const response = answerIntent('pricing', 'en')
    expect(response.type).toBe('answer')
    expect(response.intentId).toBe('pricing')
  })

  it('falls back safely for an unknown intent', () => {
    const response = answerIntent('does-not-exist', 'en')
    expect(response.type).toBe('fallback')
    expect(response.answer.length).toBeGreaterThan(0)
  })
})

describe('knowledge base integrity', () => {
  const intents = getAllIntents()

  it('has unique intent ids', () => {
    const ids = intents.map((intent) => intent.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('gives every intent an answer in every supported language', () => {
    site.languages.forEach((locale) => {
      intents.forEach((intent) => {
        const answer = intent.answer?.[locale]
        expect(typeof answer, `${intent.id} / ${locale}`).toBe('string')
        expect(answer.trim().length, `${intent.id} / ${locale}`).toBeGreaterThan(0)
      })
    })
  })

  it('never promises prices, deadlines or guarantees', () => {
    const forbidden = [/\bguarantee/i, /\bfree of charge/i, /\bwithin \d+ (hours|days)/i]

    intents.forEach((intent) => {
      site.languages.forEach((locale) => {
        const answer = intent.answer?.[locale] ?? ''
        forbidden.forEach((pattern) => {
          expect(pattern.test(answer), `${intent.id} / ${locale}`).toBe(false)
        })
      })
    })
  })
})

describe('quick actions', () => {
  it('points at real pages or known intents', () => {
    const intentIds = new Set(getAllIntents().map((intent) => intent.id))

    getQuickActions().forEach((action) => {
      expect(action.action).toBeDefined()
      if (action.action.type === 'navigate') {
        expect(action.action.to.startsWith('/')).toBe(true)
      }
      if (action.action.type === 'ask') {
        expect(intentIds.has(action.action.intentId)).toBe(true)
      }
    })
  })
})

describe('thresholds', () => {
  it('keeps the documented matching thresholds', () => {
    expect(MIN_INTENT_SCORE).toBeGreaterThan(0)
    expect(AMBIGUITY_RATIO).toBeGreaterThan(0)
    expect(AMBIGUITY_RATIO).toBeLessThan(1)
  })
})
