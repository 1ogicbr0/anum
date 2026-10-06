export const TOAST_EVENT = 'muse:toast'

/** Show a short message at the bottom of the screen from anywhere. */
export const showToast = (message, duration = 4500) => {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: { message, duration } }))
}
