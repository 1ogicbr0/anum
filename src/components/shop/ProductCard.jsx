import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import ProductImage from '@/components/ui/ProductImage'
import FinishDots from '@/components/ui/FinishDots'
import { collectionBySlug } from '@/data/collections'
import { categoryBySlug } from '@/data/categories'
import { useWishlist } from '@/hooks/useWishlist'
import { formatPrice } from '@/utils/order'
import s from './ProductCard.module.scss'

export default function ProductCard({ product }) {
  const { has, toggle } = useWishlist()
  const saved = has(product.slug)
  const label = product.collection ? collectionBySlug[product.collection]?.name : categoryBySlug[product.category]?.name
  const to = `/product/${product.slug}`

  return (
    <article className={s.card}>
      {product.badge && <span className={s.badge}>{product.badge}</span>}
      <button
        type="button"
        className={`${s.wish} ${saved ? s.on : ''}`}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        onClick={() => toggle(product.slug)}
      >
        <Icon name="heart" size={18} />
      </button>
      <Link to={to} className={s.link} aria-label={product.name}>
        <ProductImage product={product} />
      </Link>
      <div className={s.body}>
        <span className={s.collection}>{label}</span>
        <Link to={to} className={s.name}>{product.name}</Link>
        <div className={s.row}>
          <span className={s.price}>{formatPrice(product.price)}</span>
          <FinishDots finishes={product.finishes} />
        </div>
      </div>
    </article>
  )
}
