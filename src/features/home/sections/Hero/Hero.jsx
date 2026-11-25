import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../../components/ui/Container.jsx'
import { heroContent, heroFloatingCards } from '../../data/home.js'
import { fetchHero } from '../../../admin/slices/hero/heroSlice.js'
import AnimatedHeading from './AnimatedHeading.jsx'
import Typewriter from './Typewriter.jsx'
import StatusPill from './StatusPill.jsx'
import FloatingCard from './FloatingCard.jsx'
import CTAButtons from './CTAButtons.jsx'
import TechStack from './TechStack.jsx'
import OrbitRings from './OrbitRings.jsx'
import ParticleNetwork from './ParticleNetwork.jsx'

const wordsWithAccent = (text, accent) =>
  text.trim().split(/\s+/).filter(Boolean).map((text) => ({ text, accent }))
const fallbackSkills = heroContent.trustLine.split(' · ')
const fallbackActions = heroContent.actions.map((action, index) => ({
  ...action,
  buttonType: index === 0 ? 'primary' : 'secondary',
}))

const getPublicHeroContent = (entry) => {
  if (!entry) {
    return {
      ...heroContent,
      eyebrow: '',
      skills: fallbackSkills,
      actions: fallbackActions,
      floatingCards: heroFloatingCards,
    }
  }

  const sectionHeader = entry.sectionHeader ?? {}
  const heading = sectionHeader.heading?.trim() || heroContent.headline
  const highlightHeading = sectionHeader.highlightHeading?.trim() || ''
  const rotatingText = entry.rotatingText?.map((text) => text.trim()).filter(Boolean) ?? []
  const skills = entry.skills?.map((skill) => skill.trim()).filter(Boolean) ?? []
  const actions = entry.buttons
    ?.map((button, index) => ({
      label: button.label?.trim() || '',
      to: button.link?.trim() || '',
      buttonType: button.buttonType || (index === 0 ? 'primary' : 'secondary'),
    }))
    .filter((button) => button.label && button.to) ?? []
  const cards = entry.floatingCard
    ?.filter((card) => card.title?.trim())
    .map((card, index) => ({
      ...heroFloatingCards[index % heroFloatingCards.length],
      icon: card.icon?.trim() || '',
      image: card.image?.trim() || '',
      title: card.title.trim(),
      subtitle: card.description?.trim() || '',
    })) ?? []

  return {
    ...heroContent,
    eyebrow: sectionHeader.eyebrow?.trim() || '',
    status: entry.availablity?.status?.trim()
      ? entry.availablity.status.trim().replace(/\b\w/g, (letter) => letter.toUpperCase())
      : heroContent.status,
    availability: entry.availablity?.message?.trim() || heroContent.availability,
    headlineLines: [[
      ...wordsWithAccent(heading, false),
      ...wordsWithAccent(highlightHeading, true),
    ]],
    description: sectionHeader.description?.trim() || heroContent.description,
    roles: rotatingText.length ? rotatingText : heroContent.roles,
    skills: skills.length ? skills : fallbackSkills,
    actions: actions.length ? actions : fallbackActions,
    floatingCards: cards.length ? cards : heroFloatingCards,
  }
}

export default function Hero() {
  const dispatch = useDispatch()
  const { activeHero, requests } = useSelector((state) => state.hero)
  const requestedHero = useRef(false)

  useEffect(() => {
    if (requests.active.status === 'idle' && !requestedHero.current) {
      requestedHero.current = true
      dispatch(fetchHero())
    }
  }, [dispatch, requests.active.status])

  const content = getPublicHeroContent(activeHero)

  return (
    <section className="relative isolate flex min-h-[100vh] items-center justify-center overflow-hidden bg-[#000] px-5 py-[90px_20px_70px] text-center text-[var(--site-text)] [padding-top:calc(90px+env(safe-area-inset-top,0px))] [padding-bottom:calc(70px+env(safe-area-inset-bottom,0px))]">
      <OrbitRings />
      <ParticleNetwork />
      {content.floatingCards.map((card, index) => (
        <FloatingCard key={`${card.title}-${index}`} {...card} />
      ))}

      <Container className="relative z-[1]">
        <div className="relative mx-auto flex max-w-[760px] flex-col items-center gap-5">
          <StatusPill
            status={content.status}
            availability={content.availability}
            location={content.location}
          />
          <AnimatedHeading lines={content.headlineLines} />
          <p className="m-0 max-w-[560px] text-[clamp(15px,1.6vw,18px)] leading-[1.7] text-[var(--site-text-muted)] opacity-0 animate-[hero-fade-in_.9s_ease_forwards] [animation-delay:1s] motion-reduce:opacity-100">
            {content.description}
          </p>
          <div className="animate-[hero-fade-in_.9s_ease_forwards] [animation-delay:1.15s] opacity-0 motion-reduce:opacity-100">
            <Typewriter
              key={content.roles.join('|')}
              prefix={content.rolePrefix}
              words={content.roles}
              typeSpeed={70}
              deleteSpeed={35}
              pause={1600}
            />
          </div>
          <div className="w-full max-w-[440px] animate-[hero-fade-in_.9s_ease_forwards] [animation-delay:1.3s] opacity-0 motion-reduce:opacity-100 sm:max-w-[520px]">
            <CTAButtons buttons={content.actions} />
          </div>
          <div className="animate-[hero-fade-in_.9s_ease_forwards] [animation-delay:1.5s] opacity-0 motion-reduce:opacity-100">
            <TechStack items={content.skills} />
          </div>
        </div>
      </Container>
    </section>
  )
}
