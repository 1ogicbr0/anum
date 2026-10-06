import Hero from '@/components/home/Hero'
import TrustStrip from '@/components/home/TrustStrip'
import Categories from '@/components/home/Categories'
import Collections from '@/components/home/Collections'
import SignetFeature from '@/components/home/SignetFeature'
import GoldSilver from '@/components/home/GoldSilver'
import Gifting from '@/components/home/Gifting'
import Reviews from '@/components/home/Reviews'
import InstagramFeed from '@/components/home/InstagramFeed'
import OrderCta from '@/components/home/OrderCta'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle()
  return (
    <>
      <Hero />
      <TrustStrip />
      <Categories />
      <Collections />
      <SignetFeature />
      <GoldSilver />
      <Gifting />
      <Reviews />
      <InstagramFeed />
      <OrderCta />
    </>
  )
}
