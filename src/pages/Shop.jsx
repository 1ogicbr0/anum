import { useMemo, useState } from "react"
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import Filters from '@/components/shop/Filters'
import ProductGrid from '@/components/shop/ProductGrid'
import { categories, categoryBySlug } from '@/data/categories'
import { products } from '@/data/products'
import { brand } from '@/data/brand'
import { useWishlist } from '@/hooks/useWishlist'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { buildOrderLink, orderLabel } from '@/utils/order'
import s from './Shop.module.scss'

const sorters = {
  featured: (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  name: (a, b) => a.name.localeCompare(b.name),
  newest: (a, b) => Number(b.badge === 'New') - Number(a.badge === 'New'),
}

export default function Shop() {
  const { category } = useParams()
  const [params, setParams] = useSearchParams()
  const { items: wishlist } = useWishlist()
  const [showFilters, setShowFilters] = useState(false)

  const cat = category ? categoryBySlug[category] : null
  const q = params.get('q') ?? ''
  const wishlistOnly = params.get('wishlist') === '1'
  const sort = params.get('sort') ?? 'featured'
  const filters = {
    finish: params.get('finish') ?? '',
    collection: params.getAll('collection'),
    occasion: params.getAll('occasion'),
  }

  useDocumentTitle(wishlistOnly ? 'Wishlist' : cat ? cat.name : q ? `Search: ${q}` : 'Shop')

  const setFilters = (next) => {
    const p = new URLSearchParams()
    if (q) p.set('q', q)
    if (wishlistOnly) p.set('wishlist', '1')
    if (sort !== 'featured') p.set('sort', sort)
    if (next.finish) p.set('finish', next.finish)
    next.collection.forEach((c) => p.append('collection', c))
    next.occasion.forEach((o) => p.append('occasion', o))
    setParams(p)
  }

  const setSort = (value) => {
    const p = new URLSearchParams(params)
    if (value === 'featured') p.delete('sort')
    else p.set('sort', value)
    setParams(p)
  }

  const base = useMemo(() => {
    let list = products
    if (cat) list = list.filter((p) => p.category === cat.slug)
    if (wishlistOnly) list = list.filter((p) => wishlist.includes(p.slug))
    if (q) {
      const term = q.toLowerCase()
      list = list.filter((p) => [p.name, p.collection, p.category, p.tagline].filter(Boolean).join(' ').toLowerCase().includes(term))
    }
    return list
  }, [cat, wishlistOnly, wishlist, q])

  const availableCollections = useMemo(() => new Set(base.map((p) => p.collection).filter(Boolean)), [base])

  const list = useMemo(() => {
    let out = base
    if (filters.finish) out = out.filter((p) => p.finishes.includes(filters.finish))
    if (filters.collection.length) out = out.filter((p) => filters.collection.includes(p.collection))
    if (filters.occasion.length) out = out.filter((p) => p.occasions?.some((o) => filters.occasion.includes(o)))
    return [...out].sort(sorters[sort] ?? sorters.featured)
  }, [base, filters.finish, filters.collection, filters.occasion, sort])

  const title = wishlistOnly ? 'Your wishlist' : cat ? cat.name : q ? `“${q}”` : 'All pieces'
  const blurb = wishlistOnly
    ? 'Pieces you have saved. Message us when you are ready and we will confirm everything.'
    : cat?.blurb ?? 'Modern, feminine, effortless. Muse Gold and Muse Silver, delivered across Pakistan.'

  return (
    <>
      <div className={s.head}>
        <nav className={s.crumbs} aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link>
          {cat && (<><span>/</span><strong>{cat.name}</strong></>)}
        </nav>
        <div className={s.titleRow}>
          <div>
            <div className="eyebrow">Shop</div>
            <h1 className={s.title}>{title}</h1>
            <p className={s.blurb}>{blurb}</p>
          </div>
          <div className={s.cats}>
            <Link to="/shop" className="chip" aria-pressed={!cat && !wishlistOnly}>All</Link>
            {categories.map((c) => (
              <Link key={c.slug} to={`/shop/${c.slug}`} className="chip" aria-pressed={cat?.slug === c.slug}>{c.name}</Link>
            ))}
          </div>
          <button type="button" className={`chip ${s.filterToggle}`} aria-expanded={showFilters} onClick={() => setShowFilters((v) => !v)}>
            <Icon name="menu" size={16} /> {showFilters ? "Hide filters" : "Filters"}
          </button>
        </div>
      </div>

      <div className={s.layout}>
        <div className={`${s.filtersWrap} ${showFilters ? s.open : ""}`}>
          <Filters value={filters} onChange={setFilters} availableCollections={availableCollections} />
        </div>
        <div className={s.content}>
          <div className={s.toolbar}>
            <span>Showing {list.length} {list.length === 1 ? 'piece' : 'pieces'}</span>
            <label className={s.sort}>
              Sort by
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="name">Name A to Z</option>
              </select>
            </label>
          </div>
          <ProductGrid products={list} emptyText={wishlistOnly ? 'Nothing saved yet. Tap the heart on any piece to keep it here.' : undefined} />
        </div>
      </div>

      <section className={s.orderBand} aria-label="How to order">
        <div className={s.orderInner}>
          <div>
            <div className={s.orderTitle}>Found your Muse? Order in a message.</div>
            <div className={s.orderText}>Send us the piece and your size. {brand.delivery.headline}.</div>
          </div>
          <div className={s.orderActions}>
            <Button href={buildOrderLink()}><Icon name="chat" /> {orderLabel()}</Button>
            <Button href={brand.instagramUrl} variant="outline"><Icon name="instagram" /> @{brand.handle}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
