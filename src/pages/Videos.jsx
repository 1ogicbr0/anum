import { Link, useSearchParams } from 'react-router-dom'
import HighlightClip from '@/components/videos/HighlightClip'
import ReelEmbed from '@/components/videos/ReelEmbed'
import { clips, highlights, videos, videoCategories } from '@/data/videos'
import { brand } from '@/data/brand'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import s from './Videos.module.scss'

export default function Videos() {
  useDocumentTitle('Videos')
  const [params, setParams] = useSearchParams()
  const active = params.get('category') ?? ''
  const clipList = active ? clips.filter((c) => c.category === active) : clips
  const reelList = active ? videos.filter((v) => v.category === active) : videos
  const used = new Set([...clips.map((c) => c.category), ...videos.map((v) => v.category)])

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
          Every story from the nine <Link to="/#instagram">@{brand.handle}</Link> highlights, plus the public reels, grouped the way the highlights are. Tap a clip to play it with sound.
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

      {clipList.length > 0 && (
        <section className={s.group} aria-label="Highlight stories">
          <div className={s.groupHead}>
            <h2 className={s.groupTitle}>From the highlights</h2>
            <span className={s.groupNote}>
              {clipList.length} {clipList.length === 1 ? 'story' : 'stories'} · saved from {active ? 'this highlight' : `${highlights.length} highlights`}
            </span>
          </div>
          <div className={s.grid} data-reveal="stagger">
            {clipList.map((c) => (
              <HighlightClip key={c.slug} clip={c} />
            ))}
          </div>
        </section>
      )}

      {reelList.length > 0 && (
        <section className={s.group} aria-label="Reels">
          <div className={s.groupHead}>
            <h2 className={s.groupTitle}>Reels</h2>
            <span className={s.groupNote}>Played through Instagram, so they stay on @{brand.handle}</span>
          </div>
          <div className={s.grid} data-reveal="stagger">
            {reelList.map((v) => (
              <ReelEmbed key={v.code} video={v} />
            ))}
          </div>
        </section>
      )}

      {!clipList.length && !reelList.length && <div className={s.empty}>No videos in this category yet.</div>}
    </div>
  )
}
