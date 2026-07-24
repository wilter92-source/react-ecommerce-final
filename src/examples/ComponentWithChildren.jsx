import React from 'react'

const ComponentChildren = (props) => {
  return (
    <div
      style={{
        backgroundColor: '#9656e9',
        width: '90%',
        minHeight: '30rem',   
        borderRadius: '24px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 15,
        padding: '2rem',      
        gap: '1rem',         
        boxSizing: 'border-box' 
      }}
    >
      <h1>Componente con Children</h1>
     {props.children}
    </div>
  )
}

export default ComponentChildren