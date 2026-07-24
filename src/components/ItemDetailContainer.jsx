import React, { useEffect, useState } from 'react'
import { getOneProduct } from '../mock/data'
import ItemDetail from './ItemDetail'
import { useParams } from 'react-router-dom'
import LoadingComponent from './LoadingComponent'

const ItemDetailContainer = () => {
    const [detail, setDetail]=useState({})
    const [loader, setLoader]=useState(true)
    // const param = useParams()
    // console.log(param, 'param')
    const {id}= useParams()

    useEffect(()=> {
        getOneProduct(id)
        .then((res)=> setDetail(res))
        .finally(()=> setLoader(false))
    },[id])

  return (
    <>
       {loader ? <LoadingComponent text='Cargando detalle...'/> :  <ItemDetail detail={detail}/>}
    </>
  )
}

export default ItemDetailContainer