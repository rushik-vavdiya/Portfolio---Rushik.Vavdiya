import { useEffect, useRef } from 'react'
import useReducedMotion from '../../../../hooks/useReducedMotion.js'

export default function ParticleNetwork() {
  const canvasRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const context = canvas?.getContext('2d')
    if (!canvas || !parent || !context) return undefined

    let width = 0
    let height = 0
    let frame = 0
    let particles = []
    const mouse = { x: -9999, y: -9999 }
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--site-accent-rgb').trim()
    const accentLight = getComputedStyle(document.documentElement).getPropertyValue('--site-accent-light-rgb').trim()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const maxDots = 90
    const linkDistance = 130
    const mouseRadius = 170

    const resize = () => {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(maxDots, Math.round((width * height) / 16000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.7,
      }))
      if (reducedMotion) draw()
    }

    const pointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect()
      mouse.x = event.clientX - bounds.left
      mouse.y = event.clientY - bounds.top
      if (reducedMotion) draw()
    }

    const pointerLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
      if (reducedMotion) draw()
    }

    function draw() {
      context.clearRect(0, 0, width, height)
      particles.forEach((particle, index) => {
        if (!reducedMotion) {
          particle.x += particle.vx
          particle.y += particle.vy
          if (particle.x < 0 || particle.x > width) particle.vx *= -1
          if (particle.y < 0 || particle.y > height) particle.vy *= -1
          const dx = mouse.x - particle.x
          const dy = mouse.y - particle.y
          const distance = Math.hypot(dx, dy)
          if (distance < mouseRadius) {
            particle.x += dx * 0.015
            particle.y += dy * 0.015
          }
        }

        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = `rgb(${accentLight} / 0.85)`
        context.fill()

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next]
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (distance < linkDistance) {
            context.strokeStyle = `rgb(${accent} / ${0.25 * (1 - distance / linkDistance)})`
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.stroke()
          }
        }

        const mouseDistance = Math.hypot(particle.x - mouse.x, particle.y - mouse.y)
        if (mouseDistance < mouseRadius) {
          context.strokeStyle = `rgb(${accent} / ${0.5 * (1 - mouseDistance / mouseRadius)})`
          context.beginPath()
          context.moveTo(particle.x, particle.y)
          context.lineTo(mouse.x, mouse.y)
          context.stroke()
        }
      })
      if (!reducedMotion) frame = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', pointerMove)
    document.addEventListener('pointerleave', pointerLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', pointerMove)
      document.removeEventListener('pointerleave', pointerLeave)
      window.cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
}
