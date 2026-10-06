import { brand, finishes } from '@/data/brand'

export const formatPrice = (price) => (price == null ? 'DM for price' : `PKR ${price.toLocaleString('en-PK')}`)

export const formatInitials = (raw) => {
  const letters = String(raw || '')
    .replace(/[^A-Za-z]/g, '')
    .toUpperCase()
    .slice(0, 3)
    .split('')
  return letters.length ? letters.join(' · ') : ''
}

/**
 * Builds the message the customer sends to order. Works for WhatsApp (when a
 * number is configured) and as plain text to paste into an Instagram DM.
 */
export const buildOrderMessage = ({ product, finish, initials, size, quantity = 1 } = {}) => {
  if (!product) return `Hi ${brand.name}! I'd like to place an order.`
  const lines = [`Hi ${brand.name}! I'd like to order:`, `• ${product.name}`]
  if (finish && finishes[finish]) lines.push(`• Finish: ${finishes[finish].label}`)
  const engraved = formatInitials(initials)
  if (product.customizable && engraved) lines.push(`• Engraving: ${engraved}`)
  if (size) lines.push(`• Ring size: ${size}`)
  if (quantity > 1) lines.push(`• Quantity: ${quantity}`)
  lines.push('Please confirm price, delivery time and payment options. Thank you!')
  return lines.join('\n')
}

export const orderChannel = () => (brand.whatsappNumber ? 'whatsapp' : 'instagram')

export const buildOrderLink = (opts) => {
  const text = buildOrderMessage(opts)
  if (brand.whatsappNumber) {
    return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(text)}`
  }
  return brand.instagramDmUrl
}

export const orderLabel = (short = false) =>
  brand.whatsappNumber ? (short ? 'WhatsApp' : 'Order on WhatsApp') : short ? 'Instagram DM' : 'Order via Instagram DM'
