import { useCallback, useSyncExternalStore } from 'react'

const KEY = 'muse:wishlist'
const EVENT = 'muse:wishlist-change'

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

let cache = read()
const subscribe = (cb) => {
  const handler = () => {
    cache = read()
    cb()
  }
  window.addEventListener(EVENT, handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener(EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}
const getSnapshot = () => cache

export function useWishlist() {
  const items = useSyncExternalStore(subscribe, getSnapshot, () => [])

  const toggle = useCallback((slug) => {
    const next = cache.includes(slug) ? cache.filter((s) => s !== slug) : [...cache, slug]
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* private mode: keep in memory only */
    }
    cache = next
    window.dispatchEvent(new Event(EVENT))
  }, [])

  const has = useCallback((slug) => items.includes(slug), [items])

  return { items, toggle, has, count: items.length }
}
