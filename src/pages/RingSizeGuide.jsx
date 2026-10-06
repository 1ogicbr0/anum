import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { ringSizes, brand } from '@/data/brand'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { buildOrderLink, orderLabel } from '@/utils/order'
import s from './RingSizeGuide.module.scss'

export default function RingSizeGuide() {
  useDocumentTitle('Ring size guide')
  return (
    <div className={s.wrap}>
      <div>
        <div className="eyebrow">Find your perfect fit</div>
        <h1 className={s.title}>Ring size guide</h1>
        <p className={s.lead}>Measure at home in two minutes. If you are between sizes, go up, and if you are still unsure, send us a photo of a ring you already wear on a ruler and we will size it for you.</p>
      </div>

      <div className={s.cols} data-reveal="stagger">
        <ol className={s.steps}>
          <li className={s.step}>
            <div>
              <div className={s.stepTitle}>Use a ring that fits</div>
              <p className={s.stepText}>Pick a ring you wear on the same finger. Place it on a ruler and measure the inside diameter in millimetres, edge to edge.</p>
            </div>
          </li>
          <li className={s.step}>
            <div>
              <div className={s.stepTitle}>Or wrap a strip of paper</div>
              <p className={s.stepText}>Wrap a thin strip of paper snugly around the base of your finger, mark where it overlaps, and measure the length. Divide by 3.14 to get the diameter.</p>
            </div>
          </li>
          <li className={s.step}>
            <div>
              <div className={s.stepTitle}>Match it in the table</div>
              <p className={s.stepText}>Find the closest diameter. Measure at the end of the day when fingers are slightly larger, and make sure the ring can pass over your knuckle.</p>
            </div>
          </li>
          <li className={s.step}>
            <div>
              <div className={s.stepTitle}>Tell us your size</div>
              <p className={s.stepText}>Add it to your order message. We confirm every size before dispatch, and exchanges for sizing are always possible.</p>
            </div>
          </li>
        </ol>

        <div className={s.table}>
          <table>
            <thead>
              <tr><th>Muse size</th><th>Inside diameter</th></tr>
            </thead>
            <tbody>
              {ringSizes.map((r) => (
                <tr key={r.size}><td>{r.size}</td><td>{r.mm} mm</td></tr>
              ))}
            </tbody>
          </table>
          <p className={s.tip}>Sizes follow the standard US scale. [Confirm the sizes the client stocks.] {brand.delivery.headline}.</p>
          <Button href={buildOrderLink()} variant="dark" style={{ marginTop: 16 }}>
            <Icon name="chat" /> {orderLabel()}
          </Button>
        </div>
      </div>
    </div>
  )
}
