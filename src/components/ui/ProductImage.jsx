import Icon from './Icon'
import s from './ProductImage.module.scss'

/**
 * Shows the product photo when one exists, otherwise a branded lilac placeholder
 * with the product's line icon and a labelled caption. Photos fill their frame edge to
 * edge (frames are 4:5 to match the posts, so little is lost); pass fit="contain" to letterbox.
 */
export default function ProductImage({
  product,
  src,
  alt,
  tone,
  icon,
  label,
  ratio = '4 / 5',
  fit = 'cover',
  eager = false,
  iconSize = 52,
  className = '',
  style,
  imgStyle,
  children,
  ...rest
}) {
  const t = tone ?? product?.tone ?? 'lilac'
  const i = icon ?? product?.icon ?? 'sparkle'
  const text = label ?? (product ? `[Photo — ${product.name}]` : '[Photo]')
  const image = src ?? product?.image

  if (image) {
    return (
      <div className={`${s.ph} ${s[t] ?? s.lilac} ${className}`} style={{ aspectRatio: ratio, ...style }} {...rest}>
        <img
          className={`${s.img} ${fit === 'contain' ? s.contain : ''}`}
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
    <div className={`${s.ph} ${s[t] ?? s.lilac} ${className}`} style={{ aspectRatio: ratio, ...style }} {...rest}>
      <Icon name={i} size={iconSize} strokeWidth={1.1} />
      <span className={s.label}>{text}</span>
      {children}
    </div>
  )
}
