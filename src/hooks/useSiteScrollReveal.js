import { useLayoutEffect } from 'react' // REVEAL ANIMATION
import { refreshReveals } from '../utils/reveals.js' // REVEAL ANIMATION

function getRefreshRoot(target) { // REVEAL ANIMATION
  const element = target instanceof Element ? target : target?.parentElement // REVEAL ANIMATION
  return element?.closest('[data-reveal-group]') || element?.closest('section') || element?.closest('main') || document // REVEAL ANIMATION
} // REVEAL ANIMATION

export default function useSiteScrollReveal(pageKey) { // REVEAL ANIMATION
  useLayoutEffect(() => { // REVEAL ANIMATION
    let cleanup = refreshReveals(document) // REVEAL ANIMATION
    let frameId // REVEAL ANIMATION
    let pendingRoots = new Set() // REVEAL ANIMATION
    let dynamicCleanups = new Map() // REVEAL ANIMATION
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)') // REVEAL ANIMATION
    const clearDynamicReveals = () => { // REVEAL ANIMATION
      dynamicCleanups.forEach((remove) => remove()) // REVEAL ANIMATION
      dynamicCleanups.clear() // REVEAL ANIMATION
    } // REVEAL ANIMATION
    const refreshAfterRender = (event) => { // REVEAL ANIMATION
      pendingRoots.add(getRefreshRoot(event.target)) // REVEAL ANIMATION
      if (frameId !== undefined) return // REVEAL ANIMATION
      frameId = window.requestAnimationFrame(() => { // REVEAL ANIMATION
        frameId = undefined // REVEAL ANIMATION
        pendingRoots.forEach((root) => { // REVEAL ANIMATION
          dynamicCleanups.get(root)?.() // REVEAL ANIMATION
          dynamicCleanups.set(root, refreshReveals(root)) // REVEAL ANIMATION
        }) // REVEAL ANIMATION
        pendingRoots = new Set() // REVEAL ANIMATION
      }) // REVEAL ANIMATION
    } // REVEAL ANIMATION
    const refreshForMotionPreference = () => { // REVEAL ANIMATION
      cleanup() // REVEAL ANIMATION
      clearDynamicReveals() // REVEAL ANIMATION
      cleanup = refreshReveals(document) // REVEAL ANIMATION
    } // REVEAL ANIMATION
    document.addEventListener('click', refreshAfterRender, true) // REVEAL ANIMATION
    document.addEventListener('change', refreshAfterRender, true) // REVEAL ANIMATION
    document.addEventListener('submit', refreshAfterRender, true) // REVEAL ANIMATION
    motionPreference.addEventListener('change', refreshForMotionPreference) // REVEAL ANIMATION
    return () => { // REVEAL ANIMATION
      document.removeEventListener('click', refreshAfterRender, true) // REVEAL ANIMATION
      document.removeEventListener('change', refreshAfterRender, true) // REVEAL ANIMATION
      document.removeEventListener('submit', refreshAfterRender, true) // REVEAL ANIMATION
      motionPreference.removeEventListener('change', refreshForMotionPreference) // REVEAL ANIMATION
      if (frameId !== undefined) window.cancelAnimationFrame(frameId) // REVEAL ANIMATION
      clearDynamicReveals() // REVEAL ANIMATION
      cleanup() // REVEAL ANIMATION
    } // REVEAL ANIMATION
  }, [pageKey]) // REVEAL ANIMATION
} // REVEAL ANIMATION
