import { useRef } from 'react'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { gifting } from '@/animations/home'
import { Link } from 'react-router-dom'
import ProductImage from '@/components/ui/ProductImage'
import OrderButton from '@/components/ui/OrderButton'
import SectionHeading from '@/components/ui/SectionHeading'
import { brand } from '@/data/brand'
import { addOns } from '@/data/products'
import s from './Gifting.module.scss'

const chips = ['For your best friend', 'For your sister', 'For your partner', 'Just because']

export default function Gifting() {
  const charm = addOns[0]
  const ref = useRef(null)
  useSectionAnimation(ref, gifting)
  return (
    <section ref={ref} className={s.section} id="gifting" aria-label="Gifting">
      <div className={s.inner}>
        <SectionHeading eyebrow="Gifting" title={brand.lines.gifting} />
        <div className={s.chips} style={{ marginBottom: 28 }} data-anim="chips">
          {chips.map((c) => (
            <Link key={c} to="/shop?occasion=gifting" className="chip">{c}</Link>
          ))}
          <OrderButton scenario="gifting" variant="outline" size="sm">Ask us for gift ideas</OrderButton>
        </div>
        <div className={s.grid} data-reveal="stagger">
          <div className={s.card} data-anim="card">
            <ProductImage data-anim="img" className={s.img} src={brand.images.giftBox} alt="The white MUSE by Anum gift box" ratio="4 / 5" />
            <div className={s.body}>
              <h3 className={s.title}>The Muse gift box</h3>
              <p className={s.text}>Every order arrives in our white box with purple lettering, ready to hand over.</p>
            </div>
          </div>
          <div className={s.card} data-anim="card">
            <ProductImage data-anim="img" className={s.img} src={brand.images.charm} alt="MUSE Charm on a white gift bag" tone="lilac" icon="sparkle" ratio="4 / 5" label="[Photo — MUSE Charm on ribbon]" />
            <div className={s.body}>
              <h3 className={s.title}>Add a {charm.name}</h3>
              <p className={s.text}>{charm.description}</p>
            </div>
          </div>
          <Link to="/product/customizable-signet-ring" className={s.card} data-anim="card">
            <ProductImage data-anim="img" className={s.img} src={brand.images.engraved} alt="Two friends wearing matching engraved signet rings" ratio="4 / 5" />
            <div className={s.body}>
              <h3 className={s.title}>Engrave their initials</h3>
              <p className={s.text}>Some friendships deserve to be worn close, every single day. Personalise a signet ring for you two.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
