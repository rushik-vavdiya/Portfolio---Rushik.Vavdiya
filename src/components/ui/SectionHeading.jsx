export default function SectionHeading({
  id,
  eyebrow,
  title,
  accent,
  description,
  align = "center",
  reveal = true,
  className = "",
  contentClassName = "",
  titleClassName = "",
  accentClassName = "",
  eyebrowClassName = "",
  aside,
  asideClassName = "",
}) {
  return (
    <header
      data-scroll-reveal={reveal ? "" : undefined}
      className={`section-heading section-heading--${align} mx-auto w-full max-w-6xl ${aside ? "grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end" : ""} ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      <div className={align === "left" ? "min-w-0" : "contents"}>
        {eyebrow && (
          <span className={`section-heading-eyebrow inline-flex min-h-[42px] items-center gap-[10px] rounded-full border border-[rgb(var(--site-accent-rgb)/0.2)] bg-[rgb(var(--site-accent-rgb)/0.2)] px-[17px] text-xs font-bold leading-none tracking-[.16em] text-[var(--site-accent)] uppercase max-[640px]:min-h-9 max-[640px]:px-[13px] max-[640px]:text-[10px] ${eyebrowClassName}`}>
            <i aria-hidden="true" className="block size-[7px] shrink-0 rounded-full bg-[var(--site-accent)] shadow-[0_0_10px_var(--site-accent)]" />
            {eyebrow}
          </span>
        )}
        <h2 id={id} className={`section-heading-title mx-auto mt-5 max-w-[28ch] text-balance text-[clamp(32px,5vw,48px)] leading-[1.06] font-[750] tracking-[-.045em] text-white max-[640px]:max-w-[20ch] max-[640px]:text-[clamp(28px,7vw,36px)] max-[640px]:leading-[1.1] max-[640px]:tracking-[-.04em] ${align === "left" ? "mx-0" : ""} ${titleClassName}`}>
          {title} {accent && <span className={`bg-section-heading-accent bg-[length:220%_100%] bg-clip-text text-transparent drop-shadow-section-heading-accent animate-section-heading-accent-flow motion-reduce:animate-none motion-reduce:bg-center ${accentClassName}`}>{accent}</span>}
        </h2>
        {description && (
          <p
            className={`section-heading-description mt-4 max-w-2xl text-pretty text-[clamp(14px,1.35vw,17px)] leading-[1.7] text-[var(--site-white)] max-[640px]:max-w-[34rem] max-[640px]:text-sm max-[640px]:leading-[1.65] ${align === "center" ? "mx-auto" : ""} ${contentClassName}`}
          >
            {description}
          </p>
        )}
      </div>
      {aside && <div className={asideClassName}>{aside}</div>}
    </header>
  );
}
