import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import ProductImage from '@/components/ui/ProductImage'
import { brand } from '@/data/brand'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import s from './About.module.scss'

export default function About() {
  useDocumentTitle('About')
  return (
    <div className={s.wrap}>
      <section className={s.hero} aria-label="About MUSE by Anum">
        <div className={s.copy}>
          <span className="eyebrow">About</span>
          <h1 className={s.title}>Jewellery for the woman who inspires.</h1>
          <p className={s.lead}>
            {brand.name} is everyday fine jewellery from Pakistan. Modern, feminine and effortless pieces made to turn the simplest look into a signature, from coffee runs to dinner plans, celebrations to just because.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button to="/shop">Shop the edit</Button>
            <Button href={brand.instagramUrl} variant="outline"><Icon name="instagram" /> @{brand.handle}</Button>
          </div>
        </div>
        <ProductImage className={s.visual} src={brand.images.about} alt="A customer in lilac wearing Muse floral earrings and ring" ratio="auto" />
      </section>

      <section className={s.story} aria-label="Our story">
        <div>
          <h2 className={s.storyTitle}>The First Muse</h2>
          <p className={s.storyText}>
            MUSE began in {brand.launched} with a pair of long silver tassel earrings and one idea: a little silver, a lot of attitude. Pieces that move with you, catch the light, and make an entrance without saying a word.
          </p>
        </div>
        <div>
          <h2 className={s.storyTitle}>Two moods. One Muse.</h2>
          <p className={s.storyText}>
            Every piece comes in Muse Gold, the one that goes with everything, or Muse Silver, minimal but never ordinary. Lilac Éclat, Muse White Glow, Starlit Grace, Élan and Amour Éclat followed, each one a mood.
          </p>
        </div>
        <div>
          <h2 className={s.storyTitle}>Made to be yours</h2>
          <p className={s.storyText}>
            From engraved initials on the signet ring to the MUSE Charm in every gift box, we believe jewellery should tell your story. [Founder note from Anum.]
          </p>
        </div>
      </section>

      <section className={s.values} aria-label="What we promise">
        {brand.claims.map((c) => (
          <div className={s.value} key={c.title}>
            <Icon name={c.icon} size={28} />
            <span className={s.valueTitle}>{c.title}</span>
            <span className={s.valueText}>{c.text}</span>
          </div>
        ))}
      </section>

      <section className={s.policy} aria-label="Delivery and care">
        <div className={s.policyCard} id="delivery">
          <h2 className={s.policyTitle}>Delivery across Pakistan</h2>
          <p className={s.policyText}>
            We deliver everywhere in Pakistan in {brand.delivery.time}. {brand.delivery.note}. Delivery charges: {brand.delivery.charges}. Every order is confirmed by message before dispatch.
          </p>
        </div>
        <div className={s.policyCard} id="care">
          <h2 className={s.policyTitle}>Jewellery care</h2>
          <p className={s.policyText}>
            Our pieces are anti-tarnish and lightweight, made for daily wear. Keep them away from perfume and water, wipe with a soft cloth, and store them in the MUSE box between wears.
          </p>
        </div>
        <div className={s.policyCard} id="exchanges">
          <h2 className={s.policyTitle}>Exchanges</h2>
          <p className={s.policyText}>
            Sizing exchanges are always possible. Engraved pieces are made for you, so they can be exchanged for sizing only. [Full policy from the client.]
          </p>
        </div>
      </section>
    </div>
  )
}
