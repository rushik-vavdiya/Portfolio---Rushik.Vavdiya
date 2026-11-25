import Container from '../../../components/ui/Container.jsx'
import Button from '../../../components/ui/Button.jsx'

export default function ProjectsCTA() {
  return (
    <section aria-labelledby="projects-cta-heading" className="projects-next-step-section px-5 py-10 text-[var(--site-text)] sm:px-8 sm:py-14 lg:px-10">
      <Container>
        <div className="flex items-center justify-between gap-[28px] rounded-[24px] border border-[var(--site-border-quiet)] bg-[radial-gradient(ellipse_at_8%_0%,color-mix(in_srgb,var(--site-accent)_18%,var(--site-transparent)),var(--site-transparent)_58%),linear-gradient(135deg,var(--site-surface),var(--site-black)_72%)] p-[clamp(24px,4vw,42px)] shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.2)] max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-5" data-scroll-reveal>
          <div>
            <span className="section-heading-eyebrow inline-flex min-h-[42px] items-center gap-[10px] rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] px-[17px] text-xs font-bold leading-none tracking-[.16em] text-[var(--site-accent)] uppercase max-[640px]:min-h-9 max-[640px]:px-[13px] max-[640px]:text-[10px]"><i aria-hidden="true" className="size-[7px] shrink-0 rounded-full bg-[var(--site-accent)] text-[0px] shadow-[0_0_10px_var(--site-accent)]">&lt;/&gt;</i> HAVE A PROJECT IN MIND?</span>
            <h2 id="projects-cta-heading" className="mt-[18px] mb-0 text-[clamp(28px,4vw,42px)] leading-[1.08] font-[700] tracking-[-.045em] text-[var(--site-text)]">Let’s build something <span className="text-[var(--site-transparent)] bg-[linear-gradient(100deg,var(--site-accent-light),var(--site-accent-bright))] bg-clip-text [-webkit-text-fill-color:var(--site-transparent)]">useful.</span></h2>
            <p className="mt-[10px] mb-0 max-w-[54ch] text-[14px] leading-[1.65] text-[var(--site-text-muted)]">Tell me what you’re planning, and we can map out a clear next step together.</p>
          </div>
          <Button className="shrink-0 max-[640px]:w-full max-[640px]:justify-center" to="/contact" label="Start a conversation ↗" />
        </div>
      </Container>
    </section>
  )
}
