import Container from '../../../components/ui/Container.jsx'
import ProjectCard from '../../project-detail/components/ProjectCard.jsx'
import { projects, projectsPageCopy } from '../data/projects.js'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import Button from '../../../components/ui/Button.jsx'

export default function ProjectGallery() {

  return (
    <section id="work" aria-labelledby="project-gallery-heading" className="relative isolate overflow-hidden bg-black px-5 pt-5 pb-[100px] text-white max-[700px]:px-3.5 max-[700px]:pt-2.5 max-[700px]:pb-[70px]">
      <Container className="max-w-[1240px]">
        <SectionHeading id="project-gallery-heading" eyebrow="My Work" title="Selected" accent="web projects" description="Explore project details, the work involved, and the tools used." className="mb-9 max-w-[680px]" eyebrowClassName="min-h-0 gap-2 rounded-full border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] px-3.5 py-1.5 text-[.72rem] font-medium tracking-[.18em] text-[var(--site-accent)] before:animate-pulse" titleClassName="mt-[18px] max-w-none text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] font-extrabold tracking-[-.03em] max-[640px]:max-w-none max-[640px]:text-[clamp(2rem,5vw,3.4rem)] max-[640px]:leading-[1.08] max-[640px]:tracking-[-.03em]" contentClassName="mt-3.5 text-[1.02rem] leading-[1.65]" />
        {projects.length ? <div className="mt-9 grid items-stretch gap-6 [perspective:1400px] min-[701px]:grid-cols-2 min-[1001px]:grid-cols-3">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} projectsPage />)}</div> : <div className="col-span-full mt-7 rounded-2xl border border-dashed border-[var(--site-border-soft)] p-6 text-[var(--site-white)]"><p>{projectsPageCopy.empty}</p><div className="mt-4 flex flex-wrap gap-3"><Button to="/services" variant="outline" rightIcon={<span aria-hidden="true">↗</span>} label="Explore services" /><Button to="/contact" rightIcon={<span aria-hidden="true">↗</span>} label="Discuss a project" /></div></div>}
      </Container>
    </section>
  )
}
