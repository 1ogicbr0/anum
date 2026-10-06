import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { brand } from '@/data/brand'
import { buildOrderLink } from '@/utils/order'
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
          {hasWhatsApp && (
            <Button href={buildOrderLink()} variant="dark">
              <Icon name="chat" /> WhatsApp {brand.whatsappNumber}
            </Button>
          )}
          <Button href={brand.instagramDmUrl} variant={hasWhatsApp ? 'light' : 'dark'}>
            <Icon name="instagram" /> DM “MUSE” on Instagram
          </Button>
          <span className={s.note}>{brand.delivery.note} · {brand.delivery.headline}</span>
        </div>
      </div>
    </section>
  )
}
