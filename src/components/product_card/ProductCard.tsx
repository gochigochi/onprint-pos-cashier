import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/store"
import type { Product } from "../../types"

type PropsTypes = {
  product: Product
}

const ProductCard = ({ product }: PropsTypes) => {

  // const dispatch = useDispatch<AppDispatch>()

  const handleClick = () => {

  }

  return (
    <article
      onClick={() => handleClick(product)}
      role="button"
      tabIndex={0}
      key={product.id}
      className="col-span-6 sm:col-span-4 lg:col-span-3 h-22 border border-zinc-100 bg-white rounded-lg"
    >
      <div className="p-2">
        <h3>{product.name}</h3>
        <p>CHF. <span className="font-bold">{product.price}</span></p>
      </div>
    </article>
  )
}

export default ProductCard