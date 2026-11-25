import { useLayoutEffect, useRef } from 'react' // REVEAL ANIMATION
import { refreshReveals } from '../../utils/reveals.js' // REVEAL ANIMATION

/** Re-observes the wrapper when its children change. */ // REVEAL ANIMATION
export default function Reveal({ as: Element = 'div', children, className, variant = 'up', delay, ...props }) { // REVEAL ANIMATION
  const rootRef = useRef(null) // REVEAL ANIMATION
  useLayoutEffect(() => refreshReveals(rootRef.current), [children]) // REVEAL ANIMATION
  return <Element {...props} ref={rootRef} className={className} data-reveal={variant} data-delay={delay}>{children}</Element> // REVEAL ANIMATION
} // REVEAL ANIMATION
