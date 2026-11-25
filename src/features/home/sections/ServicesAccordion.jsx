import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button.jsx'
import useReducedMotion from '../../../hooks/useReducedMotion.js'

const referenceServices = [
  {
    id: 'shopify-store-redesign',
    title: 'Shopify Store Redesign',
    description: 'Redesign your Shopify store so products feel premium and checkout feels effortless.',
    includes: ['Store audit and UX review', 'Theme redesign and branding', 'Product and collection page polish', 'Speed and mobile optimization'],
    detailSlug: 'shopify-store-redesign',
  },
  {
    id: 'custom-shopify-features',
    title: 'Custom Shopify Features',
    description: 'Add the exact features your store needs with clean Liquid and storefront code.',
    includes: ['Custom Liquid sections and blocks', 'Product options and bundles', 'Cart and checkout upgrades', 'App and API integrations'],
    detailSlug: 'custom-shopify-features',
  },
  {
    id: 'custom-websites',
    title: 'Custom Websites',
    description: 'Fast, responsive websites built with React or Next.js around your brand and audience.',
    includes: ['Project discovery and page planning', 'Custom React or Next.js build', 'Responsive, accessible interface', 'SEO-ready structure'],
    detailSlug: 'custom-react-websites',
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    description: 'Conversion-focused pages that load fast and guide visitors toward one clear action.',
    includes: ['Focused, high-converting layout', 'Sub-second load times', 'Motion that guides attention', 'Analytics-ready setup'],
    detailSlug: 'nextjs-websites',
  },
  {
    id: 'full-stack-web-apps',
    title: 'Full Stack Web Apps',
    description: 'Build full stack apps with MongoDB, Express, React, and Node.js for dashboards, APIs, and AI-enabled workflows.',
    includes: ['REST APIs and authentication', 'Dashboards and data-backed workflows', 'Scoped AI service integrations', 'Testing and deployment planning'],
    detailSlug: 'mern-stack-web-apps',
  },
  {
    id: 'dashboards-admin-panels',
    title: 'Dashboards & Admin Panels',
    description: 'Clear admin tools that turn your business data into decisions you can act on.',
    includes: ['Charts and live metrics', 'Role-based access', 'Reports and exports', 'Clean, fast data tables'],
    detailSlug: 'mern-stack-web-apps',
  },
  {
    id: 'performance-support',
    title: 'Performance & Support',
    description: 'Keep your site fast, secure and improving long after launch.',
    includes: ['Speed and Core Web Vitals audit', 'Bug fixes and updates', 'Monitoring and backups', 'Ongoing feature support'],
  },
]

export default function ServicesAccordion({ services, serviceEntries, activeIndex, onActiveChange }) {
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()
  const entries = serviceEntries ?? referenceServices
  const selectedIndex = entries.length ? ((activeIndex % entries.length) + entries.length) % entries.length : 0

  useEffect(() => {
    if (reducedMotion || paused || entries.length < 2) return undefined
    const timer = window.setInterval(() => onActiveChange((index) => (index + 1) % entries.length), 7000)
    return () => window.clearInterval(timer)
  }, [entries.length, onActiveChange, paused, reducedMotion])

  const select = (index) => {
    if (entries.length) onActiveChange((index + entries.length) % entries.length)
  }

  return (
    <aside aria-label="My services" className="flex min-h-[520px] min-w-0 flex-col overflow-hidden rounded-[26px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(165deg,rgb(var(--site-black-rgb)/0.92),rgb(var(--site-black-rgb)/0.96))] shadow-[0_30px_80px_-40px_rgb(var(--site-accent-rgb)/0.2)] max-[960px]:min-h-0" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }}>
      <div className="flex items-center justify-between border-b border-[rgb(var(--site-accent-rgb)/0.2)] px-5 py-4 font-mono text-[.68rem] font-medium tracking-[.14em] uppercase"><b className="font-medium text-[var(--site-accent)]">My services</b><span className="text-[var(--site-accent)]">{String(entries.length ? selectedIndex + 1 : 0).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}</span></div>

      <div className="grid flex-1 content-start gap-2 p-3">
        {entries.map((service, index) => {
          const active = index === selectedIndex
          const detailService = service.detailSlug ? services.find((item) => item.slug === service.detailSlug) : null
          const learnMoreTo = service.button?.link || (detailService ? `/services/${detailService.slug}` : '/contact')
          const features = service.features ?? service.includes ?? []
          const serviceId = service._id ?? service.id ?? `${service.title}-${index}`
          return (
            <article key={serviceId} className={`overflow-hidden rounded-2xl border transition-[background,border-color,box-shadow] duration-[400ms] ${active ? 'border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(165deg,rgb(var(--site-black-rgb)/0.7),rgb(var(--site-black-rgb)/0.8))] shadow-[0_0_36px_-14px_var(--site-accent)]' : 'border-transparent bg-[rgb(var(--site-white-rgb)/0.2)] hover:bg-[rgb(var(--site-accent-rgb)/0.2)]'}`}>
              <Button asButton unstyled type="button" aria-expanded={active} aria-controls={`service-panel-${index}`} onClick={() => select(index)} className="flex w-full items-center gap-3.5 border-0 bg-transparent px-3.5 py-3 text-left text-white outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--site-accent)]">
                <span className={`w-[18px] shrink-0 font-mono text-[.68rem] transition-colors ${active ? 'text-[var(--site-accent)]' : 'text-[var(--site-accent)]'}`}>{String(index + 1).padStart(2, '0')}</span>
                <strong className={`flex-1 text-[.96rem] font-semibold transition-colors ${active ? 'text-white' : 'text-[var(--site-white)]'}`}>{service.title}</strong>
                <span aria-hidden="true" className={`grid size-7 shrink-0 place-items-center rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] text-[.8rem] transition-[transform,color,background] ${active ? 'rotate-45 border-transparent bg-[linear-gradient(135deg,var(--site-accent),var(--site-accent))] text-white' : 'text-[var(--site-accent)]'}`}>+</span>
              </Button>
              <div id={`service-panel-${index}`} className={`grid transition-[grid-template-rows] duration-[450ms] ${active ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden"><div className="px-4">
                  <p className="m-0 text-[.86rem] leading-[1.6] text-[var(--site-white)]">{service.description}</p>
                  <ul aria-label={`${service.title} includes`} className="my-3 grid list-none gap-[7px] p-0">{features.map((item, featureIndex) => <li key={`${featureIndex}-${item}`} className="flex items-start gap-2.5 text-[.82rem] text-[var(--site-white)]"><span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[var(--site-accent)] shadow-[0_0_8px_var(--site-accent)]" aria-hidden="true" />{item}</li>)}</ul>
                  <Link discover="none" to={learnMoreTo} className="mb-3.5 inline-flex items-center gap-2 text-[.84rem] font-semibold text-[var(--site-accent)] hover:text-white focus-visible:outline-2 focus-visible:outline-[var(--site-accent)]">{service.button?.text ?? 'Learn more'} <span aria-hidden="true">↗</span></Link>
                </div></div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-auto flex items-center justify-center gap-[14px] border-t border-[rgb(var(--site-accent-rgb)/0.2)] p-3.5">
        <Button asButton unstyled type="button" aria-label="Previous service" onClick={() => select(activeIndex - 1)} className="grid size-[38px] shrink-0 place-items-center rounded-xl border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] text-[.95rem] text-white transition-colors hover:border-[var(--site-accent)] hover:bg-[rgb(var(--site-accent-rgb)/0.2)] focus-visible:outline-2 focus-visible:outline-[var(--site-accent)]">↑</Button>
        <div className="flex items-center gap-1.5" aria-label="Select a service">{entries.map((service, index) => <Button asButton unstyled type="button" key={service._id ?? service.id ?? `${service.title}-${index}`} aria-label={`Show ${service.title}`} aria-current={index === selectedIndex ? 'step' : undefined} onClick={() => select(index)} className={`h-1 rounded-full transition-all duration-300 ${index === selectedIndex ? 'w-7 bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent))] shadow-[0_0_10px_var(--site-accent)]' : 'w-2 bg-[rgb(var(--site-accent-rgb)/0.2)] hover:bg-[rgb(var(--site-accent-rgb)/0.2)]'}`} />)}</div>
        <Button asButton unstyled type="button" aria-label="Next service" onClick={() => select(activeIndex + 1)} className="grid size-[38px] shrink-0 place-items-center rounded-xl border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] text-[.95rem] text-white transition-colors hover:border-[var(--site-accent)] hover:bg-[rgb(var(--site-accent-rgb)/0.2)] focus-visible:outline-2 focus-visible:outline-[var(--site-accent)]">↓</Button>
      </div>
    </aside>
  )
}
