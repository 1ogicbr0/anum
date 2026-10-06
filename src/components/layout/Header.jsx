import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import Wordmark from '@/components/ui/Wordmark'
import Button from '@/components/ui/Button'
import { useWishlist } from '@/hooks/useWishlist'
import { buildOrderLink, orderLabel } from '@/utils/order'
import s from './Header.module.scss'

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/collections', label: 'Collections' },
  { to: '/product/customizable-signet-ring', label: 'Customise' },
  { to: '/#gifting', label: 'Gifting' },
  { to: '/#reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const { count } = useWishlist()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    const term = q.trim()
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : '/shop')
    setSearching(false)
    setOpen(false)
  }

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ''}`}>
      <div className={s.inner}>
        <Wordmark />

        <nav className={s.nav} aria-label="Main">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `${s.navLink} ${isActive && !l.to.includes('#') ? s.active : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className={s.actions}>
          <button className={s.iconBtn} type="button" aria-label="Search" aria-expanded={searching} onClick={() => setSearching((v) => !v)}>
            <Icon name="search" />
          </button>
          <NavLink className={s.iconBtn} to="/shop?wishlist=1" aria-label={`Wishlist, ${count} pieces`}>
            <Icon name="heart" />
            {count > 0 && <span className={s.count}>{count}</span>}
          </NavLink>
          <Button href={buildOrderLink()} size="sm" className={s.order}>
            {orderLabel()}
          </Button>
          <button className={`${s.iconBtn} ${s.menuBtn}`} type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {searching && (
        <form className={s.search} role="search" onSubmit={submit}>
          <label htmlFor="site-search" className="visually-hidden">Search products</label>
          <input
            id="site-search"
            className="field"
            type="search"
            autoFocus
            placeholder="Search rings, earrings, sets, pendants…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button type="submit" variant="primary" size="sm">Search</Button>
        </form>
      )}

      {open && (
        <div className={s.panel}>
          <div className={s.panelInner}>
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={s.panelLink} onClick={() => setOpen(false)}>
                {l.label} <Icon name="arrow" size={18} />
              </NavLink>
            ))}
            <Button href={buildOrderLink()} variant="primary" block className={s.panelCta}>
              <Icon name="chat" /> {orderLabel()}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
