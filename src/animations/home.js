// Home-page animations, one signature per section so no two sections move alike.
// Every builder receives its <section> and may return a cleanup function.
import { gsap, ScrollTrigger, SplitText } from './gsap'

const q = (el, sel) => Array.from(el.querySelectorAll(sel))
const one = (el, sel) => el.querySelector(sel)
const enter = (trigger, start = 'top 82%') => ({ trigger, start, once: true })
const stay = 'transform,opacity,filter' // clear after entrance so CSS hovers work again

// Text effects ---------------------------------------------------------------
// chars rise out of a mask, with a little roll (hero)
function textRise(target, vars = {}) {
  const split = new SplitText(target, { type: 'words,chars', mask: 'words' })
  return gsap.from(split.chars, { yPercent: 110, rotation: 5, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.016, onComplete: () => split.revert(), ...vars })
}
// whole lines slide up from behind a mask (categories, videos, reviews)
function textLines(target, vars = {}) {
  const split = new SplitText(target, { type: 'lines', mask: 'lines' })
  return gsap.from(split.lines, { yPercent: 100, duration: 0.9, ease: 'power3.out', stagger: 0.1, onComplete: () => split.revert(), ...vars })
}
// words lift into place and cool from gold to plum (gifting)
function textGold(target, vars = {}) {
  const split = new SplitText(target, { type: 'words' })
  return gsap.from(split.words, { y: 22, opacity: 0, color: '#C9A24A', duration: 0.9, ease: 'power3.out', stagger: 0.09, onComplete: () => split.revert(), ...vars })
}
// words sharpen into focus (collections, instagram, review quotes)
function textBlur(target, vars = {}) {
  const split = new SplitText(target, { type: 'words' })
  return gsap.from(split.words, { opacity: 0, filter: 'blur(10px)', y: 10, duration: 0.9, ease: 'power2.out', stagger: 0.06, onComplete: () => split.revert(), ...vars })
}
// chars bounce in from the middle outwards (order band)
function textWave(target, vars = {}) {
  const split = new SplitText(target, { type: 'words,chars' })
  return gsap.from(split.chars, { y: 26, opacity: 0, duration: 0.7, ease: 'back.out(2.5)', stagger: { each: 0.02, from: 'center' }, onComplete: () => split.revert(), ...vars })
}
// words slide in from the left with a skew that settles (categories)
function textSkew(target, vars = {}) {
  const split = new SplitText(target, { type: 'words' })
  return gsap.from(split.words, { x: -34, skewX: 14, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, onComplete: () => split.revert(), ...vars })
}
// characters appear in a random order, like ink settling into a poem (collections)
function textInk(target, vars = {}) {
  const split = new SplitText(target, { type: 'words,chars' })
  return gsap.from(split.chars, { opacity: 0, scale: 1.3, filter: 'blur(4px)', duration: 0.5, ease: 'power2.out', stagger: { each: 0.03, from: 'random' }, onComplete: () => split.revert(), ...vars })
}
// words glide in from the right one after another, like frames on a strip (videos)
function textSlide(target, vars = {}) {
  const split = new SplitText(target, { type: 'words' })
  return gsap.from(split.words, { x: 44, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09, onComplete: () => split.revert(), ...vars })
}
// letters settle together (gold & silver)
function textTrack(target, vars = {}) {
  return gsap.from(target, { letterSpacing: '0.18em', opacity: 0, duration: 1.1, ease: 'power3.out', ...vars })
}
// chars appear one by one like an engraving (signet)
function textType(target, vars = {}) {
  const split = new SplitText(target, { type: 'words,chars' })
  return gsap.from(split.chars, { opacity: 0, duration: 0.01, stagger: 0.028, onComplete: () => split.revert(), ...vars })
}

// A SectionHeading, animated with the effect the section chose for its title.
function heading(el, effect, tl, at = 0) {
  const head = one(el, '[data-anim=heading]')
  if (!head) return
  const eyebrow = one(head, '.eyebrow')
  const title = head.querySelector('h1, h2, h3')
  const aside = one(head, 'p')
  const link = one(head, 'a')
  if (eyebrow) tl.from(eyebrow, { opacity: 0, x: -16, duration: 0.6 }, at)
  if (title) tl.add(effect(title), at + 0.1)
  if (aside) tl.from(aside, { opacity: 0, y: 14, duration: 0.7 }, at + 0.35)
  if (link) tl.from(link, { opacity: 0, x: 16, duration: 0.6, clearProps: 'all' }, at + 0.4)
}

// 1. Hero: masked headline, curtain-reveal photo, parallax layers, pointer tilt.
export function hero(el) {
  const main = one(el, '[data-anim=main]')
  const small = one(el, '[data-anim=small]')
  const card = one(el, '[data-anim=card]')
  const visual = one(el, '[data-anim=visual]')
  // If the welcome screen is up, hold the entrance until it lifts.
  const waiting = document.documentElement.dataset.loading === '1'
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, paused: waiting })
  const onReady = () => tl.play()
  if (waiting) window.addEventListener('muse:ready', onReady, { once: true })
  tl.from(one(el, '[data-anim=eyebrow]'), { opacity: 0, letterSpacing: '0.5em', duration: 1 }, 0)
    .add(textRise(one(el, '[data-anim=title]')), 0.1)
    .from(one(el, '[data-anim=sub]'), { y: 24, opacity: 0, duration: 0.8 }, 0.6)
    .from(q(el, '[data-anim=ctas] > *'), { y: 20, opacity: 0, duration: 0.7, stagger: 0.1, clearProps: 'all' }, 0.75)
    .from(q(el, '[data-anim=perks] > *'), { x: -14, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.95)
    .fromTo(main, { clipPath: 'inset(100% 0% 0% 0% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.4, ease: 'expo.out', clearProps: 'clipPath' }, 0.15)
    .fromTo(one(main, 'img'), { scale: 1.25, transition: 'none' }, { scale: 1, duration: 2, ease: 'expo.out', clearProps: 'all' }, 0.15)
    .from(small, { scale: 0.6, rotation: -6, opacity: 0, duration: 1, ease: 'back.out(1.4)' }, 0.75)
    .from(card, { x: 70, opacity: 0, duration: 0.9 }, 0.9)

  const scrub = { trigger: el, start: 'top top', end: 'bottom top', scrub: true }
  gsap.to(main, { yPercent: -8, ease: 'none', scrollTrigger: scrub })
  gsap.to(small, { yPercent: 14, ease: 'none', scrollTrigger: scrub })
  gsap.to(card, { yPercent: 10, ease: 'none', scrollTrigger: scrub })

  gsap.set(visual, { transformPerspective: 1100 })
  const rx = gsap.quickTo(visual, 'rotationX', { duration: 0.7, ease: 'power3' })
  const ry = gsap.quickTo(visual, 'rotationY', { duration: 0.7, ease: 'power3' })
  // The tilt is subtle and only while the page sits at the top: the moment the visitor
  // scrolls, the visual straightens and stays straight.
  const leave = () => {
    rx(0)
    ry(0)
  }
  const move = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return
    if (window.scrollY > 10) return
    const r = el.getBoundingClientRect()
    ry(((e.clientX - r.left) / r.width - 0.5) * 4)
    rx(-((e.clientY - r.top) / r.height - 0.5) * 3)
  }
  const onScroll = () => {
    if (window.scrollY > 10) leave()
  }
  el.addEventListener('pointermove', move)
  el.addEventListener('pointerleave', leave)
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => {
    el.removeEventListener('pointermove', move)
    el.removeEventListener('pointerleave', leave)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('muse:ready', onReady)
  }
}

// 2. Trust strip: icons spin in like coins; they wobble when hovered.
export function trust(el) {
  const items = q(el, '[data-anim=item]')
  const icons = q(el, '[data-anim=icon]')
  const tl = gsap.timeline({ scrollTrigger: enter(el, 'top 90%') })
  tl.from(items, { y: 30, opacity: 0, duration: 0.7, stagger: 0.09 })
    .from(icons, { rotation: -180, scale: 0.3, duration: 0.9, ease: 'back.out(2.2)', stagger: 0.09 }, 0.1)
  const offs = items.map((item, i) => {
    const icon = icons[i]
    const over = () => gsap.fromTo(icon, { rotation: -12 }, { rotation: 12, duration: 0.16, yoyo: true, repeat: 3, ease: 'sine.inOut', onComplete: () => gsap.to(icon, { rotation: 0, duration: 0.2 }) })
    item.addEventListener('pointerenter', over)
    return () => item.removeEventListener('pointerenter', over)
  })
  return () => offs.forEach((off) => off())
}

// 3. Marquee: the words lean with the scroll speed and straighten when it stops.
export function marquee(el) {
  const items = q(el, '[data-anim=item]')
  gsap.from(el, { opacity: 0, y: 20, duration: 1, scrollTrigger: enter(el, 'top 96%') })
  const setSkew = gsap.quickSetter(items, 'skewX', 'deg')
  const proxy = { skew: 0 }
  const clamp = gsap.utils.clamp(-14, 14)
  const st = ScrollTrigger.create({
    onUpdate: (self) => {
      const skew = clamp(self.getVelocity() / -140)
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew
        gsap.to(proxy, { skew: 0, duration: 0.9, ease: 'power3', overwrite: true, onUpdate: () => setSkew(proxy.skew) })
      }
    },
  })
  return () => st.kill()
}

// 4. Categories: the tiles fade up from the centre and each icon draws itself like a sketch,
// stroke by stroke, before its label appears; hovering redraws the icon.
export function categories(el) {
  const tiles = q(el, '[data-anim=tile]')
  const strokes = (tile) => q(tile, 'svg path, svg circle, svg ellipse, svg rect')
  const tl = gsap.timeline({ scrollTrigger: enter(el) })
  heading(el, textSkew, tl)
  tl.from(tiles, { y: 26, opacity: 0, scale: 0.94, duration: 0.7, stagger: { each: 0.06, from: 'center' }, clearProps: stay }, 0.15)
  tiles.forEach((tile, i) => {
    const at = 0.3 + i * 0.08
    tl.from(strokes(tile), { drawSVG: '0%', duration: 1.1, ease: 'power2.inOut', stagger: 0.1 }, at)
    tl.from(tile.querySelector('span'), { y: 10, opacity: 0, duration: 0.5 }, at + 0.7)
  })
  const offs = tiles.map((tile) => {
    const icon = tile.querySelector('svg')
    const over = () => {
      gsap.to(icon, { scale: 1.1, duration: 0.4, ease: 'back.out(2)' })
      gsap.fromTo(strokes(tile), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.7, ease: 'power2.inOut', stagger: 0.06 })
    }
    const out = () => gsap.to(icon, { scale: 1, duration: 0.4 })
    tile.addEventListener('pointerenter', over)
    tile.addEventListener('pointerleave', out)
    return () => {
      tile.removeEventListener('pointerenter', over)
      tile.removeEventListener('pointerleave', out)
    }
  })
  return () => offs.forEach((off) => off())
}

// 5. Collections: the title settles in like ink, the featured edit unveils from the bottom, the four
// cards unshutter diagonally one after another; cards lift and the arrow nudges on hover.
export function collections(el) {
  const featured = one(el, '[data-anim=featured]')
  const cards = q(el, '[data-anim=card]')
  const tl = gsap.timeline({ scrollTrigger: enter(el) })
  heading(el, textInk, tl)
  const fWrap = one(featured, '[data-anim=featuredImg]')
  tl.from(featured, { opacity: 0, duration: 0.6 }, 0.2)
    .fromTo(fWrap, { clipPath: 'inset(100% 0% 0% 0% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.2, ease: 'expo.out', clearProps: 'clipPath' }, 0.25)
    .fromTo(one(fWrap, 'img'), { scale: 1.2, transition: 'none' }, { scale: 1, duration: 1.8, ease: 'expo.out', clearProps: 'all' }, 0.25)
    .from(q(featured, '[data-anim=featuredBody] > *'), { y: 24, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.6)
  cards.forEach((card, i) => {
    const wrap = one(card, '[data-anim=cardImg]')
    const at = 0.5 + i * 0.12
    tl.from(card, { opacity: 0, y: 30, duration: 0.6, clearProps: stay }, at)
      .fromTo(wrap, { clipPath: 'inset(0% 100% 100% 0% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 1, ease: 'expo.out', clearProps: 'clipPath' }, at)
      .fromTo(one(wrap, 'img'), { scale: 1.2, transition: 'none' }, { scale: 1, duration: 1.4, ease: 'expo.out', clearProps: 'all' }, at)
      .from(q(card, '[data-anim=cardBody] > *'), { y: 12, opacity: 0, duration: 0.5, stagger: 0.08 }, at + 0.4)
  })
  const offs = [featured, ...cards].map((card) => {
    const arrow = card.querySelector('svg')
    const over = () => {
      gsap.to(card, { y: -6, duration: 0.4 })
      if (arrow) gsap.to(arrow, { x: 5, duration: 0.4, ease: 'back.out(2)' })
    }
    const out = () => {
      gsap.to(card, { y: 0, duration: 0.5 })
      if (arrow) gsap.to(arrow, { x: 0, duration: 0.4 })
    }
    card.addEventListener('pointerenter', over)
    card.addEventListener('pointerleave', out)
    return () => {
      card.removeEventListener('pointerenter', over)
      card.removeEventListener('pointerleave', out)
    }
  })
  return () => offs.forEach((off) => off())
}

// 6. Signet: the band irises open, the ring spins in and keeps floating, the title is "engraved" letter by letter.
export function signet(el) {
  const band = one(el, '[data-anim=band]')
  const ring = one(el, '[data-anim=ring]')
  const tl = gsap.timeline({ scrollTrigger: enter(el, 'top 75%') })
  tl.fromTo(band, { clipPath: 'circle(0% at 25% 50%)' }, { clipPath: 'circle(142% at 25% 50%)', duration: 1.4, ease: 'expo.inOut', clearProps: 'clipPath' })
    .from(ring, { rotation: -140, scale: 0.6, opacity: 0, duration: 1.4, ease: 'elastic.out(1, 0.55)' }, 0.5)
    .from(one(el, '[data-anim=eyebrow]'), { opacity: 0, x: -20, duration: 0.6 }, 0.8)
    .add(textType(one(el, '[data-anim=title]')), 0.9)
    .from(one(el, '[data-anim=text]'), { opacity: 0, y: 14, duration: 0.7 }, 1.3)
    .from(q(el, '[data-anim=list] li'), { x: -24, opacity: 0, duration: 0.5, stagger: 0.12 }, 1.4)
    .from(q(el, '[data-anim=list] svg'), { scale: 0, rotation: -90, duration: 0.5, ease: 'back.out(3)', stagger: 0.12 }, 1.45)
    .from(q(el, '[data-anim=try]'), { y: 16, opacity: 0, duration: 0.6 }, 1.6)
    .from(q(el, '[data-anim=ctas] > *'), { y: 16, opacity: 0, duration: 0.6, stagger: 0.1, clearProps: 'all' }, 1.75)
  tl.eventCallback('onComplete', () => gsap.to(ring, { y: -10, rotation: 3, duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
}

// 7. Gold & silver: the photo wipes open from its centre, the two finishes slide in straight from either side.
export function goldSilver(el) {
  const tl = gsap.timeline({ scrollTrigger: enter(el) })
  heading(el, textTrack, tl)
  tl.fromTo(one(el, '[data-anim=banner]'), { clipPath: 'inset(0% 50% 0% 50% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.3, ease: 'expo.inOut', clearProps: 'clipPath' }, 0.2)
    .from(one(el, '[data-anim=gold]'), { x: -70, opacity: 0, duration: 0.8, ease: 'power3.out', clearProps: stay }, 0.5)
    .from(one(el, '[data-anim=silver]'), { x: 70, opacity: 0, duration: 0.8, ease: 'power3.out', clearProps: stay }, 0.6)
  const offs = ['gold', 'silver'].map((k) => {
    const card = one(el, `[data-anim=${k}]`)
    const eyebrow = card.querySelector('span')
    const spacing = getComputedStyle(eyebrow).letterSpacing
    const over = () => {
      gsap.to(card, { y: -6, duration: 0.4 })
      gsap.to(eyebrow, { letterSpacing: '0.3em', duration: 0.5 })
    }
    const out = () => {
      gsap.to(card, { y: 0, duration: 0.5 })
      gsap.to(eyebrow, { letterSpacing: spacing, duration: 0.5 })
    }
    card.addEventListener('pointerenter', over)
    card.addEventListener('pointerleave', out)
    return () => {
      card.removeEventListener('pointerenter', over)
      card.removeEventListener('pointerleave', out)
    }
  })
  return () => offs.forEach((off) => off())
}

// 8. Gifting: the title lifts in and cools from gold to plum, the chips file in from the left, each
// card's photo is unveiled from the top like a lid lifting, then the photos drift gently; cards lift on hover.
export function gifting(el) {
  const cards = q(el, '[data-anim=card]')
  const tl = gsap.timeline({ scrollTrigger: enter(el) })
  heading(el, textGold, tl)
  tl.from(q(el, '[data-anim=chips] > *'), { x: -18, opacity: 0, duration: 0.5, stagger: 0.07, clearProps: 'all' }, 0.3)
  cards.forEach((card, i) => {
    const wrap = one(card, '[data-anim=img]')
    const at = 0.45 + i * 0.15
    tl.from(card, { opacity: 0, y: 24, duration: 0.6, clearProps: stay }, at)
      .fromTo(wrap, { clipPath: 'inset(0% 0% 100% 0% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 1, ease: 'expo.out', clearProps: 'clipPath' }, at)
      .fromTo(one(wrap, 'img'), { scale: 1.15, transition: 'none' }, { scale: 1, duration: 1.4, ease: 'expo.out', clearProps: 'all' }, at)
      .from(q(card, '[data-anim=body] > *'), { y: 12, opacity: 0, duration: 0.5, stagger: 0.08 }, at + 0.35)
  })
  tl.eventCallback('onComplete', () => {
    q(el, '[data-anim=img]').forEach((img, i) => gsap.to(img, { y: -6, duration: 2.8 + i * 0.4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.5 }))
  })
  const offs = cards.map((card) => {
    const over = () => gsap.to(card, { y: -6, duration: 0.4 })
    const out = () => gsap.to(card, { y: 0, duration: 0.5 })
    card.addEventListener('pointerenter', over)
    card.addEventListener('pointerleave', out)
    return () => {
      card.removeEventListener('pointerenter', over)
      card.removeEventListener('pointerleave', out)
    }
  })
  return () => offs.forEach((off) => off())
}

// 9. Video strip: the title glides in word by word, then the clips roll in from the right like a film
// strip, each poster easing out of a slight zoom as its play button pops.
export function videoStrip(el) {
  const items = q(el, '[data-anim=scroller] > *')
  const tl = gsap.timeline({ scrollTrigger: enter(el) })
  heading(el, textSlide, tl)
  tl.from(items, { x: 160, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.07, clearProps: stay }, 0.2)
    .fromTo(q(el, '[data-anim=scroller] video'), { scale: 1.15 }, { scale: 1, duration: 1.4, ease: 'expo.out', stagger: 0.07, clearProps: 'transform' }, 0.25)
    .from(q(el, '[data-anim=scroller] button[aria-label^="Play"]'), { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2.5)', stagger: 0.07, clearProps: 'all' }, 0.6)
}

// 10. Reviews: cards are tossed onto the table with alternating spin; each quote sharpens into focus.
export function reviews(el) {
  const cards = q(el, '[data-anim=card]')
  const tl = gsap.timeline({ scrollTrigger: enter(el) })
  heading(el, textLines, tl)
  tl.from(cards, { y: 90, rotation: (i) => (i % 2 ? 7 : -7), opacity: 0, transformOrigin: '50% 100%', duration: 0.9, ease: 'back.out(1.2)', stagger: 0.1, clearProps: stay }, 0.2)
  cards.forEach((card, i) => {
    const quote = card.querySelector('blockquote')
    if (quote) tl.add(textBlur(quote, { stagger: 0.03, duration: 0.6 }), 0.5 + i * 0.1)
  })
  tl.from(one(el, '[data-anim=storiesHead]'), { opacity: 0, x: -24, duration: 0.7 }, 0.9)
    .from(q(el, '[data-anim=storiesRow] > *'), { y: 30, opacity: 0, duration: 0.7, stagger: 0.08, clearProps: stay }, 1)
}

// 11. Instagram: the avatar spins in, the handle sharpens, tiles bloom outwards from the centre of the grid.
export function instagram(el) {
  const tiles = q(el, '[data-anim=tile]')
  const tl = gsap.timeline({ scrollTrigger: enter(el) })
  tl.from(one(el, '[data-anim=avatar]'), { rotation: 360, scale: 0, duration: 1, ease: 'back.out(1.6)' }, 0)
    .from(one(el, '[data-anim=eyebrow]'), { opacity: 0, x: -14, duration: 0.6 }, 0)
    .add(textBlur(one(el, '[data-anim=handle]'), { stagger: 0.1 }), 0.2)
    .from(one(el, '[data-anim=follow]'), { opacity: 0, x: 20, duration: 0.6, clearProps: 'all' }, 0.3)
    .from(tiles, { scale: 0.8, opacity: 0, filter: 'blur(10px)', duration: 0.8, stagger: { each: 0.06, grid: 'auto', from: 'center' }, clearProps: stay }, 0.3)
}

// 12. Order band: the band settles in, the headline ripples out from its middle, the button glows.
export function orderCta(el) {
  const band = one(el, '[data-anim=band]')
  const tl = gsap.timeline({ scrollTrigger: enter(el, 'top 85%') })
  tl.from(band, { scale: 0.94, opacity: 0, duration: 1 })
    .from(one(el, '[data-anim=eyebrow]'), { opacity: 0, y: 10, duration: 0.5 }, 0.3)
    .add(textWave(one(el, '[data-anim=title]')), 0.35)
    .from(one(el, '[data-anim=text]'), { opacity: 0, y: 14, duration: 0.7 }, 0.8)
    .from(q(el, '[data-anim=actions] > *'), { opacity: 0, y: 16, duration: 0.6, stagger: 0.1, clearProps: 'all' }, 0.9)
  const btn = one(el, '[data-anim=actions] button, [data-anim=actions] a')
  if (!btn) return undefined
  const glow = gsap.fromTo(btn, { boxShadow: '0 0 0 0 rgba(201, 162, 74, 0.55)' }, { boxShadow: '0 0 0 18px rgba(201, 162, 74, 0)', duration: 1.6, repeat: -1, ease: 'power2.out', paused: true })
  const st = ScrollTrigger.create({ trigger: el, start: 'top 90%', end: 'bottom top', onToggle: (self) => (self.isActive ? glow.play() : glow.pause()) })
  return () => {
    st.kill()
    glow.kill()
  }
}
