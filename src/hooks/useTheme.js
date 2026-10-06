import { useCallback, useEffect, useState } from 'react'

const KEY = 'muse-theme'
const META = { light: '#2B2140', dark: '#14101d' }

const current = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

/** Light / dark theme, stored in localStorage and applied as data-theme on <html>. */
export function useTheme() {
  const [theme, setTheme] = useState(() => (typeof document === 'undefined' ? 'light' : current()))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', META[theme])
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* private mode */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}
