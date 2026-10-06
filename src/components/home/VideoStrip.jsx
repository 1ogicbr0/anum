import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import SectionHeading from '@/components/ui/SectionHeading'
import HighlightClip from '@/components/videos/HighlightClip'
import { clips, featuredClips, videos } from '@/data/videos'
import s from './VideoStrip.module.scss'

export default function VideoStrip() {
  return (
    <section className={s.section} id="videos" aria-label="Videos">
      <div className={s.inner}>
        <SectionHeading
          eyebrow="Straight from the highlights"
          title="See the pieces move."
          linkTo="/videos"
          linkLabel="All videos"
          aside="Stories saved from the @musebyanum highlights: the collections up close, on the wrist and in the mirror. Most are photos set to music, so tap one to hear it."
        />
        <div className={s.scroller} data-reveal="stagger">
          {featuredClips.map((c) => (
            <HighlightClip key={c.slug} clip={c} compact className={s.item} />
          ))}
          <Link to="/videos" className={s.more}>
            <span className={s.moreNum}>{clips.length + videos.length}</span>
            <span>videos in all</span>
            <span className={s.moreLink}>
              Watch them all <Icon name="arrow" size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
