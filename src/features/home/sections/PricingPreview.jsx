import Container from "../../../components/ui/Container.jsx";
import Button from "../../../components/ui/Button.jsx";
import TechIcon from "../../../components/ui/TechIcon.jsx";
import SectionHeading from "../../../components/ui/SectionHeading.jsx";
import { pricingPageCopy, pricingPlans } from "../../pricing/data/pricing.js";

const packageIcons = {
  "shopify-store": ["shopify", "javascript"],
  "custom-website": ["react", "next", "tailwind"],
  "mern-web-app": ["mongo", "express", "react", "node"],
};

const steps = [
  ["01", "Share your idea", "Tell me about your goals and audience."],
  ["02", "Scope & timeline", "We agree on features and delivery dates."],
  ["03", "Clear quote", "A fixed price confirmed before any work."],
  ["04", "Build & launch", "Regular updates until it goes live."],
];

/** Home page package cards styled to match the supplied project packages design. */
export default function PricingPreview({ variant = "preview" }) {
  const isPackagesPage = variant === "packages-page";
  return (
    <section
      id="packages"
      aria-labelledby="pricing-preview-heading"
      className={`relative isolate overflow-hidden bg-[#000] px-5 py-12 text-white sm:px-8 sm:py-[72px] lg:px-10 ${isPackagesPage ? "[&>div]:max-w-[1240px]" : ""}`}
    >
      <Container>
        <SectionHeading
          id="pricing-preview-heading"
          reveal={false}
          eyebrow="Project Packages"
          title="A plan shaped around"
          accent="your project."
          description="Choose a starting point. I’ll confirm the scope, timeline, and quote before work begins."
          className="max-w-[720px]"
          eyebrowClassName="!min-h-0 !gap-2 !border-[rgb(var(--site-accent-rgb)/0.2)] !px-[14px] !py-1.5 !text-[.72rem] !font-medium !leading-normal !tracking-[.18em] [&>i]:!size-1.5 [&>i]:animate-pulse"
          titleClassName={`!mt-[18px] !max-w-none !text-wrap !text-[clamp(2rem,5vw,3rem)] !leading-[1.08] !font-extrabold !tracking-[-.03em] ${isPackagesPage ? "!mb-3.5" : ""}`}
          accentClassName="!bg-[linear-gradient(90deg,var(--site-accent),var(--site-accent)_50%,var(--site-accent)_100%)]"
          contentClassName="!mt-[14px] !max-w-2xl !text-wrap !text-[clamp(14px,1.35vw,16px)] !leading-[1.65] max-[640px]:!max-w-2xl"
        />

        <div className={`mx-auto mt-11 grid w-full max-w-[520px] items-stretch gap-6 min-[1000px]:mx-0 min-[1000px]:max-w-none min-[1000px]:grid-cols-3 ${isPackagesPage ? "min-[1000px]:gap-6" : ""}`}>
          {pricingPlans.map((plan) => (
            <PackageCard key={plan.slug} plan={plan} />
          ))}
        </div>

        <div className="mt-10 grid gap-[14px] min-[600px]:grid-cols-2 min-[1000px]:grid-cols-4">
          {steps.map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-[18px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.025] p-[18px]"
            >
              <em className="font-mono text-xs font-semibold tracking-[.14em] text-[var(--site-accent)] not-italic">
                {number}
              </em>
              <b className="mt-1.5 block text-[.98rem]">{title}</b>
              <span className="mt-1 block text-[.82rem] leading-[1.5] text-[var(--site-white)]">
                {description}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PackageCard({ plan }) {
  const featured = plan.featured;
  const icons = packageIcons[plan.slug] ?? [];

  const card = (
    <article
      data-scroll-reveal
      className={`group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] border p-[30px_28px_28px] max-[600px]:px-5 max-[600px]:py-6 transition-[opacity,translate,transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-[rgb(var(--site-accent-rgb)/0.2)] hover:shadow-[0_30px_70px_-26px_rgb(var(--site-accent-rgb)/0.2)] motion-reduce:transition-none motion-reduce:hover:transform ${featured ? "border-transparent bg-[linear-gradient(165deg,rgb(var(--site-black-rgb)/0.95),rgb(var(--site-black-rgb)/0.96))] shadow-[0_0_60px_-18px_rgb(var(--site-accent-rgb)/0.2)] min-[1000px]:pb-11" : "border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(165deg,rgb(var(--site-black-rgb)/0.85),rgb(var(--site-black-rgb)/0.94))]"}`}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--package-x",
          `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
        );
        event.currentTarget.style.setProperty(
          "--package-y",
          `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
        );
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(320px_circle_at_var(--package-x,50%)_var(--package-y,0%),rgb(var(--site-accent-rgb)/0.2),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative z-[1] flex flex-1 flex-col">
        <div className="mb-[22px] flex items-center">
          {icons.map((icon) => (
            <span
              key={icon}
              className="-mr-2.5 grid size-[46px] place-items-center rounded-[14px] border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[linear-gradient(145deg,rgb(var(--site-black-rgb)/0.96),rgb(var(--site-black-rgb)/0.96))] shadow-[0_8px_20px_-8px_var(--site-black),0_0_18px_rgb(var(--site-accent-rgb)/0.2)]"
            >
              <TechIcon name={icon} size={`size-6 ${icon === "next" || icon === "express" ? "invert brightness-[1.15]" : ""}`} />
            </span>
          ))}
        </div>

        <span
          className={`mb-2.5 self-start text-[.68rem] font-bold tracking-[.18em] uppercase ${featured ? "rounded-full bg-gradient-to-r from-[var(--site-accent)] to-[var(--site-accent)] px-3 py-1.5 text-white shadow-[0_6px_20px_-6px_var(--site-accent)]" : "text-[var(--site-accent)]"}`}
        >
          {featured ? pricingPageCopy.popular : pricingPageCopy.projectLabel}
        </span>
        <h3 className="text-[1.65rem] tracking-[-.02em]">{plan.name}</h3>
        <p className="mt-2 min-h-[3.3em] text-[.95rem] leading-[1.65] text-[var(--site-white)]">
          {plan.description}
        </p>

        <div className="my-6 border-y border-[rgb(var(--site-accent-rgb)/0.2)] py-4">
          <b className="block bg-gradient-to-r from-[var(--site-accent)] to-[var(--site-accent)] bg-clip-text text-[1.35rem] text-transparent">
            Custom quote
          </b>
          <span className="text-[.78rem] text-[var(--site-accent)]">
            Scope, timeline &amp; price confirmed before work begins
          </span>
        </div>

        <ul className="mb-7 grid flex-1 list-none gap-[13px] p-0 [&>li]:flex [&>li]:items-start [&>li]:gap-3 [&>li]:text-[.92rem] [&>li]:leading-[1.45] [&>li]:text-[var(--site-white)] [&>li]:before:mt-px [&>li]:before:grid [&>li]:before:size-5 [&>li]:before:shrink-0 [&>li]:before:place-items-center [&>li]:before:rounded-full [&>li]:before:bg-[rgb(var(--site-accent-rgb)/0.2)] [&>li]:before:text-sm [&>li]:before:text-[var(--site-accent)] [&>li]:before:content-['✓'] [&>li]:before:shadow-[0_0_12px_rgb(var(--site-accent-rgb)/0.2)]">
          {plan.features.slice(0, 3).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <Button to="/contact" label="Get a quote →" variant={featured ? "primary" : "secondary"} className={`relative z-[1] min-h-[50px] w-full rounded-[14px] px-4 text-[.94rem] ${featured ? "shadow-[0_12px_30px_-10px_var(--site-accent)]" : "border-[rgb(var(--site-accent-rgb)/0.2)] bg-white/[.04] hover:border-[var(--site-accent)] hover:bg-[rgb(var(--site-accent-rgb)/0.2)]"}`} />
      </div>
    </article>
  );

  return featured ? (
    <div className="relative isolate overflow-hidden rounded-[28px] p-px min-[1000px]:-mt-4 before:absolute before:-inset-full before:animate-[spin_6s_linear_infinite] before:bg-[conic-gradient(from_0deg,var(--site-accent),var(--site-accent),var(--site-accent),var(--site-accent))] before:content-[''] motion-reduce:before:animate-none">
      <div className="relative z-[1] h-full">{card}</div>
    </div>
  ) : (
    card
  );
}
