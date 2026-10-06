import { useEffect } from 'react'
import { brand } from '@/data/brand'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${brand.name}` : `${brand.name} | ${brand.descriptor}`
  }, [title])
}
