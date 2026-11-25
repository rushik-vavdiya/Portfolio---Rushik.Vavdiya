import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/ui/Container.jsx'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import ServicesShowcase from './ServicesShowcase.jsx'
import ServicesAccordion from './ServicesAccordion.jsx'
import { services, servicesPageCopy } from '../../services/data/services.js'
import { fetchServices } from '../../admin/slices/services/servicesSlice.js'

export default function Services() {
  const dispatch = useDispatch()
  const { activeService, requests } = useSelector((state) => state.services)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionHeader = activeService?.sectionHeader

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch])

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="services-section relative isolate !bg-[#000] px-5 py-12 text-[var(--site-text)] sm:px-8 sm:py-[72px] lg:px-10"
    >
      <Container className="relative z-[1] mx-auto">
        <SectionHeading
          id="services-heading"
          eyebrow={sectionHeader?.eyebrow?.trim() || 'SERVICES'}
          title={sectionHeader?.heading || servicesPageCopy.sectionTitle}
          accent={sectionHeader?.highlightHeading || servicesPageCopy.sectionAccent}
          description={sectionHeader?.description || servicesPageCopy.description}
          className="mb-9 max-w-[720px]"
          eyebrowClassName="!min-h-0 !gap-2 !border-[rgb(var(--site-accent-rgb)/0.2)] !bg-[rgb(var(--site-accent-rgb)/0.2)] !px-[14px] !py-1.5 !text-[.72rem] !font-medium !leading-normal !tracking-[.18em] [&>i]:!size-1.5"
          titleClassName="!mt-[18px] !max-w-none !text-wrap !text-[clamp(2rem,5vw,3rem)] !leading-[1.08] !font-extrabold !tracking-[-.03em]"
          accentClassName="!bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent)_50%,var(--site-accent)_100%)]"
          contentClassName="!mt-[14px] !max-w-[42rem] !text-[1.02rem] !leading-[1.65] max-[600px]:!text-[.92rem]"
        />

        <div className="grid items-stretch gap-5 min-[961px]:grid-cols-[1.05fr_.95fr] min-[961px]:gap-6">
          <ServicesShowcase activeIndex={activeIndex} />
          <ServicesAccordion
            services={services}
            serviceEntries={activeService?.services}
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
          />
        </div>
        {requests.active.error && requests.active.error !== 'No active Services data found' && (
          <p className="mt-4 text-xs text-[var(--site-text-subtle)]" role="status">
            Saved Services content could not be loaded. Showing the standard content instead.
          </p>
        )}
      </Container>
    </section>
  )
}
