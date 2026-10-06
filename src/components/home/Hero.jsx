import { useRef } from 'react'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { hero } from '@/animations/home'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import OrderButton from '@/components/ui/OrderButton'
import Icon from '@/components/ui/Icon'
import ProductImage from '@/components/ui/ProductImage'
import { brand } from '@/data/brand'
import s from './Hero.module.scss'

export default function Hero() {
  const ref = useRef(null)
  useSectionAnimation(ref, hero)
  return (
    <section ref={ref} className={s.hero} aria-label="Welcome">
      <div className={s.copy}>
        <div className={s.eyebrow} data-anim="eyebrow">{brand.descriptor}</div>
        <h1 className={s.title} data-anim="title">{brand.lines.hero}</h1>
        <p className={s.sub} data-anim="sub">{brand.lines.heroSub}</p>
        <div className={s.ctas} data-anim="ctas">
          <Button to="/shop">
            Shop the edit <Icon name="arrow" />
          </Button>
          <OrderButton scenario="hero" variant="outline" />
        </div>
        <div className={s.perks} data-anim="perks">
          <span><Icon name="shield" size={18} /> Anti-tarnish</span>
          <span><Icon name="feather" size={18} /> Lightweight</span>
          <span><Icon name="truck" size={18} /> Nationwide delivery</span>
        </div>
      </div>

      <div className={s.visual} data-anim="visual">
        <ProductImage data-anim="main" className={s.main} src={brand.images.hero} alt={brand.images.heroAlt} ratio="4 / 5" eager />
        <ProductImage data-anim="small" className={s.small} src={brand.images.heroSmall} alt="Six Lilac Éclat rings on a lilac pedestal" ratio="1 / 1" eager />
        <div className={s.card} data-anim="card">
          <span className="eyebrow">New in</span>
          <div>
            <div className={s.cardTitle}>Customizable Signet Ring</div>
            <div className={s.cardSub}>Engraved with your initials.</div>
          </div>
          <Link to="/product/customizable-signet-ring" className={s.cardLink}>
            Personalise yours <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
