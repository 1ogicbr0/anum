import Button from '@/components/ui/Button'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <div className="container" style={{ padding: '96px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <span className="eyebrow">404</span>
      <h1 className="display">This page wandered off.</h1>
      <p style={{ color: 'var(--muted)', maxWidth: 420 }}>Some things don’t need an introduction. This one needs a different link.</p>
      <Button to="/">Back to home</Button>
    </div>
  )
}
