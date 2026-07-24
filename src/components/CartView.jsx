import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const CartView = () => {
    const {cart, removeItem, total, clear}= useContext(CartContext)
  return (
    <div>
        <h1>Tu Carrito</h1>
        <div>
            {
                cart.map((compra)=> (
                    <div key={compra.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', padding:'2rem'}} >
                        <img src={compra.img} alt={compra.name} style={{width:'10rem'}}/>
                        <span>{compra.name}</span>
                        <span>{compra.quantity}</span>
                        <span>${compra.price},00</span>
                        <span>precio final: ${compra.price * compra.quantity},00</span>
                        <button className='btn btn-danger' onClick={()=> removeItem(compra.id)}>X</button>
                    </div>
                ))
            }
        </div>
        <span>Total a pagar: ${total()},00</span>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'80%', padding:'2rem'}}>
            <button onClick={clear} className='btn btn-danger'>Vaciar Carrito</button>
             <button className='btn btn-success'>Terminar Compra</button>
        </div>
    </div>
  )
}

export default CartView