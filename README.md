# MUSE by Anum — website

React + Vite + SCSS storefront for [@musebyanum](https://www.instagram.com/musebyanum/), an everyday
fine-jewellery brand in Pakistan. Built from the Direction A design on the
[Claude Design canvas](https://claude.ai/artifact/Nuiiqd4Mi2aj1CkhYhV9vs) and the
research in `BRAND-ANALYSIS.md`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Structure

```
src/
  styles/        _tokens.scss (palette, type, spacing) · _mixins.scss · _base.scss · main.scss
  data/          brand.js · categories.js · collections.js · products.js · instagram.js · reviews.js
  components/
    ui/          Icon · Button · ProductImage · SectionHeading · Wordmark · FinishDots
    layout/      AnnouncementBar · Header · Footer · Layout · ScrollToTop
    home/        Hero · TrustStrip · Categories · Collections · SignetFeature · GoldSilver · Gifting · Reviews · InstagramFeed · OrderCta
    shop/        ProductCard · ProductGrid · Filters
    product/     RingPreview (live engraving illustration)
  pages/         Home · Shop · Collections · Collection · Product · RingSizeGuide · About · NotFound
  hooks/         useWishlist (localStorage) · useDocumentTitle
  utils/         order.js (WhatsApp / Instagram DM order links, price formatting)
```

Styling: SCSS modules per component. Tokens and mixins are injected into every `.scss` file by
`vite.config.js` (`additionalData`), so `$plum`, `@include mq(md)` etc. work without an `@use`.

## Motion

`src/styles/_motion.scss` + `RevealObserver`: add `data-reveal` to any element to fade it up when it
scrolls into view, or `data-reveal="stagger"` to a container to reveal its children one by one
(works for elements added later, such as filtered product grids). Pages fade in on route change,
the hero has its own entrance, cards zoom their photo on hover, the wishlist heart pops, the header
gains a shadow once scrolled, a brand marquee runs under the trust strip, and the ring preview
carries a light sweep. All of it is disabled under `prefers-reduced-motion`.

Photos fill their frames edge to edge; frames are 4:5 to match the Instagram posts so little is
cropped (`fit="contain"` on `ProductImage` letterboxes instead).

## Photography

`public/images/instagram/` holds 25 post photos, the profile picture and a frame from the MUSE
Charm reel, all captured from @musebyanum's own posts on 7 Oct 2026 (named by Instagram
shortcode). `src/data/products.js` maps each product to its photo(s) and links back to the
source post; `src/data/brand.js` → `images` picks the hero, banner and gifting shots.
Captures are roughly 950–1100 px on the long side. Replace any of them with originals from
the client by overwriting the file with the same name.

## What the client still needs to supply

Search the code for `[` placeholders. The main ones:

- `src/data/brand.js` → `whatsappNumber` (digits with country code). Until it is set, every
  order button opens an Instagram DM. Also `email`, delivery time and charges.
- `src/data/products.js` → `price` (currently `null`, shown as "DM for price"). Six Lilac Éclat
  rings and the four White Glow pendants share one group photo each; individual shots would help.
- `src/data/reviews.js` → real reviews from the "Muse Reviews" highlight.
- Logo files (the wordmark is set in Nunito as a stand-in) and confirmation of the lilac/purple hexes.

## Ordering flow

There is no cart. The product page builds a prefilled message (piece, finish, engraving,
size) and opens WhatsApp when a number is configured, otherwise Instagram DM.
