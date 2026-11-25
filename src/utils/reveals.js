import { trackViewport } from './viewport.js'

const revealSelector = '[data-reveal], [data-scroll-reveal], h1, h2, h3, figure, picture, [data-about-visual], .project-detail-visual, .blog-article-art, .blog-hero-card, .faq-contact-banner, article, li' // REVEAL ANIMATION
const revealVariants = new Set(['up', 'down', 'left', 'right', 'fade', 'zoom', 'blur']) // REVEAL ANIMATION
const trackedElements = new Set() // REVEAL ANIMATION
const visibilityCleanups = new Map() // REVEAL ANIMATION
const delayedReveals = new Map() // REVEAL ANIMATION
const activeReveals = new Map() // REVEAL ANIMATION
const revealThreshold = 0.12 // REVEAL ANIMATION

function isExcluded(element) { // REVEAL ANIMATION
  return Boolean(element.closest('[data-no-reveal], .hero-section, nav, [role="navigation"]')) // REVEAL ANIMATION
} // REVEAL ANIMATION

function isInitiallyVisible(element, view) { // REVEAL ANIMATION
  const bounds = element.getBoundingClientRect() // REVEAL ANIMATION
  return bounds.top < view.innerHeight && bounds.bottom > 0 && bounds.left < view.innerWidth && bounds.right > 0 // REVEAL ANIMATION
} // REVEAL ANIMATION

function defaultVariant(element) { // REVEAL ANIMATION
  if (element.parentElement?.dataset.revealGroup === 'split') { // REVEAL ANIMATION
    const siblings = Array.from(element.parentElement.children).filter((sibling) => !isExcluded(sibling)) // REVEAL ANIMATION
    return siblings.indexOf(element) === 0 ? 'left' : 'right' // REVEAL ANIMATION
  } // REVEAL ANIMATION
  if (element.matches('figure, picture, [data-about-visual], .project-detail-visual, .blog-article-art')) return 'zoom' // REVEAL ANIMATION
  if (element.matches('.blog-hero-card, .faq-contact-banner')) return 'fade' // REVEAL ANIMATION
  return 'up' // REVEAL ANIMATION
} // REVEAL ANIMATION

function collectRevealTargets(root) { // REVEAL ANIMATION
  const targets = new Set() // REVEAL ANIMATION
  if (!root || typeof root.querySelectorAll !== 'function') return targets // REVEAL ANIMATION
  if (root.nodeType === 1 && root.matches(revealSelector)) targets.add(root) // REVEAL ANIMATION
  root.querySelectorAll(revealSelector).forEach((element) => targets.add(element)) // REVEAL ANIMATION
  root.querySelectorAll('[data-reveal-group]').forEach((group) => { // REVEAL ANIMATION
    Array.from(group.children).forEach((element) => { // REVEAL ANIMATION
      if (!isExcluded(element)) targets.add(element) // REVEAL ANIMATION
    }) // REVEAL ANIMATION
  }) // REVEAL ANIMATION
  return new Set([...targets].filter((element) => !isExcluded(element))) // REVEAL ANIMATION
} // REVEAL ANIMATION

function prepareTargets(targets) { // REVEAL ANIMATION
  const siblingsByParent = new Map() // REVEAL ANIMATION
  targets.forEach((element) => { // REVEAL ANIMATION
    const siblings = siblingsByParent.get(element.parentElement) || [] // REVEAL ANIMATION
    siblings.push(element) // REVEAL ANIMATION
    siblingsByParent.set(element.parentElement, siblings) // REVEAL ANIMATION
  }) // REVEAL ANIMATION
  targets.forEach((element) => { // REVEAL ANIMATION
    if (!element.hasAttribute('data-reveal')) element.setAttribute('data-reveal', defaultVariant(element)) // REVEAL ANIMATION
    if (!revealVariants.has(element.dataset.reveal)) element.dataset.reveal = 'up' // REVEAL ANIMATION
    const manualDelay = element.getAttribute('data-delay') // REVEAL ANIMATION
    const siblings = siblingsByParent.get(element.parentElement) || [] // REVEAL ANIMATION
    const siblingDelay = Math.min(Math.max(0, siblings.indexOf(element)) * 80, 500) // REVEAL ANIMATION
    const parsedDelay = manualDelay === null ? siblingDelay : Number.parseInt(manualDelay, 10) // REVEAL ANIMATION
    const delay = Number.isFinite(parsedDelay) ? Math.max(0, parsedDelay) : 0 // REVEAL ANIMATION
    element.style.setProperty('--scroll-reveal-delay', `${delay}ms`) // REVEAL ANIMATION
  }) // REVEAL ANIMATION
} // REVEAL ANIMATION

function finishActiveReveal(element) { // REVEAL ANIMATION
  const cleanup = activeReveals.get(element) // REVEAL ANIMATION
  if (cleanup) cleanup() // REVEAL ANIMATION
  activeReveals.delete(element) // REVEAL ANIMATION
  element.classList.remove('reveal-active') // REVEAL ANIMATION
} // REVEAL ANIMATION

function stopTrackingElement(element) { // REVEAL ANIMATION
  if (!trackedElements.delete(element)) return // REVEAL ANIMATION
  const cleanup = visibilityCleanups.get(element) // REVEAL ANIMATION
  visibilityCleanups.delete(element) // REVEAL ANIMATION
  cleanup?.() // REVEAL ANIMATION
} // REVEAL ANIMATION

function animateReveal(element) { // REVEAL ANIMATION
  if (!element.isConnected) return // REVEAL ANIMATION
  element.classList.remove('scroll-reveal-pending') // REVEAL ANIMATION
  element.classList.add('is-scroll-revealed', 'reveal-active') // REVEAL ANIMATION
  const finish = (event) => { // REVEAL ANIMATION
    if (event && (event.target !== element || !['opacity', 'transform'].includes(event.propertyName))) return // REVEAL ANIMATION
    finishActiveReveal(element) // REVEAL ANIMATION
  } // REVEAL ANIMATION
  const fallbackTimer = window.setTimeout(finish, 850) // REVEAL ANIMATION
  element.addEventListener('transitionend', finish) // REVEAL ANIMATION
  element.addEventListener('transitioncancel', finish) // REVEAL ANIMATION
  activeReveals.set(element, () => { // REVEAL ANIMATION
    window.clearTimeout(fallbackTimer) // REVEAL ANIMATION
    element.removeEventListener('transitionend', finish) // REVEAL ANIMATION
    element.removeEventListener('transitioncancel', finish) // REVEAL ANIMATION
  }) // REVEAL ANIMATION
} // REVEAL ANIMATION

function queueReveal(element) { // REVEAL ANIMATION
  const delay = Number.parseInt(element.style.getPropertyValue('--scroll-reveal-delay'), 10) || 0 // REVEAL ANIMATION
  if (!delay) { // REVEAL ANIMATION
    animateReveal(element) // REVEAL ANIMATION
    return // REVEAL ANIMATION
  } // REVEAL ANIMATION
  const timer = window.setTimeout(() => { // REVEAL ANIMATION
    delayedReveals.delete(element) // REVEAL ANIMATION
    animateReveal(element) // REVEAL ANIMATION
  }, delay) // REVEAL ANIMATION
  delayedReveals.set(element, timer) // REVEAL ANIMATION
} // REVEAL ANIMATION

function revealImmediately(element) { // REVEAL ANIMATION
  stopTrackingElement(element) // REVEAL ANIMATION
  const timer = delayedReveals.get(element) // REVEAL ANIMATION
  if (timer !== undefined) window.clearTimeout(timer) // REVEAL ANIMATION
  delayedReveals.delete(element) // REVEAL ANIMATION
  finishActiveReveal(element) // REVEAL ANIMATION
  element.classList.remove('scroll-reveal-pending') // REVEAL ANIMATION
  element.classList.add('is-scroll-revealed') // REVEAL ANIMATION
} // REVEAL ANIMATION

function trackReveal(element) { // REVEAL ANIMATION
  if (trackedElements.has(element)) return // REVEAL ANIMATION
  trackedElements.add(element) // REVEAL ANIMATION
  const cleanup = trackViewport(element, (visible) => { // REVEAL ANIMATION
    if (!visible) return // REVEAL ANIMATION
    stopTrackingElement(element) // REVEAL ANIMATION
    queueReveal(element) // REVEAL ANIMATION
  }, { threshold: revealThreshold, rootMargin: '0px 0px -40px 0px' }) // REVEAL ANIMATION
  visibilityCleanups.set(element, cleanup) // REVEAL ANIMATION
} // REVEAL ANIMATION

export function refreshReveals(root = document) { // REVEAL ANIMATION
  if (!root) return () => {} // REVEAL ANIMATION
  const view = root.nodeType === 9 ? root.defaultView : root.ownerDocument?.defaultView // REVEAL ANIMATION
  const targets = collectRevealTargets(root) // REVEAL ANIMATION
  prepareTargets(targets) // REVEAL ANIMATION
  const reducedMotion = view?.matchMedia('(prefers-reduced-motion: reduce)').matches // REVEAL ANIMATION
  const ownedTargets = new Set() // REVEAL ANIMATION
  targets.forEach((element) => { // REVEAL ANIMATION
    if (reducedMotion) { // REVEAL ANIMATION
      revealImmediately(element) // REVEAL ANIMATION
      return // REVEAL ANIMATION
    } // REVEAL ANIMATION
    if (element.classList.contains('is-scroll-revealed') || delayedReveals.has(element)) return // REVEAL ANIMATION
    ownedTargets.add(element) // REVEAL ANIMATION
    if (isInitiallyVisible(element, view)) { // REVEAL ANIMATION
      revealImmediately(element) // REVEAL ANIMATION
      return // REVEAL ANIMATION
    } // REVEAL ANIMATION
    element.classList.add('scroll-reveal-pending') // REVEAL ANIMATION
    trackReveal(element) // REVEAL ANIMATION
  }) // REVEAL ANIMATION
  return () => { // REVEAL ANIMATION
    ownedTargets.forEach((element) => { // REVEAL ANIMATION
      stopTrackingElement(element) // REVEAL ANIMATION
      const timer = delayedReveals.get(element) // REVEAL ANIMATION
      if (timer !== undefined) window.clearTimeout(timer) // REVEAL ANIMATION
      delayedReveals.delete(element) // REVEAL ANIMATION
      finishActiveReveal(element) // REVEAL ANIMATION
      if (!element.isConnected) { // REVEAL ANIMATION
        element.classList.remove('scroll-reveal-pending') // REVEAL ANIMATION
        element.style.removeProperty('--scroll-reveal-delay') // REVEAL ANIMATION
      } // REVEAL ANIMATION
    }) // REVEAL ANIMATION
  } // REVEAL ANIMATION
} // REVEAL ANIMATION
