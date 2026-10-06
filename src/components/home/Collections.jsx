import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import ProductImage from '@/components/ui/ProductImage'
import SectionHeading from '@/components/ui/SectionHeading'
import { collections } from '@/data/collections'
import { brand } from '@/data/brand'
import s from './Collections.module.scss'

const subtitles = {
  'white-glow': 'Seven mother-of-pearl pendants',
  'starlit-grace': 'Pearl statement earrings',
  elan: 'Jhumka, in Muse Silver',
  'amour-eclat': 'Heart pendant + stud set',
}

export default function Collections() {
  const featured = collections.find((c) => c.slug === 'lilac-eclat')
  const rest = collections.filter((c) => ['white-glow', 'starlit-grace', 'elan', 'amour-eclat'].includes(c.slug))

  return (
    <section className={s.section} id="collections" aria-label="Collections">
      <div className={s.inner}>
        <SectionHeading
          eyebrow="The collections"
          title={brand.lines.poetry}
          aside="Five edits, one mood: timeless gold, a little sparkle and the dreamy lilac that is unmistakably Muse."
        />
        <div className={s.grid} data-reveal="stagger">
          <Link to={`/collections/${featured.slug}`} className={s.featured}>
            <ProductImage className={s.featuredImg} src={featured.image} alt={featured.name} ratio="1 / 1" />
            <div className={s.featuredBody}>
              <span className="eyebrow">Featured collection</span>
              <h3 className={s.featuredTitle}>{featured.name}</h3>
              <p className={s.featuredText}>{featured.description}</p>
              <span className={s.more}>
                Explore the six rings <Icon name="arrow" size={18} />
              </span>
            </div>
          </Link>

          {rest.map((c) => (
            <Link key={c.slug} to={`/collections/${c.slug}`} className={s.card}>
              <ProductImage className={s.cardImg} src={c.image} alt={c.name} tone={c.tone} icon={c.icon} ratio="4 / 5" label={`[Photo — ${c.name}]`} />
              <div className={s.cardBody}>
                <h3 className={s.cardTitle}>{c.name}</h3>
                <span className={s.cardSub}>{subtitles[c.slug] ?? c.tagline}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
