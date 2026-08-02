import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import ItemCount from './ItemCount'
import { getOfferPricing } from '../utils/offerPricing'

const ItemDetail = ({ detail }) => {
  const [activeImage, setActiveImage] = useState(detail.images?.[0])
  const { addItem, getItemQty } = useContext(CartContext)
  const { isOffer, oldPrice, discount } = getOfferPricing(detail)

  const handleAdd = (qty) => {
    addItem(detail, qty)
  }

  return (
    <main className="container py-5 product-detail">
      <div className="row g-5">
        <div className="col-lg-7">
          <img className="detail-main-image" src={activeImage || detail.image} alt={detail.title}/>
          <div className="d-flex gap-3 mt-3">
            {(detail.images || []).map((img) => (
              <img key={img} onClick={() => setActiveImage(img)} className="detail-thumb" src={img} alt={detail.title}/>
            ))}
          </div>
        </div>
        <div className="col-lg-5">
          {isOffer && discount && (
            <span className="discount-badge detail-discount-badge" aria-label={`${discount}% de descuento`}>-{discount}%</span>
          )}
          <small className="text-muted">{detail.category}</small>
          <h1>{detail.title}</h1>
          <p>{detail.description}</p>
          <div className="detail-price-block">
            {isOffer && oldPrice && <span className="old-price">${oldPrice}</span>}
            <h2 className="price">${Number(detail.price).toFixed(2)}</h2>
          </div>
          {getItemQty(detail.id) === 0 && (
            <ItemCount stock={detail.stock} onAdd={handleAdd}/>
          )}
          {getItemQty(detail.id) > 0 && (
            <div className="detail-actions mt-4 d-flex gap-3">
              <Link className="btn btn-warning" to="/cart">Ver carrito</Link>
              <Link className="btn btn-outline-dark" to="/">Seguir comprando</Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default ItemDetail
