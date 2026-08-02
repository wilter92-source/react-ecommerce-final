import { Link } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png";

const EmptyCart = () => (
  <main className="empty-cart-page">
    <img className="empty-cart-image" src={emptyCart} alt="Carrito vacío" />
    <div className="empty-cart-content">
      <h1>Tu carrito está vacío</h1>
      <p>Aún no agregaste productos. Explora nuestro catálogo y encuentra tu próximo par.</p>
      <Link className="urban-btn" to="/">Volver al catálogo</Link>
    </div>
  </main>
);

export default EmptyCart;
