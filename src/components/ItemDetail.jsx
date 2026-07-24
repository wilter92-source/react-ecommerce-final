import React, { useState } from 'react'
import ItemCount from './ItemCount'
//4. USAR EL CONTEXTO
//NECESITO UN HOOK DE REACT (USECONTEXT)
//IMPORTO EL CONTEXTO QUE QUIERO USAR
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

const ItemDetail = ({detail}) => {
// const context = useContext(CartContext)
// console.log(context)
const [purchased, setPurchased]= useState(false)
const { addItem, getItemQty} = useContext(CartContext)

const availableStock = detail.stock - getItemQty(detail.id)
  const onAdd = (cantidad)=> {
    addItem(detail, cantidad)
    setPurchased(true)
  }

  return (
    <div
    style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
        <h2>Detalle de: {detail.name}</h2>
        <img src={detail.img} alt={detail.name}/>
        <p>{detail.description}</p>
        <p>${detail.price},00</p>
        <p>stock: {availableStock} unidades disponibles</p>
       { purchased 
       ? <div className='d-flex justify-content-between align-items-center p-4 w-25'>
        <Link className='btn btn-dark' to='/'>Seguir Comprando</Link>
        <Link className='btn btn-dark' to='/cart'>Ir al Carrito</Link>
       </div> 
       : <ItemCount stock={availableStock} onAdd={onAdd}/>
       }
      </div>
  )
}

export default ItemDetail