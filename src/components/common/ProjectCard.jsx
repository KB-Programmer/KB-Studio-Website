import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { localizedField } from '../../utils/localize.js'
import { projectStatus } from '../../content/projects.js'
import SmartImage from './SmartImage.jsx'

const statusLabels = {
  [projectStatus.concept]: 'common.conceptProject',
  [projectStatus.demo]: 'common.demoProject',
  [projectStatus.real]: 'common.realProject',
}

/**
 * Portfolio card. The concept / demo badge is always visible so a visitor
 * can never mistake sample work for a client engagement.
 */
export default function ProjectCard({ project, locale, to, ctaLabel, statusLabel }) {
  const title = localizedField(project, locale, 'title')
  const description = localizedField(project, locale, 'description')
  const badge = statusLabel ?? statusLabels[project.status] ?? null

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-kbs-line bg-white shadow-card transition-shadow duration-200 ease-kbs hover:shadow-card-hover">
      <div className="relative">
        <SmartImage
          src={project.previewImage}
          alt={title}
          label={title}
          ratio="aspect-[16/10]"
          imageClassName="transition-transform duration-200 ease-kbs group-hover:scale-[1.03]"
        />
        {badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-kbs-deep/90 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold text-kbs-ink">{title}</h3>
        <p className="mt-2.5 flex-1 text-sm leading-6 text-kbs-slate">{description}</p>

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
