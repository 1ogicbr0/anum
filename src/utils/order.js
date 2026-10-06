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

const greeting = `Hi ${brand.name}! `
const closing = 'Could you confirm the price, delivery time and payment options? Thank you!'

/**
 * Builds the message the customer sends to order or ask. The scenario describes where
 * the button was pressed, so the message already says what they were looking at.
 *
 * scenario: 'general' | 'hero' | 'product' | 'category' | 'collection' | 'wishlist'
 *           | 'gifting' | 'size-help' | 'charm'
 */
export const buildOrderMessage = ({
  scenario,
  product,
  finish,
  initials,
  size,
  quantity = 1,
  category,
  collection,
  items = [],
  occasion,
} = {}) => {
  const kind = scenario ?? (product ? 'product' : 'general')

  switch (kind) {
    case 'product': {
      if (!product) return `${greeting}I'd like to place an order.`
      const lines = [`${greeting}I'd like to order:`, `• ${product.name}`]
      if (finish && finishes[finish]) lines.push(`• Finish: ${finishes[finish].label}`)
      const engraved = formatInitials(initials)
      if (product.customizable && engraved) lines.push(`• Engraving: ${engraved}`)
      if (size === 'help') lines.push(`• Ring size: I'm not sure, could you help me measure?`)
      else if (size) lines.push(`• Ring size: ${size}`)
      if (quantity > 1) lines.push(`• Quantity: ${quantity}`)
      lines.push(closing)
      return lines.join('\n')
    }
    case 'hero':
      return `${greeting}I just found you through your website and love the collection. Could you share what's available right now and the prices? Thank you!`
    case 'category':
      return `${greeting}I'm browsing your ${category ?? 'pieces'} on the website. Could you share the prices and what's in stock? Thank you!`
    case 'collection':
      return `${greeting}I love the ${collection ?? 'collection'} edit on your website. Could you share the prices and which pieces are available? Thank you!`
    case 'wishlist': {
      const lines = [`${greeting}I've saved these pieces from your website:`]
      items.forEach((name) => lines.push(`• ${name}`))
      if (!items.length) lines.push('• (my wishlist)')
      lines.push('Could you share the prices and availability? Thank you!')
      return lines.join('\n')
    }
    case 'gifting':
      return `${greeting}I'm looking for a gift${occasion ? ` for my ${occasion}` : ''}. Could you suggest a few pieces, let me know about the MUSE Charm and gift box, and share the prices? Thank you!`
    case 'charm':
      return `${greeting}I'd like to add a MUSE Charm to my order. Could you share the price and how it's packaged? Thank you!`
    case 'size-help':
      return `${greeting}I'd like to order ${product ? product.name : 'a ring'} but I'm not sure about my ring size. Could you help me measure? Thank you!`
    default:
      return `${greeting}I'd like to place an order. Could you share what's available and the prices? Thank you!`
  }
}

export const orderChannel = () => (brand.whatsappNumber ? 'whatsapp' : 'instagram')

// WhatsApp accepts the message in the URL. Instagram DM links take no text, so the
// OrderButton copies the message to the clipboard instead.
export const buildOrderLink = (opts) => {
  if (brand.whatsappNumber) return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(buildOrderMessage(opts))}`
  return brand.instagramDmUrl
}

export const orderLabel = (short = false) =>
  brand.whatsappNumber ? (short ? 'WhatsApp' : 'Order on WhatsApp') : short ? 'Instagram DM' : 'Order via Instagram DM'
