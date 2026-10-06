import { useEffect, useRef, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { highlightBySlug, videoCategoryBySlug } from '@/data/videos'
import s from './HighlightClip.module.scss'

/**
 * A story clip saved from one of @musebyanum's Instagram highlights, served from
 * /public/videos/highlights. Tap to play (with sound), tap again to pause. Only one
 * clip plays at a time, and a clip pauses itself when it scrolls out of view or the tab is
 * hidden; the poster frame shows until then so nothing downloads early.
 * While playing, the badge in the corner counts down the seconds left and a story-style
 * progress bar fills along the top. Most stories are a photo with a music track
 * (clip.motion is false): those are labelled "Photo + music" and the photo itself is
 * animated (slow zoom and pan, a passing shine) while the music plays. Real footage is
 * labelled "Video". `ratio` and `fit` let a page show a story inside a different frame
 * (the product page uses a 4:5 frame with the story letterboxed on satin).
 */
export default function HighlightClip({ clip, compact = false, ratio = '9 / 16', fit = 'cover', className = '' }) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [remaining, setRemaining] = useState(null)
  const [progress, setProgress] = useState(0)
  const cat = videoCategoryBySlug[clip.category]
  const highlight = highlightBySlug[clip.highlight]
  const isPhoto = !clip.motion

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const onOther = (e) => {
      if (e.detail !== el && !el.paused) el.pause()
    }
    window.addEventListener('muse:clip-play', onOther)
    return () => window.removeEventListener('muse:clip-play', onOther)
  }, [])

  // Pause when the clip leaves the viewport (scrolled past, or swiped away in the home
  // strip) or when the tab goes to the background, so sound never carries on unseen.
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    let io
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting && !el.paused) el.pause()
          })
        },
        { threshold: 0.35 },
      )
      io.observe(el)
    }
    const onVisibility = () => {
      if (document.hidden && !el.paused) el.pause()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      io?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
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

  const onTime = () => {
    const el = ref.current
    if (!el) return
    const total = Number.isFinite(el.duration) && el.duration > 0 ? el.duration : clip.duration
    setRemaining(Math.max(0, Math.ceil(total - el.currentTime)))
    setProgress(Math.min(1, el.currentTime / total))
  }

  const seconds = remaining ?? clip.duration

  return (
    <article className={`${s.card} ${compact ? s.compact : ''} ${className}`}>
      <div className={`${s.frame} ${playing ? s.playing : ''} ${isPhoto ? s.photo : ''} ${fit === 'contain' ? s.contain : ''}`} style={{ aspectRatio: ratio }}>
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
          onTimeUpdate={onTime}
          onClick={toggle}
          aria-label={clip.title}
        />
        <span className={s.progress} aria-hidden="true">
          <i style={{ width: `${progress * 100}%` }} />
        </span>
        <button type="button" className={s.play} aria-label={playing ? `Pause: ${clip.title}` : `Play: ${clip.title}`} onClick={toggle}>
          <Icon name={playing ? 'pause' : 'play'} size={24} />
        </button>
        <span className={s.kind}>{isPhoto ? 'Photo + music' : 'Video'}</span>
        <span className={s.dur} aria-live={playing ? 'off' : undefined}>{seconds}s</span>
        {playing && (
          <button type="button" className={s.sound} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted} onClick={() => setMuted((m) => !m)}>
            {!muted && (
              <span className={s.eq} aria-hidden="true"><i /><i /><i /></span>
            )}
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
