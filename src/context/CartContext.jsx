import { createContext, useState } from "react";

//1. CREAR Y EXPORTAR UN CONTEXTO
export const CartContext = createContext()

//2. CREAR AL PROVEEDOR (COMPRARTE Y DA ACCESO)

export const CartProvider = ({children})=> {
const [cart, setCart]= useState([])
    //TODAS LAS HERRAMITAS PARA TRABAR CON EL CARRITO

    //AGREGAR PRODCUTOS AL CARRITO
    const addItem = (item, qty)=> {
        // let itemInCart ={
        //     nombre:item.name,
        //     cantidad: qty
        // }
        // console.log(item, qty)
        //  console.log({...item, quantity:qty})
        if(isInCart(item.id)){
            //ya existe
           setCart(
            cart.map((prod)=> {
                if(prod.id === item.id){
                    //sumar cantidades
                    return {...prod, quantity: prod.quantity + qty }
                }else{
                    return prod
                }
            })
           )
        }else{
            //es nuevo, lo agrego
            setCart([...cart, {...item, quantity:qty}])
        }
    }

    //BORRAR TODO EL CARRITO
    const clear = ()=> {
        setCart([])
    }


    //ELIMINAR UN ITEM DEL CARRITO

    const removeItem = (id)=> {
        setCart(cart.filter((prod)=> prod.id !== id))
    }


    //devolver true/false

    const isInCart = (id)=> {
        return cart.some((prod)=> prod.id === id)
    }

    //total a pagar 

    const total = ()=> {
        return cart.reduce((acc, prod)=> acc += prod.quantity * prod.price, 0)
    }

     const totalConImp = ()=> {
        return cart.reduce((acc, prod)=> acc += prod.quantity * prod.price, 1.5)
    }

    //la cantidad total de items en carrito

    const cartQty = ()=> {
        return cart.reduce((acc, prod)=> acc += prod.quantity, 0)
    }


    //OPCIONAL: cantidad en el carrito por prod
    const getItemQty = (id)=> {
        const prodInCart = cart.find((prod)=> prod.id === id)
        if(prodInCart){
            return prodInCart.quantity
        }else{
            return 0
        }
    }


    return(
        <CartContext.Provider value={{cart, addItem, clear, removeItem, cartQty, total, getItemQty}}>
            {children}
        </CartContext.Provider>
    )
}