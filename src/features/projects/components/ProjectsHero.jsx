import { projectsPageCopy } from '../data/projects.js'
import Container from '../../../components/ui/Container.jsx'

export default function ProjectsHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--site-bg)] pt-[clamp(48px,6vw,72px)] px-5 pb-[clamp(28px,3.5vw,42px)] max-[560px]:px-[18px] max-[560px]:py-[42px_18px_34px]">
      <Container>
        <header data-scroll-reveal className="relative z-[1] mx-auto max-w-[850px] text-center">
          <span className="inline-flex items-center gap-[9px] font-mono text-[11px] leading-none font-[650] tracking-[.14em] text-[var(--site-accent-light)]"><i aria-hidden="true" className="size-[7px] rounded-full bg-current shadow-[0_0_12px_var(--site-accent-glow-strong)]" />{projectsPageCopy.eyebrow}</span>
          <h1 className="mt-5 mb-0 text-[clamp(40px,5.2vw,66px)] leading-[.98] font-[750] tracking-[-.065em] text-[var(--site-text)] text-balance max-[560px]:mt-4 max-[560px]:text-[clamp(36px,11vw,48px)]">{projectsPageCopy.title} <span className="inline text-[var(--site-transparent)] bg-[linear-gradient(100deg,var(--site-accent-light),var(--site-accent-bright))] bg-clip-text [-webkit-text-fill-color:var(--site-transparent)]">{projectsPageCopy.titleAccent}</span></h1>
          <p className="mx-auto mt-[22px] mb-0 max-w-[520px] text-[clamp(15px,1.5vw,18px)] leading-[1.75] text-[var(--site-text-muted)] max-[560px]:mt-4 max-[560px]:text-[14px] max-[560px]:leading-[1.65]">{projectsPageCopy.description}</p>
        </header>
      </Container>
    </section>
  )
}
