import { useEffect, useRef, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { highlightBySlug, videoCategoryBySlug } from '@/data/videos'
import s from './HighlightClip.module.scss'

/**
 * A story clip saved from one of @musebyanum's Instagram highlights, served from
 * /public/videos/highlights. Tap to play (with sound), tap again to pause. Only one
 * clip plays at a time; the poster frame shows until then so nothing downloads early.
 */
export default function HighlightClip({ clip, compact = false, className = '' }) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const cat = videoCategoryBySlug[clip.category]
  const highlight = highlightBySlug[clip.highlight]

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const onOther = (e) => {
      if (e.detail !== el && !el.paused) el.pause()
    }
    window.addEventListener('muse:clip-play', onOther)
    return () => window.removeEventListener('muse:clip-play', onOther)
  }, [])

  const toggle = () => {
    const el = ref.current
    if (!el) return
    if (el.paused) {
      window.dispatchEvent(new CustomEvent('muse:clip-play', { detail: el }))
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }

  return (
    <article className={`${s.card} ${compact ? s.compact : ''} ${className}`}>
      <div className={`${s.frame} ${playing ? s.playing : ''}`}>
        <video
          ref={ref}
          src={clip.src}
          poster={clip.poster}
          preload="none"
          playsInline
          loop
          muted={muted}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={toggle}
          aria-label={clip.title}
        />
        <button type="button" className={s.play} aria-label={playing ? `Pause: ${clip.title}` : `Play: ${clip.title}`} onClick={toggle}>
          <Icon name={playing ? 'pause' : 'play'} size={24} />
        </button>
        <span className={s.dur}>{clip.duration}s</span>
        {playing && (
          <button type="button" className={s.sound} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted} onClick={() => setMuted((m) => !m)}>
            {muted ? 'Muted' : 'Sound on'}
          </button>
        )}
        <span className={s.chip}>{highlight ? `${highlight.name} highlight` : cat?.name}</span>
      </div>
      {!compact && (
        <div className={s.body}>
          <span className={s.cat}>{cat?.name ?? 'Highlight'}</span>
          <span className={s.title}>{clip.title}</span>
          <div className={s.meta}>
            <span>{clip.by ? `by ${clip.by}` : clip.date}</span>
            {highlight && (
              <a className={s.link} href={highlight.url} target="_blank" rel="noopener noreferrer">
                Open highlight <Icon name="arrow" size={14} />
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  )
}
