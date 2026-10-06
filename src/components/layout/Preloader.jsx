import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, SplitText } from '@/animations/gsap'
import s from './Preloader.module.scss'

/**
 * A short welcome screen on first paint: the wordmark rises letter by letter, a gold
 * line draws across, then the curtain lifts and the page's own entrance begins
 * (the hero waits for the `muse:ready` event). Skipped for reduced-motion visitors.
 */
export default function Preloader() {
  const ref = useRef(null)
  const [done, setDone] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useLayoutEffect(() => {
    if (done) {
      delete document.documentElement.dataset.loading
      window.dispatchEvent(new Event('muse:ready'))
      return undefined
    }
    const el = ref.current
    document.documentElement.dataset.loading = '1'
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const word = el.querySelector('[data-pl=word]')
      const split = new SplitText(word, { type: 'chars' })
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => {
          split.revert()
          document.body.style.overflow = prevOverflow
          delete document.documentElement.dataset.loading
          window.dispatchEvent(new Event('muse:ready'))
          setDone(true)
        },
      })
      // About four seconds in all: letters rise, the line draws, a quiet hold, then the curtain lifts.
      tl.from(split.chars, { yPercent: 120, opacity: 0, duration: 1.1, stagger: 0.09 }, 0.2)
        .from(el.querySelector('[data-pl=sub]'), { opacity: 0, letterSpacing: '0.7em', duration: 1 }, 0.7)
        .fromTo(el.querySelector('[data-pl=line]'), { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: 'power2.inOut', transformOrigin: '0% 50%' }, 0.5)
        .from(el.querySelector('[data-pl=tag]'), { opacity: 0, y: 8, duration: 0.8 }, 1.3)
        .to(el.querySelector('[data-pl=inner]'), { scale: 1.03, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 1.4)
        .to(el.querySelector('[data-pl=inner]'), { opacity: 0, y: -24, duration: 0.5, ease: 'power2.in' }, 3.25)
        .to(el, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, 3.45)
    }, el)

    return () => {
      ctx.revert()
      document.body.style.overflow = prevOverflow
      delete document.documentElement.dataset.loading
    }
  }, [done])

  if (done) return null
  return (
    <div ref={ref} className={s.loader} role="status" aria-label="MUSE by Anum is loading">
      <div className={s.inner} data-pl="inner">
        <span className={s.word} data-pl="word">muse</span>
        <span className={s.sub} data-pl="sub">BY ANUM</span>
        <span className={s.line} data-pl="line" aria-hidden="true" />
        <span className={s.tag} data-pl="tag">Jewellery for the woman who inspires.</span>
      </div>
    </div>
  )
}
