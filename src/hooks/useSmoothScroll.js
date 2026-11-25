import { useEffect } from 'react'
import Lenis from 'lenis'

let smoothScrollInstance = null

export function getSmoothScroll() {
  return smoothScrollInstance
}

export function scrollToSmooth(target, options = {}) {
  if (smoothScrollInstance) {
    smoothScrollInstance.scrollTo(target, options)
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: options.immediate ? 'auto' : 'smooth' })
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: options.immediate ? 'auto' : 'smooth', block: 'start' })
  }
}

export default function useSmoothScroll(pageKey = '', enabled = true) {
  useEffect(() => {
    const desktopMedia = window.matchMedia('(min-width: 768px)')
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    let setupFrameId = 0
    let resizeFrameId = 0

    const destroy = () => {
      if (setupFrameId) window.cancelAnimationFrame(setupFrameId)
      if (resizeFrameId) window.cancelAnimationFrame(resizeFrameId)
      setupFrameId = 0
      resizeFrameId = 0
      smoothScrollInstance?.destroy()
      smoothScrollInstance = null
    }

    const scheduleResize = () => {
      if (!smoothScrollInstance || resizeFrameId) return
      resizeFrameId = window.requestAnimationFrame(() => {
        resizeFrameId = 0
        smoothScrollInstance?.resize()
      })
    }

    const onLayoutTransitionEnd = (event) => {
      if (['height', 'max-height', 'min-height', 'grid-template-rows', 'padding', 'margin'].includes(event.propertyName)) {
        scheduleResize()
      }
    }

    const setup = () => {
      destroy()
      if (!enabled || !desktopMedia.matches || reducedMotionMedia.matches) return

      smoothScrollInstance = new Lenis({
        autoRaf: true,
        autoResize: false,
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        syncTouch: false,
      })
      smoothScrollInstance.on('scroll', (values) => {
        window.dispatchEvent(new CustomEvent('smooth-scroll', { detail: values }))
      })

      setupFrameId = window.requestAnimationFrame(() => {
        setupFrameId = 0
        smoothScrollInstance?.resize()
      })
    }

    const reconfigure = () => setup()
    window.addEventListener('resize', scheduleResize, { passive: true })
    document.addEventListener('click', scheduleResize, true)
    document.addEventListener('change', scheduleResize, true)
    document.addEventListener('submit', scheduleResize, true)
    document.addEventListener('load', scheduleResize, true)
    document.addEventListener('transitionend', onLayoutTransitionEnd, true)
    document.addEventListener('transitioncancel', onLayoutTransitionEnd, true)
    document.fonts?.addEventListener('loadingdone', scheduleResize)
    setup()
    desktopMedia.addEventListener('change', reconfigure)
    reducedMotionMedia.addEventListener('change', reconfigure)

    return () => {
      desktopMedia.removeEventListener('change', reconfigure)
      reducedMotionMedia.removeEventListener('change', reconfigure)
      window.removeEventListener('resize', scheduleResize)
      document.removeEventListener('click', scheduleResize, true)
      document.removeEventListener('change', scheduleResize, true)
      document.removeEventListener('submit', scheduleResize, true)
      document.removeEventListener('load', scheduleResize, true)
      document.removeEventListener('transitionend', onLayoutTransitionEnd, true)
      document.removeEventListener('transitioncancel', onLayoutTransitionEnd, true)
      document.fonts?.removeEventListener('loadingdone', scheduleResize)
      destroy()
    }
  }, [enabled])

  useEffect(() => {
    let nestedFrameId = 0
    const frameId = window.requestAnimationFrame(() => {
      nestedFrameId = window.requestAnimationFrame(() => {
        const scroll = getSmoothScroll()
        if (scroll) {
          scroll.resize()
        }

        const hash = window.location.hash
        if (hash) {
          const target = document.getElementById(decodeURIComponent(hash.slice(1)))
          if (target) {
            scrollToSmooth(target, {
              immediate: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
              offset: -92,
            })
            return
          }
        }
        scrollToSmooth(0, { immediate: true })
      })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
      if (nestedFrameId) window.cancelAnimationFrame(nestedFrameId)
    }
  }, [pageKey, enabled])
}
