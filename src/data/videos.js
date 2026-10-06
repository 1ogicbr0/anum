// Reels from @musebyanum (10 public reels as of 7 Oct 2026), grouped to mirror the
// Instagram highlights. The highlights themselves (stories) are only visible to
// logged-in Instagram users and cannot be embedded, so the reels stand in for them.
// Videos play through Instagram's embed; nothing is copied off Instagram.

const reel = (code) => `https://www.instagram.com/reel/${code}/`

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
]

export const videoCategoryBySlug = Object.fromEntries(videoCategories.map((c) => [c.slug, c]))

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
