import { NavLink, Outlet } from 'react-router-dom'

const sections = [
  { name: 'Hero', to: '/admin/home/hero', marker: 'H' },
  { name: 'About', to: '/admin/home/about', marker: 'A' },
  { name: 'Services', to: '/admin/home/services', marker: 'S' },
  { name: 'Build', to: '/admin/home/build', marker: 'B' },
]

export default function HomePageSectionsLayout() {
  return (
    <section className="space-y-5 sm:space-y-6">
      <header className="rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-panel-surface)]/70 p-2">
        <nav aria-label="Homepage sections" className="flex min-w-0 gap-2 overflow-x-auto pb-0.5">
          {sections.map((section) => (
            <NavLink
              className={({ isActive }) => `flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? 'border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)] text-[var(--site-accent-light)]'
                  : 'border-transparent text-[var(--site-text-muted)] hover:border-[var(--site-border-soft)] hover:bg-[var(--site-glass-hover)] hover:text-[var(--site-text)]'
              }`}
              key={section.to}
              to={section.to}
              viewTransition
            >
              <span className="grid size-6 place-items-center rounded-lg border border-current/20 text-[10px] font-bold">{section.marker}</span>
              {section.name}
            </NavLink>
          ))}
        </nav>
      </header>
      <div className="min-w-0">
        <Outlet />
      </div>
    </section>
  )
}
