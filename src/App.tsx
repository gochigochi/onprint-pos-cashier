import { useEffect, useState, useRef } from "react"
import { socket } from "./socket"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard/Dashboard"
import Categories from "./pages/categories/Categories"
import Products from "./pages/products/Products"
import Layout from "./components/layout/Layout"
import { useDispatch } from "react-redux"
import { setStatus } from "./store/status/statusSlice"
import type { AppDispatch } from "./store/store"
import Reports from "./pages/reports/Reports"

// TODO dynamic imports!

type OrderNotification = {
  id: number
}

function App() {

  const dispatch = useDispatch<AppDispatch>()
  const [newOrdersNotifications, setNewOrdersNotifications] = useState<OrderNotification[]>([])
  const [newOrderId, setNewOrderId] = useState(0)
  const notificationSound = new Audio("./notification.mp3")

  const printRef = useRef<HTMLDivElement | null>(null)
  const windowRef = useRef(window)

  const handleClose = (id: number) => {
    console.log("X")
    const filtered = newOrdersNotifications.filter(notification => notification.id !== id)
    setNewOrdersNotifications(filtered)
  }

  // console.log(newOrdersNotifications)

  useEffect(() => {
    if (newOrderId !== 0) {
      setNewOrdersNotifications(prev => [...prev, { id: newOrderId }])
    }
  }, [newOrderId])

  useEffect(() => {

    const onConnect = () => {
      console.log("connected to server")
      dispatch(setStatus({ status: true}))
      // setConnectedToServer(true)
    }

    const printOrder = (args) => {

      // console.log("print order!", args)

      if (!args.isStore) {
        setNewOrderId(args.data.id)
        notificationSound.play()
      }

      const content: string | undefined = printRef.current?.innerHTML
      // console.log("CONTENT", content)
      const printWindow = windowRef.current.open("")

      if (printWindow && content) {
        printWindow.document.write(content)
        printWindow.document.close()
        printWindow.print()
        printWindow.close()
      } else {
        console.error("Ocurrió un error al intentar imprimir la ventana")
      }
    }

    const handlePrintOrder = (args) => printOrder(args)

    socket.on("connect", onConnect)
    socket.on("new-order", handlePrintOrder)

    return () => {
      socket.off("connect", onConnect)
      socket.off("new-order", handlePrintOrder)
    }

  }, [dispatch, notificationSound])

  return (
    <Layout>

      {/* <SideBar connectedToServer={connectedToServer} /> */}
      <main className="@container/main flex-1 py-6 px-4 bg-indigo-50/50 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<Products />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>

      {/* NOTIFICATIONS BAR */}
      <div className="absolute z-50 right-0 top-0 h-screen w-80 p-2 flex flex-col gap-2 pointer-events-none">
        {
          newOrdersNotifications.length !== 0 ?
            newOrdersNotifications.map(notification => {
              return (
                <div key={notification.id} onClick={() => handleClose(notification.id)} className="bg-white rounded-md p-3 shadow-md cursor-pointer pointer-events-auto">
                  <p>Tenes un nuevo pedido <span>[id: {notification.id}]</span></p>
                </div>
              )
            }) : null
        }
      </div>

      {/* TO PRINT */}
      <div className="opacity-0 absolute -top-80">
        <div id="toprint" ref={printRef}>
          <h2>Title</h2>
          <ul>
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
            <li>item 4</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default App
