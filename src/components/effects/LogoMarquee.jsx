import TechIcon from '../ui/TechIcon.jsx'

export default function LogoMarquee({ logos = [], speed = 36, className = '', label = 'technology logos' }) {
  if (!logos.length) return null

  const items = [...logos, ...logos]
  return (
    <div className={`group relative overflow-hidden [mask-image:linear-gradient(90deg,var(--site-transparent),var(--site-black)_6%,var(--site-black)_94%,var(--site-transparent))] before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:top-0 before:z-[2] before:w-[5%] before:bg-[linear-gradient(90deg,var(--site-black),var(--site-transparent))] before:content-[''] after:pointer-events-none after:absolute after:bottom-0 after:right-0 after:top-0 after:z-[2] after:w-[5%] after:bg-[linear-gradient(270deg,var(--site-black),var(--site-transparent))] after:content-[''] ${className}`} role="region" aria-label={label}>
      <div className="flex w-max min-w-max items-center py-2 motion-reduce:animate-none [animation:logo-marquee-scroll_var(--marquee-duration,36s)_linear_infinite] group-hover:[animation-play-state:paused]" style={{ '--marquee-duration': `${speed}s` }}>
        {items.map((logo, index) => (
          <span className="flex w-[clamp(112px,12vw,180px)] min-h-[68px] shrink-0 flex-col items-center justify-center gap-[5px] text-center text-[11px] font-semibold whitespace-nowrap text-[var(--site-text-soft)]" key={`${logo.name}-${index}`} aria-hidden={index >= logos.length}>
            {logo.icon && <TechIcon name={logo.icon} />}
            {logo.group && <small className="text-[8px] font-medium tracking-[.04em] text-[var(--site-text-faint)]">{logo.group}</small>}
            <span className="max-w-full overflow-hidden text-ellipsis">{logo.name}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
