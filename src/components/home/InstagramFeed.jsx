import { useRef } from 'react'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { instagram } from '@/animations/home'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import ProductImage from '@/components/ui/ProductImage'
import { brand } from '@/data/brand'
import { instagramPosts } from '@/data/instagram'
import s from './InstagramFeed.module.scss'

export default function InstagramFeed() {
  const ref = useRef(null)
  useSectionAnimation(ref, instagram)
  return (
    <section ref={ref} className={s.section} id="instagram" aria-label="Instagram">
      <div className={s.inner}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 36 }} data-reveal>
          <div>
            <div className="eyebrow" data-anim="eyebrow">Follow along</div>
            <h2 className="display" style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 14 }}>
              {brand.images.avatar && <img data-anim="avatar" src={brand.images.avatar} alt="" width={52} height={52} style={{ borderRadius: 999, border: '2px solid #E3D9F2' }} />}
              <span data-anim="handle">@{brand.handle}</span>
            </h2>
          </div>
          <Button href={brand.instagramUrl} variant="outline" data-anim="follow">
            <Icon name="instagram" /> Follow on Instagram
          </Button>
        </div>
        <div className={s.grid} data-reveal="stagger">
          {instagramPosts.map((p) => (
            <a key={p.url} href={p.url} className={s.tile} data-anim="tile" target="_blank" rel="noopener noreferrer" aria-label={`Instagram post from ${p.date}: ${p.caption}`}>
              <ProductImage className={s.img} src={p.image} alt={p.caption} tone={p.tone} icon={p.icon} ratio="4 / 5" iconSize={44} label={p.reel ? '[Instagram reel]' : '[Instagram post]'} />
              {p.reel && <span className={s.reel}>Reel</span>}
              <span className={s.caption}>
                <span className={s.date}>{p.date}</span>
                {p.caption}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
