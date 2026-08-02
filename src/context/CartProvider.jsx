import { useState } from 'react'
import { CartContext } from './CartContext'

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addItem = (item, quantity) => {
    const qty = Number(quantity)
    if (!item || !item.id || qty <= 0) return

    setCart((currentCart) => {
      const existingItem = currentCart.find((product) => product.id === item.id)
      const currentQuantity = existingItem?.quantity ?? 0
      const nextQuantity = Math.min(currentQuantity + qty, Number(item.stock) || 0)

      if (nextQuantity <= 0) return currentCart

      if (existingItem) {
        return currentCart.map((product) =>
          product.id === item.id
            ? { ...product, ...item, quantity: nextQuantity }
            : product,
        )
      }

      return [...currentCart, { ...item, quantity: nextQuantity }]
    })
  }

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((product) => {
        if (product.id !== id) return product
        const maxStock = Number(product.stock) || 0
        return product.quantity < maxStock
          ? { ...product, quantity: product.quantity + 1 }
          : product
      }),
    )
  }

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(product.quantity - 1, 1) }
          : product,
      ),
    )
  }

  const removeItem = (id) => {
    setCart((currentCart) => currentCart.filter((product) => product.id !== id))
  }

  const clear = () => setCart([])
  const isInCart = (id) => cart.some((product) => product.id === id)
  const getItemQty = (id) => cart.find((product) => product.id === id)?.quantity ?? 0
  const cartQty = () => cart.reduce((accumulator, product) => accumulator + product.quantity, 0)
  const total = () => cart.reduce((accumulator, product) => accumulator + product.quantity * Number(product.price), 0)

  const value = {
    cart,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clear,
    isInCart,
    getItemQty,
    cartQty,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
