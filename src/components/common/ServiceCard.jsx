import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { localizedField } from '../../utils/localize.js'
import Icon from './Icon.jsx'
import SmartImage from './SmartImage.jsx'

/**
 * Card used on the home page and the services page.
 */
export default function ServiceCard({ service, locale, to, ctaLabel }) {
  const name = localizedField(service, locale, 'name')
  const summary = localizedField(service, locale, 'summary')

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-kbs-line bg-white shadow-card transition-shadow duration-200 ease-kbs hover:shadow-card-hover">
      <SmartImage
        src={service.image}
        alt={name}
        label={name}
        ratio="aspect-[16/9]"
        imageClassName="transition-transform duration-200 ease-kbs group-hover:scale-[1.03]"
      />

      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-btn bg-kbs-pale text-kbs-royal">
          <Icon name={service.icon} size={20} />
        </span>

        <h3 className="mt-4 font-display text-lg font-bold text-kbs-ink">{name}</h3>

        <p className="mt-2.5 flex-1 text-sm leading-6 text-kbs-slate">{summary}</p>

        {to ? (
          <Link
            to={to}
            className="mt-5 inline-flex items-center gap-1.5 rounded-btn text-sm font-semibold text-kbs-royal transition-colors duration-200 ease-kbs hover:text-kbs-bright"
          >
            {ctaLabel}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 ease-kbs group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        ) : null}
      </div>
    </article>
  )
}
