import { useId, useState } from 'react'
import Icon from './Icon'
import s from './Accordion.module.scss'

/**
 * A disclosure row that slides open and closed (grid-row transition) instead of the
 * browser's instant <details> toggle. Keyboard and screen-reader friendly: the header is
 * a button with aria-expanded, the panel is inert while closed.
 */
export default function Accordion({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className={`${s.item} ${open ? s.open : ''}`}>
      <button type="button" className={s.summary} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <span>{title}</span>
        <Icon name="chevron" size={18} />
      </button>
      <div id={id} className={s.panel} role="region" aria-hidden={!open} inert={!open}>
        <div className={s.inner}>{children}</div>
      </div>
    </div>
  )
}
