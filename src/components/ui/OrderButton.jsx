import Button from './Button'
import Icon from './Icon'
import { showToast } from '@/utils/toast'
import { buildOrderLink, buildOrderMessage, orderChannel, orderLabel } from '@/utils/order'

/**
 * An order button that opens the chat with a message written for the place it was
 * pressed. WhatsApp links carry the text themselves; Instagram DM links cannot, so the
 * message is copied to the clipboard and the customer pastes it into the chat.
 *
 * scenario + context are passed straight to buildOrderMessage().
 */
export default function OrderButton({ scenario, context, children, icon = true, ...rest }) {
  const opts = { scenario, ...(context ?? {}) }
  const message = buildOrderMessage(opts)
  const href = buildOrderLink(opts)
  const instagram = orderChannel() === 'instagram'

  const onClick = () => {
    if (!instagram) return
    const write = navigator.clipboard?.writeText?.bind(navigator.clipboard)
    if (!write) {
      showToast('Instagram is opening. Tell us what you were looking at and we will take it from there.')
      return
    }
    write(message)
      .then(() => showToast('Your message is copied. Paste it into the Instagram chat and send.'))
      .catch(() => showToast('Instagram is opening. Tell us what you were looking at and we will take it from there.'))
  }

  return (
    <Button href={href} onClick={onClick} {...rest}>
      {icon && <Icon name={instagram ? 'instagram' : 'chat'} />}
      {children ?? orderLabel()}
    </Button>
  )
}
