import { describe, expect, it } from 'vitest'

import { faqs } from '../src/content/faq.js'
import { projectStatus, projects } from '../src/content/projects.js'
import { services } from '../src/content/services.js'
import { site } from '../src/content/site.js'
import { getActiveSocialLinks, isValidSocialUrl } from '../src/content/socialLinks.js'
import { getPublishedTestimonials } from '../src/content/testimonials.js'

const LOCALES = site.languages

describe('services', () => {
  it('exposes the three core services', () => {
    expect(services).toHaveLength(3)
    expect(services.map((service) => service.id)).toEqual([
      'business-documents',
      'graphic-design',
      'web-development',
    ])
  })

  it('has unique slugs', () => {
    const slugs = services.map((service) => service.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('translates every customer-facing field', () => {
    const fields = ['name', 'headline', 'summary', 'description']

    services.forEach((service) => {
      LOCALES.forEach((locale) => {
        fields.forEach((field) => {
          const value = service.locales?.[locale]?.[field]
          expect(typeof value, `${service.id}/${locale}/${field}`).toBe('string')
          expect(value.trim().length, `${service.id}/${locale}/${field}`).toBeGreaterThan(0)
        })
      })
    })
  })

  it('never publishes a price', () => {
    services.forEach((service) => {
      LOCALES.forEach((locale) => {
        const serialised = JSON.stringify(service.locales?.[locale] ?? {})
        expect(serialised, `${service.id}/${locale}`).not.toMatch(/[$€£]\s?\d/)
      })
    })
  })

  it('only links to faqs and projects that exist', () => {
    const faqIds = new Set(faqs.map((faq) => faq.id))
    const projectIds = new Set(projects.map((project) => project.id))

    services.forEach((service) => {
      service.relatedFaqs.forEach((id) => expect(faqIds.has(id)).toBe(true))
      service.relatedProjects.forEach((id) => expect(projectIds.has(id)).toBe(true))
    })
  })
})

describe('projects', () => {
  it('labels every project as concept, demo or real', () => {
    projects.forEach((project) => {
      expect([
        projectStatus.concept,
        projectStatus.demo,
        projectStatus.real,
      ]).toContain(project.status)
    })
  })

  it('does not invent clients, years or metrics', () => {
    projects.forEach((project) => {
      expect(project.client ?? null).toBeNull()
      expect(project.year ?? null).toBeNull()
    })
  })

  it('has no live or source URLs until they are real', () => {
    projects.forEach((project) => {
      expect(project.liveUrl).toBe('')
      expect(project.sourceUrl).toBe('')
    })
  })

  it('translates title, description, objectives and outcomes', () => {
    projects.forEach((project) => {
      LOCALES.forEach((locale) => {
        expect(project.locales?.[locale]?.title.length, `${project.id}/${locale}`).toBeGreaterThan(0)
        expect(
          project.locales?.[locale]?.objectives.length,
          `${project.id}/${locale}/objectives`,
        ).toBeGreaterThan(0)
        expect(
          project.locales?.[locale]?.outcomes.length,
          `${project.id}/${locale}/outcomes`,
        ).toBeGreaterThan(0)
      })
    })
  })
})

describe('faqs', () => {
  it('has unique ids', () => {
    const ids = faqs.map((faq) => faq.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('translates every question and answer', () => {
    faqs.forEach((faq) => {
      LOCALES.forEach((locale) => {
        expect(faq.locales?.[locale]?.question.length, `${faq.id}/${locale}`).toBeGreaterThan(0)
        expect(faq.locales?.[locale]?.answer.length, `${faq.id}/${locale}`).toBeGreaterThan(0)
      })
    })
  })
})

describe('honesty rules', () => {
  it('does not publish contact details that have not been confirmed', () => {
    expect(site.contact.email).toBe('')
    expect(site.contact.phone).toBe('')
    expect(site.contact.address).toBe('')
  })

  it('publishes no social links until they are verified', () => {
    expect(getActiveSocialLinks()).toEqual([])
  })

  it('rejects unsafe social URLs', () => {
    expect(isValidSocialUrl('https://example.com/kbs')).toBe(true)
    expect(isValidSocialUrl('javascript:alert(1)')).toBe(false)
    expect(isValidSocialUrl('http://example.com')).toBe(false)
    expect(isValidSocialUrl('')).toBe(false)
  })

  it('publishes no testimonials until they are approved', () => {
    expect(getPublishedTestimonials('en')).toEqual([])
  })
})
