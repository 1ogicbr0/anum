import { useRef } from 'react'
import { useSectionAnimation } from '@/hooks/useSectionAnimation'
import { categories as animateCategories } from '@/animations/home'
import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import SectionHeading from '@/components/ui/SectionHeading'
import { categories } from '@/data/categories'
import s from './Categories.module.scss'

export default function Categories() {
  const ref = useRef(null)
  useSectionAnimation(ref, animateCategories)
  return (
    <section ref={ref} className={s.wrap} id="categories" aria-label="Shop by category">
      <SectionHeading eyebrow="Shop by category" title="Find your Muse" linkTo="/shop" linkLabel="View all pieces" />
      <div className={s.grid} data-anim="grid">
        {categories.map((c) => (
          <Link key={c.slug} to={`/shop/${c.slug}`} className={s.tile} data-anim="tile">
            <Icon name={c.icon} size={52} strokeWidth={1.1} />
            <span>{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
