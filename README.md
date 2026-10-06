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


## Highlight videos and carousel photos (added 7 Oct 2026)

- **Story clips** — every story in the nine Instagram highlights (23 videos, 4 photos) was saved while
  logged in to Instagram and lives in `public/videos/highlights` (mp4 + poster jpg) and
  `public/images/stories`. They are listed in `src/data/videos.js` (`clips`, `storyImages`,
  `highlights`) and played by `src/components/videos/HighlightClip.jsx`: tap to play with sound,
  one clip at a time, nothing downloads until tapped. Note that most highlight stories are photos that
  Instagram exported as video with a music track, so the frame does not change while they play;
  clips with real footage carry `motion: true` and are labelled "Video" instead of "Photo + music". They appear on the home page strip, the
  Videos page (with the reels), the Reviews section (Muse Reviews / Muse PR stories) and on product
  pages that have a `video` field ("See it in motion").
- **Every carousel slide** — all 25 posts were re-fetched at full resolution (1080px), including every
  slide of the 12 carousels (`public/images/instagram/<code>-<n>.jpg`; `<code>.jpg` is slide 1).
  Product `gallery` arrays now use the individual slides, so each Lilac Éclat ring, each Starlit
  Grace earring and each Élan jhumka has its own photo. Pieces that only existed as slides or stories
  were added to the catalogue: Pavé Solitaire Ring, Crystal Wings Ring, three Starlit Grace styles,
  two Élan jhumkas, Pearl Choker Heart Set and Pearl Blossom Set (35 products).
- The Heart Muse Anklet shows PKR 1,299, the one price the brand has published (anklets highlight).

## Home-page animations (GSAP)

The home page is animated with GSAP (ScrollTrigger + SplitText, `src/animations/home.js`), one
signature per section so no two sections move alike:

| Section | Entrance | Hover / live |
| --- | --- | --- |
| Hero | headline characters rise out of a mask, photo curtain-reveals, layers parallax on scroll | the visual tilts towards the pointer |
| Trust strip | icons spin in like coins | icons wobble |
| Marquee | words lean with scroll speed and straighten when it stops | — |
| Categories | tiles fade up from the centre, each icon draws itself stroke by stroke, title words slide in with a skew | icon redraws and scales |
| Collections | title settles in like ink, featured photo unveils from the bottom, cards unshutter diagonally | cards lift, arrow nudges |
| Signet | band irises open, ring spins in (elastic) and keeps floating, title engraves letter by letter | — |
| Gold & silver | photo wipes open from its centre, finishes slide in from either side | card lifts, eyebrow letters spread |
| Gifting | title words lift and cool from gold to plum, chips file in, each photo is unveiled like a lid lifting | photos drift, cards lift |
| Video strip | title words glide in, clips roll in from the right like a film strip, play buttons pop | — |
| Reviews | cards tossed down with alternating spin, quotes sharpen into focus | — |
| Instagram | avatar spins in, tiles bloom from the centre of the grid | — |
| Order band | headline ripples out from its middle, button glows while in view | — |

`useSectionAnimation(ref, builder)` hands a section to GSAP: it strips the CSS `data-reveal`
attributes inside it (so nothing animates twice), runs the builder inside `gsap.matchMedia()` for
`prefers-reduced-motion: no-preference` only, and reverts everything when the section unmounts.
Entrance tweens end with `clearProps` so the existing CSS hovers keep working. Other pages still
use the lighter CSS `data-reveal` system.

The home signet section has a "Try your initials" box (up to three letters, letters only) that
engraves the ring preview beside it live; "Design your ring" carries the letters to the product page
as `?initials=`, where the engraving field starts with them.

## Dark theme

Colours that change between themes are CSS variables defined in `src/styles/_base.scss` (`:root`
for light, `:root[data-theme='dark']` for dark) and exposed to SCSS as tokens: `$bg`, `$surface`,
`$ink`, `$muted`, `$link`, `$gold-text`, `$lilac-100/200/300`, `$line`, the satin gradient and the
shadows. `$plum`, `$purple`, the golds and `$white` are fixed in both themes (dark bands, buttons,
text on dark). `ThemeToggle` in the header flips `data-theme` on `<html>` and stores the choice in
localStorage (`muse-theme`); a small inline script in `index.html` applies the saved or system
preference before first paint so there is no flash.

## Welcome screen

`Preloader` (in `Layout`) covers the first paint with a plum curtain for about four seconds: the
wordmark rises letter by letter, "BY ANUM" settles, a gold line draws, the tagline appears, then the
curtain lifts. It sets `data-loading` on `<html>` and fires `muse:ready` when it is gone, which the
hero animation waits for. Visitors with reduced motion never see it.

## Motion

`src/styles/_motion.scss` + `RevealObserver`: add `data-reveal` to any element to fade it up when it
scrolls into view, or `data-reveal="stagger"` to a container to reveal its children one by one
(works for elements added later, such as filtered product grids). Pages fade in on route change,
the hero has its own entrance, cards zoom their photo on hover, the wishlist heart pops, the header
gains a shadow once scrolled, a brand marquee runs under the trust strip, and the ring preview
carries a light sweep. All of it is disabled under `prefers-reduced-motion`.

Photos fill their frames edge to edge; frames are 4:5 to match the Instagram posts so little is
cropped (`fit="contain"` on `ProductImage` letterboxes instead).

## Videos and reviews

`src/data/videos.js` lists the brand's public reels, categorised to mirror the Instagram highlights
(Meet MUSE, Earrings, Bracelets, Gifting & MUSE Charm, Reviews). They play through Instagram's
embed on the home "Watch" strip and the `/videos` page, so no video is copied off Instagram.
The highlights themselves are only served to logged-in users and cannot be embedded.

`src/data/reviews.js` quotes real customer comments from the posts (handle + comment as written),
each linking to its post.

## Ordering messages

Instagram DM links cannot carry text, so pressing an Instagram order button copies the scenario's
message (synchronously, inside the tap) and opens `OrderSheet`: the message is shown, already on the
clipboard, with "Open Instagram DM" and "Copy again" buttons. When `brand.whatsappNumber` is set the
button becomes a plain WhatsApp link with the text prefilled. `vercel.json` rewrites every path to
`index.html` so React Router deep links work on Vercel.

Every order button is an `OrderButton` with a `scenario` (hero, product, category, collection,
wishlist, gifting, size-help) so the message already says what the customer was looking at.
WhatsApp receives the text in the link; for Instagram the sheet described above takes over, and the
product page also shows a preview of the message under the button.

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
- Logo files (the wordmark is set in Nunito as a stand-in) and confirmation of the lilac/purple hexes.

## Ordering flow

There is no cart. The product page builds a prefilled message (piece, finish, engraving,
size) and opens WhatsApp when a number is configured, otherwise Instagram DM.
