import Icon from '@/components/ui/Icon'
import SectionHeading from '@/components/ui/SectionHeading'
import { reviews } from '@/data/reviews'
import s from './Reviews.module.scss'

export default function Reviews() {
  return (
    <section className={s.wrap} id="reviews" aria-label="Reviews">
      <SectionHeading center eyebrow="Muse Reviews" title="Loved by the women who wear it." />
      <div className={s.grid} data-reveal="stagger">
        {reviews.map((r, i) => (
          <figure className={s.card} key={i}>
            <div className={s.stars} aria-label="Five stars">
              {Array.from({ length: 5 }).map((_, j) => (
                <Icon key={j} name="star" size={18} />
              ))}
            </div>
            <blockquote className={s.quote}>{r.quote}</blockquote>
            <figcaption className={s.who}>
              {r.name} · {r.city}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
