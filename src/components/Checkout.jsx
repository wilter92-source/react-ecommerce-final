import { useContext, useState } from 'react'
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { db } from '../firebase/config'
import EmptyCart from './EmptyCart'
import completeImage from '../assets/complete.png'

const initialBuyer = {
  name: '',
  lastName: '',
  phone: '',
  email: '',
  confirmEmail: '',
}

const Checkout = () => {
  const { cart, total, clear } = useContext(CartContext)
  const [buyer, setBuyer] = useState(initialBuyer)
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setBuyer((currentBuyer) => ({ ...currentBuyer, [name]: value }))
  }

  const validateForm = () => {
    const values = Object.values(buyer).map((value) => value.trim())
    if (values.some((value) => !value)) {
      return 'Completa todos los campos.'
    }
    if (buyer.email.trim().toLowerCase() !== buyer.confirmEmail.trim().toLowerCase()) {
      return 'Los correos electrónicos no coinciden.'
    }
    if (!/^\S+@\S+\.\S+$/.test(buyer.email.trim())) {
      return 'Ingresa un correo electrónico válido.'
    }
    if (!/^[0-9+()\-\s]{7,20}$/.test(buyer.phone.trim())) {
      return 'Ingresa un teléfono válido.'
    }
    return ''
  }

  const createOrder = async (event) => {
    event.preventDefault()
    setError('')

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    if (!cart.length) {
      setError('El carrito está vacío.')
      return
    }

    setLoading(true)

    try {
      const generatedOrderId = await runTransaction(db, async (transaction) => {
        const productReads = await Promise.all(
          cart.map(async (cartItem) => {
            const productRef = doc(db, 'products', cartItem.id)
            const productSnapshot = await transaction.get(productRef)
            return { cartItem, productRef, productSnapshot }
          }),
        )

        for (const { cartItem, productSnapshot } of productReads) {
          if (!productSnapshot.exists()) {
            throw new Error(`El producto “${cartItem.title}” ya no está disponible.`)
          }

          const currentStock = Number(productSnapshot.data().stock) || 0
          if (currentStock < cartItem.quantity) {
            throw new Error(
              `No hay stock suficiente de “${cartItem.title}”. Disponible: ${currentStock}.`,
            )
          }
        }

        productReads.forEach(({ cartItem, productRef, productSnapshot }) => {
          const currentStock = Number(productSnapshot.data().stock) || 0
          transaction.update(productRef, {
            stock: currentStock - cartItem.quantity,
          })
        })

        const orderRef = doc(collection(db, 'orders'))
        transaction.set(orderRef, {
          buyer: {
            name: buyer.name.trim(),
            lastName: buyer.lastName.trim(),
            phone: buyer.phone.trim(),
            email: buyer.email.trim().toLowerCase(),
          },
          items: cart.map(({ id, title, price, quantity }) => ({
            id,
            title,
            price: Number(price),
            quantity,
          })),
          total: total(),
          date: serverTimestamp(),
        })

        return orderRef.id
      })

      setOrderId(generatedOrderId)
      clear()
    } catch (firebaseError) {
      console.error('Error al crear la orden:', firebaseError)
      setError(firebaseError.message || 'No pudimos completar la compra.')
    } finally {
      setLoading(false)
    }
  }

  if (orderId) {
    return (
      <main className="purchase-page">
        <div className="purchase-success">
          <img className="purchase-image" src={completeImage} alt="Compra completada" />
          <div className="purchase-content">
            <h1>¡Compra realizada correctamente!</h1>
            <p>Gracias por confiar en Urban Store.</p>
            <span>Tu ID de orden:</span>
            <strong>{orderId}</strong>
            <Link to="/" className="urban-btn">Volver al catálogo</Link>
          </div>
        </div>
      </main>
    )
  }

  if (!cart.length) return <EmptyCart />

  return (
    <main className="container py-5">
      <div className="row g-5">
        <section className="col-lg-7">
          <h1 className="mb-4">Finalizar compra</h1>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={createOrder} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" htmlFor="name">Nombre</label>
                <input className="form-control" id="name" name="name" value={buyer.name} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="lastName">Apellido</label>
                <input className="form-control" id="lastName" name="lastName" value={buyer.lastName} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="phone">Teléfono</label>
                <input className="form-control" id="phone" name="phone" value={buyer.phone} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="email">Correo electrónico</label>
                <input className="form-control" type="email" id="email" name="email" value={buyer.email} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="confirmEmail">Confirmar correo</label>
                <input className="form-control" type="email" id="confirmEmail" name="confirmEmail" value={buyer.confirmEmail} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className="btn btn-warning mt-4 rounded-pill" disabled={loading}>
              {loading ? 'Procesando compra...' : 'Confirmar compra'}
            </button>
          </form>
        </section>

        <aside className="col-lg-5">
          <div className="border rounded p-4">
            <h2 className="h4">Resumen</h2>
            {cart.map((item) => (
              <div key={item.id} className="d-flex justify-content-between gap-3 border-bottom py-2">
                <span>{item.title} × {item.quantity}</span>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
            <div className="d-flex justify-content-between fs-5 pt-3">
              <strong>Total</strong>
              <strong>${total().toFixed(2)}</strong>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Checkout
