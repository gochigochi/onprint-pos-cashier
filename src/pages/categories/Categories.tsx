import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Category } from "../../types"

const Categories = () => {

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {

        const getCategories = async () => {

            try {

                const response = await axios.get("/api/categories")

                if (response.status !== 200) {
                    //setError
                    return
                }

                setCategories(response.data.categories)

            } catch (err) {

                console.log(err)
                // setError
            }
        }

        getCategories()

    }, [])

    return (
        <div>
            <h2>Categorias</h2>
            <div className="grid grid-cols-12 gap-2 py-2">
                {
                    categories.length !== 0 ?
                        categories.map(category => {
                            return (
                                <Link key={category.id} className="col-span-6 @xs/main:col-span-4 @md/main:col-span-3 aspect-square border border-zinc-00 bg-white rounded-lg" to={`/category/${category.id}`}>
                                    <div className="p-2 flex h-full">
                                        <h3>{category.name}</h3>
                                    </div>
                                </Link>
                            )
                        }) : null
                }
            </div>
        </div>
    )
}

export default Categories