export default function FinishDots({ finishes = [] }) {
  return (
    <span style={{ display: 'inline-flex', gap: 4 }} aria-label={`Available in ${finishes.join(' and ')}`}>
      {finishes.map((f) => (
        <span key={f} className={`dot dot--${f}`} />
      ))}
    </span>
  )
}
