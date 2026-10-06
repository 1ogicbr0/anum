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
// words flip up on the x axis (gifting)
function textFlip(target, vars = {}) {
  const split = new SplitText(target, { type: 'words' })
  gsap.set(target, { perspective: 600 })
  return gsap.from(split.words, { rotationX: -90, opacity: 0, transformOrigin: '50% 100%', duration: 0.8, ease: 'back.out(1.4)', stagger: 0.07, onComplete: () => split.revert(), ...vars })
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

// Pointer tilt for a card (perspective is set lazily so entrance clearProps cannot wipe it).
function tilt(card, amount = 6) {
  let ready = false
  const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' })
  const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' })
  const move = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return
    if (!ready) {
      gsap.set(card, { transformPerspective: 900 })
      ready = true
    }
    const r = card.getBoundingClientRect()
    ry(((e.clientX - r.left) / r.width - 0.5) * amount * 2)
    rx(-((e.clientY - r.top) / r.height - 0.5) * amount * 2)
  }
  const leave = () => {
    rx(0)
    ry(0)
  }
  card.addEventListener('pointermove', move)
  card.addEventListener('pointerleave', leave)
  return () => {
    card.removeEventListener('pointermove', move)
    card.removeEventListener('pointerleave', leave)
  }
}

// 1. Hero: masked headline, curtain-reveal photo, parallax layers, pointer tilt.
export function hero(el) {
  const main = one(el, '[data-anim=main]')
  const small = one(el, '[data-anim=small]')
  const card = one(el, '[data-anim=card]')
  const visual = one(el, '[data-anim=visual]')
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
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

// 4. Categories: tiles flip down into place like cards on a table; icons lift and turn on hover.
export function categories(el) {
  const grid = one(el, '[data-anim=grid]')
  const tiles = q(el, '[data-anim=tile]')
  gsap.set(grid, { perspective: 900 })
  const tl = gsap.timeline({ scrollTrigger: enter(el) })
  heading(el, textLines, tl)
  tl.from(tiles, { rotationX: -75, y: 40, opacity: 0, transformOrigin: '50% 0%', duration: 0.9, stagger: 0.07, clearProps: stay }, 0.2)
  const offs = tiles.map((tile) => {
    const icon = tile.querySelector('svg')
    const over = () => gsap.to(icon, { rotation: 14, y: -6, scale: 1.12, duration: 0.45, ease: 'back.out(2)' })
    const out = () => gsap.to(icon, { rotation: 0, y: 0, scale: 1, duration: 0.5 })
    tile.addEventListener('pointerenter', over)
    tile.addEventListener('pointerleave', out)
    return () => {
      tile.removeEventListener('pointerenter', over)
      tile.removeEventListener('pointerleave', out)
    }
  })
  return () => offs.forEach((off) => off())
}

// 5. Collections: the featured edit swings in from the left, the others from the right; cards tilt under the pointer.
export function collections(el) {
  const featured = one(el, '[data-anim=featured]')
  const cards = q(el, '[data-anim=card]')
  const tl = gsap.timeline({ scrollTrigger: enter(el) })
  heading(el, textBlur, tl)
  tl.from(featured, { x: -80, rotation: -3, opacity: 0, duration: 1.1, clearProps: stay }, 0.2)
    .fromTo(one(featured, 'img'), { scale: 1.2, transition: 'none' }, { scale: 1, duration: 1.6, ease: 'expo.out', clearProps: 'all' }, 0.2)
    .from(cards, { x: 80, rotation: 3, opacity: 0, duration: 0.9, stagger: 0.1, clearProps: stay }, 0.45)
  const offs = [featured, ...cards].map((card) => tilt(card, 6))
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
    .from(q(el, '[data-anim=ctas] > *'), { y: 16, opacity: 0, duration: 0.6, stagger: 0.1, clearProps: 'all' }, 1.7)
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

// 8. Gifting: chips pop in at random, the three cards are set down with a tilt, then the photos float.
export function gifting(el) {
  const tl = gsap.timeline({ scrollTrigger: enter(el) })
  heading(el, textFlip, tl)
  tl.from(q(el, '[data-anim=chips] > *'), { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2.5)', stagger: { each: 0.06, from: 'random' }, clearProps: 'all' }, 0.3)
    .from(q(el, '[data-anim=card]'), { y: 70, opacity: 0, rotation: (i) => (i % 2 ? 4 : -4), transformOrigin: '50% 100%', duration: 1, stagger: 0.12, clearProps: stay }, 0.5)
  tl.eventCallback('onComplete', () => {
    q(el, '[data-anim=img]').forEach((img, i) => gsap.to(img, { y: -8, duration: 2.6 + i * 0.4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.5 }))
  })
}

// 9. Video strip: the clips are dealt out of a stack, fanning into the row.
export function videoStrip(el) {
  const items = q(el, '[data-anim=scroller] > *')
  const tl = gsap.timeline({ scrollTrigger: enter(el) })
  heading(el, textLines, tl)
  tl.from(items, { x: (i) => -i * 40, rotation: (i) => (i - items.length / 2) * 4, scale: 0.85, opacity: 0, transformOrigin: '50% 120%', duration: 1.1, stagger: 0.05, clearProps: stay }, 0.2)
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
