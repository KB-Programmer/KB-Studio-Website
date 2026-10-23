import clsx from 'clsx'
import { ArrowUp, Eraser, Sparkles } from 'lucide-react'

/**
 * Message composer. Uses a textarea so long questions wrap naturally, and
 * submits on Enter (Shift+Enter inserts a newline).
 */
export default function Composer({
  value,
  onChange,
  onSubmit,
  placeholder,
  sendLabel,
  disabled = false,
}) {
  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
      className="flex items-end gap-2 border-t border-kbs-line bg-white p-3"
    >
      <label htmlFor="kbs-support-input" className="sr-only">
        {placeholder}
      </label>
      <textarea
        id="kbs-support-input"
        rows={1}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={clsx(
          'max-h-32 min-h-[44px] flex-1 resize-none rounded-btn border border-kbs-line bg-white px-3 py-2.5 text-sm text-kbs-ink outline-none transition-colors duration-200 ease-kbs placeholder:text-kbs-slate/70 focus:border-kbs-bright focus:ring-2 focus:ring-kbs-bright/30',
          disabled ? 'cursor-not-allowed opacity-60' : '',
        )}
      />
      <button
        type="submit"
        disabled={disabled || value.trim().length === 0}
        aria-label={sendLabel}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-kbs-royal text-white transition-colors duration-200 ease-kbs hover:bg-kbs-bright disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowUp size={18} aria-hidden="true" />
      </button>
    </form>
  )
}

/**
 * Row of quick-action buttons shown under the welcome message.
 */
export function QuickActions({ actions = [], onAction, label }) {
  if (actions.length === 0) return null

  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-kbs-slate">
        <Sparkles size={13} aria-hidden="true" />
        {label}
      </p>
      <ul className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <li key={action.id}>
            <button
              type="button"
              onClick={() => onAction(action)}
              className="rounded-full border border-kbs-line bg-white px-3 py-1.5 text-xs font-semibold text-kbs-royal transition-colors duration-200 ease-kbs hover:border-kbs-royal hover:bg-kbs-pale"
            >
              {action.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * "Clear conversation" control with an inline confirmation.
 */
export function ClearConversationButton({ onClear, label, confirmLabel, yesLabel, noLabel, open, onToggle }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        title={label}
        className="inline-flex h-8 w-8 items-center justify-center rounded-btn text-white/70 transition-colors duration-200 ease-kbs hover:bg-white/10 hover:text-white"
      >
        <Eraser size={16} aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </button>

      {open ? (
        <div className="absolute right-0 top-10 z-20 w-56 rounded-card border border-kbs-line bg-white p-3 text-kbs-ink shadow-panel">
          <p className="text-xs font-semibold">{confirmLabel}</p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={onClear}
              className="rounded-btn bg-kbs-royal px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-200 ease-kbs hover:bg-kbs-bright"
            >
              {yesLabel}
            </button>
            <button
              type="button"
              onClick={onToggle}
              className="rounded-btn border border-kbs-line px-3 py-1.5 text-xs font-semibold text-kbs-ink transition-colors duration-200 ease-kbs hover:bg-kbs-mist"
            >
              {noLabel}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
