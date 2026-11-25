import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import Logo from './Logo.jsx'
import { navigation } from '../../data/navigation.js'
import { services } from '../../features/services/data/services.js'
import { scrollToSmooth } from '../../hooks/useSmoothScroll.js'
import { openEnquiryModal } from '../../utils/enquiry.js'

const links = navigation.links
const megaMenuServices = services.filter((service) => service.slug !== 'shopify-product-catalog-setup')
const menuCodeLines = ['w-[45%]', 'w-[90%]', 'w-[65%]', 'w-[80%]']
const serviceIconColors = {
  'shopify-store-redesign': '#38BDF8',
  'shopify-theme-customization': '#60A5FA',
  'custom-shopify-features': '#A78BFA',
  'custom-react-websites': '#22D3EE',
  'nextjs-websites': '#CBD5E1',
  'mern-stack-web-apps': '#34D399',
}

function getServiceIconStyle(slug, glow = false) {
  const color = serviceIconColors[slug] || '#22D3EE'
  return {
    color,
    borderColor: `${color}55`,
    ...(glow ? { boxShadow: `0 0 22px -8px ${color}cc` } : {}),
  }
}

function ServiceMenuIcon({ slug, className = 'size-[22px]' }) {
  const paths = {
    'shopify-store-redesign': <><path d="M4 10h16l-1.3-5H5.3L4 10Z"/><path d="M5.5 10v9h13v-9M9 19v-5h6v5"/><path d="M4 10a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/></>,
    'shopify-theme-customization': <><rect x="4" y="5" width="13" height="14" rx="2"/><path d="M8 9h5M8 12h5M8 15h3"/><path d="m18 7 2-2 2 2-2 2M18 17l2-2 2 2-2 2"/></>,
    'custom-shopify-features': <><path d="M12 3v4m0 10v4M3 12h4m10 0h4"/><path d="m12 7 1.7 3.3L17 12l-3.3 1.7L12 17l-1.7-3.3L7 12l3.3-1.7L12 7Z"/><circle cx="12" cy="12" r="9"/></>,
    'shopify-product-catalog-setup': <><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/><path d="m8 5 8 4"/></>,
    'custom-react-websites': <><ellipse cx="12" cy="12" rx="9.5" ry="4"/><ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></>,
    'nextjs-websites': <><path d="M5 19V5l14 14V5"/><path d="M4 21h16"/></>,
    'mern-stack-web-apps': <><ellipse cx="12" cy="5" rx="7.5" ry="3"/><path d="M4.5 5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V5M4.5 11v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6M8 8h8"/></>,
  }
  return <svg aria-hidden="true" style={{ color: serviceIconColors[slug] || '#22D3EE' }} className={`${className} shrink-0 fill-none stroke-current stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]`} viewBox="0 0 24 24">{paths[slug] || paths['custom-shopify-features']}</svg>
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { pathname, hash } = useLocation()
  const megaRef = useRef(null)
  const servicesButtonRef = useRef(null)
  const closeMenu = () => setIsMenuOpen(false)
  const isActive = (href) => {
    const [path, section] = href.split('#')
    const target = path || '/'
    const activePath = target === '/' ? pathname === '/' : pathname === target || pathname.startsWith(`${target}/`)
    return activePath && (!section || hash === `#${section}`)
  }
  const activeHref = links.find(([, href]) => isActive(href))?.[1] || links[0]?.[1]

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (target) scrollToSmooth(target, { immediate: window.matchMedia('(prefers-reduced-motion: reduce)').matches, offset: -92 })
      })
      return () => window.cancelAnimationFrame(frame)
    }
    scrollToSmooth(0, { immediate: window.matchMedia('(prefers-reduced-motion: reduce)').matches })
    return undefined
  }, [pathname, hash])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isMenuOpen)
    return () => document.body.classList.remove('overflow-hidden')
  }, [isMenuOpen])

  useEffect(() => {
    if (!isServicesOpen) return undefined
    const closeOutside = (event) => {
      if (!megaRef.current?.contains(event.target) && !servicesButtonRef.current?.contains(event.target)) setIsServicesOpen(false)
    }
    const closeEscape = (event) => {
      if (event.key === 'Escape') { setIsServicesOpen(false); setIsMenuOpen(false); servicesButtonRef.current?.focus() }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeEscape)
    return () => { document.removeEventListener('pointerdown', closeOutside); document.removeEventListener('keydown', closeEscape) }
  }, [isServicesOpen])

  const navLinkClass = (href) => `relative z-[1] flex items-center gap-[7px] whitespace-nowrap rounded-[13px] px-[18px] py-[11px] text-[.98rem] font-medium !text-[var(--site-white)] transition-colors duration-[250ms] hover:!text-white focus-visible:outline-2 focus-visible:outline-[var(--site-accent)] focus-visible:outline-offset-2 ${activeHref === href ? '!text-white' : ''}`

  return (
    <>
      <header className={`fixed inset-x-0 z-[100] px-[18px] transition-[top] duration-[350ms] max-[520px]:px-3 ${isScrolled ? 'top-2' : 'top-3.5'}`}>
        <nav aria-label="Main navigation" className={`relative mx-auto flex max-w-[1240px] items-center justify-between gap-5 rounded-[26px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(135deg,rgb(var(--site-black-rgb)/0.72),rgb(var(--site-black-rgb)/0.78))] py-3 pr-[18px] pl-7 shadow-[0_20px_60px_-30px_rgb(var(--site-accent-rgb)/0.2)] backdrop-blur-[18px] backdrop-saturate-[1.3] transition-[padding,background,box-shadow] duration-[350ms] before:absolute before:left-[12%] before:right-[12%] before:-top-px before:h-px before:bg-[linear-gradient(90deg,var(--site-transparent),var(--site-accent),var(--site-accent),var(--site-transparent))] before:opacity-80 max-[1020px]:pl-[22px] ${isScrolled ? 'bg-[linear-gradient(135deg,rgb(var(--site-black-rgb)/0.9),rgb(var(--site-black-rgb)/0.92))] py-2 shadow-[0_18px_50px_-20px_rgb(var(--site-black-rgb)/0.9),0_0_40px_-18px_rgb(var(--site-accent-rgb)/0.2)]' : ''}`}>
          <Logo className="relative z-20" onClick={closeMenu} />

          <ul className="relative flex list-none items-center gap-0.5 rounded-[18px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.03] p-1.5 max-[1020px]:hidden">
            {links.map(([label, href]) => (
              <li key={label}>
                {label === 'Services' ? (
                    <Button asButton unstyled buttonRef={servicesButtonRef} type="button" className={`${navLinkClass(href)} group/services ${isServicesOpen ? 'border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(135deg,rgb(var(--site-accent-rgb)/0.2),rgb(var(--site-accent-rgb)/0.2))] shadow-[0_0_22px_-6px_var(--site-accent)]' : ''}`} data-href={href} aria-haspopup="true" aria-expanded={isServicesOpen} aria-controls="services-mega-menu" onPointerEnter={() => window.matchMedia('(hover:hover)').matches && setIsServicesOpen(true)} onClick={() => setIsServicesOpen((open) => !open)} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); setIsServicesOpen(true); requestAnimationFrame(() => megaRef.current?.querySelector('a')?.focus()) } }}>
                    {label}<svg aria-hidden="true" className={`size-3 fill-none stroke-current stroke-[2.4] transition-transform duration-[350ms] ${isServicesOpen ? 'rotate-180' : ''}`} viewBox="0 0 12 12"><path d="m2 4.5 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Button>
                ) : <Link discover="none" to={href} data-href={href} aria-current={isActive(href) ? 'page' : undefined} className={`${navLinkClass(href)} ${activeHref === href ? 'border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(135deg,rgb(var(--site-accent-rgb)/0.2),rgb(var(--site-accent-rgb)/0.2))] shadow-[0_0_22px_-6px_var(--site-accent)]' : ''}`}>{label}</Link>}
              </li>
            ))}
          </ul>

          <Button asButton type="button" onClick={openEnquiryModal} label={`${navigation.cta} →`} className="!hidden whitespace-nowrap rounded-[15px] px-[26px] py-3.5 text-[.95rem] min-[1021px]:!inline-flex" />

          <Button asButton unstyled aria-controls="mobile-navigation" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} className="group/menu grid size-[46px] place-items-center rounded-[14px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.04] min-[1021px]:hidden" onClick={() => setIsMenuOpen((open) => !open)} type="button">
            <span className="relative block h-[18px] w-[18px]">
              <i className={`absolute left-0 top-[2px] block h-0.5 w-[18px] rounded-sm bg-white transition-transform duration-300 ${isMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <i className={`absolute left-0 top-[8px] block h-0.5 w-[18px] rounded-sm bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <i className={`absolute left-0 top-[14px] block h-0.5 w-[18px] rounded-sm bg-white transition-transform duration-300 ${isMenuOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
            </span>
          </Button>

          <div ref={megaRef} id="services-mega-menu" role="region" aria-label="Services" aria-hidden={!isServicesOpen} className={`absolute left-1/2 top-[calc(100%+12px)] z-[99] w-[min(1060px,calc(100vw-36px))] origin-top -translate-x-1/2 rounded-[26px] transition-[opacity,transform,visibility] duration-300 max-[1020px]:hidden motion-reduce:transition-none ${isServicesOpen ? 'visible translate-y-0 scale-100 opacity-100 pointer-events-auto' : 'invisible -translate-y-2.5 scale-[.98] opacity-0 pointer-events-none'}`} onPointerLeave={() => window.matchMedia('(hover:hover)').matches && setIsServicesOpen(false)}>
            <div className="overflow-hidden rounded-[26px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(160deg,rgb(var(--site-black-rgb)/0.96),rgb(var(--site-black-rgb)/0.97))] shadow-[0_40px_100px_-30px_var(--site-black),0_0_80px_-30px_rgb(var(--site-accent-rgb)/0.2)] backdrop-blur-[20px]">
              <div className="flex items-center justify-between gap-5 border-b border-[rgb(var(--site-accent-rgb)/0.2)] px-7 py-[18px] text-[.86rem] text-[var(--site-white)]"><b className="font-mono text-[.68rem] tracking-[.2em] text-[var(--site-accent)] uppercase">What I can help with</b><span>Choose a service to see details, scope, and next steps.</span></div>
              <div className="grid grid-cols-[270px_1fr] gap-2 p-3">
                <div className={`flex flex-col gap-3.5 overflow-hidden rounded-[18px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[radial-gradient(90%_70%_at_100%_0,rgb(var(--site-accent-rgb)/0.2),transparent_70%),linear-gradient(160deg,rgb(var(--site-accent-rgb)/0.2),rgb(var(--site-black-rgb)/0.9))] p-5 ${isServicesOpen ? 'animate-[mega-menu-card-in_.45s_cubic-bezier(.2,.8,.2,1)_both]' : ''}`}>
                  <small className="font-mono text-[.62rem] tracking-[.18em] text-[var(--site-accent)]">NOT SURE WHERE TO START?</small><h4 className="text-[1.25rem] font-bold leading-tight tracking-[-.01em]">Let’s find the right fit for your business.</h4>
                  <div aria-hidden="true" className="overflow-hidden rounded-[11px] border border-white/[.14] bg-[var(--site-black)] shadow-[0_14px_30px_-12px_var(--site-black)]"><i className="flex gap-1 bg-white/5 px-[9px] py-[7px]"><b className="size-1.5 rounded-full bg-[var(--site-accent)]"/><b className="size-1.5 rounded-full bg-[var(--site-accent-bright)]"/><b className="size-1.5 rounded-full bg-[var(--site-accent-light)]"/></i><div className="grid gap-1.5 p-2.5">{menuCodeLines.map((width, index) => <span key={width} style={{ animationDelay: `${120 + index * 110}ms` }} className={`h-1.5 origin-left rounded-[3px] bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent))] [transform:scaleX(0)] motion-reduce:[transform:scaleX(1)] ${isServicesOpen ? 'animate-[mega-menu-code-line_.65s_cubic-bezier(.2,.8,.2,1)_both]' : ''} ${width}`} />)}</div></div>
                  <p className="text-[.82rem] leading-[1.55] text-[var(--site-white)]">A short call is enough to scope your project and plan next steps.</p>
                  <Button asButton type="button" label="Book a free call →" variant="secondary" onClick={() => { setIsServicesOpen(false); openEnquiryModal() }} className="mt-auto rounded-xl p-[11px] text-[.85rem]" />
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {megaMenuServices.map((service, index) => <Link discover="none" key={service.slug} to={`/services/${service.slug}`} onClick={() => setIsServicesOpen(false)} style={{ animationDelay: isServicesOpen ? `${index * 65}ms` : undefined }} className={`group/service-item relative flex items-start gap-3.5 rounded-[18px] border border-transparent px-3.5 py-4 transition-[border-color,background,transform] duration-300 hover:-translate-y-px hover:border-[rgb(var(--site-accent-rgb)/0.2)] hover:bg-[rgb(var(--site-accent-rgb)/0.2)] ${isServicesOpen ? 'animate-[mega-menu-item-in_.55s_cubic-bezier(.2,.8,.2,1)_both]' : 'opacity-0'} motion-reduce:animate-none motion-reduce:opacity-100`}>
                    <span style={getServiceIconStyle(service.slug, true)} className="relative grid size-12 flex-none place-items-center rounded-[14px] border bg-[linear-gradient(145deg,rgb(var(--site-black-rgb)/0.65),rgb(var(--site-black-rgb)/0.9))] transition-transform duration-300 group-hover/service-item:-rotate-1 group-hover/service-item:-translate-y-0.5"><ServiceMenuIcon slug={service.slug} /></span>
                    <span className="relative min-w-0 flex-1"><b className="mb-1 block text-[.98rem]">{service.title}</b><span className="block text-[.8rem] leading-[1.55] text-[var(--site-white)]">{service.description}</span></span><span aria-hidden="true" className="relative mt-2 grid size-[30px] flex-none place-items-center rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] text-[.78rem] text-[var(--site-accent)] transition-all duration-300 group-hover/service-item:translate-x-0.5 group-hover/service-item:-translate-y-0.5 group-hover/service-item:border-transparent group-hover/service-item:bg-[linear-gradient(135deg,var(--site-accent),var(--site-accent))] group-hover/service-item:text-white">↗</span>
                  </Link>)}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[rgb(var(--site-accent-rgb)/0.2)] px-7 py-4 text-[.9rem] font-semibold"><Link discover="none" to="/services" onClick={() => setIsServicesOpen(false)} className="inline-flex items-center gap-2.5 !text-[var(--site-accent)] transition-[gap,color] duration-[250ms] hover:gap-4 hover:!text-white">View all services <span aria-hidden="true">→</span></Link><span className="text-[.8rem] font-normal text-[var(--site-white)]">{megaMenuServices.length} services · Fast, responsive, built to sell</span></div>
            </div>
          </div>
        </nav>
      </header>

      <div aria-hidden="true" className="h-[92px] max-[520px]:h-[78px]" />

      <aside id="mobile-navigation" aria-label="Mobile menu" className={`fixed inset-0 z-[98] overflow-y-auto bg-[linear-gradient(170deg,var(--site-black),var(--site-black))] px-5 pt-24 pb-7 transition-[transform,visibility] duration-[450ms] ease-[cubic-bezier(.2,.8,.2,1)] min-[1021px]:hidden ${isMenuOpen ? 'visible translate-x-0' : 'invisible translate-x-full'}`}>
        {links.map(([label, href]) => label === 'Services' ? <div key={label}>
          <Button asButton unstyled type="button" aria-expanded={isServicesOpen} onClick={() => setIsServicesOpen((open) => !open)} className="flex w-full items-center justify-between border-b border-[rgb(var(--site-accent-rgb)/0.2)] px-1.5 py-[17px] text-left text-[1.25rem] font-semibold">Services<svg aria-hidden="true" className={`size-4 fill-none stroke-[var(--site-accent)] stroke-[2.4] transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} viewBox="0 0 16 16"><path d="m3 6 5 5 5-5"/></svg></Button>
          <div className={`grid transition-[grid-template-rows] duration-[400ms] ${isServicesOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><div className="overflow-hidden">{megaMenuServices.map((service) => <Link discover="none" key={service.slug} to={`/services/${service.slug}`} onClick={closeMenu} className="flex items-center gap-3 py-3 pr-1.5 pl-2.5 text-[.95rem] text-[var(--site-white)]"><span style={getServiceIconStyle(service.slug)} className="grid size-[38px] flex-none place-items-center rounded-[11px] border bg-[linear-gradient(145deg,rgb(var(--site-black-rgb)/0.65),rgb(var(--site-black-rgb)/0.9))]"><ServiceMenuIcon slug={service.slug} className="size-[18px]" /></span>{service.title}</Link>)}</div></div>
        </div> : <Link discover="none" key={label} to={href} onClick={closeMenu} aria-current={isActive(href) ? 'page' : undefined} className="flex w-full items-center justify-between border-b border-[rgb(var(--site-accent-rgb)/0.2)] px-1.5 py-[17px] text-left text-[1.25rem] font-semibold !text-[var(--site-white)]">{label}</Link>)}
        <Button asButton type="button" label={`${navigation.cta} →`} onClick={() => { closeMenu(); openEnquiryModal() }} className="mt-6 w-full rounded-[15px] px-[26px] py-3.5 text-[.95rem]" />
      </aside>
    </>
  )
}

export default Navbar
