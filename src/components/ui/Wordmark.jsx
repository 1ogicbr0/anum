import { Link } from 'react-router-dom'
import s from './Wordmark.module.scss'

export default function Wordmark({ sub = 'BY ANUM', size, to = '/' }) {
  const body = (
    <>
      <span className={s.muse}>muse</span>
      <span className={s.sub}>{sub}</span>
    </>
  )
  const cls = `${s.mark} ${size === 'lg' ? s.lg : ''}`
  return to ? (
    <Link to={to} className={cls} aria-label="MUSE by Anum home">
      {body}
    </Link>
  ) : (
    <span className={cls}>{body}</span>
  )
}
