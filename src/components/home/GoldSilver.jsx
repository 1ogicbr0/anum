import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import SectionHeading from '@/components/ui/SectionHeading'
import ProductImage from '@/components/ui/ProductImage'
import { brand, finishes } from '@/data/brand'
import s from './GoldSilver.module.scss'

export default function GoldSilver() {
  return (
    <section className={s.wrap} id="moods" aria-label="Gold or silver">
      <SectionHeading center eyebrow={brand.lines.moods} title="Which one is your Muse?" />
      <ProductImage className={s.banner} src={brand.images.moods} alt="Muse Gold earrings on a cream tray beside Muse Silver earrings on a lilac tray" ratio="auto" imgStyle={{ objectPosition: 'center 28%' }} />
      <div className={s.grid}>
        <Link to="/shop?finish=gold" className={`${s.card} ${s.gold}`}>
          <span className={s.eyebrow}>{finishes.gold.label}</span>
          <div>
            <div className={s.title}>Glow in gold.</div>
            <div className={s.sub}>{finishes.gold.blurb}</div>
          </div>
          <span className={s.link}>Shop gold <Icon name="arrow" size={18} /></span>
        </Link>
        <Link to="/shop?finish=silver" className={`${s.card} ${s.silver}`}>
          <span className={s.eyebrow}>{finishes.silver.label}</span>
          <div>
            <div className={s.title}>Shine in silver.</div>
            <div className={s.sub}>{finishes.silver.blurb}</div>
          </div>
          <span className={s.link}>Shop silver <Icon name="arrow" size={18} /></span>
        </Link>
      </div>
    </section>
  )
}
