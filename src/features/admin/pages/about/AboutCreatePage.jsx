import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AboutEntryTabs from '../../components/AboutEntryTabs.jsx'
import AboutFormActions from '../../components/AboutFormActions.jsx'
import AboutFormFields from '../../components/AboutFormFields.jsx'
import useToast from '../../../../components/ui/useToast.js'
import { initialAboutForm, toAboutPayload } from '../../data/aboutForm.js'
import { createAboutRecord } from '../../slices/about/aboutSlice.js'

const setPath = (object, path, value) => {
  const keys = path.split('.')
  const result = structuredClone(object)
  let current = result
  for (const key of keys.slice(0, -1)) {
    current = current[key]
  }
  current[keys[keys.length - 1]] = value
  return result
}

export default function AboutCreatePage() {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.about.requests.create)
  const { notify } = useToast()
  const [form, setForm] = useState(initialAboutForm)
  const isSubmitting = status === 'loading'

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => setPath(current, name, value))
  }
  const updateList = (name, items) => setForm((current) => ({ ...current, [name]: items }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await dispatch(createAboutRecord(toAboutPayload(form)))
    if (createAboutRecord.fulfilled.match(result)) {
      notify('About entry created successfully.')
      setForm(initialAboutForm)
    } else {
      notify(result.payload ?? result.error.message ?? 'Unable to create the About entry.', { type: 'error' })
    }
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 sm:space-y-6">
      <header className="rounded-3xl border border-[var(--site-border-soft)] bg-[linear-gradient(125deg,var(--site-panel-surface),var(--site-black)_72%)] p-5 sm:p-7">
        <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[var(--site-accent-light)]">Home Page / About</p>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">Create About content</h1>
        <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">Add profile details, statistics, specialties, and experience entries.</p>
      </header>
      <AboutEntryTabs activeTab="create" />
      <form className="space-y-5 pb-32" onSubmit={handleSubmit}>
        <AboutFormFields form={form} onFieldChange={updateField} onListChange={updateList} />
        <AboutFormActions isSubmitting={isSubmitting} submitLabel="Create About entry" />
      </form>
    </section>
  )
}
