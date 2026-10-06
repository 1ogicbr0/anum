import OrderButton from '@/components/ui/OrderButton'
import { brand } from '@/data/brand'
import s from './OrderCta.module.scss'

export default function OrderCta() {
  const hasWhatsApp = Boolean(brand.whatsappNumber)
  return (
    <section className={s.wrap} id="order" aria-label="How to order">
      <div className={s.band} data-reveal>
        <div className={s.copy}>
          <span className={s.eyebrow}>Ready when you are</span>
          <h2 className={s.title}>{brand.lines.firstMuse}</h2>
          <p className={s.text}>
            Message us on {hasWhatsApp ? 'WhatsApp or ' : ''}Instagram with the piece you love. We confirm your size, engrave if you like, and deliver anywhere in Pakistan.
          </p>
        </div>
        <div className={s.actions}>
          <OrderButton scenario="general" variant="dark">
            {hasWhatsApp ? `WhatsApp ${brand.whatsappNumber}` : 'DM “MUSE” on Instagram'}
          </OrderButton>
          <span className={s.note}>{brand.delivery.note} · {brand.delivery.headline}</span>
        </div>
      </div>
    </section>
  )
}
