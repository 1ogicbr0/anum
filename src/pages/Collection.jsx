import { Link, Navigate, useParams } from 'react-router-dom'
import ProductImage from '@/components/ui/ProductImage'
import ProductGrid from '@/components/shop/ProductGrid'
import { collectionBySlug } from '@/data/collections'
import { productsByCollection } from '@/data/products'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import s from './Collection.module.scss'

export default function Collection() {
  const { slug } = useParams()
  const collection = collectionBySlug[slug]
  useDocumentTitle(collection?.name)
  if (!collection) return <Navigate to="/collections" replace />

  const list = productsByCollection(collection.slug)

  return (
    <>
      <div className={s.hero}>
        <nav className={s.crumbs} aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span><Link to="/collections">Collections</Link><span>/</span><strong>{collection.name}</strong>
        </nav>
        <div className={`${s.band} ${s[collection.tone] ?? s.lilac}`} data-reveal>
          <div className={s.copy}>
            <span className={s.eyebrow}>{collection.tagline}</span>
            <h1 className={s.title}>{collection.name}</h1>
            <p className={s.text}>{collection.description}</p>
          </div>
          <ProductImage className={s.visual} src={collection.image} alt={collection.name} tone={collection.tone === 'deep' ? 'lilac' : collection.tone === 'silver' ? 'silver' : 'deep'} icon={collection.icon} ratio="4 / 5" iconSize={96} label={`[Campaign photo — ${collection.name}]`} />
        </div>
      </div>
      <section className={s.grid} aria-label={`${collection.name} pieces`}>
        <ProductGrid products={list} emptyText="Pieces from this edit are being photographed. Message us to see what is available now." />
      </section>
    </>
  )
}
