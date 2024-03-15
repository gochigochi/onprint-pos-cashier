const Cart = () => {

    const products = [
        {
            id: 1,
            title: "Producto prueba 1 with very long sentence as it is this one",
            qty: 2,
            price: 10,
        },
        {
            id: 2,
            title: "Producto prueba 2",
            qty: 4,
            price: 10,
        },
        {
            id: 3,
            title: "Producto prueba 3",
            qty: 1,
            price: 10,
        },
    ]

    const handleDelete = (id: number) => {
        console.log(id)
    }

    return (
        <div className="bg-white flex flex-col basis-[450px] max-w-[450px] pt-8">
            <ul className="divide-y flex flex-col flex-1 overflow-auto px-4">
                {
                    products.map(product => (
                        <li key={product.id} className="flex py-4 justify-between">
                            <div className="flex gap-2">
                                <p className="font-semibold">{product.qty}</p>
                                <h3 className="truncate max-w-60">{product.title}</h3>
                            </div>
                            <div className="flex gap-10">
                                <p className="font-semibold">${product.price}</p>
                                <button onClick={() => handleDelete(product.id)} className="text-red-500 cursor-pointer" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <dl className="divide-y border-t">
                <div className="flex justify-between p-4">
                    <dt>Subtotal</dt>
                    <dl>$500</dl>
                </div>
                <div className="flex justify-between p-4">
                    <dt className="text-xl font-semibold">Total</dt>
                    <dl className="text-xl font-bold">$550</dl>
                </div>
            </dl>
            <div className="grid grid-cols-12 gap-2 p-4">
                <button className="ghost-button col-span-4">Clear</button>
                <button className="primary-button col-span-8">Pay</button>
            </div>
        </div>
    )
}

export default Cart