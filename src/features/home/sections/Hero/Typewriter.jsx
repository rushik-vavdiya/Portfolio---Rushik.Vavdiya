import { useEffect, useRef, useState } from 'react'
import useReducedMotion from '../../../../hooks/useReducedMotion.js'

export default function Typewriter({
  prefix,
  words,
  typeSpeed = 70,
  deleteSpeed = 35,
  pause = 1600,
}) {
  const reducedMotion = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)
  const [length, setLength] = useState(reducedMotion ? words[0].length : 0)
  const [deleting, setDeleting] = useState(false)
  const startedRef = useRef(reducedMotion)

  useEffect(() => {
    if (reducedMotion) return undefined
    const word = words[wordIndex]
    const complete = length === word.length
    const empty = length === 0
    const delay = !startedRef.current
      ? 1500
      : complete && !deleting
        ? pause
        : deleting
          ? deleteSpeed
          : typeSpeed
    const timer = window.setTimeout(() => {
      startedRef.current = true
      if (complete && !deleting) {
        setDeleting(true)
      } else if (deleting && empty) {
        setDeleting(false)
        setWordIndex((index) => (index + 1) % words.length)
      } else {
        setLength((value) => value + (deleting ? -1 : 1))
      }
    }, delay)
    return () => window.clearTimeout(timer)
  }, [deleteSpeed, deleting, length, pause, reducedMotion, typeSpeed, wordIndex, words])

  const visibleText = reducedMotion ? words[0] : words[wordIndex].slice(0, length)
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--site-accent-rgb)/.22)] bg-[rgb(var(--site-navy-rgb)/.7)] px-[18px] py-[9px] text-[14px] font-medium">
      <span>{prefix}</span>
      <em className="not-italic text-[var(--site-accent)]">{visibleText}</em>
      <span aria-hidden="true" className="h-4 w-0.5 bg-[var(--site-accent)] animate-[hero-caret-blink_1s_steps(1)_infinite] motion-reduce:animate-none" />
    </div>
  )
}
