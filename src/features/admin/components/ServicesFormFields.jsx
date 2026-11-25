const inputClass = 'mt-2 w-full rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-black)] px-4 py-3 text-[var(--site-text)] outline-none transition placeholder:text-[var(--site-text-subtle)] focus:border-[var(--site-accent)]'
const labelClass = 'block text-sm font-medium text-[var(--site-text-muted)]'
const addButtonClass = 'mt-4 inline-flex items-center gap-2 rounded-xl border border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)]/40 px-4 py-2.5 text-sm font-semibold text-[var(--site-accent-light)] transition hover:bg-[var(--site-accent-wash)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-accent-light)]'
const removeButtonClass = 'inline-flex shrink-0 items-center rounded-lg border border-transparent px-2.5 py-2 text-xs font-semibold text-[var(--site-text-subtle)] transition hover:border-[var(--site-border-soft)] hover:bg-[var(--site-glass-hover)] hover:text-[var(--site-accent-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-accent-light)]'

function Field({ as = 'input', className = '', label, name, onChange, value, ...props }) {
  const Element = as
  const id = `services-${name.replaceAll('.', '-')}`
  return (
    <label className={`${labelClass} ${className}`} htmlFor={id}>
      {label}
      <Element
        className={`${inputClass} ${as === 'textarea' ? 'min-h-28 resize-y leading-6' : ''}`}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        {...props}
      />
    </label>
  )
}

function Section({ children, description, number, title }) {
  return (
    <section className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-5 sm:p-6">
      <header className="mb-5 flex items-start gap-3.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--site-accent-wash)] text-xs font-bold tracking-wide text-[var(--site-accent-light)]">{number}</span>
        <div>
          <h2 className="mb-1 text-base font-semibold text-[var(--site-text)]">{title}</h2>
          <p className="m-0 text-sm leading-5 text-[var(--site-text-muted)]">{description}</p>
        </div>
      </header>
      {children}
    </section>
  )
}

function AddButton({ children, onClick }) {
  return (
    <button className={addButtonClass} onClick={onClick} type="button">
      <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 5v14M5 12h14" />
      </svg>
      {children}
    </button>
  )
}

function updateItem(items, index, value) {
  return items.map((item, itemIndex) => itemIndex === index ? value : item)
}

export default function ServicesFormFields({ form, onFieldChange, onListChange }) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <Section
        description="Set the heading and supporting copy shown above your service list."
        number="01"
        title="Section heading"
      >
        <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
          <Field label="Eyebrow" name="sectionHeader.eyebrow" onChange={onFieldChange} placeholder="SERVICES" value={form.sectionHeader.eyebrow} />
          <Field label="Heading" name="sectionHeader.heading" onChange={onFieldChange} placeholder="What I can" required value={form.sectionHeader.heading} />
          <Field label="Highlighted heading" name="sectionHeader.highlightHeading" onChange={onFieldChange} placeholder="build for your business" value={form.sectionHeader.highlightHeading} />
          <Field
            as="textarea"
            className="md:col-span-2"
            label="Description"
            name="sectionHeader.description"
            onChange={onFieldChange}
            placeholder="Describe the services and who they help"
            rows={3}
            value={form.sectionHeader.description}
          />
        </div>
      </Section>

      <Section
        description="Add the service title, details, feature list, and call-to-action for each card."
        number="02"
        title="Services"
      >
        <div className="space-y-3">
          {!form.services.length && (
            <div className="rounded-xl border border-dashed border-[var(--site-border)] bg-[var(--site-glass)] px-4 py-5">
              <p className="m-0 text-sm font-medium text-[var(--site-text)]">No services added yet</p>
              <p className="mb-0 mt-1 text-xs text-[var(--site-text-subtle)]">Add a service to show it in this section.</p>
            </div>
          )}
          {form.services.map((service, index) => {
            const features = service.features ?? []
            return (
              <article className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-4 transition hover:border-[var(--site-accent-glow)] sm:p-5" key={`service-${index}`}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--site-accent-wash)] px-2.5 py-1.5 text-xs font-semibold text-[var(--site-accent-light)]">
                    <span className="size-1.5 rounded-full bg-[var(--site-accent)]" />
                    Service {String(index + 1).padStart(2, '0')}
                  </span>
                  <button
                    aria-label={`Remove service ${index + 1}`}
                    className={removeButtonClass}
                    onClick={() => onListChange('services', form.services.filter((_, itemIndex) => itemIndex !== index))}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
                  <Field label="Title" name={`services.${index}.title`} onChange={onFieldChange} placeholder="Shopify store redesign" required value={service.title} />
                  <Field
                    as="textarea"
                    className="md:col-span-2"
                    label="Description"
                    name={`services.${index}.description`}
                    onChange={onFieldChange}
                    placeholder="Explain what this service helps with"
                    required
                    rows={3}
                    value={service.description}
                  />
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="m-0 text-sm font-semibold text-[var(--site-text)]">Features</h3>
                    <span className="text-xs text-[var(--site-text-subtle)]">{features.filter((feature) => feature.trim()).length} added</span>
                  </div>
                  <div className="space-y-2">
                    {features.map((feature, featureIndex) => (
                      <div className="flex items-center gap-2 rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-2" key={`feature-${index}-${featureIndex}`}>
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--site-accent-wash)] text-xs font-bold text-[var(--site-accent-light)]">{String(featureIndex + 1).padStart(2, '0')}</span>
                        <label className="sr-only" htmlFor={`services-${index}-feature-${featureIndex}`}>Service {index + 1} feature {featureIndex + 1}</label>
                        <input
                          className="w-full min-w-0 bg-transparent px-2 py-2 text-sm text-[var(--site-text)] outline-none placeholder:text-[var(--site-text-subtle)]"
                          id={`services-${index}-feature-${featureIndex}`}
                          onChange={(event) => onListChange(
                            `services.${index}.features`,
                            updateItem(features, featureIndex, event.target.value)
                          )}
                          placeholder="Store audit and UX review"
                          value={feature}
                        />
                        <button
                          aria-label={`Remove feature ${featureIndex + 1} from service ${index + 1}`}
                          className={removeButtonClass}
                          onClick={() => onListChange(
                            `services.${index}.features`,
                            features.filter((_, itemIndex) => itemIndex !== featureIndex)
                          )}
                          type="button"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <AddButton onClick={() => onListChange(`services.${index}.features`, [...features, ''])}>
                    Add feature
                  </AddButton>
                </div>

                <div className="mt-5 grid gap-x-5 gap-y-5 border-t border-[var(--site-border-soft)] pt-5 md:grid-cols-2">
                  <Field label="Button text" name={`services.${index}.button.text`} onChange={onFieldChange} placeholder="Learn more" required value={service.button.text} />
                  <Field label="Button link" name={`services.${index}.button.link`} onChange={onFieldChange} placeholder="/contact" required value={service.button.link} />
                </div>
              </article>
            )
          })}
        </div>
        <AddButton
          onClick={() => onListChange('services', [
            ...form.services,
            { title: '', description: '', features: [''], button: { text: 'Learn more', link: '' } },
          ])}
        >
          Add service
        </AddButton>
      </Section>
    </div>
  )
}
