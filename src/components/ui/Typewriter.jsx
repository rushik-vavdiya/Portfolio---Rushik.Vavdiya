import { useEffect, useState } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion.js'

export default function Typewriter({ phrases }) {
  const reducedMotion = useReducedMotion()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [text, setText] = useState(reducedMotion ? phrases[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reducedMotion) return undefined

    const phrase = phrases[phraseIndex]
    const complete = text === phrase
    const empty = text.length === 0
    const delay = complete && !deleting ? 1450 : deleting ? 34 : 62
    const timer = window.setTimeout(() => {
      if (complete && !deleting) setDeleting(true)
      else if (deleting && empty) {
        setDeleting(false)
        setPhraseIndex((index) => (index + 1) % phrases.length)
      } else setText(phrase.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [deleting, phraseIndex, phrases, reducedMotion, text])

  const visibleText = reducedMotion ? phrases[0] : text
  return <span className="font-semibold text-accent" aria-label={phrases[phraseIndex]}>{visibleText}<i className="ml-0.5 inline-block h-[1em] w-px align-middle bg-accent animate-hero-caret motion-reduce:animate-none motion-reduce:hidden" aria-hidden="true" /></span>
}
