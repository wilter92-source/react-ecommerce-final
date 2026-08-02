import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../context/CartContext'

const CartWidget = () => {
  const { cartQty } = useContext(CartContext)

  return (
    <Link to="/cart" className="cart-widget" aria-label="Carrito">
      <FontAwesomeIcon icon={faCartShopping} />
      {cartQty() > 0 && <span className="cart-badge">{cartQty()}</span>}
    </Link>
  )
}

export default CartWidget
