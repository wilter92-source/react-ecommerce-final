import React, { useEffect, useState } from 'react'
import { getProducts } from '../mock/data'
import ItemList from './ItemList'
import { useParams } from 'react-router-dom'
import LoadingComponent from './LoadingComponent'
const ItemListContainer = ({greeting}) => {
  const [data, setData]= useState([])
  const [loading, setLoading]= useState(false)
  const {type}= useParams()
console.log(type)
  useEffect(()=>{
    setLoading(true)
    //1. PEDIR DATOS
    getProducts()
    .then((res)=> {
      if(type){
        //filtro
        setData(res.filter((prod)=> prod.category === type))
      }else{
        //no filtro
        setData(res)
      }
    })//trato la promesa
    .catch((error)=> console.log(error))//atrapo el error
    .finally(()=> setLoading(false))
  },[type])
   console.log(data, 'data')
  return (
    <div>
      {
        loading 
        ? <LoadingComponent text={type ?'Cargando categoría...' : 'Cargando productos...'}/>
        :<>
        <h1>{greeting}</h1>
        <ItemList data={data}/>

      </>
      
      }
    </div>
  )
}

export default ItemListContainer