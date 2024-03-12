import { useEffect, useState } from "react"
import type { Product } from "../../types"
import { io } from "socket.io-client"

const ProductsList = () => {

    const [products, setProducts] = useState<Product[]>([])
    const baseUrl = import.meta.env.DEV ? import.meta.env.VITE_STORE_BASE_URL_DEV : import.meta.env.VITE_STORE_BASE_URL_DEV
    const ck = import.meta.env.DEV ? import.meta.env.VITE_WOO_CONSUMER_KEY : import.meta.env.VITE_WOO_CONSUMER_KEY
    const cs = import.meta.env.DEV ? import.meta.env.VITE_WOO_SECRET_KEY : import.meta.env.VITE_WOO_SECRET_KEY
    const url = `${baseUrl}products?per_page=10&consumer_key=${ck}&consumer_secret=${cs}`

    useEffect(() => {

        const getData = async () => {
            try {

                const res = await fetch(url)
                const json = await res.json()
                setProducts(json)

            } catch (err) {
                console.log("Error fetching data: ", err)
            }
        }

        getData()

    }, [url])

    const handleAdd = (id: Product["id"]) => {
        console.log(id)
        //CREATE WOO ORDER

        const url = `${baseUrl}orders`

        const data = {
            payment_method: 'bacs',
            payment_method_title: 'Direct Bank Transfer',
            set_paid: true,
            billing: {
                first_name: 'John',
                last_name: 'Doe',
                address_1: '969 Market',
                address_2: '',
                city: 'San Francisco',
                state: 'CA',
                postcode: '94103',
                country: 'US',
                email: 'john.doe@example.com',
                phone: '(555) 555-5555',
            },
            shipping: {
                first_name: 'Takeaway',
                last_name: 'Doe',
                address_1: '969 Market',
                address_2: '',
                city: 'San Francisco',
                state: 'CA',
                postcode: '94103',
                country: 'US',
            },
            line_items: [
                {
                    product_id: id,
                    quantity: 1,
                },
            ],
            shipping_lines: [
                {
                    method_id: 'flat_rate',
                    method_title: 'Flat Rate',
                    total: '10.00',
                },
            ],
        };

        const auth = btoa(`ck_b8d76a1632102fa3b8207870efc42c64fd1c7b90:cs_5f71cf1f6eca0f63951d91771f4d295a67cbe40e`)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${auth}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Response:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="grid grid-cols-12 gap-2 p-2">
            {
                products.length !== 0 ?
                    products.map(product => (
                        <article key={product.id} className="col-span-3 h-44 border border-zinc-100 rounded-lg p-2">
                            {/* <img src={product.images[0].src} className="w-full h-14 object-cover" /> */}
                            <div className="p-1 grid">
                                <h3>{product.name}</h3>
                                <p>CHF.{product.price}</p>
                                <button onClick={() => handleAdd(product.id)} className="bg-zinc-100 rounded-sm px-2 py-1 text-slate-900 justify-end" type="button">Add</button>
                            </div>
                        </article>
                    )) : null
            }
        </div>
    )
}

export default ProductsList