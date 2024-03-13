import { useEffect, useState, useRef } from "react"
// import axios from "axios"
import { socket } from "./socket"

function App() {

  const [connectedToServer, setConnectedToServer] = useState(false)
  const printRef = useRef<HTMLDivElement | null>(null)
  const windowRef = useRef(window)

  useEffect(() => {

    const onConnect = () => {
      console.log("connected to server")
      setConnectedToServer(true)
    }

    const printOrder = (args) => {

      console.log("print order!", args)

      const content: string | undefined = printRef.current?.innerHTML
      console.log("CONTENT", content)
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

  }, [])

  useEffect(() => {
    //FETCH ORDERS
    // axios.get("/api/users")
    // .then(res => setUsers(res.data))
    // .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div className={`w-2 h-2 rounded-full ${connectedToServer ? "bg-green-400" : "bg-red-500"}`}></div>
      <div>Client Side</div>
      <div id="toprint" ref={printRef}>
        <h2>Title</h2>
        <ul>
          <li>item 1</li>
          <li>item 1</li>
          <li>item 1</li>
          <li>item 1</li>
        </ul>
      </div>
      <div></div>
    </>
  )
}

export default App
