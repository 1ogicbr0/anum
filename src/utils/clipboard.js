// Copies text inside a user gesture. The legacy command works synchronously even when
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
