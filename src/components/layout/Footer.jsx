import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import Logo from './Logo.jsx'
import { site } from '../../data/siteConfig.js'
import { socialLinks } from '../../data/socialLinks.js'
import Button from '../ui/Button.jsx'
import { openEnquiryModal } from '../../utils/enquiry.js'

const portfolioPrompt = `Write a concise, professional overview of Astrix Code for a potential client. Astrix Code is a full stack web development portfolio focused on Shopify store redesigns and theme customization, responsive React and Next.js websites, and MERN applications built with MongoDB, Express, React, and Node.js. It can also integrate AI services into clearly scoped application features when they solve a real user need. Emphasize customer-focused design, reliable development, clear communication, and practical project planning. Use only these facts; do not invent clients, results, metrics, or certifications.`

const aiTools = [
  { name: 'ChatGPT', image: 'chatgpt.webp', url: 'https://chatgpt.com/?q=' },
  { name: 'Claude', image: 'claude.webp', url: 'https://claude.ai/new?q=' },
  { name: 'Gemini', image: 'gemini.webp', url: 'https://gemini.google.com/app?prompt=' },
  { name: 'Copilot', image: 'copilot.webp', url: 'https://copilot.microsoft.com/?q=' },
  { name: 'Perplexity', image: 'perplexity.webp', url: 'https://www.perplexity.ai/search?q=' },
  { name: 'DeepSeek', image: 'deepseek-whale.webp', url: 'https://chat.deepseek.com/?q=' },
]

const footerColumns = [
  { title: site.footer.exploreTitle, subtitle: 'Navigate through the website', icon: 'explore', label: site.footer.exploreLabel, links: site.footer.exploreLinks },
  { title: site.footer.workTitle, subtitle: 'See what we build', icon: 'work', label: site.footer.workLabel, links: site.footer.workLinks },
]

function ColumnIcon({ name }) {
  if (name === 'explore') return <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>
  if (name === 'work') return <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11 0v2h4v-2"/></svg>
  return <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 3-7.2 18-3.9-7.9L2 9.2 21 3Z"/><path d="m10 13 5-5"/></svg>
}

function FooterNav({ title, label, subtitle, icon, links }) {
  return (
    <nav aria-label={label} className="min-w-0 border-t border-[rgb(var(--site-accent-rgb)/0.2)] pt-6 sm:border-0 sm:pt-0">
      <div className="mb-5 flex min-h-12 items-center gap-3 rounded-2xl border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.025] px-3 py-2.5">
        <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-[11px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(145deg,rgb(var(--site-black-rgb)/0.5),rgb(var(--site-black-rgb)/0.88))] text-[var(--site-accent)]"><ColumnIcon name={icon} /></span>
        <span className="min-w-0"><span className="block text-sm font-bold tracking-[.02em]">{title}</span><span className="block truncate text-[11px] text-[var(--site-white)]">{subtitle}</span></span>
      </div>
      <ul className="list-none">
        {links.map(({ label: linkLabel, to }) => (
          <li className="border-b border-[rgb(var(--site-accent-rgb)/0.2)] last:border-0" key={linkLabel}>
            <Link discover="none" to={to} className="group flex min-h-11 items-center justify-between py-3 text-sm text-[var(--site-white)] transition hover:translate-x-1 hover:text-white focus-visible:outline-2 focus-visible:outline-[var(--site-accent)]">
              <span>{linkLabel}</span><span aria-hidden="true" className="translate-x-[-6px] translate-y-[6px] text-xs text-[var(--site-accent)] opacity-0 transition group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">↗</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function AIToolLinks() {
  return (
    <section aria-labelledby="footer-ai-heading" className="grid min-w-0 gap-6 rounded-[26px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(150deg,rgb(var(--site-black-rgb)/0.55),rgb(var(--site-black-rgb)/0.85))] p-5 shadow-[0_30px_70px_-40px_rgb(var(--site-accent-rgb)/0.2)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[rgb(var(--site-accent-rgb)/0.2)] hover:shadow-[0_28px_70px_-38px_rgb(var(--site-accent-rgb)/0.2)] sm:p-[26px] lg:grid-cols-[200px_minmax(0,1fr)] lg:items-center motion-reduce:transition-none">
      <div className="min-w-0">
        <span aria-hidden="true" className="mb-3 grid size-12 place-items-center rounded-[14px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(145deg,rgb(var(--site-black-rgb)/0.6),rgb(var(--site-black-rgb)/0.9))] text-[var(--site-accent)] shadow-[0_0_22px_-6px_var(--site-accent)]"><svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M8 8l8 8M16 8l-8 8"/><circle cx="12" cy="12" r="2"/></svg></span>
        <p className="mb-1.5 font-mono text-[10px] font-semibold tracking-[.18em] text-[var(--site-accent)]">AI SHORTCUTS</p>
        <h2 id="footer-ai-heading" className="text-lg font-bold tracking-tight text-[var(--site-white)]">Explore with AI</h2>
        <p className="mt-1.5 max-w-[30ch] text-xs leading-relaxed text-[var(--site-white)]">Open a tool with a ready-to-use prompt about this portfolio.</p>
      </div>
      <ul className="grid list-none grid-cols-2 gap-3 sm:grid-cols-3">
        {aiTools.map((tool) => (
          <li key={tool.name}>
            <a href={`${tool.url}${encodeURIComponent(portfolioPrompt)}`} target="_blank" rel="noreferrer" aria-label={`Open ${tool.name} with a prompt about Astrix Code`} className="group relative flex min-h-[88px] min-w-0 flex-col items-center justify-center gap-2.5 rounded-[16px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.04] px-3 py-3 text-center transition hover:-translate-y-0.5 hover:border-[var(--site-accent)] hover:bg-[rgb(var(--site-accent-rgb)/0.2)] focus-visible:outline-2 focus-visible:outline-[var(--site-accent)]">
              <span className="grid size-11 shrink-0 place-items-center rounded-[13px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-black/35 shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.08)]">
                <img src={`/TechIcons/optimized/${tool.image}`} alt="" aria-hidden="true" width="28" height="28" loading="lazy" decoding="async" className="size-7 object-contain" />
              </span>
              <span className="max-w-full break-words text-xs font-bold leading-tight text-white">{tool.name}</span>
              <span aria-hidden="true" className="absolute right-2.5 top-2.5 text-[11px] text-[var(--site-accent)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function GoogleSearchCard() {
  return (
    <section aria-labelledby="footer-google-heading" className="flex min-w-0 flex-col justify-center gap-5 rounded-[26px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(150deg,rgb(var(--site-black-rgb)/0.55),rgb(var(--site-black-rgb)/0.85))] p-5 shadow-[0_30px_70px_-40px_rgb(var(--site-accent-rgb)/0.2)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[rgb(var(--site-accent-rgb)/0.2)] hover:shadow-[0_28px_70px_-38px_rgb(var(--site-accent-rgb)/0.2)] sm:p-[26px] motion-reduce:transition-none">
      <div className="flex min-w-0 items-center gap-3.5">
        <span aria-hidden="true" className="google-mark-box grid size-12 shrink-0 place-items-center rounded-[16px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(145deg,rgb(var(--site-white-rgb)/0.2),rgb(var(--site-accent-rgb)/0.2))] shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.2),0_10px_28px_-18px_var(--site-accent)]">
          <svg className="size-[27px]" viewBox="0 0 48 48" role="img" aria-label="Google">
            <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4.1 6v5h6.6c3.9-3.6 6.1-8.6 6.1-14.7Z" />
            <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.5H5.8v5.2A20 20 0 0 0 24 44Z" />
            <path fill="#FBBC05" d="M12.6 27.7a12 12 0 0 1 0-7.4v-5.2H5.8a20 20 0 0 0 0 17.8l6.8-5.2Z" />
            <path fill="#EA4335" d="M24 11.8c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 5.7 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.2C14.2 15.4 18.7 11.8 24 11.8Z" />
          </svg>
        </span>
        <span className="min-w-0"><span className="block font-mono text-[10px] font-semibold tracking-[.18em] text-[var(--site-accent)]">FIND US ONLINE</span><h2 id="footer-google-heading" className="mt-1 text-base font-bold text-[var(--site-white)]">Find Astrix Code</h2><p className="mt-1 text-xs leading-relaxed text-[var(--site-white)]">Search our name on Google to learn more.</p></span>
      </div>
      <form action="https://www.google.com/search" method="get" target="_blank" rel="noreferrer" className="flex h-14 min-w-0 items-center gap-2 rounded-2xl border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-black-rgb)/0.6)] p-1.5 pl-4 transition focus-within:border-[var(--site-accent)] focus-within:shadow-[0_0_0_4px_rgb(var(--site-accent-rgb)/0.2)]">
        <label className="sr-only" htmlFor="footer-google-query">Search Google</label>
        <input id="footer-google-query" name="q" type="search" defaultValue="Astrix Code" className="min-w-0 flex-1 border-0 bg-transparent text-sm font-semibold text-white outline-none" />
        <Button asButton unstyled type="submit" aria-label="Search Google for Astrix Code" className="grid size-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--site-accent),var(--site-accent))] text-[var(--site-black)] shadow-[0_8px_20px_-8px_var(--site-accent)] transition hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-[var(--site-accent)]"><svg aria-hidden="true" className="size-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></svg></Button>
      </form>
    </section>
  )
}

export default function Footer() {
  return (
    <footer className="relative isolate mt-16 overflow-hidden bg-black px-5 text-white before:pointer-events-none before:absolute before:inset-0 before:z-[-1] before:bg-black before:content-[''] sm:px-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[12%] top-[14%] size-[330px] rounded-full opacity-55 blur-[70px] animate-[footer-glow-drift_15s_ease-in-out_infinite] bg-[radial-gradient(circle,rgb(var(--site-accent-rgb)/0.2),rgb(var(--site-accent-rgb)/0.2)_70%)] motion-reduce:animate-none" />
        <span className="absolute left-[74%] top-[46%] size-[440px] rounded-full opacity-55 blur-[70px] animate-[footer-glow-drift_15s_ease-in-out_infinite_-7s] bg-[radial-gradient(circle,rgb(var(--site-accent-rgb)/0.2),rgb(var(--site-accent-rgb)/0.2)_38%,transparent_72%)] motion-reduce:animate-none" />
        <span className="absolute left-[76%] top-[18%] size-[min(760px,100vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgb(var(--site-accent-rgb)/0.2)] animate-[footer-orbit-drift_100s_linear_infinite] motion-reduce:animate-none" />
        <span className="absolute left-[76%] top-[18%] size-[min(1020px,130vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] opacity-55 animate-[footer-orbit-drift_150s_linear_infinite_reverse] motion-reduce:animate-none" />
        <span className="absolute inset-0 opacity-[.12] bg-[linear-gradient(rgb(var(--site-accent-rgb)/0.2)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--site-accent-rgb)/0.2)_1px,transparent_1px)] bg-[length:64px_64px] [mask-image:radial-gradient(65%_70%_at_55%_12%,var(--site-black),var(--site-transparent))]" />
      </div>

      <Container><div className="relative z-10 mx-auto w-full max-w-[1240px]">
        <section className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[26px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(120deg,rgb(var(--site-black-rgb)/0.55),rgb(var(--site-black-rgb)/0.7)_60%,rgb(var(--site-black-rgb)/0.4))] px-5 py-6 shadow-[0_30px_80px_-40px_rgb(var(--site-accent-rgb)/0.2)] sm:px-9 sm:py-[30px] min-[1000px]:flex-row min-[1000px]:items-center">
          <div><p className="mb-2 font-mono text-[10px] font-semibold tracking-[.18em] text-[var(--site-accent)]">{site.footer.ctaKicker}</p><h2 className="text-[clamp(1.3rem,3vw,1.9rem)] font-bold leading-tight tracking-[-.02em]">Have a project in mind? <span className="bg-gradient-to-r from-[var(--site-accent)] to-[var(--site-accent)] bg-clip-text text-transparent">Let’s build it.</span></h2><p className="mt-1.5 text-sm text-[var(--site-white)]">Tell me about your store or website and I’ll reply with a clear plan and quote.</p></div>
          <Button asButton unstyled type="button" onClick={openEnquiryModal} className="group inline-flex min-h-12 shrink-0 items-center gap-2.5 whitespace-nowrap rounded-[14px] bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent))] px-6 text-sm font-bold text-white shadow-[0_12px_30px_-10px_var(--site-accent)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-8px_var(--site-accent)] focus-visible:outline-2 focus-visible:outline-[var(--site-accent)] max-[400px]:w-full max-[400px]:justify-center max-[400px]:whitespace-normal max-[400px]:px-4">Let’s talk about your project<span aria-hidden="true" className="transition group-hover:translate-x-1">→</span></Button>
        </section>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-[1.25fr_1fr_1fr_1.05fr] min-[1000px]:gap-y-0">
          <section className="min-w-0 rounded-[22px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(145deg,rgb(var(--site-white-rgb)/0.2),rgb(var(--site-accent-rgb)/0.2))] p-5 min-[1000px]:col-span-1 min-[1000px]:p-4 min-[1200px]:p-5">
            <div className="flex flex-col items-start gap-3">
              <Logo wordmarkClassName="text-[27px] sm:text-[29px]" />
              <span className="inline-flex min-h-7 items-center gap-2 rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] px-3 py-1 text-[10px] font-semibold text-[var(--site-white)] before:size-1.5 before:shrink-0 before:rounded-full before:bg-[var(--site-accent)] before:shadow-[0_0_8px_var(--site-accent)]">Web Developer</span>
            </div>
            <p className="mt-4 max-w-[300px] text-[.92rem] leading-relaxed text-[var(--site-white)]">Shopify stores and custom websites, shaped around your customers and goals.</p>
            <div className="my-[18px] flex flex-wrap gap-2">{['Shopify', 'React', 'Next.js', 'MERN'].map((specialty) => <span key={specialty} className="rounded-[9px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.03] px-3 py-1.5 text-[11px] font-bold text-[var(--site-white)] transition hover:-translate-y-0.5 hover:border-[var(--site-accent)]">{specialty}</span>)}</div>
            <p className="flex items-center gap-2 text-xs text-[var(--site-white)]"><span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[var(--site-accent)] shadow-[0_0_8px_var(--site-accent)]" />{site.footer.tagline}</p>
          </section>

          {footerColumns.map((column) => <FooterNav key={column.label} {...column} />)}

          <section className="min-w-0 border-t border-[rgb(var(--site-accent-rgb)/0.2)] pt-6 min-[700px]:col-span-2 min-[1000px]:col-span-1 min-[1000px]:border-0 min-[1000px]:pt-0">
            <div className="mb-5 flex min-h-12 items-center gap-3 rounded-2xl border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.025] px-3 py-2.5"><span className="grid size-9 shrink-0 place-items-center rounded-[11px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(145deg,rgb(var(--site-black-rgb)/0.5),rgb(var(--site-black-rgb)/0.88))] text-[var(--site-accent)]"><ColumnIcon name="connect" /></span><span className="min-w-0"><span className="block text-sm font-bold tracking-[.02em]">{site.footer.connectTitle}</span><span className="block truncate text-[11px] text-[var(--site-white)]">Let’s work together</span></span></div>
            {site.contact.email && <a href={`mailto:${site.contact.email}`} className="flex min-h-12 items-center gap-3 break-all rounded-[14px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.03] px-4 text-sm font-medium transition hover:-translate-y-0.5 hover:border-[var(--site-accent)] hover:bg-[rgb(var(--site-accent-rgb)/0.2)] focus-visible:outline-2 focus-visible:outline-[var(--site-accent)]"><svg aria-hidden="true" className="size-[18px] shrink-0 text-[var(--site-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>{site.contact.email}</a>}
            <p className="mt-4 flex items-center gap-2.5 text-xs text-[var(--site-white)] before:size-1.5 before:shrink-0 before:animate-pulse before:rounded-full before:bg-[var(--site-accent)] before:shadow-[0_0_8px_var(--site-accent)] motion-reduce:before:animate-none">{site.footer.remoteAvailability}</p>
          </section>
        </div>

        <div className="my-[52px] h-px bg-gradient-to-r from-transparent via-[rgb(var(--site-accent-rgb)/0.2)] to-transparent" />
        <div className="grid gap-5 min-[1000px]:grid-cols-[1.15fr_.85fr]">
          <AIToolLinks />
          <GoogleSearchCard />
        </div>

        <div className="mt-[30px] grid justify-items-start gap-4 border-t border-[rgb(var(--site-accent-rgb)/0.2)] py-[22px] pb-[26px] text-xs text-[var(--site-white)] min-[700px]:grid-cols-[1fr_auto_1fr] min-[700px]:items-center min-[700px]:justify-items-stretch">
          <span>{site.footer.copyright}</span>
          <nav className="flex gap-2.5" aria-label="Social links">
            {socialLinks.map((social) => <a className="grid size-[38px] place-items-center rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.04] transition hover:-translate-y-0.5 hover:border-[var(--site-accent)] hover:bg-[rgb(var(--site-accent-rgb)/0.2)] focus-visible:outline-2 focus-visible:outline-[var(--site-accent)]" href={social.href} key={social.label} aria-label={social.label} title={social.label} {...(social.external ? { target: '_blank', rel: 'noreferrer' } : {})}><img className="size-[17px] object-contain" src={`/TechIcons/optimized/${social.icon === 'github' ? 'github.png' : `${social.icon}.svg`}`} alt="" aria-hidden="true" /></a>)}
          </nav>
          <span className="flex items-center gap-2 text-[var(--site-white)] min-[700px]:justify-self-end"><b aria-hidden="true" className="text-base text-[var(--site-accent)]">✦</b>{site.footer.tagline}</span>
        </div>
      </div></Container>
    </footer>
  )
}
