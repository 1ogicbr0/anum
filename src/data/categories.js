// Mirrors the Instagram highlights: Sets · Earrings · Rings · Bracelets · Handchains · Pendants · Anklets

export const categories = [
  { slug: 'rings', name: 'Rings', icon: 'ring', blurb: 'Because some rings don’t just complete a look, they become the look.' },
  { slug: 'earrings', name: 'Earrings', icon: 'earring', blurb: 'Designed to move with you, catch the light, and make an entrance.' },
  { slug: 'sets', name: 'Sets', icon: 'set', blurb: 'Duos made to shine together.' },
  { slug: 'bracelets', name: 'Bracelets', icon: 'bracelet', blurb: 'A little gold on your wrist.' },
  { slug: 'handchains', name: 'Handchains', icon: 'handchain', blurb: 'Delicate chains, golden glow and just the right amount of sparkle.' },
  { slug: 'pendants', name: 'Pendants', icon: 'pendant', blurb: 'A little glow. A lot of elegance.' },
  { slug: 'anklets', name: 'Anklets', icon: 'anklet', blurb: 'A little sparkle for every step.' },
]

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))

export const occasions = [
  { slug: 'everyday', name: 'Everyday' },
  { slug: 'gifting', name: 'Gifting' },
  { slug: 'festive', name: 'Wedding & festive' },
]
