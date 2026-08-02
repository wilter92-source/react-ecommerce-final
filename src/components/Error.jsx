import { Link } from "react-router-dom"

const Error = () => (
  <main className="error-page">
    <h1>Ups... esta página no existe</h1>
    <p>Parece que la dirección que buscas no está disponible.</p>
    <Link className="urban-btn" to="/">Volver al inicio</Link>
  </main>
)

export default Error
