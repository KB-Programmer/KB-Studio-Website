import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

import { usePathBuilder, useTranslation } from '../../hooks/useLocale.jsx'

/**
 * Breadcrumb trail. `items` is an array of `{ label, to }` — the last item
 * is rendered as plain text (it is the current page).
 */
export default function Breadcrumbs({ items = [] }) {
  const { t } = useTranslation()
  const path = usePathBuilder()

  if (items.length === 0) return null

  return (
    <nav aria-label={t('breadcrumb.label')} className="w-full">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-kbs-slate">
        <li>
          <Link
            to={path('/')}
            className="rounded transition-colors duration-200 ease-kbs hover:text-kbs-royal"
          >
            {t('breadcrumb.home')}
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              <ChevronRight size={13} className="text-kbs-slate/60" aria-hidden="true" />
              {item.to && !isLast ? (
                <Link
                  to={path(item.to)}
                  className="rounded transition-colors duration-200 ease-kbs hover:text-kbs-royal"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="text-kbs-ink">
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
