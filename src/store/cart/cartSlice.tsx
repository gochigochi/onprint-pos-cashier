type CartProduct = {
    id: number
    title: string
    price: number
}

type Cart = {
    products: CartProduct[]
    total: number
}

const initialState: Cart = {
    products: [],
    total: 0
}