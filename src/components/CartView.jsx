import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const formatPrice = (value) => `$${Number(value).toFixed(2)}`

const CartView = () => {
  const {
    cart,
    removeItem,
    total,
    clear,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext)

  return (
    <main className="container py-5">
      <h1 className="mb-4">Tu carrito</h1>

      <div className="d-flex flex-column gap-3">
        {cart.map((purchase) => (
          <article
            key={purchase.id}
            className="d-flex flex-wrap justify-content-between align-items-center gap-3 border rounded p-3"
          >
            <img
              src={purchase.images?.[0] || purchase.image}
              alt={purchase.title}
              style={{ width: '110px', height: '90px', objectFit: 'cover' }}
            />

            <div style={{ minWidth: '190px', flex: 1 }}>
              <strong className="d-block">{purchase.title}</strong>
              <span className="text-muted">
                Stock disponible: {purchase.stock}
              </span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => decreaseQuantity(purchase.id)}
                aria-label={`Disminuir cantidad de ${purchase.title}`}
              >
                −
              </button>
              <strong>{purchase.quantity}</strong>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => increaseQuantity(purchase.id)}
                disabled={purchase.quantity >= purchase.stock}
                aria-label={`Aumentar cantidad de ${purchase.title}`}
              >
                +
              </button>
            </div>

            <span>Precio: {formatPrice(purchase.price)}</span>
            <strong>
              Subtotal: {formatPrice(purchase.price * purchase.quantity)}
            </strong>

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => removeItem(purchase.id)}
            >
              Eliminar
            </button>
          </article>
        ))}
      </div>

      <p className="fs-4 fw-bold mt-4">
        Total a pagar: {formatPrice(total())}
      </p>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" onClick={clear} className="btn btn-outline-danger">
          Vaciar carrito
        </button>
        <Link to="/checkout" className="btn btn-success">
          Finalizar compra
        </Link>
      </div>
    </main>
  )
}

export default CartView
