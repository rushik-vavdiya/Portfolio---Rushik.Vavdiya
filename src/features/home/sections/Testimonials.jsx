import Container from '../../../components/ui/Container.jsx'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import { showTestimonials, testimonialSection, testimonials } from '../data/testimonials.js'
import Button from '../../../components/ui/Button.jsx'
import { useEffect, useRef, useState } from 'react'

const fallbackTestimonials = [
  {
    name: 'Clear scope',
    role: 'Plan before production',
    company: '01',
    quote: 'Goals, features, timeline, and project pricing are confirmed before development begins.',
  },
  {
    name: 'Direct collaboration',
    role: 'Work in close communication',
    company: '02',
    quote: 'Discuss decisions with the developer handling the design and build, with regular progress updates.',
  },
  {
    name: 'Support after launch',
    role: 'Keep improving after delivery',
    company: '03',
    quote: 'Receive practical help with fixes, updates, and the next improvements for your store or website.',
  },
  {
    name: 'Responsive builds',
    role: 'Designed for every screen',
    company: '04',
    quote: 'Create a consistent, easy-to-use experience across phones, tablets, laptops, and desktop displays.',
  },
  {
    name: 'Business-first thinking',
    role: 'Useful, not unnecessarily complex',
    company: '05',
    quote: 'Choose features and technology around real customer needs and clear business outcomes.',
  },
]

function QuoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="currentColor"
      aria-hidden="true"
      className="size-[22px]"
    >
      <path d="M20 10H8C5.79 10 4 11.79 4 14V24C4 26.21 5.79 28 8 28H14C13.5 33 10 36 6 38V42C15 40 20 33 20 24V10ZM44 10H32C29.79 10 28 11.79 28 14V24C28 26.21 29.79 28 32 28H38C37.5 33 34 36 30 38V42C39 40 44 33 44 24V10Z" />
    </svg>
  )
}

/** Shows approved client feedback when available; otherwise presents an honest work standard slider. */
export default function Testimonials() {
  const hasTestimonials = showTestimonials && testimonials.length > 0
  const sliderItems = hasTestimonials ? testimonials : fallbackTestimonials
  const heading = hasTestimonials
    ? testimonialSection
    : {
        eyebrow: 'THE WORKING EXPERIENCE',
        title: 'Built on clarity.',
        accent: 'Designed around you.',
        description: 'A focused process, direct communication, and practical support from first brief to final launch.',
      }
  const [activeIndex, setActiveIndex] = useState(0)
  const [slidesPerPage, setSlidesPerPage] = useState(3)
  const sliderRef = useRef(null)
  const touchStartRef = useRef(null)
  const maxIndex = Math.max(0, sliderItems.length - slidesPerPage)
  const visibleIndex = Math.min(activeIndex, maxIndex)

  useEffect(() => {
    const updateSlidesPerPage = () => {
      const width = sliderRef.current?.parentElement?.clientWidth || window.innerWidth
      setSlidesPerPage(width >= 1024 ? 3 : width >= 640 ? 2 : 1)
    }
    updateSlidesPerPage()
    window.addEventListener('resize', updateSlidesPerPage)
    return () => window.removeEventListener('resize', updateSlidesPerPage)
  }, [])

  useEffect(() => {
    if (sliderItems.length <= slidesPerPage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => {
      setActiveIndex((current) => current >= maxIndex ? 0 : current + 1)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [maxIndex, sliderItems.length, slidesPerPage])

  const goTo = (index) => setActiveIndex(index < 0 ? maxIndex : index > maxIndex ? 0 : index)
  const onTouchEnd = (event) => {
    if (touchStartRef.current === null) return
    const distance = event.changedTouches[0].clientX - touchStartRef.current
    if (Math.abs(distance) > 40) goTo(visibleIndex + (distance < 0 ? 1 : -1))
    touchStartRef.current = null
  }

  return (
    <section className="bg-[#000] px-5 py-12 text-[var(--site-text)] sm:px-8 sm:py-[72px] lg:px-10" aria-labelledby="testimonials-heading">
      <Container>
        <SectionHeading
          id="testimonials-heading"
          eyebrow={heading.eyebrow}
          title={heading.title}
          accent={heading.accent}
          description={heading.description}
          className="mx-auto max-w-[720px]"
          eyebrowClassName="!min-h-0 !gap-2 !border-[rgb(var(--site-accent-rgb)/0.2)] !px-[14px] !py-1.5 !text-[.72rem] !font-medium !leading-normal !tracking-[.18em] [&>i]:!size-1.5"
          titleClassName="!mt-[18px] !max-w-none !text-[clamp(2rem,5vw,3rem)] !leading-[1.08] !font-extrabold !tracking-[-.03em]"
          contentClassName="!mt-[14px] !max-w-2xl !text-[clamp(14px,1.35vw,16px)] !leading-[1.65]"
        />
        <div
          ref={sliderRef}
          className="mt-9 -mx-3 overflow-hidden px-3 pt-8 pb-4"
          role="region"
          aria-label={hasTestimonials ? 'Client testimonials' : 'Project experience highlights'}
          onTouchStart={(event) => { touchStartRef.current = event.touches[0].clientX }}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
            style={{
              gap: '20px',
              transform: `translate3d(calc(${visibleIndex} * (-100% / ${slidesPerPage}) - ${visibleIndex * 20}px), 0, 0)`,
            }}
          >
            {sliderItems.map((item, index) => (
              <figure
                key={`${item.name}-${index}`}
                className="testimonial-card group relative flex min-h-[290px] shrink-0 flex-col overflow-hidden rounded-[24px] border border-[rgb(var(--site-accent-rgb)/0.25)] bg-[linear-gradient(145deg,rgb(var(--site-bg-rgb)/0.96),rgb(var(--site-bg-rgb)/0.99))] p-5 text-left shadow-[0_16px_44px_-30px_rgb(var(--site-accent-rgb)/0.42),inset_0_1px_0_rgb(var(--site-white-rgb)/0.08)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[rgb(var(--site-accent-rgb)/0.55)] hover:shadow-[0_22px_50px_-28px_rgb(var(--site-accent-rgb)/0.5),inset_0_1px_0_rgb(var(--site-white-rgb)/0.1)] sm:p-6"
                style={{ flexBasis: `calc((100% - ${20 * (slidesPerPage - 1)}px) / ${slidesPerPage})` }}
              >
                <span aria-hidden="true" className="pointer-events-none absolute -right-12 -top-14 size-40 rounded-full bg-[radial-gradient(circle,rgb(var(--site-accent-rgb)/0.2),transparent_72%)] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-xl border border-[rgb(var(--site-accent-rgb)/0.35)] bg-[rgb(var(--site-accent-rgb)/0.12)] text-[var(--site-accent-light)]"><QuoteIcon /></span>
                    <span className="truncate font-mono text-[9px] font-semibold uppercase tracking-[.16em] text-[var(--site-accent-light)]">{hasTestimonials ? 'Client note' : 'Project standard'}</span>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] font-semibold tracking-[.14em] text-white/40">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <blockquote className="relative mt-6 flex-1 text-[.96rem] leading-[1.75] text-white/85 sm:text-base">{item.quote}</blockquote>
                <figcaption className="relative mt-6 flex items-center gap-3 border-t border-[rgb(var(--site-accent-rgb)/0.2)] pt-4">
                  <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full border border-[rgb(var(--site-accent-rgb)/0.3)] bg-white/[.04] text-sm font-bold text-[var(--site-accent-light)]">↗</span>
                  <span className="min-w-0 flex-1">
                    <b className="block truncate text-[.92rem] font-semibold text-white">{item.name}</b>
                    <span className="mt-1 block text-[.76rem] leading-snug text-white/55">{item.role}</span>
                  </span>
                  {item.company && <span className="max-w-[72px] shrink-0 rounded-full border border-[rgb(var(--site-accent-rgb)/0.24)] bg-[rgb(var(--site-accent-rgb)/0.1)] px-2 py-1 text-center font-mono text-[9px] leading-tight text-[var(--site-accent-light)]">{item.company}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3" aria-label={hasTestimonials ? 'Testimonial slider controls' : 'Project experience slider controls'}>
          <Button asButton iconOnly type="button" aria-label="Previous slide" onClick={() => goTo(visibleIndex - 1)}>←</Button>
          <div className="flex gap-1.5">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <Button asButton unstyled key={index} type="button" aria-label={`Go to slide ${index + 1}`} aria-current={visibleIndex === index ? 'true' : undefined} onClick={() => goTo(index)} className={`h-1.5 rounded-full transition-all ${visibleIndex === index ? 'w-6 bg-[var(--site-accent)] shadow-[0_0_10px_rgb(var(--site-accent-rgb)/0.2)]' : 'w-1.5 bg-white/20 hover:bg-white/40'}`} />
            ))}
          </div>
          <Button asButton iconOnly type="button" aria-label="Next slide" onClick={() => goTo(visibleIndex + 1)}>→</Button>
        </div>
      </Container>
    </section>
  )
}
