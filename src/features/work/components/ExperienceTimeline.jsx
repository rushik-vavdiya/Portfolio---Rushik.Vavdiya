import Container from '../../../components/ui/Container.jsx'
import ExperienceCard from './ExperienceCard.jsx'
import { experiences } from '../data/experiences.js'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'

export default function ExperienceTimeline() {
  return (
    <section aria-labelledby="experience-page-heading" className="bg-[var(--site-bg)] px-[var(--section-space-x)] py-[var(--section-space-y)] text-[var(--site-text)]">
      <Container><div className="mx-auto w-full max-w-[900px]">
        <SectionHeading id="experience-page-heading" eyebrow="EXPERIENCE" title="Work and" accent="contribution" description="Storefronts, custom features, and the details that support a better customer experience." titleClassName="max-w-[18ch]! mx-auto! mt-[18px]! mb-[14px]! text-[clamp(1.75rem,3.8vw,2.75rem)]! font-extrabold! leading-[1.08]! tracking-[-0.03em]!" accentClassName="block" eyebrowClassName="!min-h-9 !px-[14px] !text-[.72rem] !tracking-[.18em]" contentClassName="!text-[1.02rem] !leading-[1.65]" />
        <ol className="relative mt-7 space-y-4 before:absolute before:top-6 before:bottom-6 before:left-[9px] before:w-[2px] before:rounded-full before:bg-[linear-gradient(180deg,var(--site-accent-light),var(--site-accent),var(--site-accent-bright))] before:shadow-[0_0_12px_var(--site-accent-glow)] before:content-['']" aria-label="Professional experience">
          {experiences.map((experience) => <ExperienceCard key={experience.title} experience={experience} />)}
        </ol>
      </div></Container>
    </section>
  )
}
