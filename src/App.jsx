import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import Collections from '@/pages/Collections'
import Collection from '@/pages/Collection'
import Product from '@/pages/Product'
import RingSizeGuide from '@/pages/RingSizeGuide'
import About from '@/pages/About'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:category" element={<Shop />} />
          <Route path="collections" element={<Collections />} />
          <Route path="collections/:slug" element={<Collection />} />
          <Route path="product/:slug" element={<Product />} />
          <Route path="ring-size-guide" element={<RingSizeGuide />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
