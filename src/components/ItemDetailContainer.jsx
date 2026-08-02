import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { Link, useParams } from 'react-router-dom'
import { db } from '../firebase/config'
import ItemDetail from './ItemDetail'
import LoadingComponent from './LoadingComponent'

const ItemDetailContainer = () => {
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { id } = useParams()

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      setError('')

      try {
        const productRef = doc(db, 'products', id)
        const snapshot = await getDoc(productRef)

        if (!snapshot.exists()) {
          setDetail(null)
          setError('El producto solicitado no existe.')
          return
        }

        setDetail({ id: snapshot.id, ...snapshot.data() })
      } catch (firebaseError) {
        console.error('Error al leer el detalle:', firebaseError)
        setError('No pudimos cargar el detalle del producto.')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) return <LoadingComponent text="Cargando detalle..." />

  if (error || !detail) {
    return (
      <main className="container py-5 text-center">
        <div className="alert alert-warning">{error}</div>
        <Link className="btn btn-dark" to="/">
          Volver al catálogo
        </Link>
      </main>
    )
  }

  return <ItemDetail detail={detail} />
}

export default ItemDetailContainer
