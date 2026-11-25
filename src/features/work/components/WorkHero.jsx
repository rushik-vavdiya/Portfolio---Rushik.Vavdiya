import { experiences } from '../data/experiences.js'
import Container from '../../../components/ui/Container.jsx'

export default function WorkHero() {
  const experience = experiences[0]
  return (
    <section className="relative min-h-[430px]! overflow-hidden bg-[var(--site-bg)] px-5 pt-[clamp(48px,6vw,72px)] pb-[clamp(28px,3.5vw,42px)] max-[560px]:px-[18px] max-[560px]:py-[42px_18px_34px]">
      <Container><div className="grid grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-center gap-[clamp(32px,6vw,82px)] max-[760px]:grid-cols-[minmax(0,1fr)] max-[760px]:gap-[30px]">
        <header data-scroll-reveal className="relative z-[1] max-w-[610px] max-[760px]:max-w-[650px]">
          <span className="inline-flex items-center gap-[9px] font-mono text-[11px] leading-none font-[650] tracking-[.14em] text-[var(--site-accent-light)]"><i aria-hidden="true" className="size-[7px] rounded-full bg-current shadow-[0_0_12px_var(--site-accent-glow-strong)]" />OUR WORK / EXPERIENCE</span>
          <h1 className="max-w-[18ch]! mt-[18px]! mb-[14px]! text-[clamp(1.75rem,3.8vw,2.75rem)]! font-extrabold! leading-[1.08]! tracking-[-0.03em]!">Experience shaped by<span> hands-on building</span></h1>
          <p className="!text-[1.02rem] !leading-[1.65]">A snapshot of professional experience and the practical development work behind it.</p>
        </header>
        {experience && <aside data-scroll-reveal className="relative ml-auto w-full max-w-[560px] border-l border-[color-mix(in_srgb,var(--site-accent-light)_55%,var(--site-transparent))] bg-[linear-gradient(90deg,color-mix(in_srgb,var(--site-accent)_9%,var(--site-transparent)),var(--site-transparent)_88%)] p-6 transition-[border-color,background,transform] duration-300 hover:translate-x-[3px] hover:border-[var(--site-accent-light)] hover:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--site-accent)_15%,var(--site-transparent)),var(--site-transparent)_92%)] motion-reduce:transition-none max-[760px]:mx-auto max-[760px]:max-w-[620px] max-[560px]:px-[15px] max-[560px]:py-5" aria-label="Professional experience">
          <div className="absolute right-2 top-3 font-mono text-[clamp(68px,10vw,120px)] leading-[.9] tracking-[-.1em] text-[color-mix(in_srgb,var(--site-accent-light)_14%,var(--site-transparent))] max-[560px]:right-[5px] max-[560px]:top-[18px] max-[560px]:text-[72px]" aria-hidden="true">{experience.duration.slice(0, 2)}</div>
          <div className="relative flex max-w-[340px] flex-col gap-[9px] max-[560px]:max-w-[260px]"><small className="font-mono text-[9px] leading-none font-[650] tracking-[.14em] text-[var(--site-accent-light)]">HANDS-ON EXPERIENCE</small><strong className="text-[22px] font-[680] tracking-[-.04em] text-[var(--site-text)] max-[560px]:max-w-[260px] max-[560px]:text-[19px]">{experience.title}</strong><span className="text-[13px] text-[var(--site-text-muted)]">{experience.company}</span></div>
          <div className="mt-[25px] flex items-center gap-[9px] text-[13px] text-[var(--site-text-muted)]"><i className="size-[6px] rounded-full bg-[var(--site-accent-light)] shadow-[0_0_10px_var(--site-accent-glow)]" /><span>{experience.period}</span></div>
          <div className="mt-[22px] flex items-center gap-[7px]" aria-hidden="true">{[0,1,2,3,4].map((index) => <i key={index} className="h-[3px] w-[23px] origin-left rounded-[3px] bg-[var(--site-accent-light)] opacity-25 animate-[work-line-in_3.6s_ease-in-out_infinite_alternate] motion-reduce:animate-none motion-reduce:opacity-[.7] motion-reduce:transform-none" style={{ animationDelay: `${index * .2}s` }} />)}</div>
          <div className="mt-[22px] flex flex-col gap-2"><span className="font-mono text-[9px] leading-none font-[650] tracking-[.14em] text-[var(--site-accent-light)]">FOCUS</span><strong className="text-[11px] font-[500] text-[var(--site-text-soft)]">Storefronts · Custom features · Performance</strong></div>
        </aside>}
      </div></Container>
    </section>
  )
}
