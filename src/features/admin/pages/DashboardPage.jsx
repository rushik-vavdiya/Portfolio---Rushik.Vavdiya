import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useToast from '../../../components/ui/useToast.js'
import { fetchAllHeroes } from '../slices/hero/heroSlice.js'
import { fetchAllAbout } from '../slices/about/aboutSlice.js'
import { fetchAllServices } from '../slices/services/servicesSlice.js'
import { fetchAllBuild } from '../slices/build/buildSlice.js'

const sectionConfig = [
  {
    key: 'hero',
    name: 'Hero',
    description: 'Headlines, availability, buttons, and floating cards.',
    to: '/admin/home/hero',
    createTo: '/admin/home/hero/create',
    marker: 'H',
  },
  {
    key: 'about',
    name: 'About',
    description: 'Profile details, statistics, and experience.',
    to: '/admin/home/about',
    createTo: '/admin/home/about/create',
    marker: 'A',
  },
  {
    key: 'services',
    name: 'Services',
    description: 'Service cards, features, and section content.',
    to: '/admin/home/services',
    createTo: '/admin/home/services/create',
    marker: 'S',
  },
  {
    key: 'build',
    name: 'Build',
    description: 'Panels, technology stack, principles, and process.',
    to: '/admin/home/build',
    createTo: '/admin/home/build/create',
    marker: 'B',
  },
]

const fetchActions = [fetchAllHeroes, fetchAllAbout, fetchAllServices, fetchAllBuild]

export default function DashboardPage() {
  const dispatch = useDispatch()
  const { notify } = useToast()
  const heroState = useSelector((state) => state.hero)
  const aboutState = useSelector((state) => state.about)
  const servicesState = useSelector((state) => state.services)
  const buildState = useSelector((state) => state.build)
  const sectionsState = { hero: heroState, about: aboutState, services: servicesState, build: buildState }

  const refreshContent = useCallback(async () => {
    const results = await Promise.all(fetchActions.map((fetchAction) => dispatch(fetchAction())))
    results.forEach((result, index) => {
      if (result.meta.requestStatus === 'rejected') {
        notify(
          result.payload ?? result.error.message ?? `Unable to load ${sectionConfig[index].name} content.`,
          { type: 'error' },
        )
      }
    })
  }, [dispatch, notify])

  useEffect(() => {
    refreshContent()
  }, [refreshContent])

  const sections = sectionConfig.map((section) => ({
    ...section,
    state: sectionsState[section.key],
    count: sectionsState[section.key].items.length,
    activeCount: sectionsState[section.key].items.filter((item) => item.isActive).length,
  }))
  const totalEntries = sections.reduce((total, section) => total + section.count, 0)
  const activeEntries = sections.reduce((total, section) => total + section.activeCount, 0)
  const isLoading = sections.some((section) => section.state.requests.all.status === 'loading')
  const hasError = sections.some((section) => section.state.requests.all.status === 'failed')

  return (
    <section className="space-y-7 sm:space-y-9">
      <header className="flex flex-col gap-5 rounded-3xl border border-[var(--site-border-soft)] bg-[linear-gradient(125deg,var(--site-panel-surface),var(--site-black)_72%)] p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[var(--site-accent-light)]">
            Admin workspace
          </p>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">
            Welcome to your content studio
          </h1>
          <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">
            Review your homepage content and jump straight into the section you want to update.
          </p>
        </div>
        <button
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-glass)] px-4 py-2.5 text-sm font-semibold text-[var(--site-text-muted)] transition hover:border-[var(--site-accent-glow)] hover:text-[var(--site-accent-light)] disabled:cursor-wait disabled:opacity-60"
          disabled={isLoading}
          onClick={refreshContent}
          type="button"
        >
          <svg aria-hidden="true" className={`size-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M20 7v5h-5M4 17v-5h5" />
            <path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" />
          </svg>
          {isLoading ? 'Refreshing…' : 'Refresh overview'}
        </button>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Content entries', value: totalEntries, note: 'Across all homepage sections' },
          { label: 'Published entries', value: activeEntries, note: 'Currently marked active' },
          { label: 'Managed sections', value: sections.length, note: 'Ready to edit anytime' },
        ].map((metric) => (
          <article className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-glass)] p-5 sm:p-6" key={metric.label}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.12em] text-[var(--site-text-subtle)]">{metric.label}</p>
            <p aria-live="polite" className="m-0 text-3xl font-semibold tracking-tight text-[var(--site-text)]">
              {isLoading ? '…' : hasError && metric.label !== 'Managed sections' ? '—' : metric.value}
            </p>
            <p className="mb-0 mt-2 text-xs text-[var(--site-text-muted)]">{metric.note}</p>
          </article>
        ))}
      </div>

      <section aria-labelledby="admin-sections-heading">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[.16em] text-[var(--site-accent-light)]">Homepage manager</p>
            <h2 className="m-0 text-lg font-semibold text-[var(--site-text)]" id="admin-sections-heading">Your sections</h2>
          </div>
          <Link className="text-sm font-semibold text-[var(--site-accent-light)] transition hover:text-[var(--site-text)]" to="/admin/home">
            View all sections <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => {
            const isSectionLoading = section.state.requests.all.status === 'loading'
            const hasError = section.state.requests.all.status === 'failed'
            return (
              <article className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-glass)] p-5 transition hover:border-[var(--site-accent-glow)] sm:p-6" key={section.key}>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[var(--site-accent-wash)] text-sm font-bold text-[var(--site-accent-light)]">{section.marker}</span>
                  <span className="rounded-full border border-[var(--site-border-soft)] px-3 py-1 text-xs font-medium text-[var(--site-text-muted)]">
                    {hasError ? 'Unavailable' : isSectionLoading ? 'Loading…' : `${section.count} ${section.count === 1 ? 'entry' : 'entries'}`}
                  </span>
                </div>
                <h3 className="mb-1 mt-5 text-base font-semibold text-[var(--site-text)]">{section.name}</h3>
                <p className="mb-5 min-h-10 text-sm leading-5 text-[var(--site-text-muted)]">{section.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Link className="rounded-lg bg-[var(--site-accent)] px-3.5 py-2.5 text-xs font-semibold text-[var(--site-black)] transition hover:brightness-110" to={section.to}>
                    Manage section
                  </Link>
                  <Link className="rounded-lg border border-[var(--site-border-soft)] px-3.5 py-2.5 text-xs font-semibold text-[var(--site-text-muted)] transition hover:bg-[var(--site-glass-hover)] hover:text-[var(--site-text)]" to={section.createTo}>
                    Create entry
                  </Link>
                  {!hasError && !isSectionLoading && (
                    <span className="ml-auto text-xs text-[var(--site-text-subtle)]">
                      {section.activeCount} active
                    </span>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <aside className="flex items-start gap-3 rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)]/60 p-4 sm:p-5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--site-accent-wash)] text-sm font-bold text-[var(--site-accent-light)]">i</span>
        <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">
          Use each section’s active status to choose which content appears on the public homepage. Your existing editing and publishing workflow is unchanged.
        </p>
      </aside>
    </section>
  )
}
