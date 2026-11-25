import TextListField from './TextListField.jsx'

const inputClass = 'mt-2 w-full rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-black)] px-4 py-3 text-[var(--site-text)] outline-none transition placeholder:text-[var(--site-text-subtle)] focus:border-[var(--site-accent)]'
const selectClass = `${inputClass} [&>option]:bg-[var(--site-black)] [&>option]:text-[var(--site-text)]`
const labelClass = 'block text-sm font-medium text-[var(--site-text-muted)]'
const removeButtonClass = 'inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-2 text-xs font-semibold text-[var(--site-text-subtle)] transition hover:border-[var(--site-border-soft)] hover:bg-[var(--site-glass-hover)] hover:text-[var(--site-accent-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-accent-light)]'
const addButtonClass = 'mt-4 inline-flex items-center gap-2 rounded-xl border border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)]/40 px-4 py-2.5 text-sm font-semibold text-[var(--site-accent-light)] transition hover:bg-[var(--site-accent-wash)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-accent-light)]'
const availabilityOptions = [
  { value: 'open', label: 'Open', description: 'Available for projects', indicator: 'bg-[var(--site-status-green)]' },
  { value: 'busy', label: 'Busy', description: 'Limited availability', indicator: 'bg-[var(--site-status-yellow)]' },
  { value: 'closed', label: 'Closed', description: 'Not taking projects', indicator: 'bg-[var(--site-status-red)]' },
]
const updateObjectItem = (items, index, field, value) =>
  items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item)

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

function FormSection({ children, description, number, title }) {
  return (
    <section className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-5 sm:p-6">
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

export default function HeroFormFields({
  form,
  idPrefix,
  onFieldChange,
  onListChange,
}) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <FormSection
        description="Set the main heading and supporting copy for this Hero entry."
        number="01"
        title="Hero content"
      >
        <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
          <label className={`${labelClass} md:col-span-2`} htmlFor={`${idPrefix}-eyebrow`}>
            Eyebrow
            <input
              className={inputClass}
              id={`${idPrefix}-eyebrow`}
              name="eyebrow"
              onChange={onFieldChange}
              placeholder="A short introduction"
              value={form.eyebrow}
            />
          </label>
          <label className={labelClass} htmlFor={`${idPrefix}-heading`}>
            Heading
            <input
              className={inputClass}
              id={`${idPrefix}-heading`}
              name="heading"
              onChange={onFieldChange}
              placeholder="Your main headline"
              required
              value={form.heading}
            />
          </label>
          <label className={labelClass} htmlFor={`${idPrefix}-highlight-heading`}>
            Highlight heading
            <input
              className={inputClass}
              id={`${idPrefix}-highlight-heading`}
              name="highlightHeading"
              onChange={onFieldChange}
              placeholder="The highlighted part"
              value={form.highlightHeading}
            />
          </label>
          <label className={`${labelClass} md:col-span-2`} htmlFor={`${idPrefix}-description`}>
            Description
            <textarea
              className={`${inputClass} min-h-32 resize-y leading-6`}
              id={`${idPrefix}-description`}
              name="description"
              onChange={onFieldChange}
              placeholder="Briefly describe what you offer"
              rows={4}
              value={form.description}
            />
          </label>
        </div>
      </FormSection>

      <FormSection
        description="Choose the status and the message visitors should see."
        number="02"
        title="Availability"
      >
        <div className="grid gap-6">
          <fieldset className="m-0 min-w-0 border-0 p-0">
            <legend className={labelClass}>Availability status</legend>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {availabilityOptions.map((option) => {
                const isSelected = form.availabilityStatus === option.value
                return (
                  <label
                    className={`relative flex min-h-[76px] cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--site-accent-light)] ${
                      isSelected
                        ? 'border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)] shadow-[inset_0_0_0_1px_var(--site-accent-glow)]'
                        : 'border-[var(--site-border-soft)] bg-[var(--site-black)] hover:border-[var(--site-border)] hover:bg-[var(--site-glass)]'
                    }`}
                    htmlFor={`${idPrefix}-availability-${option.value}`}
                    key={option.value}
                  >
                    <input
                      checked={isSelected}
                      className="sr-only"
                      id={`${idPrefix}-availability-${option.value}`}
                      name="availabilityStatus"
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
          <label className={labelClass} htmlFor={`${idPrefix}-availability-message`}>
            Availability message
            <input
              className={inputClass}
              id={`${idPrefix}-availability-message`}
              name="availabilityMessage"
              onChange={onFieldChange}
              placeholder="Available for new projects"
              value={form.availabilityMessage}
            />
          </label>
        </div>
      </FormSection>

      <TextListField
        addButtonLabel="Add phrase"
        description="Add one phrase per row. These phrases rotate in the Hero content."
        id={`${idPrefix}-rotating-text`}
        itemLabel="phrase"
        items={form.rotatingText}
        label="Rotating text"
        number="03"
        onChange={(items) => onListChange('rotatingText', items)}
        placeholder="Enter a phrase"
      />

      <TextListField
        addButtonLabel="Add skill"
        description="List the skills or technologies you want to highlight."
        id={`${idPrefix}-skills`}
        itemLabel="skill"
        items={form.skills}
        label="Skills"
        number="04"
        onChange={(items) => onListChange('skills', items)}
        placeholder="Enter a skill"
      />

      <FormSection
        description="Configure the call-to-action buttons shown below the Hero content."
        number="05"
        title="Buttons"
      >
        <div className="space-y-3">
          {!form.buttons.length && (
            <div className="flex min-h-20 items-center gap-3 rounded-xl border border-dashed border-[var(--site-border)] bg-[var(--site-glass)] px-4 py-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--site-accent-wash)] text-[var(--site-accent-light)]">
                <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
              <div>
                <p className="m-0 text-sm font-medium text-[var(--site-text)]">No custom buttons</p>
                <p className="mb-0 mt-1 text-xs text-[var(--site-text-subtle)]">Add a call to action for your visitors.</p>
              </div>
            </div>
          )}
          {form.buttons.map((button, index) => (
            <div className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-4 transition hover:border-[var(--site-accent-glow)] sm:p-5" key={`${idPrefix}-button-${index}`}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--site-accent-wash)] px-2.5 py-1.5 text-xs font-semibold text-[var(--site-accent-light)]">
                  <span className="size-1.5 rounded-full bg-[var(--site-accent)]" />
                  Button {String(index + 1).padStart(2, '0')}
                </span>
                <RemoveButton
                  label={`button ${index + 1}`}
                  onClick={() => onListChange('buttons', form.buttons.filter((_, itemIndex) => itemIndex !== index))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_12rem]">
                <label className={labelClass} htmlFor={`${idPrefix}-button-label-${index}`}>
                  Label
                  <input
                    className={inputClass}
                    id={`${idPrefix}-button-label-${index}`}
                    onChange={(event) => onListChange('buttons', updateObjectItem(form.buttons, index, 'label', event.target.value))}
                    placeholder="Start a project"
                    required
                    value={button.label}
                  />
                </label>
                <label className={labelClass} htmlFor={`${idPrefix}-button-link-${index}`}>
                  Link
                  <input
                    className={inputClass}
                    id={`${idPrefix}-button-link-${index}`}
                    onChange={(event) => onListChange('buttons', updateObjectItem(form.buttons, index, 'link', event.target.value))}
                    placeholder="/contact"
                    required
                    value={button.link}
                  />
                </label>
                <label className={labelClass} htmlFor={`${idPrefix}-button-type-${index}`}>
                  Style
                  <select
                    className={selectClass}
                    id={`${idPrefix}-button-type-${index}`}
                    onChange={(event) => onListChange('buttons', updateObjectItem(form.buttons, index, 'buttonType', event.target.value))}
                    value={button.buttonType}
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </label>
              </div>
            </div>
          ))}
        </div>
        <AddButton
          onClick={() => onListChange('buttons', [...form.buttons, { label: '', link: '', buttonType: form.buttons.length ? 'secondary' : 'primary' }])}
        >
          Add button
        </AddButton>
      </FormSection>

      <FormSection
        description="Add the floating feature cards displayed around the Hero section."
        number="06"
        title="Floating cards"
      >
        <div className="space-y-3">
          {!form.floatingCard.length && (
            <div className="flex min-h-20 items-center gap-3 rounded-xl border border-dashed border-[var(--site-border)] bg-[var(--site-glass)] px-4 py-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--site-accent-wash)] text-[var(--site-accent-light)]">
                <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
                  <path d="M4 5h7v7H4zM13 5h7v4h-7zM13 11h7v8h-7zM4 14h7v5H4z" />
                </svg>
              </span>
              <div>
                <p className="m-0 text-sm font-medium text-[var(--site-text)]">No custom floating cards</p>
                <p className="mb-0 mt-1 text-xs text-[var(--site-text-subtle)]">Add feature cards to highlight your strengths.</p>
              </div>
            </div>
          )}
          {form.floatingCard.map((card, index) => (
            <div className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-4 transition hover:border-[var(--site-accent-glow)] sm:p-5" key={`${idPrefix}-card-${index}`}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--site-accent-wash)] px-2.5 py-1.5 text-xs font-semibold text-[var(--site-accent-light)]">
                  <span className="size-1.5 rounded-full bg-[var(--site-accent)]" />
                  Card {String(index + 1).padStart(2, '0')}
                </span>
                <RemoveButton
                  label={`floating card ${index + 1}`}
                  onClick={() => onListChange('floatingCard', form.floatingCard.filter((_, itemIndex) => itemIndex !== index))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className={labelClass} htmlFor={`${idPrefix}-card-title-${index}`}>
                  Title
                  <input
                    className={inputClass}
                    id={`${idPrefix}-card-title-${index}`}
                    onChange={(event) => onListChange('floatingCard', updateObjectItem(form.floatingCard, index, 'title', event.target.value))}
                    placeholder="Fast & responsive"
                    required
                    value={card.title}
                  />
                </label>
                <label className={labelClass} htmlFor={`${idPrefix}-card-description-${index}`}>
                  Description
                  <input
                    className={inputClass}
                    id={`${idPrefix}-card-description-${index}`}
                    onChange={(event) => onListChange('floatingCard', updateObjectItem(form.floatingCard, index, 'description', event.target.value))}
                    placeholder="Every screen size"
                    value={card.description}
                  />
                </label>
                <label className={labelClass} htmlFor={`${idPrefix}-card-icon-${index}`}>
                  Icon
                  <input
                    className={inputClass}
                    id={`${idPrefix}-card-icon-${index}`}
                    onChange={(event) => onListChange('floatingCard', updateObjectItem(form.floatingCard, index, 'icon', event.target.value))}
                    placeholder="⚡ or &lt;/&gt;"
                    value={card.icon}
                  />
                </label>
                <label className={labelClass} htmlFor={`${idPrefix}-card-image-${index}`}>
                  Image URL (optional)
                  <input
                    className={inputClass}
                    id={`${idPrefix}-card-image-${index}`}
                    onChange={(event) => onListChange('floatingCard', updateObjectItem(form.floatingCard, index, 'image', event.target.value))}
                    placeholder="/images/feature.png"
                    value={card.image}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
        <AddButton
          onClick={() => onListChange('floatingCard', [...form.floatingCard, { title: '', description: '', image: '', icon: '' }])}
        >
          Add floating card
        </AddButton>
      </FormSection>
    </div>
  )
}
