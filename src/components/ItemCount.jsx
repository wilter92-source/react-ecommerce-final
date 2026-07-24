import React,{useState, useEffect} from 'react'

const ItemCount = ({stock, onAdd}) => {

const [count, setCount]=useState(1)


 console.log('ITEMcOUNT')
const sumar = ()=> {
    if(count < stock){

        setCount(count + 1)
    }
}
const restar = ()=> {
    if(count > 0){

        setCount(count - 1)
    }
}

//ejemplo
const finalizarCompra = ()=> {
    onAdd(count)
}




  return (
    <>
    {
        stock > 0
        ?<div>
        <button className='btn btn-danger' onClick={restar} disabled={count === 0}>-</button>
        <span className='btn'>{count}</span>
        <button className='btn btn-success' onClick={sumar} disabled={count === stock}>+</button>
        <button className='btn btn-primary' onClick={finalizarCompra} disabled={count === 0 || stock === 0}>Comprar</button>
    </div>
    : <p>Lo sentimos, no hay más stock disponible 🫠</p>
    }
    </>
  )
}

export default ItemCount