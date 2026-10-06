import Icon from '@/components/ui/Icon'
import SectionHeading from '@/components/ui/SectionHeading'
import { reviews } from '@/data/reviews'
import HighlightClip from '@/components/videos/HighlightClip'
import { clipBySlug, highlightBySlug, storyImageBySlug } from '@/data/videos'
import { Link } from 'react-router-dom'
import s from './Reviews.module.scss'

const storyClips = [clipBySlug['reviews-01'], clipBySlug['reviews-03'], clipBySlug['pr-01']]
const storyPhoto = storyImageBySlug['reviews-02']

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

      <div className={s.stories}>
        <div className={s.storiesHead} data-reveal>
          <span className="eyebrow">From the Muse Reviews highlight</span>
          <p>Customers and creators sharing their pieces in their own stories, reposted by MUSE. Tap a clip to play it.</p>
          <Link to="/videos?category=reviews" className={s.storiesLink}>All review stories <Icon name="arrow" size={14} /></Link>
        </div>
        <div className={s.storiesRow} data-reveal="stagger">
          {storyClips.map((c) => (
            <HighlightClip key={c.slug} clip={c} compact className={s.story} />
          ))}
          <figure className={`${s.story} ${s.storyPhoto}`}>
            <img src={storyPhoto.src} alt={storyPhoto.title} loading="lazy" decoding="async" />
            <figcaption>
              <span>{storyPhoto.title}</span>
              <a href={highlightBySlug.reviews.url} target="_blank" rel="noopener noreferrer">Open highlight</a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
