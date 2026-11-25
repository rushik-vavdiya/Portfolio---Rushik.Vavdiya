import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'

export default function ComingSoon({ pageName, description }) {
  return (
    <section
      aria-labelledby="coming-soon-title"
      className="relative isolate flex min-h-[62svh] items-center overflow-hidden px-[var(--section-space-x)] py-[var(--section-space-y)] text-[var(--site-text)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_35%,rgb(var(--site-accent-rgb)/0.16),transparent_58%)]"
      />
      <Container>
        <div className="mx-auto max-w-[640px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--site-border-soft)] bg-[var(--site-glass)] px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[.14em] text-[var(--site-accent-light)] uppercase">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
            {pageName} · Coming soon
          </span>
          <h1
            id="coming-soon-title"
            className="mt-6 text-balance text-[clamp(2.5rem,7vw,5rem)] font-[750] leading-[1.02] tracking-[-.06em] text-white"
          >
            {pageName}
            <span className="mt-1 block text-[var(--site-accent-light)]">is coming soon.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[520px] text-sm leading-[1.75] text-[var(--site-text-muted)] sm:text-base">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/contact" label="Start a project" rightIcon={<span aria-hidden="true">↗</span>} />
            <Button to="/" variant="secondary" label="Back to home" />
          </div>
        </div>
      </Container>
    </section>
  )
}
