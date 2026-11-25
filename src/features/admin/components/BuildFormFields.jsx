import TextListField from './TextListField.jsx'

const inputClass = 'mt-2 w-full rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-black)] px-4 py-3 text-[var(--site-text)] outline-none transition placeholder:text-[var(--site-text-subtle)] focus:border-[var(--site-accent)]'
const labelClass = 'block text-sm font-medium text-[var(--site-text-muted)]'
const addButtonClass = 'mt-4 inline-flex items-center gap-2 rounded-xl border border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)]/40 px-4 py-2.5 text-sm font-semibold text-[var(--site-accent-light)] transition hover:bg-[var(--site-accent-wash)]'

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

function Field({ as = 'input', className = '', label, name, onChange, value, ...props }) {
  const Element = as
  const id = `build-${name.replaceAll('.', '-')}`
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

export default function BuildFormFields({ form, onFieldChange, onListChange }) {
  const setStep = (index, key, value) => {
    onListChange('processSteps', form.processSteps.map((step, stepIndex) =>
      stepIndex === index ? { ...step, [key]: value } : step
    ))
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      <Section description="Set the heading and supporting copy shown above the Build section." number="01" title="Section heading">
        <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
          <Field label="Eyebrow" name="sectionHeader.eyebrow" onChange={onFieldChange} placeholder="INSIDE THE BUILD" value={form.sectionHeader.eyebrow} />
          <Field label="Heading" name="sectionHeader.heading" onChange={onFieldChange} placeholder="From clear thinking to" required value={form.sectionHeader.heading} />
          <Field label="Highlighted heading" name="sectionHeader.highlightHeading" onChange={onFieldChange} placeholder="working code" value={form.sectionHeader.highlightHeading} />
          <Field as="textarea" className="md:col-span-2" label="Description" name="sectionHeader.description" onChange={onFieldChange} placeholder="Describe the build process" rows={3} value={form.sectionHeader.description} />
        </div>
      </Section>

      <Section description="Customize the two cards shown in the Build section." number="02" title="Build panels">
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            ['leftPanel', 'Left panel'],
            ['rightPanel', 'Right panel'],
          ].map(([group, title]) => (
            <div className="rounded-2xl border border-[var(--site-border-soft)] p-4 sm:p-5" key={group}>
              <h3 className="mb-4 text-sm font-semibold text-[var(--site-text)]">{title}</h3>
              <div className="grid gap-4">
                {['title', 'subtitle', 'status'].map((key) => (
                  <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} name={`${group}.${key}`} onChange={onFieldChange} value={form[group][key]} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <TextListField
        addButtonLabel="Add label"
        description="Add the labels shown across the process ribbon."
        id="build-process-labels"
        itemLabel="label"
        items={form.processLabels}
        label="Process labels"
        number="03"
        onChange={(items) => onListChange('processLabels', items)}
        placeholder="Strategy"
        sectionLabel="Build"
      />

      <TextListField
        addButtonLabel="Add technology"
        description="Add the core technologies shown in the left panel."
        id="build-core-stack"
        itemLabel="technology"
        items={form.coreStack}
        label="Core stack"
        number="04"
        onChange={(items) => onListChange('coreStack', items)}
        placeholder="React"
        sectionLabel="Build"
      />

      <TextListField
        addButtonLabel="Add principle"
        description="Add short principles shown below the Build panels."
        id="build-principles"
        itemLabel="principle"
        items={form.principles}
        label="Project principles"
        number="05"
        onChange={(items) => onListChange('principles', items)}
        placeholder="Thoughtful structure"
        sectionLabel="Build"
      />

      <Section description="Define each stage in the animated project delivery panel." number="06" title="Process steps">
        <div className="space-y-3">
          {!form.processSteps.length && (
            <div className="rounded-xl border border-dashed border-[var(--site-border)] px-4 py-5">
              <p className="m-0 text-sm font-medium text-[var(--site-text)]">No process steps added yet</p>
            </div>
          )}
          {form.processSteps.map((step, index) => (
            <article className="rounded-2xl border border-[var(--site-border-soft)] p-4 sm:p-5" key={`step-${index}`}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--site-accent-wash)] px-2.5 py-1.5 text-xs font-semibold text-[var(--site-accent-light)]">
                  <span className="size-1.5 rounded-full bg-[var(--site-accent)]" />
                  Step {String(index + 1).padStart(2, '0')}
                </span>
                <button
                  className="rounded-lg border border-transparent px-2.5 py-2 text-xs font-semibold text-[var(--site-text-subtle)] hover:border-[var(--site-border-soft)] hover:text-[var(--site-accent-light)]"
                  onClick={() => onListChange('processSteps', form.processSteps.filter((_, itemIndex) => itemIndex !== index))}
                  type="button"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
                <Field label="Title" name={`processSteps.${index}.title`} onChange={(event) => setStep(index, 'title', event.target.value)} required value={step.title} />
                <Field label="Deliverable" name={`processSteps.${index}.deliverable`} onChange={(event) => setStep(index, 'deliverable', event.target.value)} value={step.deliverable ?? ''} />
                <Field as="textarea" className="md:col-span-2" label="Description" name={`processSteps.${index}.description`} onChange={(event) => setStep(index, 'description', event.target.value)} required rows={3} value={step.description} />
              </div>
            </article>
          ))}
        </div>
        <button
          className={addButtonClass}
          onClick={() => onListChange('processSteps', [...form.processSteps, { title: '', description: '', deliverable: '' }])}
          type="button"
        >
          Add process step
        </button>
      </Section>
    </div>
  )
}
