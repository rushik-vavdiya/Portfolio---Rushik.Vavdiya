export const detailInfoCardClassName = 'min-w-0 rounded-2xl border border-[var(--site-border-quiet)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--site-accent-dark)_12%,var(--site-surface)),color-mix(in_srgb,var(--site-surface)_80%,var(--site-transparent)))] p-[18px] transition-[transform,border-color,background,box-shadow] duration-[220ms] motion-reduce:transition-none hover:-translate-y-[3px] hover:border-[color-mix(in_srgb,var(--site-accent-light)_36%,var(--site-border-quiet))] hover:bg-[linear-gradient(145deg,color-mix(in_srgb,var(--site-accent-dark)_22%,var(--site-surface)),var(--site-surface))] hover:shadow-[0_12px_28px_color-mix(in_srgb,var(--site-accent)_12%,var(--site-transparent))]'

const numberClassName = 'inline-flex font-mono text-[10px] font-semibold leading-none tracking-[.12em] text-[var(--site-accent-light)]'
const titleClassName = 'mt-3 text-[15px] font-[650] tracking-[-.02em] text-[var(--site-text)]'
const descriptionClassName = 'mt-2 text-[13px] leading-[1.65] text-[var(--site-text-muted)]'

export default function DetailInfoCard({ number, title, description, className = '', ...props }) {
  return (
    <article className={`${detailInfoCardClassName} ${className}`.trim()} {...props}>
      <span className={numberClassName}>{number}</span>
      <h3 className={titleClassName}>{title}</h3>
      <p className={descriptionClassName}>{description}</p>
    </article>
  )
}
