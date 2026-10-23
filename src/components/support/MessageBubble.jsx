import clsx from 'clsx'
import { Bot, User } from 'lucide-react'

/**
 * A single chat bubble.
 */
export default function MessageBubble({ role, text, links = [], onCopy, copied, copyLabel, label }) {
  const isAssistant = role === 'assistant'

  return (
    <div className={clsx('flex gap-2.5', isAssistant ? 'justify-start' : 'justify-end')}>
      {isAssistant ? (
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-kbs-royal text-white"
          aria-hidden="true"
        >
          <Bot size={15} />
        </span>
      ) : null}

      <div className={clsx('max-w-[85%] sm:max-w-[78%]', isAssistant ? '' : 'items-end')}>
        <div
          className={clsx(
            'rounded-2xl px-4 py-3 text-sm leading-6',
            isAssistant
              ? 'bg-kbs-mist text-kbs-ink'
              : 'bg-kbs-royal text-white',
          )}
        >
          <span className="sr-only">{label}</span>
          <p className="whitespace-pre-line break-words">{text}</p>

          {links.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {links.map((link) => (
                <li key={`${link.to}-${link.label}`}>
                  <a
                    href={link.to}
                    className={clsx(
                      'inline-flex rounded-btn border px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ease-kbs',
                      isAssistant
                        ? 'border-kbs-line bg-white text-kbs-royal hover:border-kbs-royal'
                        : 'border-white/30 bg-white/10 text-white hover:bg-white/20',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {isAssistant && onCopy ? (
          <button
            type="button"
            onClick={onCopy}
            className="mt-1.5 inline-flex items-center gap-1.5 rounded-btn px-2 py-1 text-xs font-medium text-kbs-slate transition-colors duration-200 ease-kbs hover:text-kbs-royal"
          >
            {copied ? <span>{copyLabel?.copied ?? 'Copied'}</span> : <span>{copyLabel?.copy ?? 'Copy'}</span>}
          </button>
        ) : null}
      </div>

      {!isAssistant ? (
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-kbs-pale text-kbs-royal"
          aria-hidden="true"
        >
          <User size={15} />
        </span>
      ) : null}
    </div>
  )
}
