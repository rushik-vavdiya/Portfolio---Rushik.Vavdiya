import { Link } from 'react-router-dom'

export default function BuildFormActions({ isSubmitting, submitLabel }) {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--site-border-soft)] bg-[var(--site-black)]/90 shadow-[0_-16px_40px_var(--site-shadow)] backdrop-blur-xl lg:left-[17rem]">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse gap-2 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-4 lg:px-10">
        <p className="m-0 hidden text-xs text-[var(--site-text-subtle)] sm:block">Changes are only applied after you save.</p>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
          <Link
            className="inline-flex items-center justify-center rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-glass)] px-5 py-3 text-sm font-semibold text-[var(--site-text-muted)] transition hover:border-[var(--site-border)] hover:bg-[var(--site-glass-hover)] hover:text-[var(--site-text)]"
            to="/admin/home/build"
          >
            Cancel
          </Link>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--site-accent)] px-5 py-3 text-sm font-semibold text-[var(--site-black)] shadow-[0_8px_24px_var(--site-accent-glow)] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Saving…' : submitLabel}
          </button>
        </div>
      </div>
    </footer>
  )
}
