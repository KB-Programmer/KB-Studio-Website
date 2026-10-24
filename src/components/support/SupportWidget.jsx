import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  MessageCircle,
  Pencil,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from 'lucide-react'
import clsx from 'clsx'

import { services } from '../../content/services.js'
import { localizedField } from '../../utils/localize.js'
import { useCurrentLocale, usePathBuilder, useTranslation } from '../../hooks/useLocale.jsx'
import {
  answerIntent,
  getDisclosure,
  getPrivacyNotice,
  getQuickActions,
  getWelcomeMessage,
  respondTo,
} from '../../lib/supportEngine.js'
import { onOpenSupport } from '../../lib/supportEvents.js'
import { saveRequestDraft } from '../../lib/requestDraftStore.js'
import Composer, { ClearConversationButton, QuickActions } from './Composer.jsx'
import MessageBubble from './MessageBubble.jsx'

const FLOW_STEPS = ['service', 'details', 'objective', 'deadline', 'budget']

let messageCounter = 0
function nextId() {
  messageCounter += 1
  return `kbs-msg-${messageCounter}`
}

export default function SupportWidget() {
  const { t } = useTranslation()
  const locale = useCurrentLocale()
  const path = usePathBuilder()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [pendingStep, setPendingStep] = useState(null)
  const [draft, setDraft] = useState(null)
  const [announcement, setAnnouncement] = useState('')

  const launcherRef = useRef(null)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)
  const timerRef = useRef(null)

  const quickActions = useMemo(() => getQuickActions(), [])

  const localizedQuickActions = useMemo(
    () =>
      quickActions.map((action) => ({
        ...action,
        label: action.label?.[locale] ?? action.label?.en ?? '',
      })),
    [quickActions, locale],
  )

  /* ------------------------------------------------------------------ */
  /* Message helpers                                                      */
  /* ------------------------------------------------------------------ */

  const pushMessage = useCallback((message) => {
    setMessages((current) => [...current, { id: nextId(), ...message }])
  }, [])

  const pushAssistantResponse = useCallback(
    (response) => {
      const links = (response.links ?? []).map((link) => ({ ...link, to: path(link.to) }))
      pushMessage({
        role: 'assistant',
        text: response.answer ?? '',
        links,
        followUps: response.followUps ?? [],
        kind: response.type === 'fallback' ? 'fallback' : response.type === 'clarify' ? 'clarify' : 'answer',
        options: response.options ?? [],
        copyText: response.answer ?? '',
      })
    },
    [path, pushMessage],
  )

  const resetConversation = useCallback(() => {
    setMessages([])
    setDraft(null)
    setPendingStep(null)
    setClearConfirmOpen(false)
    setShowQuickActions(true)
    setAnnouncement(t('support.statusReady'))
  }, [t])

  const openWidget = useCallback(() => {
    setIsOpen((wasOpen) => {
      if (!wasOpen) {
        setMessages((current) => {
          if (current.length > 0) return current
          return [
            {
              id: nextId(),
              role: 'assistant',
              text: getWelcomeMessage(locale),
              links: [],
              followUps: [],
              kind: 'answer',
              copyText: getWelcomeMessage(locale),
            },
          ]
        })
      }
      return !wasOpen
    })
  }, [locale])

  useEffect(() => onOpenSupport(openWidget), [openWidget])

  useEffect(() => {
    if (!isOpen) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    const node = bodyRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [messages, thinking])

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  /* ------------------------------------------------------------------ */
  /* Guided service-request flow                                          */
  /* ------------------------------------------------------------------ */

  const serviceOptions = useMemo(
    () =>
      services.map((service) => ({
        id: service.id,
        label: localizedField(service, locale, 'name'),
        next: 'details',
        value: localizedField(service, locale, 'name'),
      })),
    [locale],
  )

  const askStep = useCallback(
    (step) => {
      const questionKey = {
        service: 'support.requestFlow.serviceQuestion',
        details: 'support.requestFlow.detailsQuestion',
        objective: 'support.requestFlow.objectiveQuestion',
        deadline: 'support.requestFlow.deadlineQuestion',
        budget: 'support.requestFlow.budgetQuestion',
      }[step]

      const options =
        step === 'service'
          ? serviceOptions
          : step === 'deadline' || step === 'budget'
            ? [{ id: 'skip', label: t('support.requestFlow.skip'), next: null, value: '' }]
            : []

      pushMessage({
        role: 'assistant',
        text:
          step === 'service'
            ? `${t(questionKey)}\n${t('support.requestFlow.serviceHint')}`
            : t(questionKey),
        links: [],
        followUps: [],
        kind: 'question',
        options,
        copyText: t(questionKey),
      })

      setPendingStep(step)
    },
    [pushMessage, serviceOptions, t],
  )

  const startRequestFlow = useCallback(() => {
    const emptyDraft = { service: '', details: '', objective: '', deadline: '', budget: '' }
    setDraft(emptyDraft)
    askStep('service')
  }, [askStep])

  const buildSummary = useCallback(
    (currentDraft) => {
      const rows = [
        { key: 'service', label: t('support.requestFlow.serviceLabel'), value: currentDraft.service },
        { key: 'details', label: t('support.requestFlow.detailsLabel'), value: currentDraft.details },
        { key: 'objective', label: t('support.requestFlow.objectiveLabel'), value: currentDraft.objective },
        { key: 'deadline', label: t('support.requestFlow.deadlineLabel'), value: currentDraft.deadline },
        { key: 'budget', label: t('support.requestFlow.budgetLabel'), value: currentDraft.budget },
      ]

      const body = rows
        .filter((row) => row.value)
        .map((row) => `• ${row.label}: ${row.value}`)
        .join('\n')

      return `${t('support.requestFlow.summaryTitle')}\n\n${body || '—'}\n\n${t('support.requestFlow.summaryIntro')}\n\n${t('support.requestFlow.handoffNotice')}`
    },
    [t],
  )

  const showSummary = useCallback(
    (currentDraft) => {
      const text = buildSummary(currentDraft)
      pushMessage({
        role: 'assistant',
        text,
        links: [],
        followUps: [],
        kind: 'summary',
        draft: currentDraft,
        copyText: text,
      })
      setPendingStep(null)
    },
    [buildSummary, pushMessage],
  )

  const advanceFlow = useCallback(
    (step, currentDraft) => {
      const index = FLOW_STEPS.indexOf(step)
      const nextStep = FLOW_STEPS[index + 1]

      if (!nextStep) {
        showSummary(currentDraft)
        return
      }
      askStep(nextStep)
    },
    [askStep, showSummary],
  )

  const handleOption = useCallback(
    (message, option) => {
      if (message.kind === 'clarify') {
        const response = answerIntent(option.intentId, locale)
        pushAssistantResponse(response)
        setAnnouncement(t('support.announcement'))
        return
      }

      if (!pendingStep || !draft) return

      const updated = { ...draft, [pendingStep]: option.value }
      setDraft(updated)
      advanceFlow(pendingStep, updated)
    },
    [advanceFlow, draft, locale, pendingStep, pushAssistantResponse, t],
  )

  const editDraftField = useCallback(
    (field) => {
      askStep(field)
    },
    [askStep],
  )

  const continueToRequestForm = useCallback(() => {
    if (!draft) return
    saveRequestDraft(draft)
    setIsOpen(false)
    navigate(path('/request-service'))
  }, [draft, navigate, path])

  /* ------------------------------------------------------------------ */
  /* Sending messages                                                     */
  /* ------------------------------------------------------------------ */

  const handleSend = useCallback(() => {
    const text = input.trim()
    if (!text || thinking) return

    setInput('')
    pushMessage({ role: 'visitor', text, links: [], followUps: [], kind: 'visitor', copyText: text })
    setThinking(true)

    timerRef.current = window.setTimeout(() => {
      setThinking(false)

      if (pendingStep && draft) {
        const updated = { ...draft, [pendingStep]: text }
        setDraft(updated)
        advanceFlow(pendingStep, updated)
        return
      }

      const response = respondTo(text, locale)
      pushAssistantResponse(response)
      setAnnouncement(t('support.announcement'))
    }, 320)
  }, [advanceFlow, draft, input, locale, pendingStep, pushAssistantResponse, pushMessage, t, thinking])

  const handleQuickAction = useCallback(
    (action) => {
      if (action.action?.type === 'navigate') {
        setIsOpen(false)
        navigate(path(action.action.to))
        return
      }

      if (action.action?.type === 'ask') {
        const response = answerIntent(action.action.intentId, locale)
        pushAssistantResponse(response)
        setAnnouncement(t('support.announcement'))
      }
    },
    [locale, navigate, path, pushAssistantResponse, t],
  )

  const handleFollowUp = useCallback(
    (question) => {
      if (thinking) return
      pushMessage({
        role: 'visitor',
        text: question,
        links: [],
        followUps: [],
        kind: 'visitor',
        copyText: question,
      })
      setThinking(true)

      timerRef.current = window.setTimeout(() => {
        setThinking(false)
        const response = respondTo(question, locale)
        pushAssistantResponse(response)
        setAnnouncement(t('support.announcement'))
      }, 320)
    },
    [locale, pushAssistantResponse, pushMessage, t, thinking],
  )

  const handleCopy = useCallback(async (message) => {
    const text = message.copyText ?? message.text
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(message.id)
      window.setTimeout(() => setCopiedId(null), 2000)
    } catch {
      setCopiedId(null)
    }
  }, [])

  const lastAssistantMessage = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      if (messages[index].role === 'assistant') return messages[index]
    }
    return null
  }, [messages])

  /* ------------------------------------------------------------------ */
  /* Render                                                               */
  /* ------------------------------------------------------------------ */

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-end p-4 sm:p-6">
        {isOpen ? (
          <section
            id="kbs-support-panel"
            role="dialog"
            aria-label={t('support.title')}
            aria-modal="false"
            className="pointer-events-auto flex h-[min(640px,calc(100dvh-7rem))] w-full max-w-[26rem] flex-col overflow-hidden rounded-card border border-kbs-line bg-white shadow-panel"
          >
            <header className="flex items-start gap-3 bg-kbs-royal px-4 py-3.5 text-white">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Sparkles size={18} aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1">
                <h2 className="truncate font-display text-sm font-bold">{t('support.title')}</h2>
                <p className="truncate text-xs text-white/75">{t('support.tagline')}</p>
                <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white/60">
                  {t('support.disclosureLabel')}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <ClearConversationButton
                  open={clearConfirmOpen}
                  onToggle={() => setClearConfirmOpen((value) => !value)}
                  onClear={resetConversation}
                  label={t('support.clearConversation')}
                  confirmLabel={t('support.clearConfirm')}
                  yesLabel={t('support.clearConfirmYes')}
                  noLabel={t('support.clearConfirmNo')}
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={t('support.close')}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-btn text-white/80 transition-colors duration-200 ease-kbs hover:bg-white/10 hover:text-white"
                >
                  <X size={17} aria-hidden="true" />
                </button>
              </div>
            </header>

            <div ref={bodyRef} className="kbs-scroll-shadow flex-1 overflow-y-auto bg-kbs-mist/40 px-4 py-4">
              {showQuickActions ? (
                <div className="mb-4">
                  <QuickActions
                    actions={localizedQuickActions}
                    onAction={handleQuickAction}
                    label={t('support.quickActionsTitle')}
                  />
                </div>
              ) : null}

              <div role="log" aria-live="polite" aria-atomic="false" className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <MessageBubble
                      role={message.role}
                      text={message.text}
                      links={message.links}
                      onCopy={message.role === 'assistant' ? () => handleCopy(message) : undefined}
                      copied={copiedId === message.id}
                      copyLabel={{ copy: t('support.copyAnswer'), copied: t('common.copied') }}
                      label={
                        message.role === 'assistant' ? t('support.assistantName') : t('support.visitorName')
                      }
                    />

                    {(message.kind === 'question' || message.kind === 'clarify') &&
                    message.options?.length > 0 ? (
                      <ul className="mt-2 flex flex-wrap gap-2 pl-9">
                        {message.options.map((option) => (
                          <li key={option.id ?? option.intentId}>
                            <button
                              type="button"
                              onClick={() => handleOption(message, option)}
                              className="rounded-full border border-kbs-royal bg-white px-3 py-1.5 text-xs font-semibold text-kbs-royal transition-colors duration-200 ease-kbs hover:bg-kbs-royal hover:text-white"
                            >
                              {option.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {message.kind === 'summary' && message.draft ? (
                      <div className="mt-2 space-y-2 pl-9">
                        <div className="flex flex-wrap gap-2">
                          {FLOW_STEPS.map((field) => (
                            <button
                              key={field}
                              type="button"
                              onClick={() => editDraftField(field)}
                              className="inline-flex items-center gap-1.5 rounded-btn border border-kbs-line bg-white px-2.5 py-1.5 text-xs font-semibold text-kbs-ink transition-colors duration-200 ease-kbs hover:border-kbs-royal hover:text-kbs-royal"
                            >
                              <Pencil size={12} aria-hidden="true" />
                              {t(
                                `support.requestFlow.${
                                  {
                                    service: 'serviceLabel',
                                    details: 'detailsLabel',
                                    objective: 'objectiveLabel',
                                    deadline: 'deadlineLabel',
                                    budget: 'budgetLabel',
                                  }[field]
                                }`,
                              )}
                            </button>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={continueToRequestForm}
                            className="inline-flex items-center gap-1.5 rounded-btn bg-kbs-royal px-3 py-2 text-xs font-semibold text-white transition-colors duration-200 ease-kbs hover:bg-kbs-bright"
                          >
                            <ArrowRight size={14} aria-hidden="true" />
                            {t('support.requestFlow.continueToForm')}
                          </button>
                          <button
                            type="button"
                            onClick={startRequestFlow}
                            className="inline-flex items-center gap-1.5 rounded-btn border border-kbs-line bg-white px-3 py-2 text-xs font-semibold text-kbs-ink transition-colors duration-200 ease-kbs hover:border-kbs-royal hover:text-kbs-royal"
                          >
                            <RotateCcw size={14} aria-hidden="true" />
                            {t('support.requestFlow.restart')}
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {message.kind === 'fallback' ? (
                      <div className="mt-2 pl-9">
                        <button
                          type="button"
                          onClick={() => setShowQuickActions(true)}
                          className="inline-flex items-center gap-1.5 rounded-btn border border-kbs-line bg-white px-2.5 py-1.5 text-xs font-semibold text-kbs-ink transition-colors duration-200 ease-kbs hover:border-kbs-royal hover:text-kbs-royal"
                        >
                          <RotateCcw size={12} aria-hidden="true" />
                          {t('support.retry')}
                        </button>
                      </div>
                    ) : null}
                  </div>
                ))}

                {thinking ? (
                  <div className="flex gap-2.5" aria-live="polite">
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-kbs-royal text-white"
                      aria-hidden="true"
                    >
                      <Sparkles size={15} />
                    </span>
                    <div className="rounded-2xl bg-kbs-mist px-4 py-3 text-sm text-kbs-slate">
                      {t('support.thinking')}
                    </div>
                  </div>
                ) : null}
              </div>

              {lastAssistantMessage?.followUps?.length > 0 && !thinking ? (
                <div className="mt-4 border-t border-kbs-line pt-3">
                  <p className="mb-2 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-kbs-slate">
                    {t('support.followUpsTitle')}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {lastAssistantMessage.followUps.map((question) => (
                      <li key={question}>
                        <button
                          type="button"
                          onClick={() => handleFollowUp(question)}
                          className="rounded-full border border-kbs-line bg-white px-3 py-1.5 text-xs font-medium text-kbs-ink transition-colors duration-200 ease-kbs hover:border-kbs-royal hover:text-kbs-royal"
                        >
                          {question}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-4 border-t border-kbs-line pt-3">
                <button
                  type="button"
                  onClick={startRequestFlow}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-btn border border-kbs-royal bg-white px-3 py-2 text-sm font-semibold text-kbs-royal transition-colors duration-200 ease-kbs hover:bg-kbs-royal hover:text-white"
                >
                  <Send size={15} aria-hidden="true" />
                  {t('support.requestFlow.start')}
                </button>
              </div>
            </div>

            <Composer
              value={input}
              onChange={setInput}
              onSubmit={handleSend}
              placeholder={t('support.placeholder')}
              sendLabel={t('support.send')}
              disabled={thinking}
            />

            <div className="border-t border-kbs-line bg-white px-4 py-2.5">
              <p className="text-[0.6875rem] leading-4 text-kbs-slate">
                {t('support.privacyLabel')}: {getPrivacyNotice(locale)}
              </p>
              <p className="mt-1 text-[0.6875rem] leading-4 text-kbs-slate/80">{getDisclosure(locale)}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <a
                  href={path('/request-service')}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1 rounded-btn bg-kbs-pale px-2.5 py-1 text-xs font-semibold text-kbs-royal"
                >
                  <Check size={12} aria-hidden="true" />
                  {t('support.requestCta')}
                </a>
                <a
                  href={path('contact')}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1 rounded-btn bg-kbs-mist px-2.5 py-1 text-xs font-semibold text-kbs-ink"
                >
                  {t('support.contactCta')}
                </a>
              </div>
            </div>
          </section>
        ) : null}

        <button
          ref={launcherRef}
          type="button"
          onClick={openWidget}
          aria-expanded={isOpen}
          aria-controls="kbs-support-panel"
          aria-label={isOpen ? t('support.close') : t('support.launcherLabel')}
          className={clsx(
            'pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-kbs-royal text-white shadow-panel transition-all duration-200 ease-kbs hover:bg-kbs-bright focus-visible:ring-2 focus-visible:ring-kbs-bright focus-visible:ring-offset-2',
            isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
          )}
        >
          <MessageCircle size={24} aria-hidden="true" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  )
}
