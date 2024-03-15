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

                if (response.status !== 200 ) {
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
                                <article key={category.id} className="col-span-6 sm:col-span-4 lg:col-span-3 h-22 border border-zinc-300 rounded-lg">
                                    <Link to={`/category/${category.id}`}>
                                        <div className="p-2">
                                            <h3>{category.name}</h3>
                                        </div>
                                    </Link>
                                </article>
                            )
                        }) : null
                }
            </div>
        </div>
    )
}

export default Categories