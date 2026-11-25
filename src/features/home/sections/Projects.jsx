import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button.jsx'
import Container from '../../../components/ui/Container.jsx'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import TechIcon from '../../../components/ui/TechIcon.jsx'
import ProjectPreview from '../../project-detail/components/ProjectPreview.jsx'
import { projects, projectsPageCopy } from '../../projects/data/projects.js'

const isExternalUrl = (value) => typeof value === 'string' && /^https?:\/\//i.test(value)
const technologyLabels = {
  express: 'Express',
  javascript: 'JavaScript',
  mongo: 'MongoDB',
  next: 'Next.js',
  node: 'Node.js',
  postman: 'Postman',
  shopify: 'Shopify',
  tailwind: 'Tailwind CSS',
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  )
}

function ProjectArtwork({ project, index, featured = false }) {
  const projectNumber = String(index + 1).padStart(2, '0')
  const totalProjects = String(projects.length).padStart(2, '0')

  return (
    <Link
      aria-label={`View ${project.name} case study`}
      className={`group/artwork relative block overflow-hidden bg-[var(--site-black)] focus-visible:outline-2 focus-visible:outline-[var(--site-focus)] focus-visible:outline-offset-[-4px] ${featured ? 'aspect-[16/10] min-h-[240px] sm:aspect-auto sm:min-h-[380px]' : 'aspect-[16/10]'}`}
      to={`/projects/${project.slug}`}
    >
      <ProjectPreview fill title={`${project.name} project preview`} variant={project.preview} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20 opacity-80 transition-opacity duration-300 group-hover/artwork:opacity-100" />
      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[.12em] text-white backdrop-blur-md sm:left-5 sm:top-5">
        {projectNumber} <span className="text-white/50">/ {totalProjects}</span>
      </span>
      <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md transition group-hover/artwork:border-[var(--site-accent)]/50 sm:bottom-5 sm:right-5">
        Explore project <span aria-hidden="true">↗</span>
      </span>
    </Link>
  )
}

function ProjectTechnologies({ project, compact = false }) {
  const technologies = compact ? project.technologies.slice(0, 3) : project.technologies

  return (
    <ul aria-label={`${project.name} technologies`} className="flex flex-wrap gap-2">
      {technologies.map((technology) => (
        <li className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[.035] px-2.5 py-1.5 text-[11px] font-medium text-[var(--site-text-muted)]" key={technology}>
          <TechIcon name={technology} size="size-3.5" />
          <span>{technologyLabels[technology] ?? technology}</span>
        </li>
      ))}
    </ul>
  )
}

function ProjectCard({ project, index, featured = false }) {
  const liveUrl = isExternalUrl(project.demoUrl)
    ? project.demoUrl
    : isExternalUrl(project.liveUrl) ? project.liveUrl : null
  const githubUrl = isExternalUrl(project.githubUrl) ? project.githubUrl : null

  return (
    <article className={`group min-w-0 overflow-hidden rounded-[26px] border border-[var(--site-border-soft)] bg-[linear-gradient(145deg,var(--site-panel-surface),var(--site-black)_85%)] shadow-[0_20px_70px_-42px_var(--site-shadow)] transition duration-300 hover:-translate-y-1 hover:border-[var(--site-accent-glow)] hover:shadow-[0_30px_75px_-40px_var(--site-accent-glow)] motion-reduce:transition-none motion-reduce:hover:transform-none ${featured ? 'sm:col-span-2 sm:grid sm:grid-cols-[1.05fr_.95fr]' : ''}`}>
      <ProjectArtwork featured={featured} index={index} project={project} />

      <div className={`flex min-w-0 flex-col ${featured ? 'p-5 sm:p-7 xl:p-8' : 'p-4 sm:p-5'}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full border border-[var(--site-accent-glow)] bg-[var(--site-accent-wash)] px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[.12em] text-[var(--site-accent-light)] uppercase">
            {project.category}
          </span>
          <span className="text-[11px] text-[var(--site-text-subtle)]">{project.type}</span>
        </div>

        <h3 className={`mb-0 mt-4 font-semibold leading-tight tracking-[-.03em] text-[var(--site-text)] ${featured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
          {project.name}
        </h3>
        <p className={`mb-0 mt-3 text-sm leading-6 text-[var(--site-text-muted)] ${featured ? 'max-w-[42ch]' : 'line-clamp-3'}`}>
          {project.description}
        </p>

        {featured && project.features?.length > 0 && (
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {project.features.slice(0, 2).map((feature) => (
              <li className="flex items-start gap-2 text-xs leading-5 text-[var(--site-text-muted)]" key={feature}>
                <span aria-hidden="true" className="mt-1 size-1.5 shrink-0 rounded-full bg-[var(--site-accent)]" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5">
          <ProjectTechnologies compact={!featured} project={project} />
        </div>

        <div className={`mt-auto flex flex-wrap items-center gap-2.5 ${featured ? 'pt-7' : 'pt-5'}`}>
          <Link
            className="group inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--site-accent)] px-4 py-2.5 text-xs font-bold text-[var(--site-black)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[var(--site-focus)] focus-visible:outline-offset-2"
            to={`/projects/${project.slug}`}
          >
            View case study <ArrowIcon />
          </Link>
          {liveUrl && (
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-[var(--site-text-muted)] transition hover:border-[var(--site-accent-glow)] hover:text-[var(--site-text)]"
              href={liveUrl}
              rel="noreferrer"
              target="_blank"
            >
              Live site ↗
            </a>
          )}
          {githubUrl && (
            <a
              aria-label={`${project.name} source code on GitHub`}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-[var(--site-text-muted)] transition hover:border-[var(--site-accent-glow)] hover:text-[var(--site-text)]"
              href={githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const featuredProject = projects[0]
  const secondaryProjects = projects.slice(1)

  return (
    <section
      aria-labelledby="projects-heading"
      className="relative isolate overflow-hidden bg-[#000] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      id="projects"
    >
      <Container className="relative">
        <SectionHeading
          id="projects-heading"
          align="center"
          eyebrow={<>Selected work <span className="text-[var(--site-text-subtle)]">/ {String(projects.length).padStart(2, '0')} projects</span></>}
          title="Thoughtful work."
          accent="Clear outcomes."
          description={projectsPageCopy.featuredDescription}
          reveal
          className="mb-10 max-w-[760px] sm:mb-12"
          titleClassName="!mt-[18px] !max-w-none !text-wrap !text-[clamp(2rem,5vw,3rem)] !leading-[1.08] !font-extrabold !tracking-[-.03em]"
          contentClassName="!mt-[14px] !max-w-[42rem] !text-[1.02rem] !leading-[1.65] max-[600px]:!text-[.92rem]"
        />

        {featuredProject ? (
          <div className="grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5">
            <ProjectCard featured homeDesign index={0} project={featuredProject} />
            {secondaryProjects.map((project, index) => (
              <ProjectCard homeDesign index={index + 1} key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--site-border-soft)] bg-[#000] p-6 text-center text-[var(--site-text-muted)] sm:p-8">
            <p className="mb-0">{projectsPageCopy.empty}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button to="/services" variant="outline" rightIcon={<span aria-hidden="true">↗</span>} label="Explore services" />
              <Button to="/contact" rightIcon={<span aria-hidden="true">↗</span>} label="Discuss a project" />
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
