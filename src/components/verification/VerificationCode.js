import React from 'react'
import ReactInputVerificationCode from 'react-input-verification-code'
import { bold_name, btn_connect, df_jc_ac, df_jc_ac_fdc, link, ptag } from '../../theme/CssMy'
import { Box, Button, Divider, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { useState } from 'react'
import { redeem } from '../../services/merchantServices'
import successHandler from '../toasts/succesHandler'

export default function VerificationCode() {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const amount = params.amount
    const [code, setCode] = useState()
    
    const clicked = async () => {
        await redeem({
            "voucherId": id,
            "verificationCode": parseInt(code),
            "transactionAmount": parseInt(amount)
        })
            .then((res) => {
                console.log(res)
                if(res.data.success){
                    navigate('/scan-tick')
                }else{
                    successHandler("Voucher Redeemed!")
                    navigate('/')
                }
            }).catch((e) => console.log(e))
    }

    console.log(code)
    return (
        <Box sx={{ ...df_jc_ac_fdc, height: '80vh', padding: '15%' }}>
            <Typography sx={{ ...bold_name, marginBottom: '5%' }}>Verification Code</Typography>
            <Typography sx={{ ...ptag, textAlign: 'center', marginBottom: '10%' }}>Please ask the beneficiary to check their messages</Typography>
            <div className="custom-styles">
                <ReactInputVerificationCode
                    autoFocus
                    placeholder=""
                    onChange={(e) => setCode(e)}
                />
            </div>
            <div style={{ marginTop: '10%', ...df_jc_ac }}>
                <p style={ptag}>
                    Didn't get a code? &nbsp;
                </p>
                <p style={{ ...ptag, ...link }} onClick={() => console.log('clicked')}> Click to resend </p>
            </div>
            <Divider />
            <div style={{ ...df_jc_ac, width: '100%', marginTop: '10%' }}>
                <Button onClick={() => navigate('/scan')} sx={{ ...btn_connect, width: '100%', marginRight: '5%' }}>Cancel</Button>
                <Button onClick={clicked} sx={{ ...btn_connect, backgroundColor: '#375EC0', color: 'white', width: '100%', '&:hover': { color: '#375EC0' } }}>Continue</Button>

            </div>
        </Box>
    )
}
