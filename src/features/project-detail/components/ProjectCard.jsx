import { Link } from 'react-router-dom'
import ProjectPreview from './ProjectPreview.jsx'
import TechIcon from '../../../components/ui/TechIcon.jsx'
import Button from '../../../components/ui/Button.jsx'
import { projectsPageCopy } from '../../projects/data/projects.js'

export default function ProjectCard({ project, index, showCaseStudy = true, homeDesign = false, projectsPage = false }) {
  const themed = homeDesign || projectsPage
  const cardClass = themed
    ? `group relative flex h-full min-w-0 flex-col overflow-hidden border bg-[linear-gradient(165deg,rgb(var(--site-black-rgb)/0.88),rgb(var(--site-black-rgb)/0.96))] [transform-style:preserve-3d] [--mx:50%] [--my:0%] transition-[transform,border-color,box-shadow,opacity,translate] duration-[350ms] hover:-translate-y-1 hover:border-[rgb(var(--site-accent-rgb)/0.2)] hover:shadow-[0_30px_70px_-24px_rgb(var(--site-accent-rgb)/0.2)] motion-reduce:transition-none motion-reduce:hover:transform-none ${projectsPage ? 'rounded-[26px] border-[rgb(var(--site-accent-rgb)/0.2)] p-[22px] max-[700px]:p-[18px] min-[701px]:max-[1000px]:col-span-full' : 'rounded-[24px] border-[rgb(var(--site-accent-rgb)/0.2)] p-[14px] sm:p-[16px]'} ${index === 1 ? 'border-[rgb(var(--site-accent-rgb)/0.2)] shadow-[0_0_50px_-20px_rgb(var(--site-accent-rgb)/0.2)]' : ''}`
    : 'group relative flex min-h-full min-w-0 flex-col rounded-2xl border border-[var(--site-border-quiet)] bg-[color-mix(in_srgb,var(--site-surface)_70%,var(--site-transparent))] p-[clamp(16px,1.8vw,22px)] shadow-[0_8px_24px_var(--site-transparent)] transition-[background-color,border-color,transform,box-shadow] duration-[240ms] ease-[ease] hover:border-[color-mix(in_srgb,var(--site-accent-light)_38%,var(--site-border-quiet))] hover:bg-[color-mix(in_srgb,var(--site-accent-wash)_24%,var(--site-surface))] hover:shadow-[0_14px_32px_color-mix(in_srgb,var(--site-accent-wash)_48%,var(--site-transparent))] hover:-translate-y-1 motion-reduce:transition-none'

  return (
    <article data-scroll-reveal className={cardClass} onPointerMove={projectsPage ? (event) => {
      const bounds = event.currentTarget.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width
      const y = (event.clientY - bounds.top) / bounds.height
      event.currentTarget.style.setProperty('--mx', `${x * 100}%`)
      event.currentTarget.style.setProperty('--my', `${y * 100}%`)
      if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion:reduce)').matches) event.currentTarget.style.transform = `rotateX(${((.5 - y) * 6).toFixed(2)}deg) rotateY(${((x - .5) * 8).toFixed(2)}deg) translateY(-4px)`
    } : undefined} onPointerLeave={projectsPage ? (event) => { event.currentTarget.style.transform = '' } : undefined}>
      {projectsPage && <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(340px_circle_at_var(--mx)_var(--my),rgb(var(--site-accent-rgb)/0.2),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />}
      <div className={`relative z-[1] flex items-center justify-between px-1 ${projectsPage ? 'mb-4 font-mono text-[.75rem] font-medium tracking-[.1em] uppercase' : 'mb-3'}`}>
        <span className={`font-mono text-xs uppercase tracking-[.1em] ${themed ? 'font-medium text-[var(--site-accent)]' : 'text-[var(--site-accent-light)] transition-colors duration-200 group-hover:text-[var(--site-white)] motion-reduce:transition-none'}`}>Project 0{index + 1}</span>
        <span className={`rounded-full border px-[11px] py-1 font-mono text-xs tracking-[.06em] ${themed ? 'border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] text-[var(--site-white)]' : 'text-[var(--site-text-subtle)]'}`}>{project.type}</span>
      </div>
      <Link discover="none" to={`/projects/${project.slug}`} className={`focus-visible:outline-2 focus-visible:outline-[var(--site-focus)] focus-visible:outline-offset-[3px] relative block overflow-hidden border ${themed ? 'z-[1] aspect-[16/10] rounded-[18px] border-[rgb(var(--site-white-rgb)/0.2)] bg-[var(--site-black)] shadow-[0_18px_40px_-18px_var(--site-black)] [transform:translateZ(30px)]' : 'mt-4 aspect-video rounded-xl border border-[var(--site-border-quiet)] bg-[var(--site-bg)] [&>div]:h-full [&>div]:transition-transform [&>div]:duration-320 [&>div]:ease-[ease] group-hover:[&>div]:scale-[1.025] motion-reduce:[&>div]:transition-none'}`} aria-label={`${projectsPage ? 'View details' : projectsPageCopy.viewCase}: ${project.name}`}>
        <ProjectPreview variant={project.preview} title={`${project.name} ${projectsPageCopy.previewLabel}`} />
      </Link>
      <div className="relative z-[1] mt-4 min-w-0 px-1">
        <span className={`mb-2.5 inline-flex rounded-full border px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[.12em] uppercase ${homeDesign ? 'border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] text-[var(--site-accent)]' : 'border-[var(--site-accent-light)]/25 bg-[var(--site-accent-wash)] text-[var(--site-text)]'}`}>{project.category}</span>
        <h3 className={`text-[clamp(1.15rem,1.7vw,1.4rem)] font-bold leading-[1.15] tracking-[-.025em] lg:text-[1.35rem] ${themed ? 'text-white' : 'transition-colors duration-200 group-hover:text-[var(--site-accent-light)] motion-reduce:transition-none'} ${index === 1 && projectsPage ? 'bg-gradient-to-r from-[var(--site-accent)] to-[var(--site-accent)] bg-clip-text text-transparent' : ''}`}>{project.name}</h3>
        <p className={`mt-2.5 min-h-[3.2em] text-[.86rem] leading-[1.6] ${themed ? 'text-[var(--site-text-muted)]' : 'max-w-[38ch] text-[var(--site-text-muted)] leading-[1.65]'}`}>{project.description}</p>
      </div>
      <div className="relative z-[1] mt-auto pt-3">
        <ul aria-label={`${project.name} ${projectsPageCopy.technologyLabel}`} className={`flex min-h-9 flex-wrap content-start items-start ${projectsPage ? 'mt-3 mb-4 gap-[7px]' : 'gap-2'} ${homeDesign ? 'mt-3' : ''}`}>
          {project.technologies.map((technology) => (
            <li key={technology} className={themed ? 'flex min-h-7 items-center gap-1.5 rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.03] py-[5px] pr-2.5 pl-[7px] text-[.72rem] text-[var(--site-white)]' : 'grid size-8 place-items-center rounded-[8px] border border-[var(--site-border-quiet)] bg-[var(--site-glass)] [&_img]:animate-[project-icon-float_3.6s_ease-in-out_infinite] [&_img]:transition-[transform,filter] [&_img]:duration-200 nth-[2]:[&_img]:[animation-delay:-.8s] nth-[3]:[&_img]:[animation-delay:-1.6s] nth-[4]:[&_img]:[animation-delay:-2.4s] group-hover:[&_img]:scale-[1.12] group-hover:[&_img]:drop-shadow-[0_0_5px_var(--site-accent-glow)] motion-reduce:[&_img]:animate-none'}><TechIcon name={technology} size={themed ? 'size-3.5' : 'size-7'} />{themed && technology}</li>
          ))}
        </ul>
        <div data-project-action className={`relative z-[1] mt-3 flex flex-wrap gap-2.5 ${homeDesign ? 'pt-1' : ''}`}>
          {showCaseStudy && <Button unstyled to={`/projects/${project.slug}`} className={`focus-visible:outline-2 focus-visible:outline-[var(--site-focus)] focus-visible:outline-offset-[3px] inline-flex min-h-10 flex-1 items-center justify-center gap-2 border px-4 text-xs font-semibold no-underline transition-all hover:-translate-y-0.5 ${themed ? 'rounded-xl border-transparent bg-gradient-to-r from-[var(--site-accent)] to-[var(--site-accent)] text-white shadow-[0_10px_26px_-10px_var(--site-accent)]' : 'rounded-xl border-[var(--site-accent-light)]/50 bg-[var(--site-accent-wash)] text-[var(--site-text)] hover:border-[var(--site-accent-light)] hover:text-[var(--site-accent-light)]'}`}>{themed ? 'View details' : projectsPageCopy.viewCase} <span aria-hidden="true">↗</span></Button>}
          {(homeDesign || projectsPage) && <ProjectAction href={project.demoUrl} label="Live demo" primary disabled={!project.demoUrl} homeDesign projectsPage={projectsPage} />}
          {project.githubUrl && <ProjectAction href={project.githubUrl} label="◉ GitHub" />}
        </div>
      </div>
    </article>
  )
}

function ProjectAction({ href, label, primary = false, disabled = false, homeDesign = false, projectsPage = false }) {
  return <Button label={label} href={href} external variant={primary ? 'primary' : 'secondary'} disabled={disabled || !href} className={homeDesign ? `min-h-[42px] flex-1 rounded-xl border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.04] px-3 text-xs text-white ${projectsPage ? 'px-3.5 py-[11px] text-[.84rem]' : ''}` : ''} />
}
