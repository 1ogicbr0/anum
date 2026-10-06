import { useRef, useState } from 'react'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { signet } from '@/animations/home'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import RingPreview from '@/components/product/RingPreview'
import { productBySlug } from '@/data/products'
import { formatInitials } from '@/utils/order'
import s from './SignetFeature.module.scss'

export default function SignetFeature() {
  const ring = productBySlug['customizable-signet-ring']
  const ref = useRef(null)
  useSectionAnimation(ref, signet)
  const [letters, setLetters] = useState('')
  const engraved = formatInitials(letters)
  const onType = (e) => setLetters(e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 3))
  return (
    <section ref={ref} className={s.wrap} id="customise" aria-label="Customizable signet ring">
      <div className={s.band} data-anim="band">
        <div className={s.visual} data-anim="ring">
          <RingPreview id="home-ring" initials={engraved || 'A · M'} />
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
          <div className={s.try} data-anim="try">
            <label htmlFor="home-initials" className={s.tryLabel}>Try your initials</label>
            <div className={s.tryRow}>
              <input
                id="home-initials"
                className={s.tryField}
                type="text"
                inputMode="text"
                autoComplete="off"
                autoCapitalize="characters"
                maxLength={3}
                placeholder="A M"
                value={letters}
                onChange={onType}
                aria-describedby="home-initials-hint"
              />
              <span id="home-initials-hint" className={s.tryHint}>{letters.length ? `${letters.length} of 3 letters` : 'Up to three letters'}</span>
            </div>
          </div>
          <div className={s.ctas} data-anim="ctas">
            <Button to={letters ? `/product/${ring.slug}?initials=${letters}` : `/product/${ring.slug}`} variant="light">Design your ring</Button>
            <Button to="/ring-size-guide" variant="ghost">Ring size guide</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
