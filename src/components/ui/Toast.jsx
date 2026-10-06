import { useEffect, useState } from 'react'
import Icon from './Icon'
import { TOAST_EVENT } from '@/utils/toast'
import s from './Toast.module.scss'

export default function Toaster() {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    let timer
    const onToast = (e) => {
      clearTimeout(timer)
      setToast(e.detail)
      timer = setTimeout(() => setToast(null), e.detail.duration)
    }
    window.addEventListener(TOAST_EVENT, onToast)
    return () => {
      clearTimeout(timer)
      window.removeEventListener(TOAST_EVENT, onToast)
    }
  }, [])

  if (!toast) return null
  return (
    <div className={s.toast} role="status" aria-live="polite">
      <Icon name="chat" size={18} />
      <span>{toast.message}</span>
    </div>
  )
}
