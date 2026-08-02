import { useState } from 'react'

const ItemCount = ({ stock, onAdd }) => {
  const [quantity, setQuantity] = useState(1)
  const availableStock = Number(stock) || 0

  const increment = () => {
    setQuantity((current) => Math.min(current + 1, availableStock))
  }

  const decrement = () => {
    setQuantity((current) => Math.max(current - 1, 1))
  }

  const handleAdd = () => {
    if (quantity > 0 && quantity <= availableStock) {
      onAdd(quantity)
    }
  }

  if (availableStock <= 0) {
    return <p className="text-danger">Lo sentimos, no hay stock disponible.</p>
  }

  return (
    <div className="d-flex align-items-center gap-3 flex-wrap">
      <button className="btn btn-outline-dark" onClick={decrement} disabled={quantity <= 1}>-</button>
      <span className="fw-bold">{quantity}</span>
      <button className="btn btn-outline-dark" onClick={increment} disabled={quantity >= availableStock}>+</button>
      <button className="btn btn-warning" onClick={handleAdd}>Agregar al carrito</button>
      <span className="small text-muted">{availableStock} unidades disponibles</span>
    </div>
  )
}

export default ItemCount
