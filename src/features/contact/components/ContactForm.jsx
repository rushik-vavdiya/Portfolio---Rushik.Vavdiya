import { useState } from 'react'
import Button from '../../../components/ui/Button.jsx'
import useToast from '../../../components/ui/useToast.js'
import { site } from '../../../data/siteConfig.js'

const { contact, contactPage } = site
const labels = contactPage.formLabels

/* ---------- styles (unchanged look, defined once) ---------- */

const styles = {
  form: 'relative isolate overflow-hidden rounded-[20px] border border-[rgb(var(--site-accent-rgb)/0.2)] sm:rounded-[24px] bg-[linear-gradient(145deg,rgb(var(--site-black-rgb)/0.92),rgb(var(--site-black-rgb)/0.96))] p-4 shadow-[0_30px_80px_-38px_rgb(var(--site-accent-rgb)/0.2),inset_0_1px_0_rgb(var(--site-white-rgb)/0.2)] sm:p-7 lg:p-8',
  formModal: 'border-0 bg-transparent p-0 shadow-none',
  header: 'mb-5 flex items-start justify-between gap-4 border-b border-[rgb(var(--site-accent-rgb)/0.2)] pb-4 sm:mb-6 sm:pb-5',
  eyebrow: 'text-[9px] font-bold tracking-[.18em] text-[var(--site-accent)] uppercase',
  title: 'mt-2 text-[clamp(1.35rem,3vw,1.8rem)] font-bold leading-[1.15] tracking-[-.035em] text-white',
  titleAccent: 'bg-gradient-to-r from-[var(--site-accent)] to-[var(--site-accent)] bg-clip-text text-transparent',
  badge: 'hidden shrink-0 rounded-full border border-[rgb(var(--site-accent-bright-rgb)/0.2)] bg-[rgb(var(--site-accent-bright-rgb)/0.2)] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.12em] text-[var(--site-white)] sm:inline-flex',
  intro: 'mb-5 text-[.86rem] leading-[1.65] text-[var(--site-white)]',
  grid: 'grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4',
  gridModal: 'gap-x-3 gap-y-3.5 sm:gap-x-4 sm:gap-y-3',
  label: 'grid gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--site-white)]',
  control: 'contact-field min-w-0 w-full rounded-[10px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-white-rgb)/0.2)] px-3.5 py-2 text-base sm:text-[.82rem] text-[var(--site-text)] outline-none transition-[border-color,background,box-shadow] placeholder:text-[var(--site-text-muted)] hover:border-[rgb(var(--site-accent-rgb)/0.2)] focus:border-[var(--site-accent)] focus:bg-[rgb(var(--site-accent-rgb)/0.2)] focus:shadow-[0_0_0_3px_rgb(var(--site-accent-rgb)/0.2)] focus-visible:outline-none focus-visible:ring-0 normal-case tracking-normal [&>option]:bg-[var(--site-bg)] [&>option]:text-[var(--site-text)]',
}

/* ---------- helpers ---------- */

/** Turns the submitted form into a prefilled mailto: link. */
function buildMailtoUrl(formData) {
  const body = [
    `Name: ${formData.get('name')}`,
    `Email: ${formData.get('email')}`,
    `Phone: ${formData.get('phone') || 'Not provided'}`,
    `Service: ${formData.get('service')}`,
    `Budget: ${formData.get('budget') || 'To be discussed'}`,
    '',
    formData.get('message'),
  ].join('\n')

  const subject = encodeURIComponent(contactPage.callSubject)
  return `mailto:${contact.email}?subject=${subject}&body=${encodeURIComponent(body)}`
}

/* ---------- small building blocks ---------- */

/** Label + control pair. `wide` makes the field span both columns. */
function Field({ label, wide = false, children }) {
  return (
    <label className={`${styles.label} ${wide ? 'sm:col-span-2' : ''}`}>
      <span>{label}</span>
      {children}
    </label>
  )
}

function FormHeader() {
  return (
    <header className={styles.header}>
      <div>
        <span className={styles.eyebrow}>Project enquiry</span>
        <h2 className={styles.title}>
          {contactPage.formTitle} <span className={styles.titleAccent}>{contactPage.formTitleAccent}</span>
        </h2>
      </div>
      <span className={styles.badge}>Available</span>
    </header>
  )
}

/* ---------- main component ---------- */

/** Validates a project enquiry and prepares it in the visitor's email app. */
export default function ContactForm({ modal = false, id = 'contact-form', className = '' }) {
  const { notify } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const canSubmit = Boolean(contact.email)
  const introId = `${id}-intro`

  // Shared sizing for every control; the modal variant is more compact.
  const control = `${styles.control} ${modal ? 'h-11 sm:h-10' : 'h-12'}`
  const textarea = `${styles.control} ${modal ? 'h-[112px] min-h-[112px]' : 'min-h-36'} resize-y`

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    setSubmitting(true)
    notify(`${labels.success} ${contactPage.description}`)
    window.location.href = buildMailtoUrl(new FormData(event.currentTarget))
    window.setTimeout(() => setSubmitting(false), 900)
  }

  const submitLabel = submitting
    ? 'Preparing enquiry...'
    : canSubmit
      ? `${labels.submit} ↗`
      : 'Enquiry form unavailable'

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      aria-describedby={modal ? undefined : introId}
      aria-busy={submitting}
      data-scroll-reveal={modal ? undefined : ''}
      className={`${styles.form} ${modal ? styles.formModal : ''} ${className}`}
    >
      {!modal && (
        <>
          <FormHeader />
          <p id={introId} className={styles.intro}>
            {canSubmit
              ? contactPage.formDescription
              : 'Add your email address in the site settings to enable project enquiries.'}
          </p>
        </>
      )}

      <fieldset disabled={!canSubmit} className={`${styles.grid} ${modal ? styles.gridModal : ''} min-w-0 border-0 p-0 m-0`}>
        <legend className="sr-only">Project enquiry details</legend>

        <Field label={labels.name}>
          <input className={control} name="name" autoComplete="name" placeholder={labels.namePlaceholder} required />
        </Field>

        <Field label={labels.email}>
          <input className={control} name="email" type="email" autoComplete="email" placeholder={labels.emailPlaceholder} required />
        </Field>

        <Field label={labels.phone}>
          <input className={control} name="phone" type="tel" autoComplete="tel" placeholder={labels.phonePlaceholder} />
        </Field>

        <Field label={labels.service}>
          <select className={control} name="service" defaultValue="" required>
            <option value="" disabled>{labels.servicePlaceholder}</option>
            {contactPage.serviceOptions.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </Field>

        <Field label={labels.budget} wide>
          <select className={control} name="budget" defaultValue="">
            <option value="">To be discussed</option>
            {contact.budgetOptions.map((option, index) => (
              <option key={`${option}-${index}`}>{option}</option>
            ))}
          </select>
        </Field>

        <Field label={labels.message} wide>
          <textarea
            className={textarea}
            name="message"
            rows={modal ? 4 : 5}
            placeholder={labels.messagePlaceholder}
            minLength={20}
            required
          />
        </Field>
      </fieldset>

      <div className={modal ? 'mt-4 border-t border-[rgb(var(--site-accent-rgb)/0.12)] pt-4' : 'mt-5'}>
        <Button
          asButton
          type="submit"
          loading={submitting}
          disabled={!canSubmit}
          label={submitLabel}
          className={modal ? 'min-h-12 w-full rounded-[12px]' : 'w-full rounded-xl'}
        />
      </div>

    </form>
  )
}