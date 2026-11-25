const techLogos = {
  shopify: '/TechIcons/optimized/shopify.png',
  react: '/TechIcons/optimized/react.png',
  node: '/TechIcons/optimized/node.png',
}

function DetailIcon({ type }) {
  return (
    <svg aria-hidden="true" className="size-5 shrink-0 text-[var(--site-text)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {type === 'company' ? (
        <><path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M17 9h2a2 2 0 0 1 2 2v10M9 7h2m-2 4h2m-2 4h2" /><path d="M9 21v-3h4v3" /></>
      ) : (
        <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>
      )}
    </svg>
  )
}

export default function ExperienceCard({ experience }) {
  const { title, company, period, duration, description, technology } = experience

  return (
    <li className="experience-item relative pl-6 sm:pl-7">
      <span aria-hidden="true" className="absolute left-[1px] top-7 z-[1] size-4 rounded-full border-[3px] border-[var(--site-accent-light)] bg-[var(--site-white)] shadow-[0_0_0_4px_var(--site-accent-wash),0_0_18px_var(--site-accent-glow-strong)] animate-[experience-node-pulse_2.8s_ease-in-out_infinite] motion-reduce:animate-none" />
      <article data-scroll-reveal className="rounded-2xl border border-[color-mix(in_srgb,var(--site-accent)_76%,var(--site-border-soft))] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--site-accent-dark)_20%,var(--site-surface)),color-mix(in_srgb,var(--site-surface)_92%,var(--site-transparent)))] p-3.5 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--site-accent-light)_20%,var(--site-transparent)),0_8px_24px_var(--site-shadow)] transition-[transform,border-color,box-shadow,background] duration-240 ease-[ease] hover:-translate-y-[2px] hover:border-[var(--site-accent-light)] hover:bg-[linear-gradient(135deg,color-mix(in_srgb,var(--site-accent)_24%,var(--site-surface)),color-mix(in_srgb,var(--site-surface)_92%,var(--site-transparent)))] hover:shadow-[inset_0_1px_0_color-mix(in_srgb,var(--site-accent-light)_28%,var(--site-transparent)),0_12px_30px_color-mix(in_srgb,var(--site-accent)_22%,var(--site-shadow))] motion-reduce:transition-none motion-reduce:hover:transform-none sm:p-4 lg:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--site-accent)_48%,var(--site-border-soft))] bg-[color-mix(in_srgb,var(--site-accent-dark)_20%,var(--site-bg))] sm:size-14">
            <img src={techLogos[technology]} alt="" aria-hidden="true" width="36" height="36" loading="lazy" decoding="async" className="size-8 object-contain sm:size-9" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
              <h3 className="min-w-0 !text-[1.15rem] !leading-[1.3] font-semibold tracking-[-0.025em] text-[var(--site-text)]">{title}</h3>
              <span className="shrink-0 rounded-lg border border-[color-mix(in_srgb,var(--site-accent)_78%,var(--site-transparent))] bg-[color-mix(in_srgb,var(--site-accent-dark)_24%,var(--site-transparent))] px-2.5 py-1 !text-[.72rem] font-semibold text-[var(--site-accent-light)]">{duration}</span>
            </div>

            <p className="mt-1.5 flex items-center gap-2 !text-[.88rem] text-[var(--site-text-muted)]">
              <DetailIcon type="company" /> <span>{company}</span>
            </p>
            <p className="mt-1.5 flex items-center gap-2 !text-[.88rem] text-[var(--site-text-muted)]">
              <DetailIcon type="date" /> <span>{period}</span>
            </p>
            <p className="mt-2.5 !text-[.92rem] !leading-[1.65] text-[var(--site-text-muted)]">{description}</p>
          </div>
        </div>
      </article>
    </li>
  )
}
