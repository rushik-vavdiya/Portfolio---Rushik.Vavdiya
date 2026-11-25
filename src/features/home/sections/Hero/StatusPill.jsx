export default function StatusPill({ status, availability, location }) {
  const normalizedStatus = status.toLowerCase()
  const isOpen = normalizedStatus === 'open'
  const statusColor = isOpen
    ? 'bg-[var(--site-status-green)] before:bg-[var(--site-status-green)]'
    : normalizedStatus === 'closed'
      ? 'bg-[var(--site-status-red)]'
      : 'bg-[var(--site-status-yellow)]'

  return (
    <div
      role="group"
      aria-label="Availability and location"
      className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 opacity-0 animate-[hero-fade-in_.9s_ease_forwards] [animation-delay:.1s] motion-reduce:opacity-100"
    >
      <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[rgb(var(--site-accent-rgb)/.28)] bg-[rgb(var(--site-black-rgb)/.9)] px-3.5 py-2.5 shadow-[0_8px_28px_rgb(var(--site-black-rgb)/.45)] backdrop-blur-md">
        <span className={`relative size-2 shrink-0 rounded-full ${statusColor} ${
          isOpen
            ? 'before:absolute before:inset-0 before:rounded-full before:animate-[hero-status-ping_1.8s_ease-out_infinite] motion-reduce:before:animate-none'
            : ''
        }`} />
        <b className="shrink-0 text-[11px] font-bold tracking-[.02em] text-[var(--site-accent-light)]">
          {status}
        </b>
        <span aria-hidden="true" className="h-3 w-px shrink-0 bg-white/20" />
        <span className="min-w-0 text-[12px] font-medium leading-snug text-[rgb(var(--site-white-rgb)/.82)]">{availability}</span>
      </div>
      <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/[.1] bg-[rgb(var(--site-black-rgb)/.9)] px-3.5 py-2.5 text-[11px] font-medium tracking-[.01em] text-[var(--site-text-muted)] backdrop-blur-md">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-3.5 shrink-0 text-[var(--site-accent-light)]">
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
        </svg>
        <span className="min-w-0 break-words">{location}</span>
      </div>
    </div>
  )
}
