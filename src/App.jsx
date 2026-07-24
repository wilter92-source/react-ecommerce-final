//import del css
import './App.css'
import Error from './components/Error'
import ItemCount from './components/ItemCount'
import ItemDetailContainer from './components/ItemDetailContainer'
import ItemListContainer from './components/ItemListContainer'
// import + NOMBRE DEL COMPONENTE + FROM + DIRECCION DEL ARCHIVO
import Navbar from "./components/Navbar"
import NavbarRB from './components/NavbarRB'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//3. DAR ACCESO AL CONTEXTO
// NECESITAMOS IMPORTAR AL PROVEEDOR
import { CartProvider } from './context/CartContext'
import CartContainer from './components/CartContainer'

function App() {

console.log('APP')
  return (
    <BrowserRouter>
    <CartProvider>
    <NavbarRB/>
    <Routes>
        <Route path='/' element={  <ItemListContainer greeting="Bienvenidos a mi App!"/>}/>
        <Route path='/category/:type' element={  <ItemListContainer greeting="Categoría: "/>}/>
        <Route path='/item/:id' element={ <ItemDetailContainer/> }/>
        <Route path='/cart' element={<CartContainer/>}/>
        <Route path='*' element={<Error/>}/>
    </Routes>
    </CartProvider>
    </BrowserRouter>
  )
}

export default App
