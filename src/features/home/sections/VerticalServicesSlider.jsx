import { useEffect, useRef, useState } from 'react'
import { trackElementSize } from '../../../utils/viewport.js'
import ServiceCard from '../../services/components/ServiceCard.jsx'
import Button from '../../../components/ui/Button.jsx'
import useReducedMotion from '../../../hooks/useReducedMotion.js'

export default function VerticalServicesSlider({ services }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const panelRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return undefined
    const updateHeight = () => {
      const container = panel.querySelector('[data-services-swiper]')
      if (container) container.style.setProperty('--service-slide-height', `${container.clientHeight}px`)
    }
    const stopTrackingSize = trackElementSize(panel, updateHeight)
    let timer
    if (!reducedMotion && services.length > 1) timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % services.length), 4200)
    return () => { stopTrackingSize(); window.clearInterval(timer) }
  }, [reducedMotion, services.length])

  const navigate = (direction) => setActiveIndex((index) => (index + direction + services.length) % services.length)

  return (
    <div ref={panelRef} className="flex h-full min-h-0 w-full flex-col rounded-[22px] border border-[var(--site-border-quiet)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--site-accent-dark)_13%,var(--site-surface)),color-mix(in_srgb,var(--site-surface)_82%,var(--site-transparent)))] p-[18px]" aria-label="Services">
      <div className="flex items-center justify-between gap-[12px] px-[2px] pb-[14px] pt-[2px] font-mono text-[9px] leading-[1.4] font-[700] tracking-[.14em] text-[var(--site-accent-light)]">
        <span>MY SERVICES</span>
        <span className="tracking-[.08em] text-[var(--site-text-subtle)]">{String(activeIndex + 1).padStart(2, '0')} <i className="px-1 not-italic text-[var(--site-accent-light)]">/</i> {String(services.length).padStart(2, '0')}</span>
      </div>
      <div data-services-swiper className="min-h-0 w-full flex-[1_1_auto] overflow-hidden min-[1024px]:h-[292px] min-[1024px]:flex-[0_0_292px]">
        <div className="swiper-wrapper h-full" style={{ transform: `translate3d(0, calc(var(--service-slide-height, 100%) * -${activeIndex}), 0)`, transition: 'transform 650ms ease' }}>
          {services.map((service) => <div className="swiper-slide h-full" key={service.slug}><ServiceCard service={service} /></div>)}
        </div>
      </div>
      <div className="mt-[12px] flex min-h-[32px] items-center justify-center gap-[14px]" aria-label="Services slider controls">
        <Button asButton unstyled type="button" aria-label="Previous service" className="grid size-[44px] place-items-center rounded-xl border border-[var(--site-border-quiet)] bg-[var(--site-glass)] text-[13px] text-[var(--site-text)] transition-[border-color,background,color] duration-200 ease-[ease] hover:border-[var(--site-accent-light)] hover:bg-[var(--site-accent-wash)] hover:text-[var(--site-accent-light)] disabled:opacity-45 motion-reduce:transition-none" onClick={() => navigate(-1)} disabled={!services.length}>↑</Button>
        <div className="slider-pagination">
          {services.map((service, index) => <Button asButton unstyled key={service.slug} type="button" className={`swiper-pagination-bullet ${index === activeIndex ? 'swiper-pagination-bullet-active' : ''}`} aria-label={`Show service ${index + 1}`} onClick={() => setActiveIndex(index)} />)}
        </div>
        <Button asButton unstyled type="button" aria-label="Next service" className="grid size-[44px] place-items-center rounded-xl border border-[var(--site-border-quiet)] bg-[var(--site-glass)] text-[13px] text-[var(--site-text)] transition-[border-color,background,color] duration-200 ease-[ease] hover:border-[var(--site-accent-light)] hover:bg-[var(--site-accent-wash)] hover:text-[var(--site-accent-light)] disabled:opacity-45 motion-reduce:transition-none" onClick={() => navigate(1)} disabled={!services.length}>↓</Button>
      </div>
    </div>
  )
}
