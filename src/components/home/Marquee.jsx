import { useRef } from 'react'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { marquee } from '@/animations/home'
import Icon from '@/components/ui/Icon'
import { brand } from '@/data/brand'
import s from './Marquee.module.scss'

const lines = [
  brand.values,
  brand.lines.wear,
  brand.delivery.headline,
  'Anti-tarnish · Lightweight · Timeless',
  brand.lines.moods,
  brand.lines.firstMuse,
]

export default function Marquee() {
  // The list is rendered twice so the loop is seamless.
  const items = [...lines, ...lines]
  const ref = useRef(null)
  useSectionAnimation(ref, marquee)
  return (
    <div ref={ref} className={s.band} aria-hidden="true">
      <div className={s.track} data-anim="track">
        {items.map((line, i) => (
          <span className={s.item} key={i} data-anim="item">
            {line}
            <Icon name="sparkle" size={16} />
          </span>
        ))}
      </div>
    </div>
  )
}
