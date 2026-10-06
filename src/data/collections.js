// Named edits from the Instagram captions.

export const collections = [
  {
    slug: 'personalised',
    name: 'Personalised',
    image: '/images/instagram/DeHYLNKqMyE.jpg',
    tagline: 'Your initials. Your story. Your ring.',
    description:
      'Personalise the Customizable Signet Ring with your initials, your partner’s, or the letters of someone special, beautifully engraved just for you. A promise, a best-friend bond or a thoughtful gift.',
    tone: 'deep',
    icon: 'signet',
    featured: true,
  },
  {
    slug: 'lilac-eclat',
    name: 'Lilac Éclat',
    image: '/images/instagram/DdMM6njinQ7.jpg',
    tagline: 'Six rings. Six moods.',
    description:
      'Éclat means radiance, brilliance and sparkle. Timeless gold meets delicate crystal details, statement florals and elegant mother-of-pearl accents, designed for the girl who believes her jewellery should speak before she does.',
    tone: 'deep',
    icon: 'rings',
    featured: true,
  },
  {
    slug: 'white-glow',
    name: 'Muse White Glow',
    image: '/images/instagram/DdRTkj6K0fr.jpg',
    tagline: 'A little glow. A lot of elegance.',
    description:
      'Delicate mother-of-pearl pendants designed to make even your everyday look feel extra special. From subtle pearls to statement silhouettes, there is a piece waiting to become your new favourite.',
    tone: 'lilac',
    icon: 'pendant',
  },
  {
    slug: 'starlit-grace',
    name: 'Starlit Grace',
    image: '/images/instagram/DdQvA4ECpzj.jpg',
    tagline: 'A little sparkle. A little pearl. A whole lot of elegance.',
    description:
      'Made for the moments when you want your jewellery to do the talking. Because the right pair of earrings doesn’t just complete the look, it becomes the look.',
    tone: 'lilac',
    icon: 'drop',
  },
  {
    slug: 'elan',
    name: 'Élan',
    image: '/images/instagram/DdReSlKig7-.jpg',
    tagline: 'Effortless. Elegant. Entirely you.',
    description:
      'For the woman who doesn’t need to try too hard to stand out. Delicate details, timeless charm and just the right touch of sparkle, in Muse Silver.',
    tone: 'silver',
    icon: 'jhumka',
  },
  {
    slug: 'amour-eclat',
    name: 'Amour Éclat',
    image: '/images/instagram/DdOgT2bCp_c.jpg',
    tagline: 'A little love, a lot of sparkle.',
    description:
      'A delicate heart necklace with matching sparkling heart earrings. A timeless symbol of love, elegance and femininity. Wear it for a special occasion, gift it to someone you love, or make everyday elegance your own.',
    tone: 'silver',
    icon: 'heart',
  },
  {
    slug: 'the-first-muse',
    name: 'The First Muse',
    image: '/images/instagram/Dc_XywyKAKE.jpg',
    tagline: 'A little silver. A lot of attitude.',
    description:
      'The piece that started it all. Long tassel earrings designed to move with you, catch the light, and make an entrance without saying a word.',
    tone: 'silver',
    icon: 'drop',
  },
  {
    slug: 'pearl-muse',
    name: 'Pearl Muse',
    image: '/images/instagram/DdTKIGuq8jH.jpg',
    tagline: 'A little pearl. A little sparkle. A whole lot of MUSE.',
    description: 'Made for the woman who inspires. Would you wear it every day or save it for special moments?',
    tone: 'lilac',
    icon: 'pearl',
  },
]

export const collectionBySlug = Object.fromEntries(collections.map((c) => [c.slug, c]))
