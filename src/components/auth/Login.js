import { Box, Button, Grid, Switch, TextField, Typography } from '@mui/material'
import React from 'react'
import { bold_name, btn_connect, df_jc_ac, df_jfs_ac, df_jfs_ac_fdc, link, ptag, textField } from '../../theme/CssMy'
import { useNavigate } from 'react-router'

export default function Login() {
    const navigate = useNavigate()
    return (
        <>
            <Box sx={{ ...df_jfs_ac, height: '100%', padding: '0 15%' }}>
                <Box sx={{ ...df_jfs_ac_fdc, width: '100%' }}>
                    <Grid container rowSpacing={3}>
                        <Grid item md={12}>
                            <Typography variant='h5' sx={{ ...bold_name }}>Welcome back!</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <TextField sx={textField} placeholder='Phone number' />
                        </Grid>
                        <Grid item md={12}>
                            <TextField sx={textField} placeholder='Password' />
                        </Grid>
                        <Grid md={12} item sx={df_jfs_ac}>
                            Don't have an account? &nbsp; <p style={link} onClick={() => navigate('/signup/beneficiary')}> Signup </p>
                        </Grid>
                        <Grid item md={12}>
                            <Button sx={btn_connect} onClick={() => navigate('/dashboard')} >Signin as beneficiary</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
