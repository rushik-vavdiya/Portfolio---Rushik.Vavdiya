import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useToast from '../../../../components/ui/useToast.js'
import BuildEntryTabs from '../../components/BuildEntryTabs.jsx'
import {
  deleteBuildRecord,
  fetchAllBuild,
  updateBuildStatusRecord,
} from '../../slices/build/buildSlice.js'

const getId = (entry) => String(entry?._id ?? entry?.id ?? '')

export default function BuildSectionPage() {
  const dispatch = useDispatch()
  const { notify } = useToast()
  const { items, requests } = useSelector((state) => state.build)
  const [confirmingId, setConfirmingId] = useState('')

  useEffect(() => { dispatch(fetchAllBuild()) }, [dispatch])

  const changeStatus = async (entry) => {
    const result = await dispatch(updateBuildStatusRecord({ buildId: getId(entry), isActive: !entry.isActive }))
    if (updateBuildStatusRecord.fulfilled.match(result)) notify(entry.isActive ? 'Build entry deactivated.' : 'Build entry activated.')
  }

  const remove = async (entry) => {
    const result = await dispatch(deleteBuildRecord(getId(entry)))
    if (deleteBuildRecord.fulfilled.match(result)) {
      setConfirmingId('')
      notify('Build entry deleted.')
    }
  }

  return (
    <section className="space-y-5">
      <header className="rounded-3xl border border-[var(--site-border-soft)] bg-[linear-gradient(125deg,var(--site-panel-surface),var(--site-black)_72%)] p-5 sm:p-7">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[var(--site-accent-light)]">Home Page / Build</p>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">Build entries</h1>
          <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">
            Manage the Build heading, panels, technology stack, principles, and process steps.
          </p>
        </div>
      </header>

      <BuildEntryTabs activeTab="all" />

      {!items.length && requests.all.status !== 'loading' && (
        <div className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-6 sm:p-8">
          <h3 className="mb-2 text-lg font-semibold text-[var(--site-text)]">No Build entries yet</h3>
          <p className="mb-5 text-sm leading-6 text-[var(--site-text-muted)]">
            Create an entry to manage the public Build section.
          </p>
          <Link
            className="inline-flex items-center rounded-xl bg-[var(--site-accent)] px-4 py-3 text-sm font-semibold text-[var(--site-black)] transition hover:brightness-110"
            to="/admin/home/build/create"
          >
            Create Build entry
          </Link>
        </div>
      )}

      {!!items.length && (
        <div className="overflow-hidden rounded-2xl border border-[var(--site-border-soft)]">
          <table className="w-full border-collapse text-left">
            <thead><tr className="border-b border-[var(--site-border-soft)] text-xs uppercase text-[var(--site-text-subtle)]"><th className="px-5 py-4">Entry</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Actions</th></tr></thead>
            <tbody>
              {items.map((entry) => {
                const id = getId(entry)
                return (
                  <tr className="border-b border-[var(--site-border-soft)]" key={id}>
                    <td className="px-5 py-4"><p className="font-semibold text-[var(--site-text)]">{entry.sectionHeader?.heading || 'Untitled Build'}</p><p className="text-xs text-[var(--site-text-subtle)]">{entry.sectionHeader?.description}</p></td>
                    <td className="px-5 py-4"><button type="button" className={`rounded-full px-3 py-1 text-xs font-semibold ${entry.isActive ? 'bg-[var(--site-accent-wash)] text-[var(--site-accent-light)]' : 'border border-[var(--site-border-soft)] text-[var(--site-text-muted)]'}`} onClick={() => changeStatus(entry)}>{entry.isActive ? 'Active' : 'Inactive'}</button></td>
                    <td className="px-5 py-4 text-right">
                      <Link className="mr-2 rounded-lg border border-[var(--site-border-soft)] px-3 py-2 text-xs font-semibold text-[var(--site-text)]" to={`/admin/home/build/edit/${id}`}>Edit</Link>
                      {confirmingId === id
                        ? <><button type="button" className="mr-2 text-xs font-bold text-red-400" onClick={() => remove(entry)}>Confirm</button><button type="button" className="text-xs text-[var(--site-text-muted)]" onClick={() => setConfirmingId('')}>Cancel</button></>
                        : <button type="button" className="rounded-lg border border-red-400/25 px-3 py-2 text-xs font-semibold text-red-400" onClick={() => setConfirmingId(id)}>Delete</button>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
