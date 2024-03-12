import { useRef } from "react"

function PrintTest() {

  const printRef = useRef<HTMLDivElement | null>(null)

  const handlePrint = () => {
    const content: string | undefined = printRef.current?.innerHTML
    console.log(content)
    const printWindow = window.open("")

    if(printWindow && content) {
        printWindow.document.write(content)
        printWindow.document.close()
        printWindow.print()
        printWindow.close()
    } else {
        console.error("Ocurrió un error al intentar imprimir la ventana")
    }
  }

  return (
    <div>
      <div id="toprint" ref={printRef}>
        <h2>Title</h2>
        <ul>
          <li>item 1</li>
          <li>item 1</li>
          <li>item 1</li>
          <li>item 1</li>
        </ul>
      </div>
      <button onClick={handlePrint}>print</button>  
    </div>
  )
}

export default PrintTest
