import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { scanSMS } from '../../services/merchantServices';
import errorHandler from '../toasts/errorHandler'
import { Box, Button, TextField } from '@mui/material';
import { btn_connect, df_jc_ac, df_jfs_ac_fdc, ptag, textField } from '../../theme/CssMy';
import { useNavigate } from 'react-router';
import Loading from '../loader/Loading';

export default function ScanMessage() {
  const navigate = useNavigate()
  const webcamRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [text, setText] = useState('')
  const [amount, setAmount] = useState(0)
  const [id, setId] = useState('')
  const [showqr, setShowQR] = useState(true)

  const startScanning = async () => {
    setScanning(true);
    const imageSrc = webcamRef.current.getScreenshot();

    // Convert data URI to blob
    const blob = await fetch(imageSrc).then((res) => res.blob());

    // Create a new file from the blob
    const file = new File([blob], 'scannedImage.jpeg', { type: blob.type });

    const formData = new FormData();
    formData.append('image', file);

    const options = {
      method: 'POST',
      url: 'https://ocr-extract-text.p.rapidapi.com/ocr',
      headers: {
        'X-RapidAPI-Key': 'af73b8ac20msh94a9eb297e6e2adp1f5bc4jsn7a6fad7ded4d',
        'X-RapidAPI-Host': 'ocr-extract-text.p.rapidapi.com'
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      // setText(response.data.text);
      console.log(response.data.text)
      const cleanedString = response.data.text.replace(/\n/g, "");
      const regex = /xxx-(.*?)-xxx/g;
      const extractedData = cleanedString.match(regex)?.map(match => match.replace(/xxx-|-xxx/g, ""));

console.log(extractedData)
      console.log(extractedData[0]);
      setText(extractedData[0]);
      let res = await scanSMS({"encryptedString" :extractedData[0] })
      if(res.data.success){
        setShowQR(false)
        setId(res.data.voucherId)
      }else{
        navigate('/')
        errorHandler(res.data.message)
      }
    } catch (error) {
      console.error(error);
    }

    setScanning(false);
  };

  const scanningStyle = {
    backgroundColor: '#375EC0',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1.5rem',
  };

  const buttonStyle = {
    backgroundColor: '#375EC0',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  return (
    <>{showqr ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '100%', margin: '1rem' }}>
        {scanning ? (
          <Box sx={{...df_jc_ac, width:'100%'}}>
                    <Loading/>
                    </Box>
        ) : (
          <Webcam
            audio={false}
            mirrored={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'environment' }}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
      </div>
      <button onClick={startScanning} style={buttonStyle} disabled={scanning}>
        {scanning ? 'Scanning' : 'Capture and Convert'}
      </button>
      <p>{text}</p>
    </div>: <Box sx={{ height: '90vh', ...df_jfs_ac_fdc }}>
                <p style={ptag}>Enter the amount to redeem</p>
                <TextField sx={{ ...textField, marginBottom: '10%' }} value={amount} onChange={(e) => setAmount(e.target.value)} />
                <Button onClick={() => navigate(`/scan-verify/${id}/${amount}`)} sx={btn_connect}>Continue</Button>
            </Box>}
            </>
  );
}
