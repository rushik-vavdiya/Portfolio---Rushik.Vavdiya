import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointer.matches) return undefined

    const cursor = cursorRef.current
    const move = (event) => {
      const { clientX: x, clientY: y } = event
      cursor.classList.add('cursor-visible')
      cursor.style.setProperty('--cursor-x', `${x}px`)
      cursor.style.setProperty('--cursor-y', `${y}px`)
    }

    const leave = () => {
      cursor.classList.remove('cursor-visible')
      cursor.dataset.state = ''
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div ref={cursorRef} className="portfolio-cursor" aria-hidden="true">
      <span className="portfolio-cursor-dot" />
    </div>
  )
}
