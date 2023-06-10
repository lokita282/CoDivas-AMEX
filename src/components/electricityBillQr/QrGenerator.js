import React from 'react'
import QRCode from "react-qr-code";

const QrGenerator = () => {
  return (
    <div style={{margin: 2}}>
      <QRCode
        size={256}
        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        value='pay bill'
        viewBox={`0 0 256 256`}
      />
    </div>
  )
}

export default QrGenerator