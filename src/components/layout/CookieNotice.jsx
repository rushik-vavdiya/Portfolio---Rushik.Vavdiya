import { useState } from 'react'
import Button from '../ui/Button.jsx'

const STORAGE_KEY = 'astrix-code-cookie-notice-dismissed'

/** A small, honest notice: the site does not use analytics cookies. */
export default function CookieNotice() {
  const [visible, setVisible] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) !== 'true'
    } catch {
      return true
    }
  })

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // The notice can still be dismissed for this page view if storage is unavailable.
    }
    setVisible(false)
  }

  if (!visible) return null
  return (
    <aside className="fixed right-[max(78px,calc(env(safe-area-inset-right)+70px))] bottom-[max(16px,env(safe-area-inset-bottom))] z-[110] flex max-w-[min(440px,calc(100vw-110px))] items-center gap-4 rounded-[14px] border border-[var(--site-border-soft)] bg-[var(--site-surface)] px-3.5 py-3 text-xs leading-[1.5] text-[var(--site-text-muted)] shadow-[0_12px_40px_var(--site-shadow)] max-[560px]:right-4 max-[560px]:bottom-[calc(72px+env(safe-area-inset-bottom))] max-[560px]:max-w-none max-[560px]:justify-between" aria-label="Privacy notice">
      <p className="m-0">This site does not use analytics cookies.</p>
      <Button asButton unstyled type="button" className="flex-none cursor-pointer rounded-xl border-0 bg-[var(--site-accent)] px-[14px] py-2 font-semibold text-[var(--site-text)] focus-visible:outline-2 focus-visible:outline-[var(--site-focus)] focus-visible:outline-offset-[3px]" onClick={dismiss}>Got it</Button>
    </aside>
  )
}
