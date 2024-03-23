import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, Product } from "../../types"

// TODO  recheck getPorductsByCategory Args type (undefined?)

// TODO getTotalOrder, getSalesReport,

const baseUrl = import.meta.env.DEV ? "http://localhost:5173/api/" : "https://onprintpos.diegoui.com.ar/api/"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getCategories: builder.query<{ categories: Category[]}, void>({
            query: () => "categories"
        }),
        getProductsByCategory: builder.query<{products: Product[]}, string | undefined>({
            query: (id) => `products/${id}`
        }),
        getOrders: builder.query({
            query: (data) => `orders?page=${data.page}`
        })
    })
})

export const { 
    useGetCategoriesQuery, 
    useGetProductsByCategoryQuery,
    useGetOrdersQuery, 
} = api