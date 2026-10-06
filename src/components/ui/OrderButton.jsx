import { useState } from 'react'
import Button from './Button'
import Icon from './Icon'
import OrderSheet from './OrderSheet'
import { copyText } from '@/utils/clipboard'
import { buildOrderLink, buildOrderMessage, orderChannel, orderLabel } from '@/utils/order'

/**
 * An order button that opens the chat with a message written for the place it was
 * pressed. WhatsApp links carry the text themselves, so the button is a plain link.
 * Instagram DM links cannot, so the button copies the message, shows it in a sheet
 * and lets the customer open the DM from there and paste it in.
 *
 * scenario + context are passed straight to buildOrderMessage().
 */
export default function OrderButton({ scenario, context, children, icon = true, ...rest }) {
  const opts = { scenario, ...(context ?? {}) }
  const message = buildOrderMessage(opts)
  const instagram = orderChannel() === 'instagram'
  const [sheet, setSheet] = useState(null)
  const close = () => setSheet(null)

  if (!instagram) {
    return (
      <Button href={buildOrderLink(opts)} {...rest}>
        {icon && <Icon name="chat" />}
        {children ?? orderLabel()}
      </Button>
    )
  }

  const open = () => setSheet({ copied: copyText(message) })

  return (
    <>
      <Button onClick={open} {...rest}>
        {icon && <Icon name="instagram" />}
        {children ?? orderLabel()}
      </Button>
      {sheet && <OrderSheet message={message} copied={sheet.copied} onCopy={() => setSheet({ copied: copyText(message) })} onClose={close} />}
    </>
  )
}
