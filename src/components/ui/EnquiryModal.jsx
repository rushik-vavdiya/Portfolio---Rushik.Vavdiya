import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ContactForm from '../../features/contact/components/ContactForm.jsx'
import Button from './Button.jsx'
import { site } from '../../data/siteConfig.js'

export default function EnquiryModal() {
  const [open, setOpen] = useState(false)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)
  const hasOpenedRef = useRef(false)

  useEffect(() => {
    const openModal = () => {
      hasOpenedRef.current = true
      previousFocusRef.current = document.activeElement
      setOpen(true)
    }
    window.addEventListener('astrix:open-enquiry', openModal)
    return () => window.removeEventListener('astrix:open-enquiry', openModal)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (hasOpenedRef.current) return
      hasOpenedRef.current = true
      previousFocusRef.current = document.activeElement
      setOpen(true)
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key !== 'Tab') return

      const modal = document.getElementById('enquiry-modal')
      const focusable = modal?.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [open])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] grid place-items-center overflow-y-auto bg-[rgb(var(--site-black-rgb)/0.78)] px-4 py-5 backdrop-blur-[16px] sm:px-6 sm:py-8"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false)
      }}
    >
      <section
        id="enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        className="relative max-h-[calc(100svh-24px)] w-full max-w-[980px] overflow-y-auto rounded-[24px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(145deg,var(--site-black),var(--site-black))] shadow-[0_40px_120px_-32px_rgb(var(--site-accent-rgb)/0.2),inset_0_1px_0_rgb(var(--site-white-rgb)/0.2)] animate-[enquiry-modal-enter_420ms_cubic-bezier(.16,1,.3,1)_both] sm:max-h-[calc(100svh-40px)] sm:rounded-[28px] lg:overflow-hidden"
      >
        <Button
          asButton
          iconOnly
          size="sm"
          buttonRef={closeButtonRef}
          type="button"
          aria-label="Close enquiry form"
          onClick={() => setOpen(false)}
          className="absolute z-[30]"
          style={{ position: 'absolute', right: '16px', left: 'auto', top: '16px' }}
        >
          <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </Button>

        <div className="grid md:grid-cols-[220px_minmax(0,1fr)] lg:h-[560px] lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="relative isolate overflow-hidden border-b border-[rgb(var(--site-accent-rgb)/0.2)] bg-[radial-gradient(ellipse_at_20%_0%,rgb(var(--site-accent-rgb)/0.2),transparent_52%),linear-gradient(160deg,rgb(var(--site-black-rgb)/0.92),rgb(var(--site-black-rgb)/0.98))] px-5 py-5 sm:px-7 sm:py-6 md:border-b-0 md:border-r md:px-5 md:py-6 lg:px-6 lg:py-7">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgb(var(--site-accent-rgb)/0.2)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--site-accent-rgb)/0.2)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(circle_at_50%_20%,var(--site-black),transparent_72%)]" />

            <div className="relative z-[1] flex h-full flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.035] px-3 py-1.5 text-[9px] font-bold tracking-[.16em] text-[var(--site-accent)] uppercase">
                <i className="size-1.5 rounded-full bg-[var(--site-accent)] shadow-[0_0_10px_var(--site-accent)]" />
                Let&apos;s talk
              </span>

              <h2 id="enquiry-modal-title" className="mt-4 max-w-[10ch] text-[clamp(1.65rem,3.4vw,2.35rem)] font-[750] leading-[1.02] tracking-[-.055em] text-white">
                Tell us about <span className="bg-gradient-to-r from-[var(--site-accent)] to-[var(--site-accent)] bg-clip-text text-transparent">your project.</span>
              </h2>
              <p className="mt-3 max-w-[26ch] text-[.82rem] leading-[1.55] text-[var(--site-white)]">
                Share a few details and we&apos;ll reply with a clear scope, timeline, and next step.
              </p>

              <div className="mt-5 grid gap-2">
                {[
                  ['01', 'A clear project brief'],
                  ['02', 'Transparent next steps'],
                  ['03', 'Direct developer contact'],
                ].map(([number, label]) => (
                  <div key={number} className="flex items-center gap-3 rounded-[12px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.025] px-3 py-2.5">
                    <span className="grid size-7 shrink-0 place-items-center rounded-[8px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] font-mono text-[9px] font-bold text-[var(--site-accent)]">{number}</span>
                    <span className="text-[11px] font-semibold text-[var(--site-white)]">{label}</span>
                  </div>
                ))}
              </div>

              {site.contact.email && (
                <a href={`mailto:${site.contact.email}`} className="mt-auto hidden items-center gap-2.5 border-t border-[rgb(var(--site-accent-rgb)/0.2)] pt-5 text-[11px] text-[var(--site-white)] transition-colors hover:text-white lg:flex">
                  <span className="size-1.5 rounded-full bg-[var(--site-accent-bright)] shadow-[0_0_10px_rgb(var(--site-accent-bright-rgb)/0.2)]" />
                  {site.contact.email}
                </a>
              )}
            </div>
          </aside>

          <div className="relative min-w-0 px-5 pb-5 pt-6 sm:px-7 sm:pb-6 md:px-5 md:pb-5 md:pt-5 lg:px-7 lg:pb-6 lg:pt-6">
            <div className="mb-4 pr-12 lg:pr-12">
              <span className="text-[9px] font-bold tracking-[.18em] text-[var(--site-accent)] uppercase">Project enquiry</span>
              <h3 className="mt-2 text-[clamp(1.35rem,3vw,1.75rem)] font-bold leading-[1.15] tracking-[-.035em] text-white">
                Start a conversation
              </h3>
            </div>

            <ContactForm modal id="popup-contact-form" className="border-0 bg-transparent p-0 shadow-none" />
          </div>
        </div>
      </section>
    </div>,
    document.body,
  )
}
