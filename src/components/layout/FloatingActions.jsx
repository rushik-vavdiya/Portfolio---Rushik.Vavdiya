import { useEffect, useState } from 'react'
import { site } from '../../data/siteConfig.js'
import Button from '../ui/Button.jsx'

/** Offers quick contact and a keyboard-accessible return to the top. */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 520)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed right-[max(14px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-[120] grid gap-[9px]" aria-label="Quick actions">
      {showTop && <Button asButton unstyled type="button" className="grid size-[46px] place-items-center rounded-xl border border-[var(--site-border-soft)] bg-[var(--site-surface)] text-[var(--site-accent-light)] shadow-[0_10px_30px_var(--site-shadow)] focus-visible:outline-2 focus-visible:outline-[var(--site-focus)] focus-visible:outline-offset-[3px]" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>↑</Button>}
      {site.contact.whatsapp && (
        <Button
          unstyled
          href={`${site.contact.whatsapp}?text=${encodeURIComponent(site.contact.whatsappPrefill)}`}
          external
          className="grid size-[46px] place-items-center rounded-full border border-[var(--site-border-soft)] bg-[var(--site-accent)] text-[var(--site-text)] shadow-[0_10px_30px_var(--site-shadow)] focus-visible:outline-2 focus-visible:outline-[var(--site-focus)] focus-visible:outline-offset-[3px] [&>svg]:size-[22px]"
          aria-label={site.contact.whatsappLabel}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4.1A8 8 0 1 1 20 11.7Z" />
            <path d="M9 9.2c.6 2 1.8 3.2 3.8 3.8l1-1 1.8.8-.2 1.6c-.1.5-.5.8-1 .8-3.9-.2-6.8-3.1-7-7 0-.5.3-.9.8-1l1.6-.2.8 1.8-1.6.4Z" />
          </svg>
        </Button>
      )}
    </div>
  )
}
