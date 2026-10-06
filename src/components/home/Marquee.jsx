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
  return (
    <div className={s.band} aria-hidden="true">
      <div className={s.track}>
        {items.map((line, i) => (
          <span className={s.item} key={i}>
            {line}
            <Icon name="sparkle" size={16} />
          </span>
        ))}
      </div>
    </div>
  )
}
