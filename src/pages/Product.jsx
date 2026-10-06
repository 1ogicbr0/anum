import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Button from '@/components/ui/Button'
import OrderButton from '@/components/ui/OrderButton'
import Icon from '@/components/ui/Icon'
import ProductImage from '@/components/ui/ProductImage'
import SectionHeading from '@/components/ui/SectionHeading'
import RingPreview from '@/components/product/RingPreview'
import ProductGrid from '@/components/shop/ProductGrid'
import HighlightClip from '@/components/videos/HighlightClip'
import { brand, finishes, ringSizes } from '@/data/brand'
import { categoryBySlug } from '@/data/categories'
import { collectionBySlug } from '@/data/collections'
import { products, productBySlug } from '@/data/products'
import { clipBySlug } from '@/data/videos'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useWishlist } from '@/hooks/useWishlist'
import { buildOrderMessage, formatInitials, formatPrice, orderChannel } from '@/utils/order'
import s from './Product.module.scss'

export default function Product() {
  const { slug } = useParams()
  const product = productBySlug[slug]
  const [finish, setFinish] = useState(product?.finishes[0] ?? 'gold')
  const [initials, setInitials] = useState('AM')
  const [size, setSize] = useState('')
  const [view, setView] = useState(0)
  const { has, toggle } = useWishlist()

  useDocumentTitle(product?.name)

  const related = useMemo(() => {
    if (!product) return []
    const score = (p) => (p.collection && p.collection === product.collection ? 2 : 0) + (p.category === product.category ? 1 : 0)
    return products.filter((p) => p.slug !== product.slug).sort((a, b) => score(b) - score(a)).slice(0, 4)
  }, [product])

  if (!product) return <Navigate to="/shop" replace />

  const images = product.gallery ?? (product.image ? [product.image] : [])
  const hasImages = images.length > 0
  const isRing = product.category === 'rings'
  const collection = product.collection ? collectionBySlug[product.collection] : null
  const category = categoryBySlug[product.category]
  const engraved = formatInitials(initials)
  const saved = has(product.slug)
  const clip = product.video ? clipBySlug[product.video] : null
  // Gallery order: the highlight story first (video before photos), then every photo.
  const media = [...(clip ? [{ type: 'video', clip }] : []), ...images.map((src) => ({ type: 'image', src }))]
  const current = media[Math.min(view, media.length - 1)]

  const sizeText = size === 'help' ? 'we will help you measure' : size ? `size ${size}` : isRing ? 'size not chosen yet' : null

  return (
    <>
      <div className={s.head}>
        <nav className={s.crumbs} aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span><Link to={`/shop/${product.category}`}>{category?.name}</Link><span>/</span><strong>{product.name}</strong>
        </nav>
      </div>

      <section className={s.layout} aria-label={product.name}>
        <div className={s.gallery} data-reveal>
          {current?.type === 'video' ? (
            <HighlightClip clip={current.clip} compact ratio="4 / 5" fit="contain" className={s.mainClip} />
          ) : hasImages ? (
            <ProductImage src={current.src} alt={product.name} className={s.main} ratio="4 / 5" eager />
          ) : (
            <ProductImage product={product} className={s.main} ratio={product.customizable ? 'auto' : '1 / 1'} iconSize={120} label={`[Photo — ${product.name}]`}>
              {product.customizable && (
                <>
                  <span className={s.live}>Live preview</span>
                  <div className={s.preview}>
                    <RingPreview id="pdp-ring" initials={engraved || 'A · M'} finish={finish} maxWidth={420} />
                  </div>
                </>
              )}
            </ProductImage>
          )}
          {media.length > 1 && (
            <div className={s.thumbs}>
              {media.map((m, i) => (
                <button
                  key={m.type === 'video' ? `video-${m.clip.slug}` : m.src}
                  type="button"
                  className={`${s.thumb} ${i === view ? s.on : ''} ${m.type === 'video' ? s.videoThumb : ''}`}
                  aria-label={m.type === 'video' ? `Watch the ${m.clip.highlight} highlight story` : `View photo ${i + (clip ? 0 : 1)}`}
                  aria-pressed={i === view}
                  onClick={() => setView(i)}
                >
                  {m.type === 'video' ? (
                    <>
                      <img src={m.clip.poster} alt="" loading="lazy" decoding="async" />
                      <span className={s.thumbPlay}><Icon name="play" size={16} /></span>
                      <span className={s.thumbTag}>{m.clip.motion ? 'Video' : 'Story'}</span>
                    </>
                  ) : (
                    <ProductImage src={m.src} alt="" ratio="auto" />
                  )}
                </button>
              ))}
            </div>
          )}
          {hasImages && product.customizable && (
            <div className={s.previewCard}>
              <span className={s.previewLabel}>Live engraving preview</span>
              <RingPreview id="pdp-ring" initials={engraved || 'A · M'} finish={finish} maxWidth={300} />
            </div>
          )}
          {product.postUrl && (
            <a className={s.source} href={product.postUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" size={16} /> See it on Instagram
            </a>
          )}
        </div>

        <div className={s.info} data-reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="eyebrow">
              {collection ? collection.name : category?.name} · {product.finishes.map((f) => finishes[f].label).join(' & ')}
            </span>
            <h1 className={s.title}>{product.name}</h1>
            <div className={s.priceRow}>
              <span className={s.price}>{formatPrice(product.price)}</span>
              <span className={s.meta}>{product.customizable ? 'Engraving included · ' : ''}Arrives in the MUSE gift box</span>
            </div>
            <p className={s.desc}>{product.description}</p>
          </div>

          <div className={s.panel}>
            {product.finishes.length > 1 && (
              <div className={s.group}>
                <div className={s.groupHead}>
                  <span className="label">Finish</span>
                  <span className={s.hint}>{finishes[finish].label}</span>
                </div>
                <div className={s.chips}>
                  {product.finishes.map((f) => (
                    <button key={f} type="button" className="chip" aria-pressed={finish === f} onClick={() => setFinish(f)} style={{ minHeight: 44 }}>
                      <span className={`dot dot--${f}`} /> {finishes[f].label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.customizable && (
              <div className={s.group}>
                <label htmlFor="initials" className={s.groupHead}>
                  <span className="label">Your initials</span>
                  <span className={s.hint}>Up to 3 letters</span>
                </label>
                <input
                  id="initials"
                  className={`field ${s.initials}`}
                  type="text"
                  maxLength={3}
                  value={initials}
                  placeholder="e.g. AM"
                  onChange={(e) => setInitials(e.target.value.replace(/[^A-Za-z]/g, ''))}
                />
                <span className={s.hint}>Engraved in our italic serif. Letters only, we add the dots between them.</span>
              </div>
            )}

            {isRing && (
              <div className={s.group}>
                <label htmlFor="size" className={s.groupHead}>
                  <span className="label">Ring size</span>
                  <Link to="/ring-size-guide" style={{ fontSize: 13, fontWeight: 600 }}>Ring size guide</Link>
                </label>
                <select id="size" className="field" value={size} onChange={(e) => setSize(e.target.value)}>
                  <option value="">Choose your size</option>
                  {ringSizes.map((r) => (
                    <option key={r.size} value={r.size}>{r.size} · {r.mm} mm</option>
                  ))}
                  <option value="help">Not sure, help me measure</option>
                </select>
              </div>
            )}

            <div className={s.summary}>
              <Icon name="sparkle" size={18} />
              <span>
                Your piece: <strong>{finishes[finish].label}</strong>
                {product.customizable && <> · <strong>{engraved || 'A · M'}</strong></>}
                {sizeText && <> · {sizeText}</>}
              </span>
            </div>

            <div className={s.ctas}>
              <OrderButton context={{ product, finish, initials, size }} />
              <details className={s.msgPreview}>
                <summary>Preview the message we will {orderChannel() === 'instagram' ? 'copy for you' : 'send'}</summary>
                <pre>{buildOrderMessage({ product, finish, initials, size })}</pre>
              </details>
              <Button variant="outline" onClick={() => toggle(product.slug)} aria-pressed={saved}>
                <Icon name="heart" style={saved ? { fill: 'currentColor' } : undefined} /> {saved ? 'Saved to wishlist' : 'Save to wishlist'}
              </Button>
              <span className={s.note}>We confirm size and engraving before dispatch · {brand.delivery.note}</span>
            </div>
          </div>

          <ul className={s.perks}>
            <li><Icon name="shield" size={18} /> Anti-tarnish</li>
            <li><Icon name="feather" size={18} /> Lightweight</li>
            <li><Icon name="truck" size={18} /> {brand.delivery.headline}</li>
            <li><Icon name="gift" size={18} /> Gift box included</li>
          </ul>

          <div className={s.accordion}>
            <details open>
              <summary>Details <Icon name="chevron" size={18} /></summary>
              <ul>
                {product.details.map((d) => <li key={d}>{d}</li>)}
                <li>[Material, plating and dimensions from the client]</li>
              </ul>
            </details>
            <details>
              <summary>Care <Icon name="chevron" size={18} /></summary>
              <p>Keep away from perfume and water, wipe with a soft cloth, and store in the MUSE box between wears.</p>
            </details>
            <details>
              <summary>Delivery &amp; exchanges <Icon name="chevron" size={18} /></summary>
              <p>
                {brand.delivery.headline} in {brand.delivery.time}. {brand.delivery.note}.
                {product.customizable ? ' Engraved pieces are made for you, so exchanges are for sizing only.' : ''} [Policy from the client.]
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className={s.related} aria-label="Complete the look">
        <div className={s.relatedInner}>
          <SectionHeading eyebrow="Complete the look" title="A little sparkle, a lot of Muse." linkTo="/shop" linkLabel="Shop all" />
          <ProductGrid products={related} />
        </div>
      </section>
    </>
  )
}
