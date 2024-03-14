import React from 'react'
import QRCode from 'qr-code-styling'
export default function Qr() {
  return (
    <div>
        <QRCode 
         fgColor="#333"
         level="H"
         renderAs="svg"
         qrOptions={{
           errorCorrectionLevel: 'H',
         }}
         value={"asdsadsad"} />
    </div>
  )
}

