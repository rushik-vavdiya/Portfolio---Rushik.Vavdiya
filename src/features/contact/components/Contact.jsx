import Container from '../../../components/ui/Container.jsx'
import Button from '../../../components/ui/Button.jsx'
import ContactForm from './ContactForm.jsx'
import { site } from '../../../data/siteConfig.js'

const contactItems = [
  {
    label: site.sections.contactLabels.email,
    value: site.contact.email,
    icon: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
  },
  {
    label: site.sections.contactLabels.phone,
    value: site.contact.phone,
    href: `tel:${site.contact.phone}`,
    icon: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 8.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" />,
  },
  {
    label: site.sections.contactLabels.location,
    value: site.contact.location,
    icon: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  },
].filter((item) => item.value)

function ContactIcon({ children, className = 'size-5' }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  )
}

export default function Contact() {
  return (
    <>
      <section id="contact" aria-labelledby="contact-heading" className="relative isolate overflow-hidden px-5 py-12 text-[var(--site-text)] sm:px-8 sm:py-[72px] lg:px-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,rgb(var(--site-accent-rgb)/0.2),transparent_36%),radial-gradient(ellipse_at_88%_58%,rgb(var(--site-accent-rgb)/0.2),transparent_30%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-8 h-[420px] w-[min(700px,90vw)] -translate-x-1/2 rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] opacity-60 [mask-image:radial-gradient(circle,var(--site-black),transparent_72%)]" />

        <Container>
          <div data-reveal-group="split" className="relative grid items-start gap-8 lg:grid-cols-[minmax(280px,.78fr)_minmax(480px,1.22fr)] lg:gap-10 xl:gap-14"> {/* // REVEAL ANIMATION */}
            <div data-scroll-reveal className="min-w-0 lg:sticky lg:top-28">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] px-3.5 py-1.5 text-[10px] font-bold tracking-[.16em] text-[var(--site-accent)] uppercase">
                <span className="size-1.5 rounded-full bg-[var(--site-accent)] shadow-[0_0_12px_rgb(var(--site-accent-rgb)/0.2)]" />
                {site.sections.contactKicker}
              </div>

              <h1 id="contact-heading" className="max-w-[13ch] text-balance text-[clamp(2.25rem,5vw,3.8rem)] font-[750] leading-[1.02] tracking-[-.055em] text-white">
                {site.contactPage.titleLines[0]} <span className="bg-gradient-to-r from-[var(--site-accent)] via-[var(--site-accent)] to-[var(--site-accent)] bg-clip-text text-transparent">{site.contactPage.titleLines[1]}</span>
              </h1>

              <p className="mt-5 max-w-[34rem] text-[.94rem] leading-[1.75] text-[var(--site-white)] sm:text-base">
                Tell me what you’re looking to build or improve. Share a few details and I’ll get back to you with a clear next step.
              </p>

              <Button href="#contact-form" label={`${site.sections.contactCallButton} ↗`} variant="primary" size="md" className="mt-6 rounded-xl px-5" />

              <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                {contactItems.map((item) => (
                  <div key={item.label} className="group flex min-h-[74px] items-center gap-3.5 rounded-[16px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(145deg,rgb(var(--site-white-rgb)/0.2),rgb(var(--site-accent-rgb)/0.2))] p-3.5 transition-[transform,border-color,background] duration-200 hover:-translate-y-0.5 hover:border-[rgb(var(--site-accent-rgb)/0.2)]">
                    <span className="grid size-10 shrink-0 place-items-center rounded-[12px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] text-[var(--site-accent)]">
                      <ContactIcon>{item.icon}</ContactIcon>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[9px] font-bold uppercase tracking-[.14em] text-[var(--site-white)]">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="mt-1 block truncate text-[.84rem] font-semibold text-[var(--site-white)] transition-colors hover:text-[var(--site-accent)]">{item.value}</a>
                      ) : (
                        <span className="mt-1 block text-[.84rem] font-semibold leading-[1.4] text-[var(--site-white)]">{item.value}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-[14px] border border-[rgb(var(--site-accent-bright-rgb)/0.2)] bg-[rgb(var(--site-accent-bright-rgb)/0.2)] px-4 py-3">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-[var(--site-accent-bright)] shadow-[0_0_12px_rgb(var(--site-accent-bright-rgb)/0.2)]" />
                <p className="m-0 text-[11px] leading-[1.55] text-[var(--site-white)]">{site.contactPage.description}</p>
              </div>
            </div>

            <div className="min-w-0">
              <ContactForm />
            </div>
          </div>

          <div className="relative mt-10 grid overflow-hidden rounded-[20px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(145deg,rgb(var(--site-black-rgb)/0.58),rgb(var(--site-black-rgb)/0.76))] sm:grid-cols-3">
            {[
              ['01', 'Share the goal', 'Tell me what you want to improve or launch.'],
              ['02', 'Confirm the scope', 'We agree on the work, timing, and budget.'],
              ['03', 'Start the build', 'I develop, test, and prepare your project for launch.'],
            ].map(([number, title, description], index) => (
              <div key={number} className={`relative flex min-h-[112px] items-start gap-3 px-5 py-5 ${index > 0 ? 'border-t border-[rgb(var(--site-accent-rgb)/0.2)] sm:border-l sm:border-t-0' : ''}`}>
                <span className="grid size-7 shrink-0 place-items-center rounded-[8px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] font-mono text-[9px] font-bold text-[var(--site-accent)]">{number}</span>
                <span className="min-w-0">
                  <b className="block text-[.86rem] text-white">{title}</b>
                  <small className="mt-1.5 block text-[11px] leading-[1.55] text-[var(--site-white)]">{description}</small>
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
