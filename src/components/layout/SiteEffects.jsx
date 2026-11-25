import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import useScrollProgress from '../../hooks/useScrollProgress.js'
import { scrollToSmooth } from '../../hooks/useSmoothScroll.js'

/** Adds a thin reading-progress indicator. */
export default function SiteEffects() {
  const progressRef = useRef(null)
  const { pathname } = useLocation()
  const lastPath = useRef(pathname)

  useScrollProgress(progressRef)

  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname
      scrollToSmooth(0, { immediate: window.matchMedia('(prefers-reduced-motion: reduce)').matches })
    }
  }, [pathname])

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[10001] h-0.5 overflow-hidden bg-transparent" aria-hidden="true">
        <span ref={progressRef} className="block h-full w-full bg-site-progress shadow-site-progress [transform:scaleX(0)] origin-left will-change-transform motion-reduce:will-change-auto" />
      </div>
    </>
  )
}
