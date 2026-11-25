import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const navigation = [
  { label: 'Overview', to: '/admin', end: true, marker: '01' },
  { label: 'Home page', to: '/admin/home', end: false, marker: '02' },
]

const routeLabels = {
  about: 'About',
  build: 'Build',
  create: 'Create',
  edit: 'Edit',
  hero: 'Hero',
  home: 'Home page',
  services: 'Services',
}

function getRouteParts(pathname) {
  return pathname
    .split('/')
    .filter(Boolean)
    .slice(1)
    .filter((segment) => !/^[a-f\d]{16,}$/i.test(segment))
    .map((segment) => routeLabels[segment] ?? segment)
}

function NavigationLinks() {
  return navigation.map((item) => (
    <NavLink
      className={({ isActive }) => `group flex min-w-max items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${
        isActive
          ? 'bg-[var(--site-accent-wash)] text-[var(--site-accent-light)] shadow-[inset_0_0_0_1px_var(--site-accent-glow)]'
          : 'text-[var(--site-text-muted)] hover:bg-[var(--site-glass-hover)] hover:text-[var(--site-text)]'
      }`}
      end={item.end}
      key={item.to}
      to={item.to}
    >
      <span className="grid size-7 place-items-center rounded-lg border border-current/15 text-[10px] font-bold tracking-wide opacity-75">
        {item.marker}
      </span>
      <span>{item.label}</span>
      <span className="ml-auto size-1.5 rounded-full bg-current opacity-0 transition group-[.active]:opacity-100" />
    </NavLink>
  ))
}

export default function AdminLayout() {
  const { pathname } = useLocation()
  const routeParts = getRouteParts(pathname)

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--site-black)] text-[var(--site-text)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_0%,var(--site-accent-wash),transparent_38%)] opacity-70" />
      <div className="relative grid min-h-screen lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="z-20 border-b border-[var(--site-border-soft)] bg-[var(--site-panel-surface)]/90 px-4 py-4 backdrop-blur-xl lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
          <Link className="flex items-center gap-3 px-1" to="/admin" aria-label="Admin overview">
            <span className="grid size-11 place-items-center rounded-2xl bg-[var(--site-accent)] text-sm font-black tracking-tight text-[var(--site-black)] shadow-[0_8px_28px_var(--site-accent-glow)]">
              CMS
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold tracking-wide text-[var(--site-text)]">Studio</span>
              <span className="mt-0.5 block text-[11px] text-[var(--site-text-subtle)]">Content workspace</span>
            </span>
          </Link>

          <div className="mb-2 mt-7 hidden px-3 text-[10px] font-bold uppercase tracking-[.2em] text-[var(--site-text-subtle)] lg:block">
            Workspace
          </div>
          <nav aria-label="Admin navigation" className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:mt-0 lg:flex-col lg:overflow-visible lg:pb-0">
            <NavigationLinks />
          </nav>

          <div className="mt-6 hidden rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)]/60 p-4 lg:mt-auto lg:block">
            <div className="mb-3 flex items-center gap-2">
              <span className="size-2 rounded-full bg-[var(--site-accent)] shadow-[0_0_12px_var(--site-accent-glow)]" />
              <p className="m-0 text-xs font-semibold text-[var(--site-text)]">Content workspace</p>
            </div>
            <p className="m-0 text-xs leading-5 text-[var(--site-text-subtle)]">
              Manage and publish the content displayed on your site.
            </p>
            <Link
              className="mt-4 inline-flex text-xs font-semibold text-[var(--site-accent-light)] transition hover:text-[var(--site-text)]"
              to="/"
              target="_blank"
              rel="noreferrer"
            >
              Open website <span aria-hidden="true" className="ml-1">↗</span>
            </Link>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-10 border-b border-[var(--site-border-soft)] bg-[var(--site-black)]/80 px-5 py-3.5 backdrop-blur-xl sm:px-8 lg:px-10">
            <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4">
              <div className="min-w-0">
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 overflow-hidden text-xs font-medium text-[var(--site-text-subtle)]">
                  <Link className="shrink-0 transition hover:text-[var(--site-text)]" to="/admin">Admin</Link>
                  {routeParts.map((part, index) => (
                    <span className="flex min-w-0 items-center gap-2" key={`${part}-${index}`}>
                      <span aria-hidden="true" className="text-[var(--site-text-subtle)]/60">/</span>
                      <span className={index === routeParts.length - 1 ? 'truncate text-[var(--site-text-muted)]' : 'truncate'}>
                        {part}
                      </span>
                    </span>
                  ))}
                </nav>
              </div>
              <Link
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-glass)] px-3.5 py-2.5 text-xs font-semibold text-[var(--site-text-muted)] transition hover:border-[var(--site-accent-glow)] hover:bg-[var(--site-accent-wash)] hover:text-[var(--site-accent-light)]"
                to="/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="hidden sm:inline">View website</span>
                <span className="sm:hidden">Website</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </header>

          <main className="relative mx-auto w-full max-w-[90rem] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
