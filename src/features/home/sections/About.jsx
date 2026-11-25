import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/ui/Container.jsx'
import Button from '../../../components/ui/Button.jsx'
import { site } from '../../../data/siteConfig.js'
import { team } from '../../about/data/team.js'
import { skillSet } from '../data/skills.js'
import { experiences } from '../../work/data/experiences.js'
import { technologyGroups } from '../data/technologies.js'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import { fetchAbout } from '../../admin/slices/about/aboutSlice.js'

const fallbackProfile = team[0]
const totalTechnologies = technologyGroups.reduce((total, group) => total + group.items.length, 0)

export default function About() {
  const dispatch = useDispatch()
  const about = useSelector((state) => state.about.activeAbout)

  useEffect(() => {
    dispatch(fetchAbout())
  }, [dispatch])

  const profile = {
    ...fallbackProfile,
    name: about?.name || fallbackProfile.name,
    role: about?.role || fallbackProfile.role,
    location: about?.location || fallbackProfile.location,
  }
  const heading = about?.sectionHeader?.heading || 'The developer behind'
  const highlightHeading = about?.sectionHeader?.highlightHeading || 'the work.'
  const profileDescription = about?.description || site.aboutPage.introduction
  const statItems = about?.stats ?? [
        { value: String(experiences.length).padStart(2, '0'), label: 'Experience' },
        { value: String(skillSet.length).padStart(2, '0'), label: 'Services' },
        { value: String(totalTechnologies).padStart(2, '0'), label: 'Technologies' },
      ]
  const specialtyItems = about?.specialties ?? skillSet.map((skill) => skill.label)
  const experienceItems = about?.experiences ?? experiences


  return (
    <section id="about" aria-labelledby="home-about-heading" className="bg-[#000] px-5 py-12 text-white sm:px-8 sm:py-[72px] lg:px-10">
      <Container>
        <SectionHeading
          id="home-about-heading"
          eyebrow={about?.sectionHeader?.eyebrow || 'ABOUT ME'}
          title={heading}
          accent={highlightHeading}
          description={about?.sectionHeader?.description || 'A quick look at who I am, what I build, and how I approach every project.'}
          className="mb-10 max-w-[860px] max-[560px]:mb-[26px]"
          titleClassName="max-w-[20ch] text-[clamp(2rem,5vw,3rem)] leading-[1.06] tracking-[-.04em]"
          contentClassName="mt-3.5 max-w-[38rem] text-[1.02rem] leading-[1.65] max-[600px]:text-[.9rem]"
        />

        <div data-reveal-group="split" className="grid grid-cols-[minmax(300px,360px)_minmax(0,1fr)] items-start gap-[clamp(20px,3vw,28px)] max-[900px]:grid-cols-1"> {/* // REVEAL ANIMATION */}
          <aside className="sticky top-6 flex min-w-0 flex-col items-center rounded-[22px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(160deg,rgb(var(--site-black-rgb)/0.82),rgb(var(--site-black-rgb)/0.88))] px-[clamp(20px,3vw,26px)] py-[clamp(20px,3vw,26px)] text-center shadow-[0_30px_80px_-30px_rgb(var(--site-accent-rgb)/0.2),inset_0_1px_0_rgb(var(--site-white-rgb)/0.2)] max-[900px]:relative max-[900px]:top-auto max-[900px]:mx-auto max-[900px]:w-full max-[900px]:max-w-[620px] max-[560px]:p-[18px]" aria-label="About Astrix Code" data-scroll-reveal>
            <div className="relative w-[min(220px,78vw)] aspect-[4/5] overflow-hidden rounded-[24px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[radial-gradient(circle_at_50%_20%,rgb(var(--site-accent-rgb)/0.2),transparent_42%),linear-gradient(145deg,var(--site-black),var(--site-black))] shadow-[0_24px_60px_-24px_rgb(var(--site-accent-rgb)/0.2),inset_0_1px_0_rgb(var(--site-white-rgb)/0.2)] before:pointer-events-none before:absolute before:inset-0 before:z-[2] before:bg-[linear-gradient(rgb(var(--site-accent-rgb)/0.2)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--site-accent-rgb)/0.2)_1px,transparent_1px)] before:bg-[size:24px_24px] before:opacity-60 before:[mask-image:linear-gradient(to_bottom,var(--site-black),transparent_78%)] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-[3] after:h-24 after:bg-[linear-gradient(var(--site-transparent),rgb(var(--site-black-rgb)/0.92))] after:content-['']">
              <img
                src={about?.profileImage || '/images/profile-rushik.png'}
                alt={`${profile.name}, ${profile.role}`}
                width="800"
                height="1000"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top brightness-[.78] contrast-[1.12] saturate-[.72]"
              />
              <span aria-hidden="true" className="absolute bottom-3 left-3 z-[4] inline-flex items-center gap-2 rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-black-rgb)/0.78)] px-2.5 py-1 text-[8px] font-bold tracking-[.14em] text-[var(--site-accent)] backdrop-blur-md uppercase">
                <i className="size-1.5 rounded-full bg-[var(--site-accent-bright)] shadow-[0_0_8px_var(--site-accent-bright)]" />
                {about?.availability?.message || 'Open to work'}
              </span>
            </div>
            <h3 className="mt-[18px] text-[22px] font-[750] tracking-[-.025em] text-white max-[560px]:mt-[15px] max-[560px]:text-[20px]">{profile.name}</h3>
            <p className="mt-1 text-[13px] font-semibold text-[var(--site-accent)]">{profile.role}</p>
            <p className="mt-[14px] text-[13px] leading-[1.65] text-[var(--site-white)] text-center max-[560px]:text-[13px]">{profileDescription}</p>
            <div className="mt-5 grid w-full grid-cols-3 gap-2" aria-label="Experience and focus">
              {statItems.slice(0, 3).map((stat) => (
                <div className="grid gap-[3px] rounded-[13px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.03] px-[5px] py-[10px]" key={stat.label}>
                  <strong className="bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent))] bg-clip-text text-[21px] leading-[1.1] text-transparent">{stat.value}</strong>
                  <span className="text-[9px] uppercase tracking-[.08em] text-[var(--site-white)]">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-[18px] flex flex-wrap justify-center gap-[7px]" aria-label="Development specialties">
              {specialtyItems.map((specialty) => <span key={specialty} className="rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] px-[9px] py-[5px] text-[10px] font-[550] text-[var(--site-white)]">{specialty}</span>)}
            </div>
            <Button label={about?.button?.label || site.footer.buttonLabel} to={about?.button?.link || '/contact'} className="mt-[22px] w-full !rounded-[14px] border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent))] shadow-[0_10px_30px_-8px_rgb(var(--site-accent-rgb)/0.2)]" />
            <span className="mt-4 inline-flex items-center gap-2 text-[11px] text-[var(--site-white)]"><i className="size-[7px] rounded-full bg-[var(--site-accent-bright)] shadow-[0_0_10px_var(--site-accent-bright)]" aria-hidden="true" />{profile.location}</span>
          </aside>

          <div className="min-w-0 rounded-[22px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(160deg,rgb(var(--site-black-rgb)/0.58),rgb(var(--site-black-rgb)/0.72))] p-[clamp(20px,3vw,26px)] shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.2)] max-[560px]:p-[18px] max-[900px]:w-full">
            <div data-scroll-reveal>
              <span className="text-[10px] font-bold uppercase tracking-[.16em] text-[var(--site-accent)]">{about?.experienceHeader?.eyebrow || 'Experience'}</span>
              <h3 className="mt-2 text-[clamp(22px,2.8vw,32px)] font-bold leading-[1.15] tracking-[-.04em] text-white text-balance max-[560px]:text-[24px]">{about?.experienceHeader?.heading || 'Work and contribution'} {about?.experienceHeader?.highlightHeading}</h3>
              <p className="mt-1 max-w-[58ch] text-[13px] leading-[1.6] text-[var(--site-white)]">{about?.experienceHeader?.description || 'Professional experience building and improving online stores.'}</p>
            </div>
            <ol className="relative mt-[26px] grid list-none gap-[14px] p-0 before:absolute before:bottom-6 before:left-[15px] before:top-5 before:w-0.5 before:bg-[linear-gradient(var(--site-accent),var(--site-accent)_48%,rgb(var(--site-accent-rgb)/0.2))] before:shadow-[0_0_12px_rgb(var(--site-accent-rgb)/0.2)] before:content-[''] max-[560px]:mt-5 max-[560px]:gap-[10px] max-[560px]:before:left-[13px]" aria-label="Professional experience">
              {experienceItems.map((experience) => (
                <li className="relative grid grid-cols-[32px_minmax(0,1fr)] items-start gap-[14px] max-[560px]:grid-cols-[28px_minmax(0,1fr)] max-[560px]:gap-[10px]" key={`${experience.title}-${experience.company}`} data-scroll-reveal>
                  <span className="relative z-[1] grid size-6 place-items-center rounded-full border-[3px] border-[var(--site-accent)] bg-[var(--site-black)] m-[5px_4px] shadow-[0_0_15px_rgb(var(--site-accent-rgb)/0.2)] max-[560px]:size-5 max-[560px]:m-[7px_4px]" aria-hidden="true" />
                  <article className="min-w-0 rounded-[18px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(160deg,rgb(var(--site-black-rgb)/0.76),rgb(var(--site-black-rgb)/0.8))] p-[16px_18px] transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[rgb(var(--site-accent-rgb)/0.2)] hover:shadow-[0_14px_40px_-14px_rgb(var(--site-accent-rgb)/0.2)] max-[560px]:rounded-[15px] max-[560px]:p-[13px_14px]">
                    <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[var(--site-accent)]">{experience.period}</span><span className="rounded-lg border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] px-2 py-1 text-[10px] font-[650] text-[var(--site-accent)]">{experience.duration}</span></div>
                    <h4 className="mt-[6px] text-[16px] font-bold tracking-[-.02em] text-white max-[560px]:text-[14px]">{experience.title}</h4>
                    <span className="mt-1 block text-[12px] font-semibold text-[var(--site-accent)]">{experience.company}</span>
                    <p className="mt-[7px] text-[13px] leading-[1.65] text-[var(--site-white)] max-[560px]:text-[12px]">{experience.description}</p>
                    {experience.technology && <div className="mt-[13px] flex flex-wrap gap-[6px]"><span className="rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] px-[9px] py-1 text-[10px] text-[var(--site-white)]">{experience.technology}</span></div>}
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
