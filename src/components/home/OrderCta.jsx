import { useRef } from 'react'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { orderCta } from '@/animations/home'
import OrderButton from '@/components/ui/OrderButton'
import { brand } from '@/data/brand'
import s from './OrderCta.module.scss'

export default function OrderCta() {
  const hasWhatsApp = Boolean(brand.whatsappNumber)
  const ref = useRef(null)
  useSectionAnimation(ref, orderCta)
  return (
    <section ref={ref} className={s.wrap} id="order" aria-label="How to order">
      <div className={s.band} data-anim="band">
        <div className={s.copy}>
          <span className={s.eyebrow} data-anim="eyebrow">Ready when you are</span>
          <h2 className={s.title} data-anim="title">{brand.lines.firstMuse}</h2>
          <p className={s.text} data-anim="text">
            Message us on {hasWhatsApp ? 'WhatsApp or ' : ''}Instagram with the piece you love. We confirm your size, engrave if you like, and deliver anywhere in Pakistan.
          </p>
        </div>
        <div className={s.actions} data-anim="actions">
          <OrderButton scenario="general" variant="dark">
            {hasWhatsApp ? `WhatsApp ${brand.whatsappNumber}` : 'DM “MUSE” on Instagram'}
          </OrderButton>
          <span className={s.note}>{brand.delivery.note} · {brand.delivery.headline}</span>
        </div>
      </div>
    </section>
  )
}
