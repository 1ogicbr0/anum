import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import SectionHeading from '@/components/ui/SectionHeading'
import { categories } from '@/data/categories'
import s from './Categories.module.scss'

export default function Categories() {
  return (
    <section className={s.wrap} id="categories" aria-label="Shop by category">
      <SectionHeading eyebrow="Shop by category" title="Find your Muse" linkTo="/shop" linkLabel="View all pieces" />
      <div className={s.grid}>
        {categories.map((c) => (
          <Link key={c.slug} to={`/shop/${c.slug}`} className={s.tile}>
            <Icon name={c.icon} size={52} strokeWidth={1.1} />
            <span>{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
