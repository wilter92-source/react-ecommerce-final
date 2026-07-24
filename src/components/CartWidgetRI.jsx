import React, { useContext } from 'react'
import { TiShoppingCart } from "react-icons/ti";
import Badge from 'react-bootstrap/Badge';
import { CartContext } from '../context/CartContext';
import { NavLink } from 'react-router-dom';


const CartWidgetRI = () => {
  const {cartQty, cart}= useContext(CartContext)
  
  return (
    <NavLink to='/cart' style={{textDecoration:'none', color:'black'}}>
        <TiShoppingCart fontSize={'1.4rem'} />
        { cart.length > 0 && <Badge pill bg="danger">{cartQty()}</Badge>}
    </NavLink>
  )
}

export default CartWidgetRI