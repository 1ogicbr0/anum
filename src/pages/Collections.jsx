import { Link } from 'react-router-dom'
import ProductImage from '@/components/ui/ProductImage'
import SectionHeading from '@/components/ui/SectionHeading'
import { collections } from '@/data/collections'
import { productsByCollection } from '@/data/products'
import { brand } from '@/data/brand'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import s from './Collection.module.scss'

export default function Collections() {
  useDocumentTitle('Collections')
  return (
    <div className={s.index}>
      <SectionHeading eyebrow="The collections" title={brand.lines.poetry} aside="Every edit, from the first silver tassels to the lilac rings. Pick a mood and start there." />
      <div className={s.cards}>
        {collections.map((c) => {
          const count = productsByCollection(c.slug).length
          return (
            <Link key={c.slug} to={`/collections/${c.slug}`} className={s.card}>
              <ProductImage className={s.cardImg} tone={c.tone} icon={c.icon} ratio="auto" label={`[Photo — ${c.name}]`} />
              <div className={s.cardBody}>
                <h2 className={s.cardTitle}>{c.name}</h2>
                <span className={s.cardSub}>{c.tagline}</span>
                <span className={s.cardSub}>{count} {count === 1 ? 'piece' : 'pieces'}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
