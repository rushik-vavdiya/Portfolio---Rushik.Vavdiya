import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useToast from '../../../../components/ui/useToast.js'
import AboutEntryTabs from '../../components/AboutEntryTabs.jsx'
import {
  deleteAboutRecord,
  fetchAllAbout,
  updateAboutStatusRecord,
} from '../../slices/about/aboutSlice.js'

const getId = (about) => String(about?._id ?? about?.id ?? '')

export default function AboutSectionPage() {
  const dispatch = useDispatch()
  const { dismissAll, notify } = useToast()
  const { items, requests } = useSelector((state) => state.about)
  const [confirmingId, setConfirmingId] = useState('')
  const isLoading = requests.all.status === 'loading'
  const activeCount = items.filter((item) => item.isActive).length

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

  const changeStatus = async (about) => {
    const result = await dispatch(updateAboutStatusRecord({ aboutId: getId(about), isActive: !about.isActive }))
    if (updateAboutStatusRecord.fulfilled.match(result)) {
      notify(`About ${about.isActive ? 'deactivated' : 'activated'}.`)
    } else {
      notify(result.payload ?? result.error.message ?? 'Unable to update About status.', { type: 'error' })
    }
  }

  const removeAbout = async (aboutId) => {
    const result = await dispatch(deleteAboutRecord(aboutId))
    if (deleteAboutRecord.fulfilled.match(result)) {
      setConfirmingId('')
      notify('About entry deleted.')
    } else {
      notify(result.payload ?? result.error.message ?? 'Unable to delete the About entry.', { type: 'error' })
    }
  }

  return (
    <section className="space-y-5 sm:space-y-6">
      <header className="flex flex-col gap-5 rounded-3xl border border-[var(--site-border-soft)] bg-[linear-gradient(125deg,var(--site-panel-surface),var(--site-black)_72%)] p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[var(--site-accent-light)]">Home Page / About</p>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">About entries</h1>
          <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">Manage profile information, statistics, specialties, and experience.</p>
        </div>
        <span className="rounded-xl border border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)] px-3.5 py-2.5 text-xs font-semibold text-[var(--site-accent-light)]">{activeCount} active</span>
      </header>

      <AboutEntryTabs activeTab="all" />
      {requests.all.error && <button className="rounded-lg border border-[var(--site-border-soft)] px-3 py-2 text-sm font-semibold text-[var(--site-accent-light)]" onClick={() => { dismissAll(); dispatch(fetchAllAbout()) }} type="button">Retry loading entries</button>}
      {isLoading && !items.length && <p className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-5 text-sm text-[var(--site-text-muted)]">Loading About entries…</p>}
      {!isLoading && !items.length && !requests.all.error && (
        <div className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-6 sm:p-8">
          <h3 className="mb-2 text-lg font-semibold text-[var(--site-text)]">No About entries yet</h3>
          <p className="mb-5 text-sm text-[var(--site-text-muted)]">Create an entry to manage the public About section.</p>
          <Link className="rounded-xl bg-[var(--site-accent)] px-4 py-3 text-sm font-semibold text-[var(--site-black)]" to="/admin/home/about/create">Create About entry</Link>
        </div>
      )}
      {!!items.length && (
        <div className="overflow-x-auto rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)]">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead><tr className="border-b border-[var(--site-border-soft)] text-[.65rem] font-bold uppercase tracking-[.16em] text-[var(--site-text-subtle)]"><th className="px-5 py-4">Profile</th><th className="px-4 py-4">Status</th><th className="px-4 py-4">Content</th><th className="px-5 py-4 text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-[var(--site-border-soft)]">
              {items.map((about) => {
                const id = getId(about)
                const confirming = confirmingId === id
                return (
                  <tr className="hover:bg-[var(--site-glass-hover)]" key={id}>
                    <td className="px-5 py-4"><p className="m-0 text-sm font-semibold text-[var(--site-text)]">{about.name}</p><p className="mb-0 mt-1 text-xs text-[var(--site-text-muted)]">{about.sectionHeader?.heading} {about.sectionHeader?.highlightHeading}</p></td>
                    <td className="px-4 py-4"><button className={`rounded-full px-3 py-1.5 text-xs font-semibold ${about.isActive ? 'bg-[var(--site-accent-wash)] text-[var(--site-accent-light)]' : 'bg-[var(--site-glass)] text-[var(--site-text-muted)]'}`} onClick={() => changeStatus(about)} type="button">{about.isActive ? 'Active' : 'Inactive'}</button></td>
                    <td className="px-4 py-4 text-xs text-[var(--site-text-muted)]">{about.stats?.length ?? 0} stats · {about.specialties?.length ?? 0} specialties · {about.experiences?.length ?? 0} experiences</td>
                    <td className="px-5 py-4"><div className="flex justify-end gap-2"><Link className="rounded-lg border border-[var(--site-border-soft)] px-3 py-2 text-xs font-semibold text-[var(--site-text)]" to={`/admin/home/about/edit/${id}`}>Edit</Link>{confirming ? <><button className="rounded-lg bg-[var(--site-status-red)] px-3 py-2 text-xs font-bold text-[var(--site-black)]" disabled={requests.delete.status === 'loading'} onClick={() => removeAbout(id)} type="button">Confirm</button><button className="px-2 py-2 text-xs text-[var(--site-text-muted)]" onClick={() => setConfirmingId('')} type="button">Cancel</button></> : <button className="rounded-lg border border-[var(--site-status-red)]/25 px-3 py-2 text-xs font-semibold text-[var(--site-status-red)]" onClick={() => setConfirmingId(id)} type="button">Delete</button>}</div></td>
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
