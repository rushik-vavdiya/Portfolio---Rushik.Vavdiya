import { useRef } from 'react'
import Button from '../ui/Button.jsx'

export default function MagneticButton({ className = "", ...props }) {
  const wrapperRef = useRef(null)

  const move = (event) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const bounds = wrapperRef.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left - bounds.width / 2) / bounds.width
    const y = (event.clientY - bounds.top - bounds.height / 2) / bounds.height
    wrapperRef.current.style.setProperty('--magnetic-x', `${x * 8}px`)
    wrapperRef.current.style.setProperty('--magnetic-y', `${y * 7}px`)
  }

  const reset = () => {
    wrapperRef.current?.style.setProperty('--magnetic-x', '0px')
    wrapperRef.current?.style.setProperty('--magnetic-y', '0px')
  }

  return <span ref={wrapperRef} className="group/magnetic inline-flex max-[640px]:w-full max-[640px]:max-w-[280px] justify-center will-change-transform transition-transform duration-[250ms] ease-magnetic [transform:translate3d(var(--magnetic-x,0px),var(--magnetic-y,0px),0)] motion-reduce:transform-none motion-reduce:transition-none" onPointerMove={move} onPointerLeave={reset}><Button {...props} className={`min-h-[52px] rounded-xl px-6 shadow-magnetic-button max-[640px]:w-full max-[640px]:max-w-[280px] ${className}`} /></span>
}
