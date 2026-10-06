import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import Wordmark from '@/components/ui/Wordmark'
import { brand } from '@/data/brand'
import { categories } from '@/data/categories'
import { collections } from '@/data/collections'
import { buildOrderLink } from '@/utils/order'
import s from "./Footer.module.scss"

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={s.footer} id="about-footer">
      <div className={s.grid} data-reveal="stagger">
        <div className={s.brand}>
          <Wordmark to={null} size="lg" sub="BY ANUM · JEWELLERY" />
          <p className={s.blurb}>
            Everyday fine jewellery from Pakistan. Modern, feminine, effortless, and made for the woman who inspires.
          </p>
          <div className={s.social}>
            <a className={s.socialLink} href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Icon name="instagram" size={18} />
            </a>
            <a className={s.socialLink} href={buildOrderLink()} target="_blank" rel="noopener noreferrer" aria-label="Message us to order">
              <Icon name="chat" size={18} />
            </a>
          </div>
        </div>

        <div className={s.col}>
          <span className={s.colTitle}>Shop</span>
          {categories.map((c) => (
            <Link key={c.slug} className={s.link} to={`/shop/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </div>

        <div className={s.col}>
          <span className={s.colTitle}>Collections</span>
          {collections.slice(0, 6).map((c) => (
            <Link key={c.slug} className={s.link} to={`/collections/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </div>

        <div className={s.col}>
          <span className={s.colTitle}>Help</span>
          <Link className={s.link} to="/ring-size-guide">Ring size guide</Link>
          <Link className={s.link} to="/#order">How to order</Link>
          <Link className={s.link} to="/about#delivery">Delivery across Pakistan</Link>
          <Link className={s.link} to="/about#care">Jewellery care</Link>
          <Link className={s.link} to="/about">About Anum</Link>
        </div>

        <div className={s.col}>
          <span className={s.colTitle}>Contact</span>
          <span className={s.contact}>WhatsApp {brand.whatsappNumber || '[number]'}</span>
          <span className={s.contact}>Instagram @{brand.handle}</span>
          <span className={s.contact}>{brand.email || '[Email address]'}</span>
          <span className={s.contact}>{brand.delivery.headline}</span>
        </div>
      </div>

      <div className={s.bottom}>
        <span>© {year} {brand.name}. All rights reserved.</span>
        <span>{brand.values}</span>
      </div>
    </footer>
  )
}
