import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '@/animations/gsap'

/**
 * Hands a section over to GSAP. The CSS `data-reveal` system is switched off inside it
 * (so nothing animates twice), `build(section)` creates the tweens inside a
 * gsap.matchMedia() context that only runs when the visitor allows motion, and
 * everything is reverted when the section unmounts (route change).
 */
export function useSectionAnimation(ref, build) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    el.setAttribute('data-gsap', '')
    el.querySelectorAll('[data-reveal]').forEach((node) => node.removeAttribute('data-reveal'))

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cleanup = build(el)
      return () => {
        if (typeof cleanup === 'function') cleanup()
      }
    })

    const refresh = () => ScrollTrigger.refresh()
    const timer = setTimeout(refresh, 700)
    window.addEventListener('load', refresh)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', refresh)
      mm.revert()
    }
  }, [ref, build])
}
