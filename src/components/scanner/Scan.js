import React, { useState } from 'react';
import QrReader from 'modern-react-qr-reader';
import { useNavigate } from 'react-router';
import { validate } from '../../services/merchantServices';
import errorHandler from '../toasts/errorHandler';
import { Box, Button, TextField } from '@mui/material';
import { btn_connect, df_jc_ac, df_jc_ac_fdc, df_jfs_ac_fdc, ptag, textField } from '../../theme/CssMy';

export default function Scan() {
    const [result, setResult] = useState('No result');
    const [amount, setAmount] = useState(0)
    const [id, setId] = useState('')
    const [showqr, setShowQR] = useState(true)
    const navigate = useNavigate()
    const handleScan = async (data) => {
        if (data) {
            const regex = /xxx-(.*?)-xxx/;
            const match = data.match(regex);
            console.log(match)
            
            if (match && match.length > 1) {
                const extractedText = match[1]
                setResult(extractedText)
                await validate({ encryptedString: extractedText }).then((res) => {
                    console.log(res.data)
                    if (res.data.success) {
                        setShowQR(false)
                        setId(res.data.voucherId)
                    } else {
                        navigate('/')
                        errorHandler(res.data.message)
                    }
                })
                console.log(result);
            }
        }
    };

    const handleError = (err) => {
        console.log(err);
    };

    return (
        <div>
            {showqr ? <>
            <Box sx={{height:'100vh'}}>
                <QrReader
                
                    delay={500}
                    facingMode={'environment'}
                    onError={handleError}
                    onScan={handleScan}
                />
            </Box>
                {/* <p>{result}</p> */}
            </> : <Box sx={{ height: '90vh', ...df_jfs_ac_fdc }}>
                <p style={ptag}>Enter the amount to redeem</p>
                <TextField sx={{ ...textField, marginBottom: '10%' }} value={amount} onChange={(e) => setAmount(e.target.value)} />
                <Button onClick={() => navigate(`/scan-verify/${id}/${amount}`)} sx={btn_connect}>Continue</Button>
            </Box>}

        </div>
    );
}

