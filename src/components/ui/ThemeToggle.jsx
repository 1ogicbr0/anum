import Icon from './Icon'
import { useTheme } from '@/hooks/useTheme'
import s from './ThemeToggle.module.scss'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      className={`${s.toggle} ${className}`}
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      title={dark ? 'Light theme' : 'Dark theme'}
    >
      <span className={s.icons} aria-hidden="true">
        <Icon name="sun" size={20} />
        <Icon name="moon" size={20} />
      </span>
    </button>
  )
}
