import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import ProductImage from '@/components/ui/ProductImage'
import { brand } from '@/data/brand'
import { buildOrderLink, orderLabel } from '@/utils/order'
import s from './Hero.module.scss'

export default function Hero() {
  return (
    <section className={s.hero} aria-label="Welcome">
      <div className={s.copy}>
        <div className={s.eyebrow}>{brand.descriptor}</div>
        <h1 className={s.title}>{brand.lines.hero}</h1>
        <p className={s.sub}>{brand.lines.heroSub}</p>
        <div className={s.ctas}>
          <Button to="/shop">
            Shop the edit <Icon name="arrow" />
          </Button>
          <Button href={buildOrderLink()} variant="outline">
            <Icon name="chat" /> {orderLabel()}
          </Button>
        </div>
        <div className={s.perks}>
          <span><Icon name="shield" size={18} /> Anti-tarnish</span>
          <span><Icon name="feather" size={18} /> Lightweight</span>
          <span><Icon name="truck" size={18} /> Nationwide delivery</span>
        </div>
      </div>

      <div className={s.visual}>
        <ProductImage className={s.main} src={brand.images.hero} alt={brand.images.heroAlt} ratio="4 / 5" eager />
        <ProductImage className={s.small} src={brand.images.heroSmall} alt="Six Lilac Éclat rings on a lilac pedestal" ratio="1 / 1" eager />
        <div className={s.card}>
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
