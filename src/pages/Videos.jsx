import { Link, useSearchParams } from 'react-router-dom'
import ReelEmbed from '@/components/videos/ReelEmbed'
import { videos, videoCategories } from '@/data/videos'
import { brand } from '@/data/brand'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import s from './Videos.module.scss'

export default function Videos() {
  useDocumentTitle('Videos')
  const [params, setParams] = useSearchParams()
  const active = params.get('category') ?? ''
  const list = active ? videos.filter((v) => v.category === active) : videos
  const used = new Set(videos.map((v) => v.category))

  const pick = (slug) => {
    const p = new URLSearchParams(params)
    if (!slug || slug === active) p.delete('category')
    else p.set('category', slug)
    setParams(p)
  }

  return (
    <div className={s.wrap}>
      <div>
        <div className="eyebrow">Watch</div>
        <h1 className={s.title}>Muse in motion.</h1>
        <p className={s.lead}>
          Reels from <Link to="/#instagram">@{brand.handle}</Link>, grouped the way the Instagram highlights are. Tap any video to play it, or open it on Instagram.
        </p>
      </div>

      <div className={s.chips} role="group" aria-label="Video categories">
        <button type="button" className="chip" aria-pressed={!active} onClick={() => pick('')}>All</button>
        {videoCategories.filter((c) => used.has(c.slug)).map((c) => (
          <button key={c.slug} type="button" className="chip" aria-pressed={active === c.slug} onClick={() => pick(c.slug)}>
            {c.name}
          </button>
        ))}
      </div>

      {list.length ? (
        <div className={s.grid} data-reveal="stagger">
          {list.map((v) => (
            <ReelEmbed key={v.code} video={v} />
          ))}
        </div>
      ) : (
        <div className={s.empty}>No videos in this category yet.</div>
      )}
    </div>
  )
}
