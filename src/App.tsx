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

const dummyArgs = {
  "success": true,
  "data": {
    "id": 1337,
    "parent_id": 0,
    "status": "processing",
    "currency": "CHF",
    "version": "7.0.0",
    "prices_include_tax": false,
    "date_created": "2024-03-21T20:00:43",
    "date_modified": "2024-03-21T20:00:43",
    "discount_total": "0.00",
    "discount_tax": "0.00",
    "shipping_total": "0.00",
    "shipping_tax": "0.00",
    "cart_tax": "0.00",
    "total": "31.50",
    "total_tax": "0.00",
    "customer_id": 0,
    "order_key": "wc_order_IdLrDqfhmfo0Y",
    "billing": {
      "first_name": "Diego",
      "last_name": "",
      "company": "",
      "address_1": "",
      "address_2": "",
      "city": "",
      "state": "",
      "postcode": "",
      "country": "",
      "email": "",
      "phone": ""
    },
    "shipping": {
      "first_name": "Diego",
      "last_name": "",
      "company": "",
      "address_1": "Street 123",
      "address_2": "",
      "city": "Buenos Aires",
      "state": "",
      "postcode": "1661",
      "country": "Argentina",
      "phone": ""
    },
    "payment_method": "bacs",
    "payment_method_title": "Direct Bank Transfer",
    "transaction_id": "",
    "customer_ip_address": "",
    "customer_user_agent": "",
    "created_via": "rest-api",
    "customer_note": "",
    "date_completed": null,
    "date_paid": "2024-03-21T20:00:43",
    "cart_hash": "",
    "number": "169",
    "meta_data": [
      {
        "id": 27970,
        "key": "_order_number",
        "value": "169"
      },
      {
        "id": 27977,
        "key": "_new_order_email_sent",
        "value": "true"
      }
    ],
    "line_items": [
      {
        "id": 824,
        "name": "SIXTEEN",
        "product_id": 1187,
        "variation_id": 0,
        "quantity": 1,
        "tax_class": "",
        "subtotal": "14.00",
        "subtotal_tax": "0.00",
        "total": "14.00",
        "total_tax": "0.00",
        "taxes": [],
        "meta_data": [],
        "sku": "",
        "price": 14,
        "image": {
          "id": "1183",
          "src": "https://resto-demo.ch/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-20-at-15.57.40.jpeg"
        },
        "parent_name": null
      },
      {
        "id": 825,
        "name": "007 BOND",
        "product_id": 1188,
        "variation_id": 0,
        "quantity": 1,
        "tax_class": "",
        "subtotal": "17.50",
        "subtotal_tax": "0.00",
        "total": "17.50",
        "total_tax": "0.00",
        "taxes": [],
        "meta_data": [],
        "sku": "",
        "price": 17.5,
        "image": {
          "id": "1183",
          "src": "https://resto-demo.ch/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-20-at-15.57.40.jpeg"
        },
        "parent_name": null
      }
    ],
    "tax_lines": [],
    "shipping_lines": [],
    "fee_lines": [],
    "coupon_lines": [],
    "refunds": [],
    "payment_url": "https://resto-demo.ch/checkout/order-pay/1337/?pay_for_order=true&key=wc_order_IdLrDqfhmfo0Y",
    "is_editable": true,
    "needs_payment": false,
    "needs_processing": true,
    "date_created_gmt": "2024-03-21T20:00:43",
    "date_modified_gmt": "2024-03-21T20:00:43",
    "date_completed_gmt": null,
    "date_paid_gmt": "2024-03-21T20:00:43",
    "currency_symbol": "CHF",
    "_links": {
      "self": [
        {
          "href": "https://resto-demo.ch/wp-json/wc/v3/orders/1337"
        }
      ],
      "collection": [
        {
          "href": "https://resto-demo.ch/wp-json/wc/v3/orders"
        }
      ]
    }
  }
}

type OrderNotification = {
  id: number
}

function App() {

  const dispatch = useDispatch<AppDispatch>()
  const [newOrdersNotifications, setNewOrdersNotifications] = useState<OrderNotification[]>([])
  const [newOrderId, setNewOrderId] = useState(0)

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

    const notificationSound = new Audio("./notification.mp3")

    const onConnect = () => {
      console.log("connected to server")
      dispatch(setStatus({ status: true }))
    }

    const printOrder = (args) => {

      console.log("print order! ARGS...", args)

      if (!args.isStore) {
        setNewOrderId(args.data.id)
        notificationSound.play()
      }

      const items = args.data.line_items.map(item => {
        return `
          <div class="item">
            <div>${item.name}</div>
            <div>CHF.${item.price}</div>
          </div>
        `
      }).join('');

      const ticket = `
        <div>
          <h2 id="title">HTML Content Title</h2>
          <div id="items-list">
            ${items}
          </div>
          <div class="item">
            <div class="emph">Total</div>
            <div class="emph">CHF.${args.data.total}</div>
          </div>
        </div>
      `

      const html = `
            <html>
              <head>
                <title>Print</title>
                <style>

                * {
                  margin: 0;
                  padding: 0;
                }

                body {
                  padding: 25px;
                }

                #title {
                  width: 100%;
                  margin-bottom: 15px;
                }

                #items-list {
                  list-style-type: none;
                  display: flex;
                  flex-direction: column;
                  flex-gap: 3px;
                  margin-bottom: 15px;
                  border-bottom: 1px solid black;
                }

                .item {
                  display: flex;
                  justify-content: space-between;
                }

                .emph {
                  font-weight: bold;
                  font-size: 22px;
                }

                </style>
              </head>
              <body>
                ${ticket}
              </body>
            </html>
          `

      const printWindow = windowRef.current.open("")

      if (printWindow && ticket) {
        // printWindow.document.write(content)
        printWindow.document.write(html)
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

  }, [dispatch])

  const printOrderDummy = (args) => {

    console.log("print order! ARGS...", args)

    const items = args.data.line_items.map(item => {
      return `
        <div class="item">
          <div style="width: 25px;">${item.quantity}</div>
          <div style="flex: 1">${item.name}</div>
          <div>CHF.${item.price}</div>
        </div>
      `
    }).join('');

    const ticket = `
      <div>
        <div class="logo-container">
          <img class="logo" src="/assets/onprint-logo.png" alt="" />
        </div>
        <h2 class="title">OnPrint POS Demo</h2>
        <div class="company-details">
          <div>Dohlenweg 24,</div>
          <div>8050 Zürich</div>
          <div>Onprintmedia.ch</div>
          <div>info@onprintmedia.ch</div>
        </div>
        <div class="order-details">
          <div>Bestellung: #${args.data.id}</div>
          <div>Bestelldatum: ${args.data.date_created}</div>
        </div>
        <div class="items-list">
          <div class="table-header">
            <div style="width: 25px;">Qty</div>
            <div style="flex: 1;">Artikel</div>
            <div>Preis</div>
          </div>
          ${items}
        </div>
        <div class="item">
          <div>Rabatt</div>
          <div>CHF.0</div>
        </div>
        <div class="item">
          <div>Versandgebühr</div>
          <div>CHF.0</div>
        </div>
        <div class="item">
          <div class="emph">Gesamt</div>
          <div class="emph">CHF.${args.data.total}</div>
        </div>
      </div>
    `

    const html = `
          <html>
            <head>
              <title>Print Receipt</title>
              <style>

              * {
                margin: 0;
                padding: 0;
              }

              body {
                padding: 25px;
              }

              .logo-container {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .logo {
                width: 120px;
                height: 120px;
                object-fit: contain;
              }

              .title {
                width: 100%;
                margin-bottom: 15px;
                text-align: center;
              }

              .company-details {
                margin-bottom: 7.5px;
                padding-bottom: 7.5px;
                border-bottom: 1px solid black;
              }

              .table-header {
                display: flex;
                gap: 5px;
              }

              .items-list {
                list-style-type: none;
                display: flex;
                flex-direction: column;
                flex-gap: 3px;
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid black;
              }

              .item {
                display: flex;
                justify-content: space-between;
                gap: 5px;
              }

              .emph {
                font-weight: bold;
                font-size: 22px;
              }

              </style>
            </head>
            <body>
              ${ticket}
            </body>
          </html>
        `

    const printWindow = windowRef.current.open("")

    if (printWindow && ticket) {
      // printWindow.document.write(content)
      printWindow.document.write(html)
      printWindow.document.close()
      printWindow.print()
      printWindow.close()
    } else {
      console.error("Ocurrió un error al intentar imprimir la ventana")
    }
  }

  return (
    <Layout>
      <button onClick={() => printOrderDummy(dummyArgs)}>CLICK</button>

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
    </Layout>
  )
}

export default App
