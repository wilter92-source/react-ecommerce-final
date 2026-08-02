import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartProvider'
import CartContainer from './components/CartContainer'
import Error from './components/Error'
import ItemDetailContainer from './components/ItemDetailContainer'
import ItemListContainer from './components/ItemListContainer'
import Navbar from './components/Navbar'
import Checkout from './components/Checkout'
import Footer from './components/Footer'



function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <main className="app-main"><Routes>
          <Route path="/" element={<ItemListContainer greeting="Catálogo Urban Store" />} />
          <Route path="/category/:type" element={<ItemListContainer greeting="Categoría: " />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartContainer />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Error />} />
        </Routes></main>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
