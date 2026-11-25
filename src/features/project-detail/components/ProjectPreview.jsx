import { projectPreviewCopy, projectPreviews } from '../data/project-previews.js'

export default function ProjectPreview({ variant, title, fill = false }) {
  const preview = projectPreviews[variant]

  return (
    <div role="img" aria-label={title} className={`min-w-0 rounded-xl border p-2 text-[.62rem] sm:rounded-2xl sm:p-2.5 ${fill ? 'h-full' : ''} ${preview.theme === 'light' ? 'bg-white text-[var(--site-surface-raised)]' : 'bg-gradient-to-br from-[var(--site-accent-deep)] to-[var(--site-navy)] text-white'}`}>
      <div className={`overflow-hidden rounded-lg border border-black/10 bg-black/[.03] ${fill ? 'h-full' : ''}`}>
        <div className="flex items-center gap-[5px] border-b border-white/[.06] bg-black/[.04] px-3 py-[9px]">
          <i className="size-2 rounded-full bg-[var(--site-accent)]" /><i className="size-2 rounded-full bg-[var(--site-accent-bright)]" /><i className="size-2 rounded-full bg-[var(--site-accent-light)]" />
          <em className="ml-2 flex h-4 flex-1 items-center justify-center rounded-lg bg-black/[.06] text-[.6rem] not-italic text-[var(--site-accent)]">{projectPreviewCopy.addresses[variant]}</em>
        </div>
        <div className="flex h-[calc(100%-34px)] flex-col gap-2 p-3 sm:p-3.5">
        <div className="flex items-center justify-between gap-2 border-b border-current/10 pb-2 text-[8px] sm:text-[9px]">
          <strong className="shrink-0 text-[9px] sm:text-[10px]">{preview.brand}</strong>
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            {preview.nav.map((item) => <span key={item} className="truncate">{item}</span>)}
          </div>
        </div>
        <div className={`mt-2 flex min-h-28 flex-1 items-center overflow-hidden rounded-xl p-3 sm:min-h-36 sm:p-4 ${variant === 'store' || variant === 'shopify' ? 'bg-gradient-to-br from-[var(--site-accent)] via-[var(--site-accent-deep)] to-[var(--site-accent-light)] text-[var(--site-surface)]' : 'bg-white/10 text-white'}`}>
          <div className="max-w-[80%]">
            <span className="text-[8px] font-semibold uppercase tracking-wider opacity-70">{preview.eyebrow}</span>
            <h4 className="mt-1 text-sm font-bold leading-tight sm:text-lg">{preview.title}</h4>
            <p className="mt-1 max-w-52 text-[8px] leading-relaxed opacity-80 sm:text-[9px]">{preview.detail}</p>
            <span className={`mt-2 inline-flex rounded-md px-2.5 py-1.5 text-[7px] font-semibold sm:text-[8px] ${variant === 'store' || variant === 'shopify' ? 'bg-[var(--site-accent)] text-white' : 'bg-white text-[var(--site-navy)]'}`}>{preview.action} →</span>
          </div>
          {variant === 'booking' && <div className="ml-auto hidden w-[38%] rounded-md bg-white p-2 text-slate-800 shadow-lg min-[420px]:block"><div className="text-[8px] font-semibold">{projectPreviewCopy.calendarLabel}</div><div className="mt-2 grid grid-cols-4 gap-1 text-center text-[7px] text-slate-500">{Array.from({ length: 12 }, (_, i) => <span key={i} className={`h-3 rounded-sm ${i === 6 ? 'bg-[var(--site-accent)]' : 'bg-slate-100'}`} />)}</div></div>}
          {variant === 'dashboard' && <div className="ml-auto hidden w-[42%] self-stretch rounded-md bg-white p-2 shadow-lg min-[420px]:block"><div className="grid h-full grid-cols-2 gap-1.5">{projectPreviewCopy.dashboardLabels.map((label) => <div key={label} className="rounded bg-slate-50 p-1"><b className="text-[7px] text-slate-600">{label}</b><div className="mt-1 h-3 border-b border-l border-[var(--site-accent)]" /></div>)}</div></div>}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {preview.tiles.map((label, index) => <div key={label} className={`flex h-6 items-end rounded-md p-1 text-[7px] sm:h-8 sm:text-[8px] ${variant === 'store' || variant === 'shopify' ? 'bg-[var(--site-accent)]/30' : 'bg-white/10'}`}><span>{label}</span>{index === 0 && <span className="ml-auto opacity-50">✦</span>}</div>)}
        </div>
        </div>
      </div>
    </div>
  )
}
