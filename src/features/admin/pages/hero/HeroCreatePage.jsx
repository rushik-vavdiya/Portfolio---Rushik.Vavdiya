import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeroEntryTabs from '../../components/HeroEntryTabs.jsx'
import HeroFormActions from '../../components/HeroFormActions.jsx'
import HeroFormFields from '../../components/HeroFormFields.jsx'
import useToast from '../../../../components/ui/useToast.js'
import { createHeroRecord } from '../../slices/hero/heroSlice.js'

const initialForm = {
  eyebrow: '',
  heading: '',
  highlightHeading: '',
  description: '',
  availabilityStatus: 'open',
  availabilityMessage: 'Available for new projects',
  rotatingText: [],
  skills: [],
  buttons: [],
  floatingCard: [],
}

export default function HeroCreatePage() {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.hero.requests.create)
  const { notify } = useToast()
  const [form, setForm] = useState(initialForm)
  const isSubmitting = status === 'loading'

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const updateList = (name, items) => {
    setForm((current) => ({ ...current, [name]: items }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const result = await dispatch(createHeroRecord({
      availablity: {
        status: form.availabilityStatus,
        message: form.availabilityMessage.trim(),
      },
      sectionHeader: {
        eyebrow: form.eyebrow.trim(),
        heading: form.heading.trim(),
        highlightHeading: form.highlightHeading.trim(),
        description: form.description.trim(),
      },
      rotatingText: form.rotatingText.map((item) => item.trim()).filter(Boolean),
      skills: form.skills.map((item) => item.trim()).filter(Boolean),
      buttons: form.buttons
        .map((button) => ({ ...button, label: button.label.trim(), link: button.link.trim() }))
        .filter((button) => button.label && button.link),
      floatingCard: form.floatingCard
        .map((card) => ({
          ...card,
          title: card.title.trim(),
          description: card.description.trim(),
          image: card.image.trim(),
          icon: card.icon.trim(),
        }))
        .filter((card) => card.title),
    }))

    if (createHeroRecord.fulfilled.match(result)) {
      setForm(initialForm)
      notify('Hero entry created successfully.')
    } else if (createHeroRecord.rejected.match(result)) {
      notify(result.payload ?? result.error.message ?? 'Unable to create the Hero entry.', { type: 'error' })
    }
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 sm:space-y-6">
      <header className="flex flex-col gap-5 rounded-3xl border border-[var(--site-border-soft)] bg-[linear-gradient(125deg,var(--site-panel-surface),var(--site-black)_72%)] p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[var(--site-accent-light)]">
            Home Page / Hero
          </p>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">
            Create Hero content
          </h1>
          <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">
            Add the copy, availability, rotating phrases, skills, buttons, and floating cards for a new Hero entry.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--site-border-soft)] bg-[var(--site-glass)] px-3.5 py-2 text-xs font-medium text-[var(--site-text-muted)]">
          <span className="size-2 rounded-full bg-[var(--site-accent)]" />
          New entry
        </span>
      </header>

      <HeroEntryTabs activeTab="create" />

      <form className="space-y-5 pb-32" onSubmit={handleSubmit}>
        <HeroFormFields
          form={form}
          idPrefix="create-hero"
          onFieldChange={updateField}
          onListChange={updateList}
        />

        <HeroFormActions
          isSubmitting={isSubmitting}
          pendingLabel="Creating…"
          submitLabel="Create Hero entry"
        />
      </form>
    </section>
  )
}
