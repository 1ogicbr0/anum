import Icon from '@/components/ui/Icon'
import SectionHeading from '@/components/ui/SectionHeading'
import { reviews } from '@/data/reviews'
import s from './Reviews.module.scss'

export default function Reviews({ limit = 6 }) {
  return (
    <section className={s.wrap} id="reviews" aria-label="Reviews">
      <SectionHeading center eyebrow="Muse Reviews" title="Loved by the women who wear it." aside="Real comments from @musebyanum, as they were written." />
      <div className={s.grid} data-reveal="stagger">
        {reviews.slice(0, limit).map((r, i) => (
          <figure className={s.card} key={`${r.name}-${i}`}>
            <span className={s.badge}>
              <Icon name="instagram" size={14} /> Instagram comment
            </span>
            <blockquote className={s.quote}>{r.quote}</blockquote>
            <figcaption className={s.who}>
              <span>{r.name}</span>
              <a href={r.post} target="_blank" rel="noopener noreferrer" className={s.link}>
                View post <Icon name="arrow" size={14} />
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
