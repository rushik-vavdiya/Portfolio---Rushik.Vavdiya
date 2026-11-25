import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useToast from '../../../../components/ui/useToast.js'
import ServicesEntryTabs from '../../components/ServicesEntryTabs.jsx'
import {
  deleteServicesRecord,
  fetchAllServices,
  updateServicesStatusRecord,
} from '../../slices/services/servicesSlice.js'

const getId = (service) => String(service?._id ?? service?.id ?? '')

export default function ServicesSectionPage() {
  const dispatch = useDispatch()
  const { dismissAll, notify } = useToast()
  const { items, requests } = useSelector((state) => state.services)
  const [confirmingId, setConfirmingId] = useState('')
  const isLoading = requests.all.status === 'loading'
  const activeCount = items.filter((item) => item.isActive).length

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

  const changeStatus = async (service) => {
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

  const removeServices = async (serviceId) => {
    const result = await dispatch(deleteServicesRecord(serviceId))
    if (deleteServicesRecord.fulfilled.match(result)) {
      setConfirmingId('')
      notify('Services entry deleted.')
    } else {
      notify(result.payload ?? result.error.message ?? 'Unable to delete the Services entry.', { type: 'error' })
    }
  }

  return (
    <section className="space-y-5 sm:space-y-6">
      <header className="flex flex-col gap-5 rounded-3xl border border-[var(--site-border-soft)] bg-[linear-gradient(125deg,var(--site-panel-surface),var(--site-black)_72%)] p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[var(--site-accent-light)]">Home Page / Services</p>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">Services entries</h1>
          <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">Manage the section heading, service descriptions, features, and buttons.</p>
        </div>
        <span className="rounded-xl border border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)] px-3.5 py-2.5 text-xs font-semibold text-[var(--site-accent-light)]">{activeCount} active</span>
      </header>

      <ServicesEntryTabs activeTab="all" />
      {requests.all.error && (
        <button className="rounded-lg border border-[var(--site-border-soft)] px-3 py-2 text-sm font-semibold text-[var(--site-accent-light)]" onClick={() => { dismissAll(); dispatch(fetchAllServices()) }} type="button">
          Retry loading entries
        </button>
      )}
      {isLoading && !items.length && <p className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-5 text-sm text-[var(--site-text-muted)]">Loading Services entries…</p>}
      {!isLoading && !items.length && !requests.all.error && (
        <div className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-6 sm:p-8">
          <h3 className="mb-2 text-lg font-semibold text-[var(--site-text)]">No Services entries yet</h3>
          <p className="mb-5 text-sm text-[var(--site-text-muted)]">Create an entry to manage the public Services section.</p>
          <Link className="rounded-xl bg-[var(--site-accent)] px-4 py-3 text-sm font-semibold text-[var(--site-black)]" to="/admin/home/services/create">Create Services entry</Link>
        </div>
      )}
      {!!items.length && (
        <div className="overflow-x-auto rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)]">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--site-border-soft)] text-[.65rem] font-bold uppercase tracking-[.16em] text-[var(--site-text-subtle)]">
                <th className="px-5 py-4">Section heading</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Content</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--site-border-soft)]">
              {items.map((service) => {
                const id = getId(service)
                const confirming = confirmingId === id
                return (
                  <tr className="hover:bg-[var(--site-glass-hover)]" key={id}>
                    <td className="px-5 py-4">
                      <p className="m-0 text-sm font-semibold text-[var(--site-text)]">
                        {service.sectionHeader?.heading || 'Untitled Services entry'}
                        {service.sectionHeader?.highlightHeading && <span className="text-[var(--site-accent-light)]"> {service.sectionHeader.highlightHeading}</span>}
                      </p>
                      <p className="mb-0 mt-1 text-xs text-[var(--site-text-muted)]">{service.sectionHeader?.description || 'No description provided.'}</p>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${service.isActive ? 'bg-[var(--site-accent-wash)] text-[var(--site-accent-light)]' : 'bg-[var(--site-glass)] text-[var(--site-text-muted)]'}`}
                        onClick={() => changeStatus(service)}
                        type="button"
                      >
                        {service.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-xs text-[var(--site-text-muted)]">{service.services?.length ?? 0} services · {service.services?.reduce((total, item) => total + (item.features?.length ?? 0), 0) ?? 0} features</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link className="rounded-lg border border-[var(--site-border-soft)] px-3 py-2 text-xs font-semibold text-[var(--site-text)]" to={`/admin/home/services/edit/${id}`}>Edit</Link>
                        {confirming ? (
                          <>
                            <button className="rounded-lg bg-[var(--site-status-red)] px-3 py-2 text-xs font-bold text-[var(--site-black)] disabled:opacity-60" disabled={requests.delete.status === 'loading'} onClick={() => removeServices(id)} type="button">Confirm</button>
                            <button className="px-2 py-2 text-xs text-[var(--site-text-muted)]" onClick={() => setConfirmingId('')} type="button">Cancel</button>
                          </>
                        ) : (
                          <button className="rounded-lg border border-[var(--site-status-red)]/25 px-3 py-2 text-xs font-semibold text-[var(--site-status-red)]" onClick={() => setConfirmingId(id)} type="button">Delete</button>
                        )}
                      </div>
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
