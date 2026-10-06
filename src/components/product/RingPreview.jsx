import s from './RingPreview.module.scss'

/**
 * Illustrated signet ring with a live engraving. Used on the home feature band
 * and the product page until real photography is dropped in.
 */
export default function RingPreview({ initials = 'A · M', finish = 'gold', maxWidth = 380, id = 'ring' }) {
  const gradId = `${id}-${finish}`
  const stops =
    finish === 'silver'
      ? [['0', '#FFFFFF'], ['.5', '#C7C8CF'], ['1', '#7E8089']]
      : [['0', '#F0D898'], ['.5', '#C9A24A'], ['1', '#8C6A24']]

  return (
    <svg
      className={s.svg}
      style={{ maxWidth }}
      viewBox="0 0 360 360"
      role="img"
      aria-label={`${finish === 'silver' ? 'Silver' : 'Gold'} signet ring engraved with ${initials || 'your initials'}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          {stops.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
      </defs>
      <ellipse cx="180" cy="210" rx="118" ry="104" fill="none" stroke={`url(#${gradId})`} strokeWidth="22" />
      <ellipse cx="180" cy="210" rx="118" ry="104" fill="none" stroke="#FFFFFF" strokeOpacity=".2" strokeWidth="2" />
      <rect x="104" y="74" width="152" height="80" rx="14" fill={`url(#${gradId})`} />
      <rect x="114" y="84" width="132" height="60" rx="10" fill="none" stroke="#2B2140" strokeOpacity=".35" strokeWidth="1.5" />
      <text className={s.text} x="180" y="126" textAnchor="middle" fontSize="36" fill="#2B2140">
        {initials || 'A · M'}
      </text>
    </svg>
  )
}
