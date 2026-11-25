import Container from '../../../components/ui/Container.jsx'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import DetailInfoCard from '../../../components/ui/DetailInfoCard.jsx'
import { projectsPageCopy } from '../data/projects.js'

export default function ProjectPrinciples() {
  return (
    <section aria-labelledby="project-principles-heading" className="bg-[var(--site-bg)] px-[var(--section-space-x)] py-[var(--section-space-y)] text-[var(--site-text)]">
      <Container>
        <SectionHeading id="project-principles-heading" eyebrow={projectsPageCopy.principlesEyebrow} title={projectsPageCopy.principlesTitle} accent={projectsPageCopy.principlesAccent} />
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {projectsPageCopy.principles.map((principle, index) => <DetailInfoCard data-scroll-reveal key={principle.title} number={`0${index + 1}`} title={principle.title} description={principle.description} />)}
        </div>
      </Container>
    </section>
  )
}
