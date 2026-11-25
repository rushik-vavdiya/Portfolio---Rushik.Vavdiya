import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useToast from '../../../../components/ui/useToast.js'
import { fetchAllHeroes } from '../../slices/hero/heroSlice.js'
import { fetchAllAbout } from '../../slices/about/aboutSlice.js'
import { fetchAllServices } from '../../slices/services/servicesSlice.js'
import { fetchAllBuild } from '../../slices/build/buildSlice.js'

const sectionConfig = [
  {
    key: 'hero',
    name: 'Hero',
    description: 'The first impression: headline, availability, buttons, and floating cards.',
    to: '/admin/home/hero',
    createTo: '/admin/home/hero/create',
    marker: 'H',
  },
  {
    key: 'about',
    name: 'About',
    description: 'Profile information, statistics, specialties, and experience timeline.',
    to: '/admin/home/about',
    createTo: '/admin/home/about/create',
    marker: 'A',
  },
  {
    key: 'services',
    name: 'Services',
    description: 'Service cards, features, buttons, and section introduction.',
    to: '/admin/home/services',
    createTo: '/admin/home/services/create',
    marker: 'S',
  },
  {
    key: 'build',
    name: 'Build',
    description: 'Build panels, tools, principles, and process steps.',
    to: '/admin/home/build',
    createTo: '/admin/home/build/create',
    marker: 'B',
  },
]

const fetchActions = [fetchAllHeroes, fetchAllAbout, fetchAllServices, fetchAllBuild]

export default function HomeSectionsPage() {
  const dispatch = useDispatch()
  const { dismissAll, notify } = useToast()
  const heroState = useSelector((state) => state.hero)
  const aboutState = useSelector((state) => state.about)
  const servicesState = useSelector((state) => state.services)
  const buildState = useSelector((state) => state.build)
  const sectionsState = { hero: heroState, about: aboutState, services: servicesState, build: buildState }

  const refreshSections = useCallback(async () => {
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
    refreshSections()
  }, [refreshSections])

  const sections = sectionConfig.map((section) => {
    const state = sectionsState[section.key]
    return {
      ...section,
      state,
      count: state.items.length,
      activeCount: state.items.filter((item) => item.isActive).length,
    }
  })
  const isLoading = sections.some((section) => section.state.requests.all.status === 'loading')
  const hasError = sections.some((section) => section.state.requests.all.status === 'failed')
  const totalEntries = sections.reduce((total, section) => total + section.count, 0)
  const activeEntries = sections.reduce((total, section) => total + section.activeCount, 0)

  return (
    <section className="space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-5 rounded-3xl border border-[var(--site-border-soft)] bg-[linear-gradient(125deg,var(--site-panel-surface),var(--site-black)_72%)] p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[var(--site-accent-light)]">
            Website content
          </p>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">
            Homepage sections
          </h1>
          <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">
            Each section has its own content manager. Choose one to review, create, or update entries.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-glass)] px-3.5 py-2.5 text-xs font-medium text-[var(--site-text-muted)]">
            {isLoading ? 'Loading entries…' : hasError ? 'Totals unavailable' : `${totalEntries} total entries`}
          </span>
          <span className="rounded-xl border border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)] px-3.5 py-2.5 text-xs font-semibold text-[var(--site-accent-light)]">
            {isLoading ? 'Loading…' : hasError ? 'Active unavailable' : `${activeEntries} active`}
          </span>
        </div>
      </header>

      {hasError && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3">
          <p className="m-0 text-sm text-[var(--site-text-muted)]">Some section totals could not be loaded.</p>
          <button
            className="rounded-lg border border-[var(--site-border-soft)] px-3 py-2 text-xs font-semibold text-[var(--site-accent-light)] transition hover:bg-[var(--site-accent-wash)]"
            onClick={() => {
              dismissAll()
              refreshSections()
            }}
            type="button"
          >
            Retry loading
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => {
          const loading = section.state.requests.all.status === 'loading'
          const error = section.state.requests.all.status === 'failed'
          return (
            <article
              className="group rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-glass)] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--site-accent-glow)] hover:bg-[var(--site-glass-hover)] sm:p-6"
              key={section.key}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-[var(--site-accent-wash)] text-sm font-bold text-[var(--site-accent-light)]">
                  {section.marker}
                </span>
                <span className="rounded-full border border-[var(--site-border-soft)] px-3 py-1.5 text-xs font-medium text-[var(--site-text-muted)]">
                  {error ? 'Unavailable' : loading ? 'Loading…' : `${section.count} ${section.count === 1 ? 'entry' : 'entries'}`}
                </span>
              </div>
              <h3 className="mb-2 mt-5 text-lg font-semibold text-[var(--site-text)]">{section.name}</h3>
              <p className="mb-6 min-h-10 text-sm leading-6 text-[var(--site-text-muted)]">{section.description}</p>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--site-accent)] px-4 py-2.5 text-xs font-semibold text-[var(--site-black)] transition hover:brightness-110"
                  to={section.to}
                >
                  Manage section <span aria-hidden="true">→</span>
                </Link>
                <Link
                  className="rounded-xl border border-[var(--site-border-soft)] px-4 py-2.5 text-xs font-semibold text-[var(--site-text-muted)] transition hover:text-[var(--site-text)]"
                  to={section.createTo}
                >
                  Create entry
                </Link>
                {!error && !loading && (
                  <span className="ml-auto text-xs text-[var(--site-text-subtle)]">{section.activeCount} active</span>
                )}
              </div>
            </article>
          )
        })}
      </div>

      <aside className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)]/60 p-4 sm:p-5">
        <p className="m-0 text-sm leading-6 text-[var(--site-text-muted)]">
          Entries marked active are the ones intended for display on your public homepage. You can manage each section independently.
        </p>
      </aside>
    </section>
  )
}
