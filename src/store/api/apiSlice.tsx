import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, Product } from "../../types"

// TODO  recheck getPorductsByCategory Args type (undefined?)

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5173/api/"}),
    endpoints: (builder) => ({
        getCategories: builder.query<{ categories: Category[]}, void>({
            query: () => "categories"
        }),
        getProductsByCategory: builder.query<{products: Product[]}, string | undefined>({
            query: (id) => `products/${id}`
        })
    })
})

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery } = api