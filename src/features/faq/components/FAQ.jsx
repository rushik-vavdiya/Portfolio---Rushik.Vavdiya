import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import Container from '../../../components/ui/Container.jsx'
import Button from '../../../components/ui/Button.jsx'
import { faqs as questions } from '../data/faq.js'
import { site } from '../../../data/siteConfig.js'
import { trackViewport } from '../../../utils/viewport.js'

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 transition-transform duration-300 group-open:rotate-45"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export default function FAQ() {
  const listRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    if (!list || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const cards = [...list.querySelectorAll('[data-faq-reveal]')]
    const stopTrackers = []
    const context = gsap.context(() => {
      gsap.set(cards, { autoAlpha: 0, y: 18 })

      cards.forEach((card) => {
        let revealed = false
        let stopTrackingCard = () => {}
        stopTrackingCard = trackViewport(card, (visible) => {
          if (!visible || revealed) return
          revealed = true
          context.add(() => {
            gsap.to(card, {
              autoAlpha: 1,
              y: 0,
              duration: 1.05,
              ease: 'power2.out',
              clearProps: 'transform,visibility',
            })
          })
          stopTrackingCard()
        }, { threshold: 0.14 })
        stopTrackers.push(stopTrackingCard)
      })
    }, list)

    return () => {
      stopTrackers.forEach((stopTracking) => stopTracking())
      context.revert()
    }
  }, [])

  return (
    <section
      aria-labelledby="faq-heading"
      className="relative isolate overflow-hidden bg-[var(--site-bg)] px-5 py-14 text-[var(--site-text)] sm:px-8 sm:py-16 lg:px-10 lg:py-20"
    >
      <Container>
        <div data-scroll-reveal className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--site-border-soft)] bg-[var(--site-glass)] px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-[var(--site-accent-light)] uppercase">
            <span className="size-1.5 rounded-full bg-[var(--site-accent-light)] shadow-[0_0_12px_var(--site-accent-glow-strong)]" />
            {site.sections.faqEyebrow}
          </div>

          <h1
            id="faq-heading"
            className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-[3.5rem]"
          >
            {site.sections.faqTitle}{' '}
            <span className="bg-gradient-to-r from-[var(--site-accent-light)] to-[var(--site-accent-bright)] bg-clip-text text-transparent">{site.sections.faqAccent}</span>
          </h1>
          <p className="text-[var(--site-text-muted)] mt-5 max-w-2xl text-sm leading-7 sm:text-base">
            {site.sections.faqDescription}
          </p>

          <div ref={listRef} className="mt-10 space-y-4 sm:mt-12 sm:space-y-5">
            {questions.map(({ question, answer }, index) => (
              <details
                key={question}
                data-faq-reveal
                className="group overflow-hidden rounded-2xl border border-[var(--site-border-quiet)] bg-[var(--site-glass)] shadow-[0_12px_34px_rgb(var(--site-black-rgb)/0.16)] transition-all duration-300 motion-reduce:transition-none hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--site-accent-light)_28%,var(--site-border-quiet))] hover:bg-[color-mix(in_srgb,var(--site-accent)_6%,var(--site-glass))] open:border-[var(--site-border-soft)] open:bg-[color-mix(in_srgb,var(--site-surface)_88%,var(--site-transparent))] open:shadow-[0_18px_48px_rgb(var(--site-black-rgb)/0.24),0_0_28px_color-mix(in_srgb,var(--site-accent-glow)_28%,var(--site-transparent))]"
                open={index === 0}
              >
                <summary className="faq-question flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left text-sm font-semibold text-[var(--site-text)] marker:hidden sm:px-6 sm:py-6 sm:text-base">
                  <span>{question}</span>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--site-border-soft)] bg-[var(--site-accent-wash)] text-[var(--site-accent-light)] transition-[transform,background-color,border-color] duration-[260ms] motion-reduce:transition-none group-open:rotate-45 group-open:border-[color-mix(in_srgb,var(--site-accent-light)_35%,var(--site-border-soft))] group-open:bg-[color-mix(in_srgb,var(--site-accent)_28%,var(--site-surface))]">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="faq-answer grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="text-[var(--site-text-muted)] max-w-2xl px-5 pb-5 text-sm leading-7 sm:px-6 sm:pb-6">
                      {answer}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>

          <p className="text-[var(--site-text-muted)] mt-8 text-sm leading-7">
            {site.sections.faqMoreQuestions}{' '}
            <Link discover="none"
              to="/contact"
              className="font-medium text-[var(--site-accent-light)] underline decoration-[var(--site-accent-light)]/40 underline-offset-4 transition-colors hover:text-[var(--site-text)]"
            >
              {site.sections.faqContactLink}
            </Link>
          </p>
        </div>

        <div data-scroll-reveal className="faq-contact-banner relative isolate mt-14 w-full overflow-hidden rounded-[1.75rem] border border-[var(--site-border-soft)] bg-[color-mix(in_srgb,var(--site-surface)_82%,var(--site-transparent))] p-6 shadow-[0_28px_90px_var(--site-shadow)] backdrop-blur-xl sm:mt-16 sm:p-8 lg:mt-20 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-28 -z-10 size-80 rounded-full bg-[var(--site-accent-wash)] blur-3xl"
          />
          <div className="relative">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[11px] font-semibold tracking-[0.16em] text-[var(--site-accent-light)] uppercase">
                {site.sections.faqBannerEyebrow}
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                {site.sections.faqBannerTitle}
              </h2>
              <p className="text-[var(--site-text-muted)] mt-3 text-sm leading-6 sm:text-base">
                {site.sections.faqBannerDescription}
              </p>
            </div>

            <div className="mx-auto mt-7 grid w-full max-w-4xl min-w-0 grid-cols-1 items-stretch gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-center">
              {site.contact.email && <a
                href={`mailto:${site.contact.email}`}
                className="group flex min-w-0 items-center gap-3 rounded-2xl border border-[var(--site-border-soft)] bg-[color-mix(in_srgb,var(--site-surface)_65%,var(--site-transparent))] px-4 py-3.5 transition-colors hover:border-[var(--site-accent-light)]/40 hover:bg-[color-mix(in_srgb,var(--site-accent-wash)_35%,var(--site-transparent))]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--site-accent-wash)] text-[var(--site-accent-light)]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5">
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold tracking-[0.14em] text-[var(--site-text-faint)] uppercase">{site.footer.emailLabel}</span>
                  <span className="mt-1 block truncate text-sm font-medium text-[var(--site-text)] transition-colors group-hover:text-[var(--site-accent-light)]">{site.contact.email}</span>
                </span>
              </a>}
              {site.contact.phone && <a
                href={`tel:${site.contact.phone}`}
                className="group flex min-w-0 items-center gap-3 rounded-2xl border border-[var(--site-border-soft)] bg-[color-mix(in_srgb,var(--site-surface)_65%,var(--site-transparent))] px-4 py-3.5 transition-colors hover:border-[var(--site-accent-light)]/40 hover:bg-[color-mix(in_srgb,var(--site-accent-wash)_35%,var(--site-transparent))]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--site-accent-wash)] text-[var(--site-accent-light)]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 8.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold tracking-[0.14em] text-[var(--site-text-faint)] uppercase">{site.sections.contactLabels.phone}</span>
                  <span className="mt-1 block text-sm font-medium text-[var(--site-text)] transition-colors group-hover:text-[var(--site-accent-light)]">{site.contact.phone}</span>
                </span>
              </a>}
              <Button
                label={site.sections.faqContactButton}
                to="/contact"
                className="sm:col-span-2 sm:justify-self-center lg:col-span-1 lg:justify-self-end"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
