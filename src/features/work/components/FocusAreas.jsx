import Container from '../../../components/ui/Container.jsx'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import { detailInfoCardClassName } from '../../../components/ui/DetailInfoCard.jsx'

const focusAreas = ['Shopify storefront customization', 'Custom store features and integrations', 'Performance and user experience improvements']

export default function FocusAreas() {
  return (
    <section aria-labelledby="work-focus-heading" className="bg-[var(--site-bg)] px-[var(--section-space-x)] py-[var(--section-space-y)] text-[var(--site-text)]">
      <Container>
        <SectionHeading id="work-focus-heading" eyebrow="AREAS OF FOCUS" title="The work behind a" accent="great storefront" titleClassName="max-w-[18ch]! mx-auto! mt-[18px]! mb-[14px]! text-[clamp(1.75rem,3.8vw,2.75rem)]! font-extrabold! leading-[1.08]! tracking-[-0.03em]!" accentClassName="block" eyebrowClassName="!min-h-9 !px-[14px] !text-[.72rem] !tracking-[.18em]" />
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {focusAreas.map((area) => <li data-scroll-reveal className={`${detailInfoCardClassName} !min-h-[104px] flex items-center gap-3 !text-[.92rem] !leading-[1.55]`} key={area}><span className="grid size-[23px] shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--site-accent-light)_28%,var(--site-transparent))] bg-[var(--site-accent-wash)] text-[12px] text-[var(--site-accent-light)]" aria-hidden="true">✓</span><span>{area}</span></li>)}
        </ul>
      </Container>
    </section>
  )
}
