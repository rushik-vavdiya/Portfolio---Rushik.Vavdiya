import { Link } from "react-router-dom";

/* Site accent: var(--site-accent) */

/* Sizes (gap lives on the inner content wrapper) */
const sizes = {
  sm: "min-h-10 px-4 text-[.8rem]",
  md: "min-h-12 px-6 text-[.9rem]",
  lg: "min-h-14 px-8 text-[.97rem]",
};
const gaps = { sm: "gap-1.5", md: "gap-2", lg: "gap-2.5" };

/* ------------------------------------------------------------------ */
/*  Glass variants (unchanged)                                         */
/* ------------------------------------------------------------------ */
const variants = {
  primary:
    "border border-[rgb(var(--site-white-rgb)/0.26)] text-white backdrop-blur-xl backdrop-saturate-150 " +
    "[text-shadow:0_1px_8px_rgb(var(--site-accent-rgb)/0.55)] " +
    "bg-[linear-gradient(180deg,rgb(var(--site-white-rgb)/0.26)_0%,rgb(var(--site-white-rgb)/0.04)_52%,rgb(var(--site-white-rgb)/0)_100%),linear-gradient(110deg,rgb(var(--site-accent-rgb)/0.86)_0%,rgb(var(--site-accent-rgb)/0.82)_32%,rgb(var(--site-accent-light-rgb)/0.78)_68%,rgb(var(--site-accent-rgb)/0.82)_100%)] " +
    "bg-[length:100%_100%,300%_100%] bg-[position:0_0,0%_50%] " +
    "shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.55),inset_0_-1px_0_rgb(var(--site-white-rgb)/0.08),inset_0_0_22px_rgb(var(--site-accent-rgb)/0.18),0_14px_34px_-12px_rgb(var(--site-accent-rgb)/0.75),0_2px_8px_rgb(var(--site-navy-rgb)/0.45)]",

  secondary:
    "border border-[rgb(var(--site-accent-rgb)/0.26)] text-[var(--site-white-soft)] backdrop-blur-xl backdrop-saturate-150 " +
    "bg-[linear-gradient(180deg,rgb(var(--site-white-rgb)/0.12)_0%,rgb(var(--site-white-rgb)/0)_55%),linear-gradient(145deg,rgb(var(--site-accent-rgb)/0.34),rgb(var(--site-navy-rgb)/0.5))] " +
    "shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.22),inset_0_0_20px_rgb(var(--site-accent-rgb)/0.16),0_10px_28px_-14px_rgb(var(--site-accent-rgb)/0.65)]",

  outline:
    "border border-[rgb(var(--site-accent-rgb)/0.42)] text-[var(--site-white-soft)] backdrop-blur-lg " +
    "bg-[linear-gradient(180deg,rgb(var(--site-white-rgb)/0.07),rgb(var(--site-white-rgb)/0.01))] " +
    "shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.14),0_8px_22px_-16px_rgb(var(--site-accent-rgb)/0.65)]",

  ghost:
    "border border-transparent bg-transparent text-[var(--site-white-soft)]",

  icon:
    "size-11 border border-[rgb(var(--site-accent-rgb)/0.28)] p-0 text-[var(--site-white-soft)] backdrop-blur-xl backdrop-saturate-150 " +
    "bg-[linear-gradient(180deg,rgb(var(--site-white-rgb)/0.14),rgb(var(--site-white-rgb)/0)_60%),linear-gradient(145deg,rgb(var(--site-accent-rgb)/0.34),rgb(var(--site-navy-rgb)/0.5))] " +
    "shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.24),0_8px_22px_-14px_rgb(var(--site-accent-rgb)/0.7)]",
};

/* ------------------------------------------------------------------ */
/*  Hover + press effects                                              */
/*  - lift (motion-safe only), glow, border brighten, tint, gradient   */
/*    drift, light sweep, icon nudge, soft press-down on click         */
/* ------------------------------------------------------------------ */
const hoverEffects = {
  primary:
    "motion-safe:hover:-translate-y-1 " +
    "hover:border-[rgb(var(--site-white-rgb)/0.5)] " +
    "hover:bg-[position:0_0,100%_50%] " +
    "hover:shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.55),inset_0_-1px_0_rgb(var(--site-white-rgb)/0.1),inset_0_0_24px_rgb(var(--site-accent-rgb)/0.24),0_16px_34px_rgb(var(--site-accent-rgb)/0.55),0_0_28px_rgb(var(--site-accent-rgb)/0.35),0_3px_10px_rgb(var(--site-navy-rgb)/0.45)]",

  secondary:
    "motion-safe:hover:-translate-y-px hover:text-white hover:backdrop-blur-2xl hover:backdrop-saturate-200 " +
    "hover:border-[rgb(var(--site-accent-light-rgb)/0.95)] " +
    "hover:bg-[rgb(var(--site-accent-rgb)/0.2)] " +
    "hover:[text-shadow:0_0_12px_rgb(var(--site-accent-light-rgb)/0.75)] " +
    "hover:shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.32),inset_0_0_26px_rgb(var(--site-accent-light-rgb)/0.3),0_0_0_1px_rgb(var(--site-accent-light-rgb)/0.4),0_0_20px_rgb(var(--site-accent-light-rgb)/0.55),0_0_46px_rgb(var(--site-accent-rgb)/0.4)]",

  outline:
    "motion-safe:hover:-translate-y-0.5 hover:text-white " +
    "hover:border-[rgb(var(--site-accent-rgb)/0.85)] " +
    "hover:bg-[rgb(var(--site-accent-rgb)/0.16)] " +
    "hover:shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.26),inset_0_0_22px_rgb(var(--site-accent-rgb)/0.2),0_14px_32px_-14px_rgb(var(--site-accent-rgb)/0.75),0_0_0_3px_rgb(var(--site-accent-rgb)/0.1)]",

  ghost:
    "hover:text-white " +
    "hover:border-[rgb(var(--site-accent-rgb)/0.32)] " +
    "hover:bg-[rgb(var(--site-accent-rgb)/0.14)] " +
    "hover:shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.12),0_8px_22px_-12px_rgb(var(--site-accent-rgb)/0.55)]",

  icon:
    "motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.07] hover:brightness-125 hover:text-white " +
    "hover:border-[rgb(var(--site-accent-rgb)/0.65)] " +
    "hover:shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.38),inset_0_0_20px_rgb(var(--site-accent-rgb)/0.26),0_14px_30px_-12px_rgb(var(--site-accent-rgb)/0.85),0_0_0_3px_rgb(var(--site-accent-rgb)/0.14)]",
};

/* Press feedback (enabled buttons only) */
const pressEffects = {
  default:
    "motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97] active:brightness-95 active:duration-100",
  primary:
    "motion-safe:active:-translate-y-px motion-safe:active:scale-[0.98] " +
    "active:shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.45),0_6px_16px_rgb(var(--site-accent-rgb)/0.4)] active:duration-100",
};

/* Shine sweep (primary only). The transition lives on the hover state, so the
   streak plays once on enter and resets instantly on leave. */
const sheenClass =
  "pointer-events-none absolute top-0 left-[-80%] z-0 h-full w-1/2 -skew-x-[25deg] " +
  "bg-[linear-gradient(120deg,transparent,rgb(var(--site-white-rgb)/0.7),transparent)] " +
  "group-hover/btn:translate-x-[440%] " +
  "group-hover/btn:transition-transform group-hover/btn:duration-700 group-hover/btn:ease-in-out " +
  "motion-reduce:hidden";

/* ------------------------------------------------------------------ */
/*  Base                                                               */
/* ------------------------------------------------------------------ */
const base =
  "group/btn relative inline-flex max-w-full shrink-0 items-center justify-center overflow-hidden " +
  "rounded-xl whitespace-nowrap font-semibold leading-none tracking-[.01em] " +
  "cursor-pointer select-none [-webkit-tap-highlight-color:var(--site-transparent)] " +
  "transition-[transform,box-shadow,filter,background-color,background-position,border-color,color] " +
  "duration-300 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform motion-reduce:transition-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--site-focus,var(--site-accent))]";

const disabledClasses = "cursor-not-allowed opacity-55 saturate-75";

export default function Button({
  label,
  children,
  to = "/",
  href,
  external = false,
  disabled = false,
  loading = false,
  onClick,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  variant = "primary",
  size = "md",
  iconOnly = false,
  leftIcon,
  rightIcon,
  className = "",
  asButton = false,
  unstyled = false,
  type = "button",
  buttonRef,
  ...buttonProps
}) {
  if (unstyled) {
    const sharedClassName = className;
    const contents = children ?? label;
    const passthrough = { onPointerMove, onPointerEnter, onPointerLeave, onPointerDown };
    if (asButton || disabled) return <button ref={buttonRef} type={type} disabled={disabled} aria-disabled={disabled || undefined} aria-busy={loading || undefined} onClick={onClick} {...passthrough} className={sharedClassName} {...buttonProps}>{contents}</button>;
    if (href) return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} onClick={onClick} {...passthrough} className={sharedClassName} {...buttonProps}>{contents}</a>;
    return <Link to={to} onClick={onClick} {...passthrough} className={sharedClassName} discover="none" {...buttonProps}>{contents}</Link>;
  }

  /* ---------- markup ---------- */

  const resolvedVariant = iconOnly ? "icon" : (variants[variant] ? variant : "primary");
  const resolvedSize = iconOnly ? "" : sizes[size] || sizes.md;
  const resolvedGap = iconOnly ? "" : gaps[size] || gaps.md;
  const isDisabled = disabled || loading;
  const showEffects = !isDisabled;
  const sharedClassName =
    `${base} ${resolvedSize} ${resolvedGap} ${variants[resolvedVariant]} ` +
    `${showEffects ? `${hoverEffects[resolvedVariant]} ${pressEffects[resolvedVariant] ?? pressEffects.default}` : ""} ${className}`;

  const iconMotion = "relative z-10 shrink-0 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none";
  const leftMotion = showEffects ? "motion-safe:group-hover/btn:-translate-x-0.5" : "";
  const rightMotion = showEffects ? "motion-safe:group-hover/btn:translate-x-1" : "";

  const contents = (
    <>
      {showEffects && resolvedVariant === "primary" && <span aria-hidden="true" className={sheenClass} />}
      {loading && <span aria-hidden="true" className="relative z-10 size-[1em] shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" />}
      {!loading && leftIcon && <span aria-hidden="true" className={`${iconMotion} ${leftMotion}`}>{leftIcon}</span>}
      <span aria-hidden={loading ? "true" : undefined} className={`relative z-10 inline-flex items-center justify-center ${resolvedGap}`}>
        {children ?? label}
      </span>
      {!loading && rightIcon && <span aria-hidden="true" className={`${iconMotion} ${rightMotion}`}>{rightIcon}</span>}
    </>
  );

  if (asButton || isDisabled) {
    return (
      <button
        ref={buttonRef}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        onClick={onClick}
        onPointerMove={onPointerMove}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        className={`${sharedClassName} ${isDisabled ? disabledClasses : ""}`}
        {...buttonProps}
      >
        {contents}
      </button>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        onClick={onClick}
        onPointerMove={onPointerMove}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        className={sharedClassName}
        {...buttonProps}
      >
        {contents}
      </a>
    );
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      className={sharedClassName}
      discover="none"
      {...buttonProps}
    >
      {contents}
    </Link>
  );
}