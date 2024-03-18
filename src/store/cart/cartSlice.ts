import { createSlice } from "@reduxjs/toolkit"
import type { Cart, CartProduct, CartProductId } from "../../types"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: Cart = {
    products: [],
    total: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartProduct>) => {
            
            const index = state.products.findIndex(product => product.id === action.payload.id)

            if (index === -1) {
                state.products.push(action.payload)
            } else {
                state.products[index].qty += action.payload.qty
            }
        },
        removeProduct: (state, action: PayloadAction<CartProductId>) => {
            const index = state.products.findIndex(product => product.id === action.payload)
            state.products.splice(index, 1)
        },
        clearCart: (state) => {
            console.log(state.products)
            state.products = []
        },
        cartTotal: (state) => {
            state.total = state.products.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0 )
        }
    },
})

export const { addProduct, removeProduct, clearCart, cartTotal } = cartSlice.actions
export default cartSlice.reducer