import { useRef } from 'react'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { signet } from '@/animations/home'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import RingPreview from '@/components/product/RingPreview'
import { productBySlug } from '@/data/products'
import s from './SignetFeature.module.scss'

export default function SignetFeature() {
  const ring = productBySlug['customizable-signet-ring']
  const ref = useRef(null)
  useSectionAnimation(ref, signet)
  return (
    <section ref={ref} className={s.wrap} id="customise" aria-label="Customizable signet ring">
      <div className={s.band} data-anim="band">
        <div className={s.visual} data-anim="ring">
          <RingPreview id="home-ring" />
        </div>
        <div className={s.copy}>
          <span className={s.eyebrow} data-anim="eyebrow">{ring.tagline}</span>
          <h2 className={s.title} data-anim="title">Your initials. Your story. Your ring.</h2>
          <p className={s.text} data-anim="text">{ring.description}</p>
          <ul className={s.list} data-anim="list">
            {ring.details.slice(0, 3).map((d) => (
              <li key={d}>
                <Icon name="check" size={20} /> {d}
              </li>
            ))}
          </ul>
          <div className={s.ctas} data-anim="ctas">
            <Button to={`/product/${ring.slug}`} variant="light">Design your ring</Button>
            <Button to="/ring-size-guide" variant="ghost">Ring size guide</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
