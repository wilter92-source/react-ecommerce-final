import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from '../context/CartContext'

const Item = ({ prod }) => {
  const { addItem } = useContext(CartContext)

  const handleAdd = () => {
    addItem(prod, 1)
  }

  return (
    <article className="card urban-card h-100 position-relative">
      {prod.discount && (
        <span className="discount-badge">-{prod.discount}%</span>
      )}
      <div className="product-image-wrapper position-relative">
        <Link to={`/item/${prod.id}`}>
          <img src={prod.images?.[0]} className="card-img-top" alt={prod.title} />
        </Link>
        <button className="cart-plus-button" onClick={handleAdd} aria-label="Agregar al carrito">
          <FontAwesomeIcon icon={faCartPlus} />
        </button>
      </div>
      <div className="card-body d-flex flex-column p-4">
        <small className="category-label">{prod.category}</small>
        <h2 className="card-title h5 mt-2">{prod.title}</h2>
        <div className="mb-3">
          {prod.oldPrice && <span className="old-price">${prod.oldPrice}</span>}
          <p className="price mb-0">${prod.price}</p>
        </div>
        <Link to={`/item/${prod.id}`} className="btn btn-dark rounded-pill mt-auto">Ver producto</Link>
      </div>
    </article>
  )
}

export default Item
