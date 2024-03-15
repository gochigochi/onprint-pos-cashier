import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Product } from "../../types"

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

    console.log("PRODUCTS....", products)

    return (
        <div>
            <h2>Products</h2>
            <div className="grid grid-cols-12 gap-2 py-2">
                {
                    products.length !== 0 ?
                        products.map(product => {
                            return (
                                <article key={product.id} className="col-span-6 sm:col-span-4 lg:col-span-3 h-22 border border-zinc-100 bg-white rounded-lg">
                                    <div className="p-2">
                                        <h3>{product.name}</h3>
                                        <p>CHF. <span className="font-bold">{product.price}</span></p>
                                    </div>
                                </article>
                            )
                        }) : null
                }
            </div>
        </div>
    )
}

export default Products