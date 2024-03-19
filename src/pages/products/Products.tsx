// import axios from "axios"
// import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import ProductCard from "../../components/product_card/ProductCard"
// import type { Product } from "../../types"
import ErrorBoundary from "../../components/error_boundary/ErrorBoundary"
import ProductsList from "../../components/products_list/ProductsList"
import ErrorFallback from "../../components/error_fallback/ErrorFallback"

const Products = () => {

    const { id } = useParams()
    const errorMsg = "An error ocurred fetching products"

    // const [products, setProducts] = useState<Product[]>([])

    // useEffect(() => {

    //     const getProduct = async () => {

    //         try {

    //             const response = await axios.post("/api/products", { id })

    //             if (response.status !== 200) {
    //                 //setError
    //                 return
    //             }

    //             setProducts(response.data.products)

    //         } catch (err) {

    //             console.log(err)
    //         }
    //     }

    //     getProduct()

    // }, [id])

    return (
        <div>
            <h2>Products</h2>
            <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                <ProductsList id={id} />
            </ErrorBoundary>
        </div>
    )
}

export default Products