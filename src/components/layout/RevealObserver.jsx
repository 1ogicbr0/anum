import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Reveals any element carrying `data-reveal` when it scrolls into view, including
 * elements added later (filtered product grids, route changes).
 */
export default function RevealObserver() {
  const { pathname } = useLocation()

  useEffect(() => {
    const all = () => document.querySelectorAll('[data-reveal]:not(.is-in)')

    if (!('IntersectionObserver' in window)) {
      all().forEach((el) => el.classList.add('is-in'))
      return undefined
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0 },
    )

    all().forEach((el) => io.observe(el))

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return
          if (node.matches?.('[data-reveal]') && !node.classList.contains('is-in')) io.observe(node)
          node.querySelectorAll?.('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
        })
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return null
}
