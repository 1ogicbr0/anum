// Video on the site comes from two places on @musebyanum:
//  1. clips: story clips saved from the nine Instagram highlights (public/videos/highlights,
//     with a poster frame each). Highlights are only visible to logged-in Instagram users,
//     so these are served from the site itself.
//  2. videos: the public reels, played through Instagram's embed so they stay on Instagram.
// Both are grouped with the same categories, which mirror the highlight names.

const reel = (code) => `https://www.instagram.com/reel/${code}/`
const clipSrc = (slug) => `/videos/highlights/${slug}.mp4`
const clipPoster = (slug) => `/videos/highlights/${slug}.jpg`

export const videoCategories = [
  { slug: 'brand', name: 'Meet MUSE' },
  { slug: 'earrings', name: 'Muse Earrings' },
  { slug: 'rings', name: 'Muse Rings' },
  { slug: 'sets', name: 'Muse Sets' },
  { slug: 'bracelets', name: 'Muse Bracelets' },
  { slug: 'handchains', name: 'Muse Handchains' },
  { slug: 'pendants', name: 'Muse Pendants' },
  { slug: 'anklets', name: 'Muse Anklets' },
  { slug: 'gifting', name: 'Gifting & MUSE Charm' },
  { slug: 'reviews', name: 'Muse Reviews' },
  { slug: 'pr', name: 'Muse PR' },
]

export const videoCategoryBySlug = Object.fromEntries(videoCategories.map((c) => [c.slug, c]))

// The nine highlights on the profile, with their Instagram ids.
export const highlights = [
  { slug: 'rings', name: 'Muse Rings', id: '18387654034167227' },
  { slug: 'earrings', name: 'Muse Earrings', id: '17945123727322771' },
  { slug: 'sets', name: 'Muse Sets', id: '18118573736477417' },
  { slug: 'bracelets', name: 'Muse Bracelets', id: '18079361666709299' },
  { slug: 'handchains', name: 'Muse Handchains', id: '18104487368621461' },
  { slug: 'pendants', name: 'Muse Pendants', id: '18164605393417888' },
  { slug: 'anklets', name: 'Muse Anklets', id: '18054818972589580' },
  { slug: 'reviews', name: 'Muse Reviews', id: '18048410339813445' },
  { slug: 'pr', name: 'Muse PR', id: '17924401038424986' },
].map((h) => ({ ...h, url: `https://www.instagram.com/stories/highlights/${h.id}/` }))

export const highlightBySlug = Object.fromEntries(highlights.map((h) => [h.slug, h]))

const clip = (slug, highlight, duration, date, title, extra = {}) => ({
  slug,
  highlight,
  category: extra.category ?? highlight,
  src: clipSrc(slug),
  poster: clipPoster(slug),
  duration,
  date,
  title,
  ...extra,
})

// Every story in the highlights, in highlight order, oldest first within each.
export const clips = [
  clip('rings-01', 'rings', 9, '12 Sept 2026', 'Lilac Éclat: seven rings, seven moods', { featured: true }),
  clip('rings-02', 'rings', 15, '15 Sept 2026', 'Pearl Muse Ring, with white blooms', { featured: true }),
  clip('rings-03', 'rings', 8, '19 Sept 2026', 'The Crystal Wings Ring, up close'),
  clip('rings-04', 'rings', 8, '28 Sept 2026', 'Last piece left: stacked gold rings'),
  clip('earrings-01', 'earrings', 9, '14 Sept 2026', 'Starlit hoops in the mirror', { featured: true }),
  clip('earrings-02', 'earrings', 8, '21 Sept 2026', 'Guess the price: Long Tassel Earrings'),
  clip('earrings-03', 'earrings', 8, '28 Sept 2026', 'Golden Petal studs, now in the shop'),
  clip('sets-01', 'sets', 9, '13 Sept 2026', 'Amour Éclat heart set in Muse Silver', { featured: true }),
  clip('sets-03', 'sets', 8, '16 Sept 2026', 'The Pearl Choker Heart Set'),
  clip('sets-05', 'sets', 8, '22 Sept 2026', 'Floral Duo: mirror check'),
  clip('sets-06', 'sets', 15, '22 Sept 2026', 'Floral Duo on the stand', { featured: true }),
  clip('sets-07', 'sets', 8, '2 Oct 2026', 'Pearl Blossom Set, boxed and ready'),
  clip('bracelets-01', 'bracelets', 9, '15 Sept 2026', 'Muse Gold Bracelet on the wrist', { featured: true }),
  clip('bracelets-02', 'bracelets', 8, '19 Sept 2026', 'Crystal Tennis Bracelet'),
  clip('bracelets-03', 'bracelets', 8, '27 Sept 2026', 'Colour-stone bracelets: place your order'),
  clip('handchains-01', 'handchains', 15, '18 Sept 2026', 'Isla hand chain, cocktail hour', { featured: true }),
  clip('pendants-01', 'pendants', 9, '14 Sept 2026', 'White Glow pendants on driftwood', { featured: true }),
  clip('anklets-01', 'anklets', 9, '14 Sept 2026', 'Heart Muse Anklet, just in at PKR 1,299'),
  clip('reviews-01', 'reviews', 20, '30 Sept 2026', 'Quality 10/10. Loving it. Highly recommended.', { by: '@irhaismyname', featured: true }),
  clip('reviews-03', 'reviews', 20, '2 Oct 2026', 'Everyone is asking me about this ring', { by: '@shanzey_dabeer' }),
  clip('pr-01', 'pr', 60, '27 Sept 2026', 'Gift for my sister: a MUSE unboxing', { by: '@shanzae.zia' }),
  clip('pr-02', 'pr', 10, '5 Oct 2026', 'The MUSE box arrives', { by: '@maheen__rahim' }),
  clip('pr-03', 'pr', 5, '5 Oct 2026', 'Such lovely jewellery, perfect for every look', { by: '@maheen__rahim' }),
]

export const clipBySlug = Object.fromEntries(clips.map((c) => [c.slug, c]))
export const featuredClips = clips.filter((c) => c.featured)

// Photo stories from the same highlights (public/images/stories).
export const storyImages = [
  { slug: 'reviews-02', highlight: 'reviews', src: '/images/stories/reviews-02.jpg', date: '1 Oct 2026', by: '@saher.blogs', title: 'Tennis bracelets, as worn by @saher.blogs' },
  { slug: 'sets-02', highlight: 'sets', src: '/images/stories/sets-02.jpg', date: '13 Sept 2026', title: 'Amour Éclat heart set in Muse Gold' },
  { slug: 'sets-04', highlight: 'sets', src: '/images/stories/sets-04.jpg', date: '21 Sept 2026', title: 'The Duo Set' },
  { slug: 'earrings-04', highlight: 'earrings', src: '/images/stories/earrings-04.jpg', date: '1 Oct 2026', title: 'Three-Bloom studs, available now' },
]

export const storyImageBySlug = Object.fromEntries(storyImages.map((s) => [s.slug, s]))

// Public reels (10 as of 7 Oct 2026).
export const videos = [
  { code: 'Dc3TnkqqJdc', url: reel('Dc3TnkqqJdc'), date: '4 Sep 2026', category: 'brand', featured: true, title: 'Meet MUSE: jewellery for the woman who inspires', caption: 'Created for the moments when you want to feel a little more you — confident, feminine, effortless. Your story. Your style. Your MUSE.' },
  { code: 'DdCNv2XqiKL', url: reel('DdCNv2XqiKL'), date: '8 Sep 2026', category: 'earrings', featured: true, title: 'The First Muse: the Long Tassel Earrings on Rabia Faisal', caption: 'A little silver. A lot of attitude. Designed to move with you, catch the light, and make an entrance without saying a word.' },
  { code: 'Ddl-6h8qINJ', url: reel('Ddl-6h8qINJ'), date: '22 Sep 2026', category: 'gifting', featured: true, title: 'Add a MUSE Charm to the gift box', caption: 'Because every gift deserves a little MUSE magic. Turn a beautiful present into a keepsake they will love.' },
  { code: 'DdE8xn3KeZs', url: reel('DdE8xn3KeZs'), date: '9 Sep 2026', category: 'bracelets', featured: true, title: 'Meet your new everyday obsession: the gold bracelet', caption: 'Some things don’t need an introduction. They simply need to be noticed.' },
  { code: 'Dd-zFjHKUAB', url: reel('Dd-zFjHKUAB'), date: '1 Oct 2026', category: 'earrings', title: 'Three little blooms: pearl and gemstone studs', caption: 'Delicate pearls meet luminous gemstones in a graceful floral silhouette. Wear a little poetry.' },
  { code: 'Dd-zKLFK6pq', url: reel('Dd-zKLFK6pq'), date: '1 Oct 2026', category: 'earrings', title: 'Three little blooms, up close', caption: 'An effortless touch of colour, femininity and quiet luxury.' },
  { code: 'DdyjzVrzqq0', url: reel('DdyjzVrzqq0'), date: '27 Sep 2026', category: 'reviews', by: '@shanzae.zia', title: 'A sister’s gift from MUSE, unboxed', caption: 'Gift for my sister from Gia. Comment “Behancode” to get my discount code.' },
  { code: 'Ddl-lCFKq5e', url: reel('Ddl-lCFKq5e'), date: '22 Sep 2026', category: 'gifting', title: 'The MUSE Charm, part two', caption: 'Perfect for gifting. A cute little keepsake. Add it to your MusebyAnum order.' },
  { code: 'Dc3mZjQqF3W', url: reel('Dc3mZjQqF3W'), date: '4 Sep 2026', category: 'brand', title: 'Welcome to MUSE', caption: 'Jewellery isn’t just something you wear. It’s something you become.' },
  { code: 'Dc3wtRtKwKD', url: reel('Dc3wtRtKwKD'), date: '4 Sep 2026', category: 'brand', title: 'The first MUSE collection is almost here', caption: 'Want an early look? DM MUSE for a preview before the collection drops.' },
]

export const featuredVideos = videos.filter((v) => v.featured)
