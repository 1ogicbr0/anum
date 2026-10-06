import { useEffect, useRef } from 'react'
import { gsap } from '@/animations/gsap'
import s from './CursorGlow.module.scss'

/**
 * A soft purple glow that trails the mouse. Only on devices with a real pointer
 * (never on touch), it sits behind the page content (above the section backgrounds,
 * below cards, photos and text), fades out when the pointer leaves the window and
 * swells a little over links and buttons.
 */
export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lag = reduce ? 0 : 0.45
    const x = gsap.quickTo(el, 'x', { duration: lag, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: lag, ease: 'power3' })
    const scale = gsap.quickTo(el, 'scale', { duration: 0.5, ease: 'power3' })
    let shown = false

    const move = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY })
        gsap.to(el, { opacity: 1, duration: 0.6 })
        shown = true
      }
      x(e.clientX)
      y(e.clientY)
      const over = e.target.closest?.('a, button, [role=button], input, textarea, select, video')
      scale(over ? 1.5 : 1)
    }
    const leave = () => {
      gsap.to(el, { opacity: 0, duration: 0.4 })
      shown = false
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <div ref={ref} className={s.glow} aria-hidden="true" />
}
