import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useToast from '../../../../components/ui/useToast.js'
import HeroEntryTabs from '../../components/HeroEntryTabs.jsx'
import {
  deleteHeroRecord,
  fetchAllHeroes,
  updateHeroStatusRecord,
} from '../../slices/hero/heroSlice.js'

const getHeroId = (hero) => String(hero?._id ?? hero?.id)
const getContentCounts = (hero) => [
  { label: 'Phrases', count: hero.rotatingText?.length ?? 0 },
  { label: 'Skills', count: hero.skills?.length ?? 0 },
  { label: 'Buttons', count: hero.buttons?.length ?? 0 },
  { label: 'Cards', count: hero.floatingCard?.length ?? 0 },
]

export default function HeroSectionPage() {
  const dispatch = useDispatch()
  const { dismissAll, notify } = useToast()
  const { items, requests } = useSelector((state) => state.hero)
  const [confirmingId, setConfirmingId] = useState('')
  const isLoading = requests.all.status === 'loading'
  const isDeleting = requests.delete.status === 'loading'
  const isChangingStatus = requests.status.status === 'loading'
  const activeCount = items.filter((hero) => hero.isActive).length

  useEffect(() => {
    dispatch(fetchAllHeroes())
  }, [dispatch])

  useEffect(() => {
    if (!requests.all.error) return
    notify(requests.all.error, {
      type: 'error',
      duration: 0,
      action: { label: 'Retry', onClick: () => dispatch(fetchAllHeroes()) },
    })
  }, [dispatch, notify, requests.all.error])

  const handleDelete = async (heroId) => {
    const result = await dispatch(deleteHeroRecord(heroId))
    if (deleteHeroRecord.fulfilled.match(result)) {
      setConfirmingId('')
      notify('Hero entry deleted.')
    } else if (deleteHeroRecord.rejected.match(result)) {
      notify(result.payload ?? result.error.message ?? 'Unable to delete the Hero entry.', { type: 'error' })
    }
  }

  const handleStatusChange = async (hero) => {
    const result = await dispatch(updateHeroStatusRecord({
      heroId: getHeroId(hero),
      isActive: !hero.isActive,
    }))
    if (updateHeroStatusRecord.fulfilled.match(result)) {
      notify(`Hero ${hero.isActive ? 'deactivated' : 'activated'}.`)
    } else if (updateHeroStatusRecord.rejected.match(result)) {
      notify(result.payload ?? result.error.message ?? 'Unable to update Hero status.', { type: 'error' })
    }
  }

  return (
    <section className="space-y-5 sm:space-y-6">
      <header className="flex flex-col gap-5 rounded-3xl border border-[var(--site-border-soft)] bg-[linear-gradient(125deg,var(--site-panel-surface),var(--site-black)_72%)] p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[var(--site-accent-light)]">
            Home Page / Hero
          </p>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">
            Hero entries
          </h1>
          <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">
            Manage the content shown in your homepage hero section.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-glass)] px-3.5 py-2.5 text-xs font-medium text-[var(--site-text-muted)]">
            <span className="size-2 rounded-full bg-[var(--site-text-subtle)]" />
            {items.length} {items.length === 1 ? 'entry' : 'entries'}
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)] px-3.5 py-2.5 text-xs font-semibold text-[var(--site-accent-light)]">
            <span className="size-2 rounded-full bg-[var(--site-accent)]" />
            {activeCount} active
          </span>
        </div>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <HeroEntryTabs activeTab="all" />
        <p className="m-0 text-xs text-[var(--site-text-subtle)]">
          Only one Hero entry can be active at a time.
        </p>
      </div>

      {requests.all.error && (
        <div className="flex justify-end">
          <button
            className="rounded-lg border border-[var(--site-border-soft)] px-3 py-2 text-sm font-semibold text-[var(--site-accent-light)] transition hover:bg-[var(--site-accent-wash)]"
            onClick={() => {
              dismissAll()
              dispatch(fetchAllHeroes())
            }}
            type="button"
          >
            Retry loading entries
          </button>
        </div>
      )}

      {isLoading && !items.length && (
        <p className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-5 text-sm text-[var(--site-text-muted)]">
          Loading Hero entries…
        </p>
      )}

      {!isLoading && !items.length && !requests.all.error && (
        <div className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-6 sm:p-8">
          <h3 className="mb-2 text-lg font-semibold text-[var(--site-text)]">No entries yet</h3>
          <p className="mb-5 text-sm leading-6 text-[var(--site-text-muted)]">
            Create a Hero entry to see it listed here.
          </p>
          <Link
            className="inline-flex items-center rounded-xl bg-[var(--site-accent)] px-4 py-3 text-sm font-semibold text-[var(--site-black)] transition hover:brightness-110"
            to="/admin/home/hero/create"
          >
            Create your first entry
          </Link>
        </div>
      )}

      {!!items.length && (
        <div className="overflow-hidden rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] shadow-[0_20px_60px_var(--site-shadow)]">
          <div className="flex flex-col gap-2 border-b border-[var(--site-border-soft)] bg-[var(--site-glass)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="m-0 text-sm font-semibold text-[var(--site-text)]">Saved Hero content</h3>
              <p className="mb-0 mt-1 text-xs text-[var(--site-text-subtle)]">
                Use the switch to publish an entry or take it offline.
              </p>
            </div>
            <span className="text-xs text-[var(--site-text-subtle)]">
              {activeCount ? 'A live entry is currently selected' : 'No entry is currently live'}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--site-border-soft)]">
                  <th className="px-5 py-3.5 text-[.65rem] font-bold uppercase tracking-[.16em] text-[var(--site-text-subtle)]">Hero entry</th>
                  <th className="px-4 py-3.5 text-[.65rem] font-bold uppercase tracking-[.16em] text-[var(--site-text-subtle)]">Publishing</th>
                  <th className="px-4 py-3.5 text-[.65rem] font-bold uppercase tracking-[.16em] text-[var(--site-text-subtle)]">Availability</th>
                  <th className="px-4 py-3.5 text-[.65rem] font-bold uppercase tracking-[.16em] text-[var(--site-text-subtle)]">Content</th>
                  <th className="px-5 py-3.5 text-right text-[.65rem] font-bold uppercase tracking-[.16em] text-[var(--site-text-subtle)]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--site-border-soft)]">
                {items.map((hero) => {
                  const heroId = getHeroId(hero)
                  const isConfirmingDelete = confirmingId === heroId
                  const heading = hero.sectionHeader?.heading || 'Untitled Hero'
                  const highlightHeading = hero.sectionHeader?.highlightHeading
                  const contentCounts = getContentCounts(hero)
                  return (
                    <tr className="transition hover:bg-[var(--site-glass-hover)]" key={heroId}>
                      <td className="max-w-[26rem] px-5 py-4">
                        <p className="m-0 truncate text-sm font-semibold text-[var(--site-text)]">
                          {heading}
                          {highlightHeading && (
                            <span className="text-[var(--site-accent-light)]"> {highlightHeading}</span>
                          )}
                        </p>
                        <p className="mb-0 mt-1 line-clamp-2 text-xs leading-5 text-[var(--site-text-muted)]">
                          {hero.sectionHeader?.description || 'No description provided.'}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          <button
                            aria-checked={hero.isActive}
                            aria-label={`${hero.isActive ? 'Deactivate' : 'Activate'} ${heading}`}
                            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-accent-light)] disabled:cursor-wait disabled:opacity-60 ${
                              hero.isActive
                                ? 'border-[var(--site-accent)] bg-[var(--site-accent)]'
                                : 'border-[var(--site-border)] bg-[var(--site-glass-hover)]'
                            }`}
                            disabled={isChangingStatus}
                            onClick={() => handleStatusChange(hero)}
                            role="switch"
                            type="button"
                          >
                            <span
                              className={`size-4 rounded-full bg-[var(--site-white)] shadow-sm transition-transform ${
                                hero.isActive ? 'translate-x-[1.25rem]' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <span className={`text-xs font-semibold ${
                            hero.isActive ? 'text-[var(--site-accent-light)]' : 'text-[var(--site-text-muted)]'
                          }`}>
                            {hero.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="m-0 text-sm font-medium capitalize text-[var(--site-text)]">
                          {hero.availablity?.status || '—'}
                        </p>
                        <p className="mb-0 mt-1 max-w-48 truncate text-xs text-[var(--site-text-subtle)]">
                          {hero.availablity?.message || 'No availability message'}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex max-w-56 flex-wrap gap-1.5">
                          {contentCounts.map(({ count, label }) => (
                            <span
                              className="rounded-lg border border-[var(--site-border-soft)] bg-[var(--site-glass)] px-2 py-1 text-[.65rem] text-[var(--site-text-muted)]"
                              key={label}
                            >
                              <span className="font-semibold text-[var(--site-text)]">{count}</span> {label}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            className="rounded-lg border border-[var(--site-border-soft)] px-3 py-2 text-xs font-semibold text-[var(--site-text)] transition hover:border-[var(--site-accent-glow)] hover:text-[var(--site-accent-light)]"
                            to={`/admin/home/hero/edit/${heroId}`}
                          >
                            Edit
                          </Link>
                          {!isConfirmingDelete ? (
                            <button
                              className="rounded-lg border border-[var(--site-status-red)]/25 px-3 py-2 text-xs font-semibold text-[var(--site-status-red)] transition hover:bg-[var(--site-status-red)]/10"
                              onClick={() => setConfirmingId(heroId)}
                              type="button"
                            >
                              Delete
                            </button>
                          ) : (
                            <>
                              <button
                                className="rounded-lg bg-[var(--site-status-red)] px-3 py-2 text-xs font-bold text-[var(--site-black)] disabled:opacity-60"
                                disabled={isDeleting}
                                onClick={() => handleDelete(heroId)}
                                type="button"
                              >
                                {isDeleting ? 'Deleting…' : 'Confirm'}
                              </button>
                              <button
                                className="rounded-lg px-2 py-2 text-xs font-semibold text-[var(--site-text-muted)] hover:bg-[var(--site-glass-hover)]"
                                onClick={() => setConfirmingId('')}
                                type="button"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
