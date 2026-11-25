import TextListField from './TextListField.jsx'

const inputClass = 'mt-2 w-full rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-black)] px-4 py-3 text-[var(--site-text)] outline-none transition placeholder:text-[var(--site-text-subtle)] focus:border-[var(--site-accent)]'
const selectClass = `${inputClass} [&>option]:bg-[var(--site-black)] [&>option]:text-[var(--site-text)]`
const labelClass = 'block text-sm font-medium text-[var(--site-text-muted)]'
const removeButtonClass = 'inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-2 text-xs font-semibold text-[var(--site-text-subtle)] transition hover:border-[var(--site-border-soft)] hover:bg-[var(--site-glass-hover)] hover:text-[var(--site-accent-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-accent-light)]'
const addButtonClass = 'mt-4 inline-flex items-center gap-2 rounded-xl border border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)]/40 px-4 py-2.5 text-sm font-semibold text-[var(--site-accent-light)] transition hover:bg-[var(--site-accent-wash)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-accent-light)]'
const sectionClass = 'rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-5 sm:p-6'
const availabilityOptions = [
  { value: 'open', label: 'Open', description: 'Available for projects', indicator: 'bg-[var(--site-status-green)]' },
  { value: 'busy', label: 'Busy', description: 'Limited availability', indicator: 'bg-[var(--site-status-yellow)]' },
  { value: 'closed', label: 'Closed', description: 'Not taking projects', indicator: 'bg-[var(--site-status-red)]' },
]

function Field({ as = 'input', className = '', label, name, onChange, value, ...props }) {
  const Element = as
  const id = `about-${name.replaceAll('.', '-')}`
  return (
    <label className={`${labelClass} ${className}`} htmlFor={id}>
      {label}
      <Element
        className={`${as === 'select' ? selectClass : inputClass} ${as === 'textarea' ? 'min-h-32 resize-y leading-6' : ''}`}
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
    <section className={sectionClass}>
      <header className="mb-5 flex items-start gap-3.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--site-accent-wash)] text-xs font-bold tracking-wide text-[var(--site-accent-light)]">
          {number}
        </span>
        <div>
          <h2 className="mb-1 text-base font-semibold text-[var(--site-text)]">{title}</h2>
          <p className="m-0 text-sm leading-5 text-[var(--site-text-muted)]">{description}</p>
        </div>
      </header>
      {children}
    </section>
  )
}

function RemoveButton({ label, onClick }) {
  return (
    <button
      aria-label={`Remove ${label}`}
      className={removeButtonClass}
      onClick={onClick}
      type="button"
    >
      <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
        <path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" />
      </svg>
      <span className="hidden sm:inline">Remove</span>
    </button>
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

function EmptyState({ description, title }) {
  return (
    <div className="flex min-h-20 items-center gap-3 rounded-xl border border-dashed border-[var(--site-border)] bg-[var(--site-glass)] px-4 py-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--site-accent-wash)] text-[var(--site-accent-light)]">
        <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M7 7h10M7 12h10M7 17h6" />
        </svg>
      </span>
      <div>
        <p className="m-0 text-sm font-medium text-[var(--site-text)]">{title}</p>
        <p className="mb-0 mt-1 text-xs text-[var(--site-text-subtle)]">{description}</p>
      </div>
    </div>
  )
}

export default function AboutFormFields({ form, onFieldChange, onListChange }) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <Section
        description="Add the profile details visitors see on the About page."
        number="01"
        title="Profile"
      >
        <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
          <Field label="Name" name="name" onChange={onFieldChange} placeholder="Your name" required value={form.name} />
          <Field label="Role" name="role" onChange={onFieldChange} placeholder="Designer & developer" value={form.role} />
          <Field label="Profile image URL" name="profileImage" onChange={onFieldChange} placeholder="/images/profile.png" value={form.profileImage} />
          <Field label="Location" name="location" onChange={onFieldChange} placeholder="Available worldwide" value={form.location} />
          <Field
            as="textarea"
            className="md:col-span-2"
            label="Profile description"
            name="description"
            onChange={onFieldChange}
            placeholder="Introduce yourself and the work you do"
            rows={4}
            value={form.description}
          />
        </div>
      </Section>

      <Section
        description="Choose an availability status and the message shown to visitors."
        number="02"
        title="Availability"
      >
        <div className="grid gap-5">
          <fieldset className="m-0 min-w-0 border-0 p-0">
            <legend className={labelClass}>Availability status</legend>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {availabilityOptions.map((option) => {
                const isSelected = form.availability.status === option.value
                const id = `about-availability-${option.value}`
                return (
                  <label
                    className={`relative flex min-h-[76px] cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--site-accent-light)] ${
                      isSelected
                        ? 'border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)] shadow-[inset_0_0_0_1px_var(--site-accent-glow)]'
                        : 'border-[var(--site-border-soft)] bg-[var(--site-black)] hover:border-[var(--site-border)] hover:bg-[var(--site-glass)]'
                    }`}
                    htmlFor={id}
                    key={option.value}
                  >
                    <input
                      checked={isSelected}
                      className="sr-only"
                      id={id}
                      name="availability.status"
                      onChange={onFieldChange}
                      type="radio"
                      value={option.value}
                    />
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--site-glass-hover)]">
                      <span className={`size-2.5 rounded-full ${option.indicator}`} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[var(--site-text)]">{option.label}</span>
                      <span className="mt-0.5 block text-xs leading-4 text-[var(--site-text-subtle)]">{option.description}</span>
                    </span>
                    <span className={`ml-auto grid size-4 shrink-0 place-items-center rounded-full border ${
                      isSelected
                        ? 'border-[var(--site-accent)] bg-[var(--site-accent)]'
                        : 'border-[var(--site-border)]'
                    }`}>
                      {isSelected && (
                        <svg aria-hidden="true" className="size-2.5 text-[var(--site-black)]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 12 12">
                          <path d="m2 6 2.5 2.5L10 3" />
                        </svg>
                      )}
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>
          <Field
            label="Availability message"
            name="availability.message"
            onChange={onFieldChange}
            placeholder="Available for new projects"
            value={form.availability.message}
          />
        </div>
      </Section>

      <Section
        description="Set the heading and supporting copy for the homepage About section."
        number="03"
        title="Section heading"
      >
        <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
          <Field label="Eyebrow" name="sectionHeader.eyebrow" onChange={onFieldChange} placeholder="ABOUT ME" value={form.sectionHeader.eyebrow} />
          <Field label="Heading" name="sectionHeader.heading" onChange={onFieldChange} placeholder="The developer behind" value={form.sectionHeader.heading} />
          <Field label="Highlighted heading" name="sectionHeader.highlightHeading" onChange={onFieldChange} placeholder="the work." value={form.sectionHeader.highlightHeading} />
          <Field
            as="textarea"
            className="md:col-span-2"
            label="Section description"
            name="sectionHeader.description"
            onChange={onFieldChange}
            placeholder="Write a short introduction to this section"
            rows={3}
            value={form.sectionHeader.description}
          />
        </div>
      </Section>

      <Section
        description="Add the values and labels shown beside the profile."
        number="04"
        title="Statistics"
      >
        <div className="space-y-3">
          {!form.stats.length && (
            <EmptyState description="Add a statistic to highlight your experience or services." title="No statistics added yet" />
          )}
          {form.stats.map((stat, index) => (
            <div className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-4 transition hover:border-[var(--site-accent-glow)] sm:p-5" key={`stat-${index}`}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--site-accent-wash)] px-2.5 py-1.5 text-xs font-semibold text-[var(--site-accent-light)]">
                  <span className="size-1.5 rounded-full bg-[var(--site-accent)]" />
                  Statistic {String(index + 1).padStart(2, '0')}
                </span>
                <RemoveButton
                  label={`statistic ${index + 1}`}
                  onClick={() => onListChange('stats', form.stats.filter((_, itemIndex) => itemIndex !== index))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Value" name={`stats.${index}.value`} onChange={onFieldChange} placeholder="01" value={stat.value} />
                <Field label="Label" name={`stats.${index}.label`} onChange={onFieldChange} placeholder="Years of experience" value={stat.label} />
              </div>
            </div>
          ))}
        </div>
        <AddButton onClick={() => onListChange('stats', [...form.stats, { value: '', label: '' }])}>
          Add statistic
        </AddButton>
      </Section>

      <TextListField
        addButtonLabel="Add specialty"
        description="Add one specialty per row. These appear as profile chips."
        id="about-specialties"
        itemLabel="specialty"
        items={form.specialties}
        label="Specialties"
        number="05"
        onChange={(items) => onListChange('specialties', items)}
        placeholder="Enter a specialty"
        sectionLabel="About"
      />

      <Section
        description="Configure the call-to-action button shown with your profile."
        number="06"
        title="Call to action"
      >
        <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
          <Field label="Button label" name="button.label" onChange={onFieldChange} placeholder="Start a project" value={form.button.label} />
          <Field label="Button link" name="button.link" onChange={onFieldChange} placeholder="/contact" value={form.button.link} />
        </div>
      </Section>

      <Section
        description="Set the heading and introduction displayed above the experience timeline."
        number="07"
        title="Experience heading"
      >
        <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
          <Field label="Eyebrow" name="experienceHeader.eyebrow" onChange={onFieldChange} placeholder="EXPERIENCE" value={form.experienceHeader.eyebrow} />
          <Field label="Heading" name="experienceHeader.heading" onChange={onFieldChange} placeholder="Work and contribution" value={form.experienceHeader.heading} />
          <Field label="Highlighted heading" name="experienceHeader.highlightHeading" onChange={onFieldChange} placeholder="Optional highlight" value={form.experienceHeader.highlightHeading} />
          <Field
            as="textarea"
            className="md:col-span-2"
            label="Description"
            name="experienceHeader.description"
            onChange={onFieldChange}
            placeholder="Introduce your experience"
            rows={3}
            value={form.experienceHeader.description}
          />
        </div>
      </Section>

      <Section
        description="Add, edit, or remove entries in your experience timeline."
        number="08"
        title="Experience entries"
      >
        <div className="space-y-3">
          {!form.experiences.length && (
            <EmptyState description="Add an entry to show your experience on the About page." title="No experience entries yet" />
          )}
          {form.experiences.map((experience, index) => (
            <article className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-4 transition hover:border-[var(--site-accent-glow)] sm:p-5" key={`experience-${index}`}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--site-accent-wash)] px-2.5 py-1.5 text-xs font-semibold text-[var(--site-accent-light)]">
                  <span className="size-1.5 rounded-full bg-[var(--site-accent)]" />
                  Experience {String(index + 1).padStart(2, '0')}
                </span>
                <RemoveButton
                  label={`experience ${index + 1}`}
                  onClick={() => onListChange('experiences', form.experiences.filter((_, itemIndex) => itemIndex !== index))}
                />
              </div>
              <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
                <Field label="Title" name={`experiences.${index}.title`} onChange={onFieldChange} placeholder="Frontend developer" required value={experience.title} />
                <Field label="Company" name={`experiences.${index}.company`} onChange={onFieldChange} placeholder="Company name" required value={experience.company} />
                <Field label="Period" name={`experiences.${index}.period`} onChange={onFieldChange} placeholder="June 2026 – Present" required value={experience.period} />
                <Field label="Duration" name={`experiences.${index}.duration`} onChange={onFieldChange} placeholder="5+ months" value={experience.duration} />
                <Field label="Technology" name={`experiences.${index}.technology`} onChange={onFieldChange} placeholder="Shopify" value={experience.technology} />
                <Field
                  as="textarea"
                  className="md:col-span-2"
                  label="Description"
                  name={`experiences.${index}.description`}
                  onChange={onFieldChange}
                  placeholder="Describe your work and impact"
                  rows={3}
                  value={experience.description}
                />
              </div>
            </article>
          ))}
        </div>
        <AddButton
          onClick={() => onListChange('experiences', [...form.experiences, { title: '', company: '', period: '', duration: '', description: '', technology: '' }])}
        >
          Add experience
        </AddButton>
      </Section>
    </div>
  )
}
