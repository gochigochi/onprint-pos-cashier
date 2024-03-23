import ErrorBoundary from "../../components/error_boundary/ErrorBoundary"
import ErrorFallback from "../../components/error_fallback/ErrorFallback"
import OrdersList from "../../components/orders_list/OrdersList"

const Orders = () => {

    const errorMsg = "An error ocurred fetching orders"

    return (
        <div>
            <h2 className="section-title">Orders</h2>
            <div className="bg-white shadow-md p-4 rounded-md mt-4 min-h-[28rem]">
                <ErrorBoundary fallback={<ErrorFallback>{errorMsg}</ErrorFallback>}>
                    <OrdersList />
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default Orders