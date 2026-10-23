import { useId, useState } from 'react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'

/**
 * Accessible disclosure used for FAQs.
 * Only one item can be open at a time; each trigger is a real button.
 */
export default function Accordion({ items = [], tone = 'light' }) {
  const [openIndex, setOpenIndex] = useState(0)
  const baseId = useId()

  const light = tone === 'light'
  const itemStyles = light
    ? 'border-kbs-line bg-white'
    : 'border-white/15 bg-white/5'

  return (
    <div className="divide-y divide-kbs-line overflow-hidden rounded-card border border-kbs-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`

        return (
          <div key={item.id ?? item.question} className={clsx(itemStyles, 'px-5 sm:px-6')}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className={clsx(
                  'flex w-full items-start justify-between gap-4 py-5 text-left text-base font-semibold',
                  light ? 'text-kbs-ink hover:text-kbs-royal' : 'text-white hover:text-white/80',
                )}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={20}
                  className={clsx(
                    'mt-0.5 shrink-0 transition-transform duration-200 ease-kbs',
                    isOpen ? 'rotate-180' : '',
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 pr-8 text-sm leading-6 text-kbs-slate"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
