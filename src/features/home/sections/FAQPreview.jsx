import Container from '../../../components/ui/Container.jsx'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import Button from '../../../components/ui/Button.jsx'
import { site } from '../../../data/siteConfig.js'
import { faqs } from '../../faq/data/faq.js'

/** Answers common project questions in a compact homepage accordion. */
export default function FAQPreview() {
  return (
    <section
      aria-labelledby="home-faq-heading"
      className="relative isolate overflow-hidden bg-[#000] px-5 py-16 text-[var(--site-text)] sm:px-8 sm:py-[88px] lg:px-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-[-18rem] bottom-[-18rem] -z-10 size-[36rem] rounded-full bg-[rgb(var(--site-accent-rgb)/0.06)] blur-[120px]" />
      <Container className="max-w-[1240px]">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(280px,.68fr)_minmax(0,1.32fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              id="home-faq-heading"
              align="left"
              eyebrow={site.sections.homeFaqEyebrow}
              title={site.sections.homeFaqTitle}
              accent={site.sections.homeFaqAccent}
              description={site.sections.homeFaqDescription}
              reveal
              eyebrowClassName="!min-h-0 !gap-2.5 !rounded-full !border-[rgb(var(--site-accent-rgb)/0.24)] !bg-[rgb(var(--site-accent-rgb)/0.08)] !px-[13px] !py-2 !text-[10px] !font-semibold !tracking-[.18em] [&>i]:!size-1.5"
              titleClassName="!mx-0 !mt-[20px] !max-w-[11ch] !text-[clamp(2.35rem,5vw,4.15rem)] !leading-[.98] !font-[800] !tracking-[-.055em]"
              accentClassName="!block"
              contentClassName="!mx-0 !mt-6 !max-w-[29rem] !text-[.95rem] !leading-[1.75] sm:!text-[1.02rem]"
            />
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button to="/faq" variant="outline" size="md" rightIcon={<span aria-hidden="true">↗</span>} label={site.sections.homeFaqLink} className="rounded-xl !border-[rgb(var(--site-accent-rgb)/0.38)] !bg-[rgb(var(--site-accent-rgb)/0.04)]" />
              <span className="text-[11px] font-medium tracking-[.08em] text-[var(--site-text-subtle)] uppercase">8 clear answers</span>
            </div>
          </div>

          <div className="grid gap-2.5" data-scroll-reveal>
            {faqs.slice(0, 4).map((item, index) => (
              <details
                open={index === 0}
                className="group overflow-hidden rounded-[18px] border border-[rgb(var(--site-white-rgb)/0.08)] bg-[linear-gradient(135deg,rgb(var(--site-white-rgb)/0.035),rgb(var(--site-bg-rgb)/0.62))] transition-[border-color,background,box-shadow,transform] duration-300 motion-reduce:transition-none open:border-[rgb(var(--site-accent-rgb)/0.32)] open:bg-[linear-gradient(135deg,rgb(var(--site-accent-rgb)/0.09),rgb(var(--site-white-rgb)/0.025))] open:shadow-[0_18px_50px_-34px_rgb(var(--site-accent-rgb)/0.72)] hover:border-[rgb(var(--site-accent-rgb)/0.26)]"
                key={item.question}
              >
                <summary className="flex min-h-[78px] cursor-pointer list-none items-center gap-4 px-4 py-4 text-left text-[.92rem] font-semibold text-[var(--site-text)] marker:hidden [&::-webkit-details-marker]:hidden sm:min-h-[88px] sm:gap-5 sm:px-6 sm:text-[1rem]">
                  <span className="w-8 shrink-0 font-mono text-[11px] font-semibold tracking-[.12em] text-[rgb(var(--site-accent-light-rgb)/0.72)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1 pr-1">{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-[rgb(var(--site-accent-rgb)/0.22)] bg-[rgb(var(--site-accent-rgb)/0.08)] text-[20px] leading-none font-light text-[var(--site-accent-light)] transition-[transform,background,border-color] duration-300 motion-reduce:transition-none group-open:rotate-45 group-open:border-[rgb(var(--site-accent-rgb)/0.42)] group-open:bg-[rgb(var(--site-accent-rgb)/0.16)]"
                  >
                    +
                  </span>
                </summary>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mx-4 mb-0 border-t border-[rgb(var(--site-white-rgb)/0.07)] py-5 pl-[60px] pr-14 text-[.88rem] leading-[1.75] text-[var(--site-text-muted)] sm:mx-6 sm:text-[.94rem]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
