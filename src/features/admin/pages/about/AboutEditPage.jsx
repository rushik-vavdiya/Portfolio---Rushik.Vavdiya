import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AboutEntryTabs from '../../components/AboutEntryTabs.jsx'
import AboutFormActions from '../../components/AboutFormActions.jsx'
import AboutFormFields from '../../components/AboutFormFields.jsx'
import useToast from '../../../../components/ui/useToast.js'
import { toAboutForm, toAboutPayload } from '../../data/aboutForm.js'
import {
  fetchAllAbout,
  updateAboutRecord,
} from '../../slices/about/aboutSlice.js'

const setPath = (object, path, value) => {
  const keys = path.split('.')
  const result = structuredClone(object)
  let current = result
  for (const key of keys.slice(0, -1)) current = current[key]
  current[keys[keys.length - 1]] = value
  return result
}
const getId = (about) => String(about?._id ?? about?.id ?? '')

export default function AboutEditPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { aboutId: routeAboutId } = useParams()
  const { dismissAll, notify } = useToast()
  const { items, requests } = useSelector((state) => state.about)
  const [draft, setDraft] = useState(null)
  const resolvedId = items.some((item) => getId(item) === routeAboutId)
    ? routeAboutId
    : String(getId(items[0]))
  const about = items.find((item) => getId(item) === resolvedId)
  const form = about
    ? draft?.aboutId === resolvedId
      ? draft.values
      : toAboutForm(about)
    : null
  const isLoading = requests.all.status === 'loading'
  const isSaving = requests.update.status === 'loading'

  useEffect(() => {
    dispatch(fetchAllAbout())
  }, [dispatch])

  useEffect(() => {
    if (!requests.all.error) return
    notify(requests.all.error, {
      type: 'error',
      duration: 0,
      action: { label: 'Retry', onClick: () => dispatch(fetchAllAbout()) },
    })
  }, [dispatch, notify, requests.all.error])

  const updateField = (event) => {
    if (!form) return
    setDraft({ aboutId: resolvedId, values: setPath(form, event.target.name, event.target.value) })
  }
  const updateList = (name, values) => {
    if (form) setDraft({ aboutId: resolvedId, values: { ...form, [name]: values } })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!about || !form) return
    const result = await dispatch(updateAboutRecord({
      aboutId: getId(about),
      aboutData: toAboutPayload(form),
    }))
    if (updateAboutRecord.fulfilled.match(result)) {
      setDraft(null)
      notify('About changes saved.')
    } else {
      notify(result.payload ?? result.error.message ?? 'Unable to save About changes.', { type: 'error' })
    }
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 sm:space-y-6">
      <header className="rounded-3xl border border-[var(--site-border-soft)] bg-[linear-gradient(125deg,var(--site-panel-surface),var(--site-black)_72%)] p-5 sm:p-7">
        <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[var(--site-accent-light)]">Home Page / About</p>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">Edit About content</h1>
        <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">Update the profile, statistics, specialties, and experience shown on the site.</p>
      </header>
      <AboutEntryTabs activeTab="all" />

      {requests.all.error && (
        <button className="rounded-lg border border-[var(--site-border-soft)] px-3 py-2 text-sm font-semibold text-[var(--site-accent-light)]" onClick={() => { dismissAll(); dispatch(fetchAllAbout()) }} type="button">
          Retry loading entries
        </button>
      )}
      {isLoading && <p className="text-sm text-[var(--site-text-muted)]">Loading About entries…</p>}
      {!isLoading && !items.length && !requests.all.error && (
        <div className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-6">
          <h2 className="mb-2 text-lg font-semibold text-[var(--site-text)]">No About entries yet</h2>
          <Link className="text-sm font-semibold text-[var(--site-accent-light)]" to="/admin/home/about/create">Create About content</Link>
        </div>
      )}
      {about && form && (
        <>
          {items.length > 1 && (
            <label className="block text-sm font-medium text-[var(--site-text-muted)]">
              About entry
              <select className="mt-2 w-full rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-black)] px-4 py-3 text-[var(--site-text)]" onChange={(event) => { setDraft(null); navigate(`/admin/home/about/edit/${event.target.value}`) }} value={resolvedId}>
                {items.map((item) => <option key={getId(item)} value={getId(item)}>{item.sectionHeader?.heading || item.name || 'About entry'}</option>)}
              </select>
            </label>
          )}
          <form className="space-y-5 pb-32" onSubmit={handleSubmit}>
            <AboutFormFields form={form} onFieldChange={updateField} onListChange={updateList} />
            <AboutFormActions isSubmitting={isSaving} submitLabel="Save About changes" />
          </form>
        </>
      )}
    </section>
  )
}
