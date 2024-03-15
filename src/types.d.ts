export type Product = {
    id: number
    name: string
    price: string
    images: ProductImage[]
}

export type Category = {
    id: number
    name: string
    slug: string
    image: ProductImage
    
}

type ProductImage = {
    id: number
    src: string
    alt: string
}

export type CartProduct = {
    id: number
    title: string
    price: number
    qty: number
}

export type Cart = {
    products: CartProduct[]
}
