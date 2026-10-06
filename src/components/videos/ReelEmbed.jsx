import Icon from '@/components/ui/Icon'
import { videoCategoryBySlug } from '@/data/videos'
import s from './ReelEmbed.module.scss'

/**
 * One reel, played through Instagram's own embed so the video stays on Instagram's
 * servers and keeps its attribution. Loads lazily.
 */
export default function ReelEmbed({ video }) {
  const cat = videoCategoryBySlug[video.category]
  return (
    <article className={s.card}>
      <div className={s.frame}>
        <iframe
          src={`${video.url}embed/`}
          title={video.title}
          loading="lazy"
          allow="encrypted-media; picture-in-picture; clipboard-write"
          allowFullScreen
          scrolling="no"
        />
      </div>
      <div className={s.body}>
        <span className={s.cat}>{cat?.name ?? 'Reel'}</span>
        <span className={s.title}>{video.title}</span>
        <div className={s.meta}>
          <span>{video.by ? `by ${video.by}` : video.date}</span>
          <a className={s.link} href={video.url} target="_blank" rel="noopener noreferrer">
            Open on Instagram <Icon name="arrow" size={14} />
          </a>
        </div>
      </div>
    </article>
  )
}
