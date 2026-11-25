export default function OrbitRings() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[-1]">
      <div className="absolute left-1/2 top-1/2 aspect-square w-[min(600px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[inset_0_0_0_1px_rgb(var(--site-accent-rgb)/.14),inset_0_0_90px_rgb(var(--site-accent-rgb)/.1),0_0_90px_rgb(var(--site-accent-rgb)/.12)] [filter:drop-shadow(0_0_8px_rgb(var(--site-accent-rgb)/.6))] before:absolute before:inset-0 before:rounded-full before:bg-[conic-gradient(from_0deg,var(--site-transparent)_0_45%,rgb(var(--site-accent-rgb)/.1)_65%,var(--site-accent-light)_100%)] before:[mask:radial-gradient(farthest-side,var(--site-transparent)_calc(100%-3px),var(--site-black)_calc(100%-2px))] before:animate-[hero-ring-trail_12s_linear_infinite] motion-reduce:before:animate-none">
        <span className="absolute inset-0 rounded-full animate-[hero-dot-orbit_12s_linear_infinite] motion-reduce:animate-none">
          <i className="absolute -top-[5px] left-1/2 ml-[-5px] size-[10px] rounded-full bg-[var(--site-accent)] shadow-[0_0_18px_4px_var(--site-accent-glow)]" />
        </span>
      </div>
      <div className="absolute left-1/2 top-1/2 h-[min(400px,64vw)] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(var(--site-accent-rgb)/.2)] bg-[radial-gradient(circle_at_30%_25%,rgb(var(--site-accent-rgb)/.16),rgb(var(--site-accent-rgb)/.04)_45%,var(--site-transparent)_70%)] shadow-[inset_0_0_60px_rgb(var(--site-accent-rgb)/.14)]" />
    </div>
  )
}
