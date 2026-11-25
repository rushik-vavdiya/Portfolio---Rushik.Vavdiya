import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServicesEntryTabs from '../../components/ServicesEntryTabs.jsx'
import ServicesFormActions from '../../components/ServicesFormActions.jsx'
import ServicesFormFields from '../../components/ServicesFormFields.jsx'
import useToast from '../../../../components/ui/useToast.js'
import { initialServicesForm, toServicesPayload } from '../../data/servicesForm.js'
import { createServicesRecord } from '../../slices/services/servicesSlice.js'

export default function ServicesCreatePage() {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.services.requests.create)
  const { notify } = useToast()
  const [form, setForm] = useState(initialServicesForm)
  const isSubmitting = status === 'loading'

  const setPath = (object, path, value) => {
    const result = structuredClone(object)
    const keys = path.split('.')
    let current = result
    for (const key of keys.slice(0, -1)) current = current[key]
    current[keys[keys.length - 1]] = value
    return result
  }

  const updateField = (event) => {
    setForm((current) => setPath(current, event.target.name, event.target.value))
  }

  const updateList = (path, items) => {
    setForm((current) => setPath(current, path, items))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await dispatch(createServicesRecord(toServicesPayload(form)))
    if (createServicesRecord.fulfilled.match(result)) {
      setForm(structuredClone(initialServicesForm))
      notify('Services entry created successfully.')
    } else {
      notify(result.payload ?? result.error.message ?? 'Unable to create the Services entry.', { type: 'error' })
    }
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 sm:space-y-6">
      <header className="rounded-3xl border border-[var(--site-border-soft)] bg-[linear-gradient(125deg,var(--site-panel-surface),var(--site-black)_72%)] p-5 sm:p-7">
        <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[var(--site-accent-light)]">Home Page / Services</p>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">Create Services content</h1>
        <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">Add the section heading, service descriptions, features, and buttons.</p>
      </header>
      <ServicesEntryTabs activeTab="create" />
      <form className="space-y-5 pb-32" onSubmit={handleSubmit}>
        <ServicesFormFields form={form} onFieldChange={updateField} onListChange={updateList} />
        <ServicesFormActions isSubmitting={isSubmitting} submitLabel="Create Services entry" />
      </form>
    </section>
  )
}
