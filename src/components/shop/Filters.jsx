import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import { finishes } from '@/data/brand'
import { collections } from '@/data/collections'
import { occasions } from '@/data/categories'
import s from './Filters.module.scss'

/**
 * Controlled by URL search params so filtered views are shareable.
 * value = { finish, collection: [], occasion: [] }
 */
export default function Filters({ value, onChange, availableCollections }) {
  const toggleIn = (key, slug) => {
    const list = value[key]
    onChange({ ...value, [key]: list.includes(slug) ? list.filter((x) => x !== slug) : [...list, slug] })
  }
  const cols = collections.filter((c) => !availableCollections || availableCollections.has(c.slug))

  return (
    <aside className={s.aside} aria-label="Filters">
      <div className={s.group}>
        <div className={s.title}>Finish</div>
        <div className={s.row}>
          {Object.values(finishes).map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              aria-pressed={value.finish === f.id}
              onClick={() => onChange({ ...value, finish: value.finish === f.id ? '' : f.id })}
            >
              <span className={`dot dot--${f.id}`} /> {f.label.replace('Muse ', '')}
            </button>
          ))}
        </div>
      </div>

      {cols.length > 0 && (
        <div className={s.group}>
          <div className={s.title}>Collection</div>
          <div className={s.list}>
            {cols.map((c) => (
              <label key={c.slug} className={s.check}>
                <input type="checkbox" checked={value.collection.includes(c.slug)} onChange={() => toggleIn('collection', c.slug)} />
                {c.name}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className={s.group}>
        <div className={s.title}>Occasion</div>
        <div className={s.list}>
          {occasions.map((o) => (
            <label key={o.slug} className={s.check}>
              <input type="checkbox" checked={value.occasion.includes(o.slug)} onChange={() => toggleIn('occasion', o.slug)} />
              {o.name}
            </label>
          ))}
        </div>
      </div>

      <div className={s.sizeCard}>
        <span className={s.sizeTitle}>Not sure about your size?</span>
        <span className={s.sizeText}>Measure at home in two minutes with our ring size guide.</span>
        <Link to="/ring-size-guide" className={s.sizeLink}>
          Ring size guide <Icon name="arrow" size={16} />
        </Link>
      </div>
    </aside>
  )
}
