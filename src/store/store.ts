import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cart/cartSlice"
import statusReducer from "./status/statusSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        status: statusReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch