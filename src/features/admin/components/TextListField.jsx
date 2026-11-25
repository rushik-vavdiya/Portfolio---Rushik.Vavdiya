const inputClass = 'w-full min-w-0 bg-transparent px-2 py-2 text-sm text-[var(--site-text)] outline-none placeholder:text-[var(--site-text-subtle)]'

export default function TextListField({
  addButtonLabel,
  description,
  id,
  itemLabel,
  items,
  label,
  number,
  onChange,
  placeholder,
  sectionLabel = 'Hero',
}) {
  const updateItem = (index, value) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? value : item)))
  }

  const removeItem = (index) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index))
  }

  const filledCount = items.filter((item) => item.trim()).length

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-5 sm:p-6"
    >
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--site-accent-wash)] text-xs font-bold tracking-wide text-[var(--site-accent-light)]">
            {number}
          </span>
          <div className="min-w-0">
            <h2 className="mb-1 text-base font-semibold text-[var(--site-text)]" id={`${id}-heading`}>
              {label}
            </h2>
            <p className="m-0 text-sm leading-5 text-[var(--site-text-muted)]">{description}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--site-border-soft)] bg-[var(--site-glass)] px-2.5 py-1 text-xs font-medium text-[var(--site-text-muted)]">
          {filledCount} {itemLabel}{filledCount === 1 ? '' : 's'}
        </span>
      </header>

      <div className="space-y-2.5">
        {!items.length && (
          <div className="flex min-h-20 items-center gap-3 rounded-xl border border-dashed border-[var(--site-border)] bg-[var(--site-glass)] px-4 py-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--site-accent-wash)] text-[var(--site-accent-light)]">
              <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
              </svg>
            </span>
            <div>
              <p className="m-0 text-sm font-medium text-[var(--site-text)]">No {itemLabel}s added yet</p>
              <p className="mb-0 mt-1 text-xs text-[var(--site-text-subtle)]">
                Add one to include it in your {sectionLabel} section.
              </p>
            </div>
          </div>
        )}

        {items.map((item, index) => {
          const inputId = `${id}-${index}`
          return (
            <div
              className="group flex items-center gap-3 rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-2.5 transition hover:border-[var(--site-accent-glow)]"
              key={inputId}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--site-accent-wash)] text-xs font-bold text-[var(--site-accent-light)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <label className="sr-only" htmlFor={inputId}>{`${label} ${index + 1}`}</label>
              <input
                className={inputClass}
                id={inputId}
                onChange={(event) => updateItem(index, event.target.value)}
                placeholder={placeholder}
                value={item}
              />
              <button
                aria-label={`Remove ${itemLabel} ${index + 1}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-2 text-xs font-semibold text-[var(--site-text-subtle)] transition hover:border-[var(--site-border-soft)] hover:bg-[var(--site-glass-hover)] hover:text-[var(--site-accent-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-accent-light)]"
                onClick={() => removeItem(index)}
                type="button"
              >
                <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
                  <path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" />
                </svg>
                <span className="hidden sm:inline">Remove</span>
              </button>
            </div>
          )
        })}
      </div>

      <button
        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)]/40 px-4 py-2.5 text-sm font-semibold text-[var(--site-accent-light)] transition hover:bg-[var(--site-accent-wash)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-accent-light)]"
        onClick={() => onChange([...items, ''])}
        type="button"
      >
        <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" />
        </svg>
        {addButtonLabel}
      </button>
    </section>
  )
}
