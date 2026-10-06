import { useRef } from 'react'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { trust } from '@/animations/home'
import Icon from '@/components/ui/Icon'
import { brand } from '@/data/brand'
import s from './TrustStrip.module.scss'

export default function TrustStrip() {
  const ref = useRef(null)
  useSectionAnimation(ref, trust)
  return (
    <section ref={ref} className={s.wrap} aria-label="Why Muse">
      <div className={s.strip} data-reveal="stagger">
        {brand.claims.map((c) => (
          <div className={s.item} key={c.title} data-anim="item">
            <span className={s.icon} data-anim="icon">
              <Icon name={c.icon} />
            </span>
            <div>
              <div className={s.title}>{c.title}</div>
              <div className={s.text}>{c.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
