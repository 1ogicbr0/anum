import Icon from './Icon'
import s from './ProductImage.module.scss'

/**
 * Shows the product photo when one exists, otherwise a branded lilac placeholder
 * with the product's line icon and a labelled caption. Photos are letterboxed on the
 * satin backdrop so nothing is cropped; pass fit="cover" to fill instead.
 */
export default function ProductImage({
  product,
  src,
  alt,
  tone,
  icon,
  label,
  ratio = '4 / 5',
  fit = 'contain',
  eager = false,
  iconSize = 52,
  className = '',
  style,
  imgStyle,
  children,
}) {
  const t = tone ?? product?.tone ?? 'lilac'
  const i = icon ?? product?.icon ?? 'sparkle'
  const text = label ?? (product ? `[Photo — ${product.name}]` : '[Photo]')
  const image = src ?? product?.image

  if (image) {
    return (
      <div className={`${s.ph} ${s[t] ?? s.lilac} ${className}`} style={{ aspectRatio: ratio, ...style }}>
        <img
          className={`${s.img} ${fit === 'cover' ? s.cover : ''}`}
          src={image}
          alt={alt ?? product?.name ?? ''}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          style={imgStyle}
        />
        {children}
      </div>
    )
  }

  return (
    <div className={`${s.ph} ${s[t] ?? s.lilac} ${className}`} style={{ aspectRatio: ratio, ...style }}>
      <Icon name={i} size={iconSize} strokeWidth={1.1} />
      <span className={s.label}>{text}</span>
      {children}
    </div>
  )
}
