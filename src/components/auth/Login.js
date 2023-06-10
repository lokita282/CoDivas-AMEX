import React from 'react'
import { bold_name, btn_connect, circularImage, df_jc_ac, df_jc_ac_fdc, df_jfs_ac, df_jfs_ac_fdc, link, ptag, textField } from '../../theme/CssMy'
import { Box, Button, CardMedia, Grid, TextField, Typography } from '@mui/material'
import img from '../../images/img.png'
import { useNavigate } from 'react-router'


export default function Login() {
    const navigate = useNavigate()
    return (
        <>
            <CardMedia sx={{ width: '100%', zIndex: '-1' }} component='img' image={img} />
            <Box sx={{ marginTop: '-10%', width: '100%', position: 'absolute', zIndex: '1000', padding: '5%' }}>
                <Grid container sx={{ ...df_jfs_ac_fdc, backgroundColor: 'white', width: '90vw', padding: '5%', borderRadius: '10px' }}>
                    <Typography variant='h5' sx={{ ...bold_name, textAlign: 'left' }}>Login</Typography>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Phone no.</p>
                        <TextField sx={textField} placeholder='Phone number' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Password</p>
                        <TextField sx={textField} placeholder='Password' type='password' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%', ...df_jfs_ac }}>
                        Don't have an account? &nbsp; <p style={link} onClick={() => navigate('/signup')}> Signup </p>
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <Button sx={btn_connect} onClick={() => navigate('/dashboard')} >Login as merchant</Button>
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}
