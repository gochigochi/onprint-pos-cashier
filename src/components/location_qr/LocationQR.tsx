import { QRCodeCanvas } from "qrcode.react"
import { useRef, useState, useEffect } from "react"

const LocationQR = ({ setImage }) => {

    const qrRef = useRef()
    const [input, setInput] = useState({
        street: "",
        number: "",
        postcode: "",
        city: ""
    })

    const url = `https://www.google.com/maps/place/${input.street}+${input.number},+${input.postcode}+${input.city}`

    const handleSetImage = () => {
        let canvas = qrRef.current.querySelector("canvas")
        let image = canvas.toDataURL("image/png")
        setImage(image)
    }

    useEffect(() => {

        if (qrRef.current) {
            let canvas = qrRef.current.querySelector("canvas")
            let image = canvas.toDataURL("image/png")
            setImage(image)
        }

    }, [qrRef])

    return (
        <div className="p-6 flex flex-col gap-4">
            <input type="text" onChange={(e) => setInput({ ...input, street: e.target.value })} placeholder="Street" />
            <input type="text" onChange={(e) => setInput({ ...input, number: e.target.value })} placeholder="Number" />
            {/* <input type="text" onChange={(e) => setInput({ ...input, postcode: e.target.value })} placeholder="Post code" /> */}
            <input type="text" onChange={(e) => setInput({ ...input, city: e.target.value })} placeholder="City" />
            <div ref={qrRef}>
                <QRCodeCanvas
                    id="qrCode"
                    value={url}
                    size={140}
                />
            </div>
            <button onClick={handleSetImage}>SET</button>
        </div>
    )
}

export default LocationQR