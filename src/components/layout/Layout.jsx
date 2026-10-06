import { Outlet, useLocation } from 'react-router-dom'
import AnnouncementBar from './AnnouncementBar'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import RevealObserver from './RevealObserver'
import Toaster from '@/components/ui/Toast'
import s from './Layout.module.scss'

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <ScrollToTop />
      <RevealObserver />
      <AnnouncementBar />
      <Header />
      <main key={pathname} className={s.page}>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}
