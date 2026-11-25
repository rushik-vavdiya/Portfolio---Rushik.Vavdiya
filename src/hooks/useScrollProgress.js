import { useEffect } from 'react'

export default function useScrollProgress(progressRef) {
  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const value = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0
      progressRef.current?.style.setProperty('transform', `scaleX(${value})`)
    }
    updateProgress()
    const onSmoothScroll = (event) => {
      const progress = event.detail?.progress
      if (typeof progress === 'number') progressRef.current?.style.setProperty('transform', `scaleX(${Math.min(1, Math.max(0, progress))})`)
    }
    window.addEventListener('smooth-scroll', onSmoothScroll)
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })
    return () => {
      window.removeEventListener('smooth-scroll', onSmoothScroll)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [progressRef])
}
