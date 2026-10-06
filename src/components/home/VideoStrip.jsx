import SectionHeading from '@/components/ui/SectionHeading'
import ReelEmbed from '@/components/videos/ReelEmbed'
import { featuredVideos } from '@/data/videos'
import s from './VideoStrip.module.scss'

export default function VideoStrip() {
  return (
    <section className={s.section} id="videos" aria-label="Videos">
      <div className={s.inner}>
        <SectionHeading eyebrow="Watch" title="See the pieces move." linkTo="/videos" linkLabel="All videos" aside="Reels from @musebyanum: unboxings, styling and the collections up close." />
        <div className={s.grid} data-reveal="stagger">
          {featuredVideos.map((v) => (
            <ReelEmbed key={v.code} video={v} />
          ))}
        </div>
      </div>
    </section>
  )
}
