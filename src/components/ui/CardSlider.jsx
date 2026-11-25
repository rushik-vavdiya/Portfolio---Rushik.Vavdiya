import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { trackElementSize } from '../../utils/viewport.js'
import SliderControls from './SliderControls.jsx'

const defaultBreakpoints = {
  0: { slidesPerView: 1 },
  640: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
}

export default function CardSlider({
  items = [],
  renderItem,
  breakpoints = defaultBreakpoints,
  autoplay = true,
  delay = 3000,
  speed = 700,
  spaceBetween = 16,
  desktopSpaceBetween = 24,
  slidesPerView = 1,
  effect = 'slide',
  allowTouchMove = true,
  pauseOnMouseEnter = true,
  controls = true,
  className = '',
  label = 'items',
  loop = true,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slidesPerPage, setSlidesPerPage] = useState(() => typeof window === 'undefined' ? slidesPerView : (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1))
  const trackRef = useRef(null)
  const intervalRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const uniqueId = useId().replaceAll(':', '')
  const paginationClass = `slider-pagination-${uniqueId}`
  const canLoop = loop && items.length > 1

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const updateSlidesPerPage = () => {
      const width = track.parentElement?.clientWidth || window.innerWidth
      const matching = Object.keys(breakpoints).map(Number).sort((a, b) => a - b).filter((breakpoint) => width >= breakpoint).pop()
      setSlidesPerPage(breakpoints[matching]?.slidesPerView || slidesPerView)
    }
    const stopTrackingSize = trackElementSize(track.parentElement, updateSlidesPerPage)
    updateSlidesPerPage()
    return stopTrackingSize
  }, [breakpoints, slidesPerView])

  const maxIndex = Math.max(0, items.length - slidesPerPage)
  const goTo = (index) => setActiveIndex(canLoop ? (index + items.length) % items.length : Math.max(0, Math.min(maxIndex, index)))
  const resetAutoplay = useCallback(() => {
    window.clearInterval(intervalRef.current)
    if (autoplay && !reducedMotion && items.length > 1) {
      intervalRef.current = window.setInterval(() => setActiveIndex((index) => index >= maxIndex ? 0 : index + 1), delay)
    }
  }, [autoplay, delay, items.length, maxIndex, reducedMotion])

  useEffect(() => {
    if (!autoplay || reducedMotion || items.length < 2) return undefined
    resetAutoplay()
    return () => window.clearInterval(intervalRef.current)
  }, [activeIndex, autoplay, delay, items.length, maxIndex, reducedMotion, resetAutoplay])

  const visibleIndex = Math.min(activeIndex, maxIndex)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    updatePreference()
    preference.addEventListener('change', updatePreference)
    return () => preference.removeEventListener('change', updatePreference)
  }, [])

  return (
    <div className={`relative min-w-0 overflow-hidden pb-[30px] ${className}`}>
      <div className="overflow-visible" onPointerEnter={() => pauseOnMouseEnter && window.clearInterval(intervalRef.current)} onPointerLeave={() => pauseOnMouseEnter && resetAutoplay()} onTouchStart={() => pauseOnMouseEnter && window.clearInterval(intervalRef.current)} onTouchEnd={() => pauseOnMouseEnter && resetAutoplay()}>
        <div ref={trackRef} className="flex" onTouchStart={allowTouchMove ? (event) => { trackRef.current.dataset.touchStart = String(event.touches[0].clientX) } : undefined} onTouchEnd={allowTouchMove ? (event) => { const start = Number(trackRef.current.dataset.touchStart); const delta = event.changedTouches[0].clientX - start; if (Math.abs(delta) > 40) goTo(visibleIndex + (delta < 0 ? 1 : -1)) } : undefined} style={{ gap: `${window.innerWidth >= 1024 ? desktopSpaceBetween : spaceBetween}px`, transform: `translate3d(calc(${visibleIndex} * (-100% / ${slidesPerPage}) - ${visibleIndex} * ${window.innerWidth >= 1024 ? desktopSpaceBetween : spaceBetween}px), 0, 0)`, transition: `transform ${speed}ms ease`, touchAction: allowTouchMove ? 'pan-y' : undefined }}>
        {items.map((item, index) => (
          <div className="swiper-slide h-auto" key={`${item?.slug || item?.name || item?.title || item?.number || 'slide'}-${index}`} style={{ flex: `0 0 calc((100% - ${(slidesPerPage - 1) * spaceBetween}px) / ${slidesPerPage})`, opacity: index >= activeIndex && index < activeIndex + slidesPerPage ? 1 : 0.62, transform: effect === 'coverflow' ? `scale(${index === activeIndex ? 1 : 0.95})` : undefined }}><div className="h-full">{renderItem(item, index)}</div></div>
        ))}
        </div>
      </div>
      {controls && <SliderControls swiper={{ slidePrev: () => goTo(activeIndex - 1), slideNext: () => goTo(activeIndex + 1) }} label={label} paginationClass={paginationClass} />}
    </div>
  )
}
