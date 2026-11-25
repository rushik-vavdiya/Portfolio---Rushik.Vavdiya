import Container from '../../../components/ui/Container.jsx'
import { technologyGroups, technologyPageCopy } from '../data/technologies.js'
import LogoMarquee from '../../../components/effects/LogoMarquee.jsx'

/** A quiet moving strip that highlights the tools used across project work. */
export default function TrustedBy() {
  const logos = technologyGroups.flatMap((group) => group.items)

  return (
    <section className="overflow-hidden border-y border-[var(--site-border-quiet)] bg-black py-5 sm:py-6" aria-label={technologyPageCopy.stripLabel}>
      <Container>
        <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-[9px] font-semibold tracking-[.16em] text-[var(--site-text-faint)] uppercase sm:text-[10px]">{technologyPageCopy.stripTitle}</span>
        <span className="text-[9px] text-[var(--site-text-faint)] sm:text-[10px]">{technologyPageCopy.stripDescription}</span>
        </div>
      </Container>
      <LogoMarquee logos={logos} speed={36} label={technologyPageCopy.stripLabel} />
    </section>
  )
}
