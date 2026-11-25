import { Link } from 'react-router-dom'

const tabs = [
  { id: 'all', label: 'All entries', to: '/admin/home/hero' },
  { id: 'create', label: 'Create new', to: '/admin/home/hero/create' },
]

export default function HeroEntryTabs({ activeTab }) {
  return (
    <nav
      aria-label="Hero entry actions"
      className="inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-[var(--site-border-soft)] bg-[var(--site-black)] p-1.5"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <Link
            aria-current={isActive ? 'page' : undefined}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              isActive
                ? 'bg-[var(--site-accent-wash)] text-[var(--site-accent-light)] shadow-[inset_0_0_0_1px_var(--site-accent-glow)]'
                : 'text-[var(--site-text-muted)] hover:bg-[var(--site-glass-hover)] hover:text-[var(--site-text)]'
            }`}
            key={tab.id}
            to={tab.to}
            viewTransition
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
