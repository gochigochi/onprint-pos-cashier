import { useState } from "react"
import { useGetOrdersQuery } from "../../store/api/apiSlice"

const OrdersList = () => {

    const [page, setPage] = useState(1)
    const { data, error, isLoading } = useGetOrdersQuery({ page: page })

    //case not found -404- or sorts
    if (error) throw Error

    console.log(data)

    return (
        <div>
            <div>
                <button onClick={() => setPage(prev => prev - 1)}>prev</button>
                <p>{page}</p>
                <button onClick={() => setPage(prev => prev + 1 )}>next</button>
            </div>
            <div className="flex flex-col divide-y-2">
                {
                    !isLoading ?
                    data?.orders.map(order => {
                        return (
                            <div key={order.id} className="py-5 px-1 flex gap-4">
                                <div className="font-semibold">{order.number}</div>
                                <div>{order.id}</div>
                                <div>{order.shipping.first_name}</div>
                                <div>{order.status}</div>
                                <div>CHF. {order.total}</div>
                            </div>
                        )
                    }) : 
                    <p>loading....</p>
                }
            </div>
        </div>
    )
}

export default OrdersList