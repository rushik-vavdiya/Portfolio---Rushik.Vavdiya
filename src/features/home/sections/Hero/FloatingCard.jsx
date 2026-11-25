export default function FloatingCard({ icon, image, title, subtitle, position, delay = '0s' }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute z-[1] hidden min-w-[164px] items-center gap-3 rounded-[18px] border border-[rgb(var(--site-accent-rgb)/.22)] bg-[rgb(var(--site-navy-rgb)/.55)] px-[18px] py-[14px] text-left shadow-[0_20px_50px_-20px_rgb(var(--site-accent-rgb)/.5)] backdrop-blur-[12px] min-[1101px]:flex ${position}`}
      style={{ animation: `hero-floating 6s ease-in-out ${delay} infinite` }}
    >
      <div className="grid size-[42px] shrink-0 place-items-center overflow-hidden rounded-[12px] bg-[rgb(var(--site-accent-rgb)/.18)] text-[14px] font-bold text-[var(--site-accent)]">
        {image
          ? <img alt="" className="size-full object-cover" src={image} />
          : icon}
      </div>
      <div>
        <strong className="block text-[15px]">{title}</strong>
        <small className="text-[12px] text-[var(--site-text-muted)]">{subtitle}</small>
      </div>
    </div>
  )
}
