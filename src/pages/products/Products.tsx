import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "../../components/product_card/ProductCard"
import type { Product } from "../../types"

const Products = () => {

    const { id } = useParams()
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {

        const getProduct = async () => {

            try {

                const response = await axios.post("/api/products", { id })

                if (response.status !== 200) {
                    //setError
                    return
                }

                setProducts(response.data.products)

            } catch (err) {

                console.log(err)
            }
        }

        getProduct()

    }, [id])

    return (
        <div>
            <h2>Products</h2>
            <div className="grid grid-cols-12 gap-2 py-2">
                {
                    products.length !== 0 ?
                        products.map(product => <ProductCard key={product.id} product={product} />) : null
                }
            </div>
        </div>
    )
}

export default Products