import React from 'react'
import ReactInputVerificationCode from 'react-input-verification-code'
import { bold_name, btn_connect, df_jc_ac, df_jc_ac_fdc, link, ptag } from '../../theme/CssMy'
import { Box, Button, Divider, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

export default function VerificationCode() {
    const navigate = useNavigate()
    return (
        <Box sx={{ ...df_jc_ac_fdc, height: '80vh', padding: '15%' }}>
            <Typography sx={{ ...bold_name, marginBottom: '5%' }}>Verification Code</Typography>
            <Typography sx={{ ...ptag, textAlign: 'center', marginBottom: '10%' }}>Please ask the beneficiary to check their messages</Typography>
            <div className="custom-styles">
                <ReactInputVerificationCode
                    autoFocus
                    placeholder=""
                    onChange={console.log}
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
                <Button onClick={() => navigate('/scan-tick')} sx={{ ...btn_connect, backgroundColor: '#375EC0', color: 'white', width: '100%', '&:hover': { color: '#375EC0' } }}>Continue</Button>

            </div>
        </Box>
    )
}
