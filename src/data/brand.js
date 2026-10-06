// Brand facts, taken from instagram.com/musebyanum (captured 6 Oct 2026).
// Anything in square brackets is still owed by the client.

export const brand = {
  name: 'MUSE by Anum',
  shortName: 'muse',
  handle: 'musebyanum',
  instagramUrl: 'https://www.instagram.com/musebyanum/',
  // Instagram DM deep link, used for ordering until a WhatsApp number is supplied.
  instagramDmUrl: 'https://ig.me/m/musebyanum',
  // Set this (digits only, with country code, e.g. '923001234567') to switch every
  // "Order" button to WhatsApp with a prefilled message.
  whatsappNumber: '',
  email: '',
  tagline: 'Jewellery for the woman who inspires.',
  descriptor: 'Everyday fine jewellery',
  values: 'Modern • Feminine • Effortless',
  bio: [
    'Everyday fine Jewellery.',
    'Jewellery for the woman who inspires!',
    'Modern • Feminine • Effortless',
    'Delivery all over Pakistan',
  ],
  launched: 'September 2026',
  delivery: {
    headline: 'Delivery all over Pakistan',
    note: 'Cash on delivery available',
    time: '[Delivery time]',
    charges: '[Delivery charges]',
  },
  claims: [
    { icon: 'diamond', title: 'Premium quality', text: 'Made to be worn daily' },
    { icon: 'shield', title: 'Anti-tarnish', text: 'Keeps its glow' },
    { icon: 'feather', title: 'Lightweight & comfortable', text: 'Forget you are wearing it' },
    { icon: 'clock', title: 'Stylish & timeless', text: 'Minimal, never ordinary' },
    { icon: 'truck', title: 'Delivery all over Pakistan', text: 'Cash on delivery available' },
  ],
  lines: {
    hero: 'Jewellery for the woman who inspires.',
    heroSub:
      'Modern • Feminine • Effortless. Delicate enough for every day, statement enough to be noticed, designed in Pakistan and delivered to your door.',
    moods: 'Two moods. One Muse.',
    firstMuse: 'Your first Muse awaits.',
    wear: 'Wear your mood. Own your MUSE.',
    poetry: 'Wear a little poetry.',
    gifting: 'Every gift deserves a little Muse magic.',
    signature:
      'Because the right jewellery doesn’t just complete your look — it becomes your signature.',
  },
  images: {
    hero: '/images/instagram/DdJ0tCxKzOm.jpg',
    heroAlt: 'MUSE by Anum lilac shopping bags held by a model in a lilac veil',
    heroSmall: '/images/instagram/DdMM6njinQ7.jpg',
    moods: '/images/instagram/Dc8xzvsqNmC.jpg',
    giftBox: '/images/instagram/DdERXw2qVnt.jpg',
    engraved: '/images/instagram/DeH9C3VK7aa.jpg',
    charm: '/images/instagram/charm.jpg',
    about: '/images/instagram/DdlI9rFCuNW.jpg',
    occasion: '/images/instagram/DdGXlB2Kh5Y.jpg',
    avatar: '/images/instagram/profile.jpg',
  },
  hashtags: ['#MuseByAnum', '#WearYourMuse', '#JewelleryPakistan', '#EverydayLuxury'],
}

export const finishes = {
  gold: { id: 'gold', label: 'Muse Gold', blurb: 'The one that goes with everything.' },
  silver: { id: 'silver', label: 'Muse Silver', blurb: 'Minimal, but never ordinary.' },
}

export const ringSizes = [
  { size: '5', mm: '15.7' },
  { size: '6', mm: '16.5' },
  { size: '7', mm: '17.3' },
  { size: '8', mm: '18.1' },
  { size: '9', mm: '18.9' },
  { size: '10', mm: '19.8' },
]
