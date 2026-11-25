import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ServicesEntryTabs from '../../components/ServicesEntryTabs.jsx'
import ServicesFormActions from '../../components/ServicesFormActions.jsx'
import ServicesFormFields from '../../components/ServicesFormFields.jsx'
import useToast from '../../../../components/ui/useToast.js'
import { toServicesForm, toServicesPayload } from '../../data/servicesForm.js'
import {
  fetchAllServices,
  updateServicesRecord,
  updateServicesStatusRecord,
} from '../../slices/services/servicesSlice.js'

const setPath = (object, path, value) => {
  const result = structuredClone(object)
  const keys = path.split('.')
  let current = result
  for (const key of keys.slice(0, -1)) current = current[key]
  current[keys[keys.length - 1]] = value
  return result
}
const getId = (service) => String(service?._id ?? service?.id ?? '')

export default function ServicesEditPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { serviceId: routeServiceId } = useParams()
  const { dismissAll, notify } = useToast()
  const { items, requests } = useSelector((state) => state.services)
  const [draft, setDraft] = useState(null)
  const resolvedId = items.some((item) => getId(item) === routeServiceId)
    ? routeServiceId
    : String(getId(items[0]))
  const service = items.find((item) => getId(item) === resolvedId)
  const form = service
    ? draft?.serviceId === resolvedId
      ? draft.values
      : toServicesForm(service)
    : null
  const isLoading = requests.all.status === 'loading'
  const isSaving = requests.update.status === 'loading'
  const isChangingStatus = requests.status.status === 'loading'

  useEffect(() => {
    dispatch(fetchAllServices())
  }, [dispatch])

  useEffect(() => {
    if (!requests.all.error) return
    notify(requests.all.error, {
      type: 'error',
      duration: 0,
      action: { label: 'Retry', onClick: () => dispatch(fetchAllServices()) },
    })
  }, [dispatch, notify, requests.all.error])

  const updateField = (event) => {
    if (!form) return
    setDraft({ serviceId: resolvedId, values: setPath(form, event.target.name, event.target.value) })
  }
  const updateList = (path, values) => {
    if (form) setDraft({ serviceId: resolvedId, values: setPath(form, path, values) })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!service || !form) return
    const result = await dispatch(updateServicesRecord({
      serviceId: getId(service),
      servicesData: toServicesPayload(form),
    }))
    if (updateServicesRecord.fulfilled.match(result)) {
      setDraft(null)
      notify('Services changes saved.')
    } else {
      notify(result.payload ?? result.error.message ?? 'Unable to save Services changes.', { type: 'error' })
    }
  }

  const handleStatusChange = async () => {
    if (!service) return
    const result = await dispatch(updateServicesStatusRecord({
      serviceId: getId(service),
      isActive: !service.isActive,
    }))
    if (updateServicesStatusRecord.fulfilled.match(result)) {
      notify(`Services ${service.isActive ? 'deactivated' : 'activated'}.`)
    } else {
      notify(result.payload ?? result.error.message ?? 'Unable to update Services status.', { type: 'error' })
    }
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 sm:space-y-6">
      <header className="rounded-3xl border border-[var(--site-border-soft)] bg-[linear-gradient(125deg,var(--site-panel-surface),var(--site-black)_72%)] p-5 sm:p-7">
        <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[var(--site-accent-light)]">Home Page / Services</p>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">Edit Services content</h1>
        <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">Update the section heading and the service cards displayed on your homepage.</p>
      </header>
      <ServicesEntryTabs activeTab="all" />

      {requests.all.error && (
        <button className="rounded-lg border border-[var(--site-border-soft)] px-3 py-2 text-sm font-semibold text-[var(--site-accent-light)]" onClick={() => { dismissAll(); dispatch(fetchAllServices()) }} type="button">
          Retry loading entries
        </button>
      )}
      {isLoading && <p className="text-sm text-[var(--site-text-muted)]">Loading Services entries…</p>}
      {!isLoading && !items.length && !requests.all.error && (
        <div className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-6">
          <h2 className="mb-2 text-lg font-semibold text-[var(--site-text)]">No Services entries yet</h2>
          <Link className="text-sm font-semibold text-[var(--site-accent-light)]" to="/admin/home/services/create">Create Services content</Link>
        </div>
      )}
      {items.length > 1 && service && (
        <label className="block text-sm font-medium text-[var(--site-text-muted)]">
          Services entry
          <select
            className="mt-2 w-full rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-black)] px-4 py-3 text-[var(--site-text)]"
            onChange={(event) => {
              setDraft(null)
              navigate(`/admin/home/services/edit/${event.target.value}`)
            }}
            value={resolvedId}
          >
            {items.map((item) => (
              <option key={getId(item)} value={getId(item)}>
                {item.sectionHeader?.heading || 'Untitled Services entry'}{item.isActive ? ' · Active' : ''}
              </option>
            ))}
          </select>
        </label>
      )}
      {service && form && (
        <div className="space-y-5">
          <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-3 transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--site-accent-light)] md:max-w-sm ${
            service.isActive
              ? 'border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)]'
              : 'border-[var(--site-border-soft)] bg-[var(--site-glass)]'
          } ${isChangingStatus ? 'cursor-wait opacity-60' : ''}`}>
            <span>
              <span className="block text-sm font-semibold text-[var(--site-text)]">{service.isActive ? 'Active on homepage' : 'Inactive'}</span>
              <span className="mt-0.5 block text-xs text-[var(--site-text-subtle)]">{isChangingStatus ? 'Updating status…' : service.isActive ? 'Visible to visitors' : 'Hidden from visitors'}</span>
            </span>
            <input
              checked={service.isActive}
              className="size-4 accent-[var(--site-accent)]"
              disabled={isChangingStatus}
              onChange={handleStatusChange}
              type="checkbox"
            />
          </label>
          <form className="space-y-5 pb-32" onSubmit={handleSubmit}>
            <ServicesFormFields form={form} onFieldChange={updateField} onListChange={updateList} />
            <ServicesFormActions isSubmitting={isSaving} submitLabel="Save Services changes" />
          </form>
        </div>
      )}
    </section>
  )
}
