import React from 'react'
import verif from '../../images/verification.gif'
import userverify from '../../images/userverify.json'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Box, Typography } from '@mui/material'
import {  df_jc_ac_fdc, ptag } from '../../theme/CssMy'

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: userverify,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
}

export default function Gst() {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, [5000])
    }, [])

    return (
        <Box sx={{ ...df_jc_ac_fdc, height: '100vh' }}>
            <img src={verif} />
            <Typography sx={ptag}>Verifying your GST number</Typography>
        </Box>
    )
}
