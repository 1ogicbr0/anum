import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'
import Icon from './Icon'
import { brand } from '@/data/brand'
import s from './OrderSheet.module.scss'

// Copies text inside the click gesture. The legacy command works synchronously even when
// the async Clipboard API is refused (for example when focus moves to a new tab).
export function copyText(text) {
  let ok = false
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.top = '-1000px'
    document.body.appendChild(ta)
    ta.select()
    ta.setSelectionRange(0, text.length)
    ok = document.execCommand('copy')
    document.body.removeChild(ta)
  } catch {
    ok = false
  }
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {})
  }
  return ok
}

/**
 * Shown after an Instagram order button is pressed: the message for that scenario,
 * already on the clipboard, with a button that opens the DM. Instagram links cannot
 * carry text, so the customer pastes it into the chat.
 */
export default function OrderSheet({ message, copied, onCopy, onClose }) {
  const [justCopied, setJustCopied] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const recopy = () => {
    onCopy()
    setJustCopied(true)
    setTimeout(() => setJustCopied(false), 1800)
  }

  return createPortal(
    <div className={s.overlay} onClick={onClose} role="presentation">
      <div className={s.sheet} role="dialog" aria-modal="true" aria-labelledby="order-sheet-title" onClick={(e) => e.stopPropagation()}>
        <button type="button" className={s.close} aria-label="Close" onClick={onClose}>
          <Icon name="close" size={18} />
        </button>
        <span className="eyebrow">Order via Instagram DM</span>
        <h2 id="order-sheet-title" className={s.title}>
          {copied ? 'Your message is copied.' : 'Here is your message.'}
        </h2>
        <p className={s.lead}>
          {copied
            ? 'Open Instagram, tap the message box and paste it. We reply with the price, delivery time and payment options.'
            : 'Copy it, then open Instagram, tap the message box and paste it in.'}
        </p>
        <pre className={s.message}>{message}</pre>
        <div className={s.actions}>
          <Button href={brand.instagramDmUrl} variant="primary" onClick={onClose}>
            <Icon name="instagram" /> Open Instagram DM
          </Button>
          <Button variant="outline" onClick={recopy}>
            {justCopied ? <><Icon name="check" /> Copied</> : copied ? 'Copy again' : 'Copy message'}
          </Button>
        </div>
        <span className={s.hint}>Or just say hi on @{brand.handle} and tell us what you were looking at.</span>
      </div>
    </div>,
    document.body,
  )
}
