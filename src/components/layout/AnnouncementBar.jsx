import Icon from '@/components/ui/Icon'
import { brand } from '@/data/brand'
import s from './AnnouncementBar.module.scss'

export default function AnnouncementBar() {
  return (
    <div className={s.bar}>
      <Icon name="sparkle" size={16} />
      <span>
        {brand.delivery.headline} · Add a MUSE Charm to any order
      </span>
    </div>
  )
}
