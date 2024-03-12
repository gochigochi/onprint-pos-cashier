import { useState } from "react";
import { Products } from "../../types";

type PropsTypes = {
    mockProducts: Products
}

const Cart = ({ mockProducts }: PropsTypes) => {

    const [products, setProducts] = useState(mockProducts)

    const handleRemove = (id: number) => {
        const filtered = products.filter(product =>  product.id !== id)
        setProducts(filtered)
    }

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {
                    products.map(product => (
                        <li key={product.id}>
                            <h3>{product.title}</h3>
                            <p>${product.price}</p>
                            <button type="button" onClick={() => handleRemove(product.id)}>Remove</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Cart