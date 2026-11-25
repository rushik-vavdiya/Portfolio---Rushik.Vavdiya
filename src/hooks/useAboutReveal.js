import { useEffect } from 'react'
import { gsap } from 'gsap'
import { trackViewport } from '../utils/viewport.js'

/** Reveal the About content once it scrolls into view. */
export default function useAboutReveal(sectionRef) {
  useEffect(() => {
    const section = sectionRef.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const visual = section.querySelector('[data-about-visual]')
    const copy = section.querySelector('[data-about-copy]')
    const skills = section.querySelectorAll('[data-about-skill]')
    let stopTracking
    let context

    context = gsap.context(() => {
      gsap.set([visual, copy, ...skills].filter(Boolean), {
        autoAlpha: 0,
        y: 24,
      })

      const playReveal = () => {
        const timeline = gsap.timeline({
          defaults: { duration: 0.75, ease: 'power3.out' },
        })

        if (visual) timeline.to(visual, { autoAlpha: 1, y: 0 }, 0)
        if (copy) timeline.to(copy, { autoAlpha: 1, y: 0 }, 0.12)
        if (skills.length) {
          timeline.to(skills, { autoAlpha: 1, y: 0, stagger: 0.1 }, 0.32)
        }
      }

      stopTracking = trackViewport(section, (visible) => {
        if (!visible) return
        context.add(playReveal)
        stopTracking?.()
      }, { threshold: 0.2 })
    }, section)

    return () => {
      stopTracking?.()
      context.revert()
    }
  }, [sectionRef])
}
