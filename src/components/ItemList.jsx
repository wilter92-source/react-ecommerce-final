import Item from './Item'

const ItemList = ({ data }) => {
  return (
    <div className="d-flex justify-content-center align-items-stretch flex-wrap gap-4">
      {data.map((prod) => (
        <Item key={prod.id} prod={prod} />
      ))}
    </div>
  )
}

export default ItemList
