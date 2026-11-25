import { Link } from 'react-router-dom'
import { servicesPageCopy } from '../data/services.js'

export default function ServiceCard({ service }) {
  return (
    <article className="service-card group flex h-full flex-col rounded-2xl border border-[var(--site-border-quiet)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--site-accent-dark)_12%,var(--site-surface)),color-mix(in_srgb,var(--site-surface)_78%,var(--site-transparent)))] p-5 transition-[transform,border-color,background,box-shadow] duration-[220ms] motion-reduce:transition-none hover:-translate-y-[3px] hover:border-[color-mix(in_srgb,var(--site-accent-light)_48%,var(--site-border-soft))] hover:bg-[linear-gradient(145deg,color-mix(in_srgb,var(--site-accent-dark)_24%,var(--site-surface)),var(--site-surface))] hover:shadow-[0_12px_28px_color-mix(in_srgb,var(--site-accent)_12%,var(--site-transparent))] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <Link discover="none" to={`/services/${service.slug}`} className="focus-visible:outline-2 focus-visible:outline-[var(--site-focus)] focus-visible:outline-offset-[3px]">
          <span className="font-mono text-xs font-semibold tracking-[0.18em] text-[var(--site-accent-light)]">{service.number}</span>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--site-text)] sm:text-xl">{service.title}</h3>
        </Link>
        <Link discover="none" to={`/services/${service.slug}`} aria-label={`${servicesPageCopy.learnMoreAria} ${service.title}`} className="focus-visible:outline-2 focus-visible:outline-[var(--site-focus)] focus-visible:outline-offset-[3px] grid size-9 shrink-0 place-items-center rounded-full border border-[var(--site-border-quiet)] bg-[var(--site-glass)] text-lg text-[var(--site-accent-light)] transition-[transform,color,background] duration-[220ms] motion-reduce:transition-none group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:bg-[var(--site-accent-wash)] group-hover:text-[var(--site-white)]">↗</Link>
      </div>
      <p className="text-[var(--site-text-muted)] mt-3 text-sm leading-6">{service.description}</p>
      <ul aria-label={`${service.title} includes`} className="mt-4 grid gap-1.5">
        {service.includes.map((item) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-[var(--site-text-soft)]"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--site-accent-light)]" aria-hidden="true" />{item}</li>)}
      </ul>
      <Link discover="none" to={`/services/${service.slug}`} className="service-learn-link mt-auto inline-flex items-center gap-2 pt-[16px] text-xs font-semibold text-[var(--site-accent-light)] focus-visible:outline-2 focus-visible:outline-[var(--site-focus)] focus-visible:outline-offset-[3px]">{servicesPageCopy.learnMore} <span aria-hidden="true">↗</span></Link>
    </article>
  )
}
