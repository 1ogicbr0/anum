import { Link } from 'react-router-dom'
import Icon from './Icon'
import s from './SectionHeading.module.scss'

export default function SectionHeading({ eyebrow, title, aside, linkTo, linkLabel, center, as: Tag = 'h2' }) {
  return (
    <div className={`${s.head} ${center ? s.center : ''}`} data-reveal>
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <Tag className={s.title}>{title}</Tag>
      </div>
      {aside && <p className={s.aside}>{aside}</p>}
      {linkTo && (
        <Link to={linkTo} className={s.link}>
          {linkLabel} <Icon name="arrow" size={18} />
        </Link>
      )}
    </div>
  )
}
