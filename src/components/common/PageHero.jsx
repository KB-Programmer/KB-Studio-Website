import Container from './Container.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'

/**
 * Shared page header. Used at the top of every inner page so the spacing,
 * breadcrumb placement and typography stay consistent.
 */
export default function PageHero({ eyebrow, title, description, breadcrumbs, children }) {
  return (
    <section className="border-b border-kbs-line bg-kbs-mist">
      <Container className="py-12 sm:py-16">
        {breadcrumbs?.length ? (
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        ) : null}

        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-kbs-bright">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="text-display-lg text-kbs-ink">{title}</h1>

          {description ? (
            <p className="mt-5 text-base leading-7 text-kbs-slate sm:text-lg">{description}</p>
          ) : null}

          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  )
}
