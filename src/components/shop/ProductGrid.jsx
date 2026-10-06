import Button from '@/components/ui/Button'
import ProductCard from './ProductCard'
import s from './ProductGrid.module.scss'

export default function ProductGrid({ products, emptyText = 'No pieces match those filters yet.' }) {
  if (!products.length) {
    return (
      <div className={s.empty}>
        <span>{emptyText}</span>
        <Button to="/shop" variant="outline" size="sm">Clear filters</Button>
      </div>
    )
  }
  return (
    <div className={s.grid}>
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  )
}
