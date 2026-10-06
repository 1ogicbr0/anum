import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)
gsap.defaults({ ease: 'power3.out', duration: 0.8 })

if (import.meta.env.DEV) {
  window.gsap = gsap
  window.ScrollTrigger = ScrollTrigger
}

export { gsap, ScrollTrigger, SplitText }
