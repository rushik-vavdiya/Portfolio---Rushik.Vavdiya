export default function TechStack({ items }) {
  return (
    <div className="mt-[18px] flex flex-wrap justify-center gap-[10px]">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-[rgb(var(--site-white-rgb)/.08)] bg-[rgb(var(--site-white-rgb)/.03)] px-[15px] py-[7px] text-[13px] font-medium text-[var(--site-text-soft)] transition-[color,border-color,box-shadow] duration-250 hover:border-[var(--site-accent)] hover:text-[var(--site-white)] hover:shadow-[0_0_20px_-4px_var(--site-accent-glow)]">
          {item}
        </span>
      ))}
    </div>
  )
}
