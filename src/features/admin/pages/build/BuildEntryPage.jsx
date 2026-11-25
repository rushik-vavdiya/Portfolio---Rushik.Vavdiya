import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BuildEntryTabs from '../../components/BuildEntryTabs.jsx'
import BuildFormActions from '../../components/BuildFormActions.jsx'
import BuildFormFields from '../../components/BuildFormFields.jsx'
import useToast from '../../../../components/ui/useToast.js'
import { initialBuildForm, toBuildForm, toBuildPayload } from '../../data/buildForm.js'
import {
  createBuildRecord,
  fetchAllBuild,
  fetchBuildById,
  updateBuildRecord,
  updateBuildStatusRecord,
} from '../../slices/build/buildSlice.js'

const setPath = (object, path, value) => {
  const result = structuredClone(object)
  const keys = path.split('.')
  let current = result
  for (const key of keys.slice(0, -1)) current = current[key]
  current[keys[keys.length - 1]] = value
  return result
}
const getId = (entry) => String(entry?._id ?? entry?.id ?? '')

export default function BuildEntryPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { buildId: routeBuildId } = useParams()
  const { dismissAll, notify } = useToast()
  const { items, selectedBuild, requests } = useSelector((state) => state.build)
  const [draft, setDraft] = useState(null)
  const [createForm, setCreateForm] = useState(initialBuildForm)
  const isEditing = Boolean(routeBuildId)

  useEffect(() => {
    if (isEditing) dispatch(fetchAllBuild())
  }, [dispatch, isEditing])

  useEffect(() => {
    if (routeBuildId) dispatch(fetchBuildById(routeBuildId))
  }, [dispatch, routeBuildId])

  useEffect(() => {
    if (!requests.all.error) return
    notify(requests.all.error, {
      type: 'error',
      duration: 0,
      action: { label: 'Retry', onClick: () => dispatch(fetchAllBuild()) },
    })
  }, [dispatch, notify, requests.all.error])

  const resolvedId = items.some((item) => getId(item) === routeBuildId)
    ? routeBuildId
    : getId(items[0])
  const entry = items.find((item) => getId(item) === resolvedId)
  const form = isEditing
    ? entry
      ? draft?.buildId === resolvedId
        ? draft.values
        : toBuildForm(selectedBuild && getId(selectedBuild) === resolvedId ? selectedBuild : entry)
      : null
    : createForm

  const updateField = (event) => {
    if (isEditing) {
      if (!form) return
      setDraft({ buildId: resolvedId, values: setPath(form, event.target.name, event.target.value) })
    } else {
      setCreateForm((current) => setPath(current, event.target.name, event.target.value))
    }
  }
  const updateList = (path, values) => {
    if (isEditing) {
      if (form) setDraft({ buildId: resolvedId, values: setPath(form, path, values) })
    } else {
      setCreateForm((current) => setPath(current, path, values))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isEditing) {
      if (!entry || !form) return
      const result = await dispatch(updateBuildRecord({
        buildId: getId(entry),
        buildData: toBuildPayload(form),
      }))
      if (updateBuildRecord.fulfilled.match(result)) {
        setDraft(null)
        notify('Build changes saved.')
      } else {
        notify(result.payload ?? 'Unable to save Build changes.', { type: 'error' })
      }
    } else {
      const result = await dispatch(createBuildRecord(toBuildPayload(createForm)))
      if (createBuildRecord.fulfilled.match(result)) {
        setCreateForm(structuredClone(initialBuildForm))
        notify('Build entry created successfully.')
      } else {
        notify(result.payload ?? 'Unable to create the Build entry.', { type: 'error' })
      }
    }
  }

  const handleStatusChange = async () => {
    if (!entry) return
    const result = await dispatch(updateBuildStatusRecord({
      buildId: getId(entry),
      isActive: !entry.isActive,
    }))
    if (updateBuildStatusRecord.fulfilled.match(result)) {
      notify(`Build ${entry.isActive ? 'deactivated' : 'activated'}.`)
    }
  }

  const isLoading = requests.all.status === 'loading'
  const isSaving = isEditing ? requests.update.status === 'loading' : requests.create.status === 'loading'
  const isChangingStatus = requests.status.status === 'loading'

  return (
    <section className="mx-auto max-w-7xl space-y-5 sm:space-y-6">
      <header className="rounded-3xl border border-[var(--site-border-soft)] bg-[linear-gradient(125deg,var(--site-panel-surface),var(--site-black)_72%)] p-5 sm:p-7">
        <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[var(--site-accent-light)]">Home Page / Build</p>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">
          {isEditing ? 'Edit Build content' : 'Create Build content'}
        </h1>
        <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">
          {isEditing
            ? 'Update the panels, stack, principles, and process steps displayed on your homepage.'
            : 'Add the heading, panels, technologies, principles, and process stages for a new Build entry.'}
        </p>
      </header>

      <BuildEntryTabs activeTab={isEditing ? 'all' : 'create'} />

      {isEditing && requests.all.error && (
        <button
          className="rounded-lg border border-[var(--site-border-soft)] px-3 py-2 text-sm font-semibold text-[var(--site-accent-light)]"
          onClick={() => { dismissAll(); dispatch(fetchAllBuild()) }}
          type="button"
        >
          Retry loading entries
        </button>
      )}

      {isEditing && isLoading && <p className="text-sm text-[var(--site-text-muted)]">Loading Build entries…</p>}

      {isEditing && !isLoading && !items.length && !requests.all.error && (
        <div className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-6">
          <h2 className="mb-2 text-lg font-semibold text-[var(--site-text)]">No Build entries yet</h2>
          <Link className="text-sm font-semibold text-[var(--site-accent-light)]" to="/admin/home/build/create">Create Build content</Link>
        </div>
      )}

      {isEditing && items.length > 1 && entry && (
        <label className="block text-sm font-medium text-[var(--site-text-muted)]">
          Build entry
          <select
            className="mt-2 w-full rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-black)] px-4 py-3 text-[var(--site-text)]"
            onChange={(event) => { setDraft(null); navigate(`/admin/home/build/edit/${event.target.value}`) }}
            value={resolvedId}
          >
            {items.map((item) => (
              <option key={getId(item)} value={getId(item)}>
                {item.sectionHeader?.heading || 'Untitled Build entry'}{item.isActive ? ' · Active' : ''}
              </option>
            ))}
          </select>
        </label>
      )}

      {(!isEditing || (entry && form)) && (
        <div className="space-y-5">
          {isEditing && entry && (
            <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-3 transition md:max-w-sm ${
              entry.isActive
                ? 'border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)]'
                : 'border-[var(--site-border-soft)] bg-[var(--site-glass)]'
            } ${isChangingStatus ? 'cursor-wait opacity-60' : ''}`}>
              <span>
                <span className="block text-sm font-semibold text-[var(--site-text)]">{entry.isActive ? 'Active on homepage' : 'Inactive'}</span>
                <span className="mt-0.5 block text-xs text-[var(--site-text-subtle)]">{isChangingStatus ? 'Updating status…' : entry.isActive ? 'Visible to visitors' : 'Hidden from visitors'}</span>
              </span>
              <input checked={entry.isActive} className="size-4 accent-[var(--site-accent)]" disabled={isChangingStatus} onChange={handleStatusChange} type="checkbox" />
            </label>
          )}
          <form className="space-y-5 pb-32" onSubmit={handleSubmit}>
            <BuildFormFields form={form} onFieldChange={updateField} onListChange={updateList} />
            <BuildFormActions isSubmitting={isSaving} submitLabel={isEditing ? 'Save Build changes' : 'Create Build entry'} />
          </form>
        </div>
      )}
    </section>
  )
}
