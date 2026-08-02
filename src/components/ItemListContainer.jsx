import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { db } from '../firebase/config'
import ItemList from './ItemList'
import LoadingComponent from './LoadingComponent'

const ItemListContainer = ({ greeting }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { type } = useParams()

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      setError('')

      try {
        const productsRef = collection(db, 'products')
        const productsQuery = type
          ? query(productsRef, where('category', '==', type))
          : productsRef

        const snapshot = await getDocs(productsQuery)
        const products = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }))

        setData(products)
      } catch (firebaseError) {
        console.error('Error al leer los productos:', firebaseError)
        setError('No pudimos cargar los productos. Revisa la conexión y las reglas de Firestore.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [type])

  if (loading) {
    return (
      <LoadingComponent
        text={type ? 'Cargando categoría...' : 'Cargando productos...'}
      />
    )
  }

  return (
    <main className="container py-5">
      <h1 className="mb-5 fw-bold">
        {type ? `${greeting}${type}` : greeting}
      </h1>

      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : data.length > 0 ? (
        <ItemList data={data} />
      ) : (
        <div className="alert alert-info" role="status">
          No hay productos disponibles en esta categoría.
        </div>
      )}
    </main>
  )
}

export default ItemListContainer
