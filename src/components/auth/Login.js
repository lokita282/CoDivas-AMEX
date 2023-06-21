import React from 'react'
import { bold_name, btn_connect, circularImage, circularprog, df_jc_ac, df_jc_ac_fdc, df_jfs_ac, df_jfs_ac_fdc, link, ptag, textField } from '../../theme/CssMy'
import { Box, Button, CardMedia, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import img from '../../images/img.png'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { login } from '../../services/merchantServices'
import { useContext } from 'react'
import { merchant } from '../../context/MainContext'
import successHandler from '../toasts/succesHandler'
import errorHandler from '../toasts/errorHandler'


export default function Login() {
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)
    const { user, setUser, token, setToken } = useContext(merchant)
    const [json, setJson] = useState({
        phone: '',
        password: ''
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, [name]: value });
    }

    const clicked = async () => {
        setLoad(true)
        if (json.phone && json.password) {
            await login(json)
                .then((res) => {
                    if(res.data.user.type === "merchant"){
                        console.log(res.data)
                        localStorage.setItem('codivasToken', res.data.token)
                        localStorage.setItem('codivasUser', JSON.stringify(res.data.user))
                        setUser(res.data.user)
                        setToken(res.data.token)
                        successHandler(res.data.message)
                        navigate('/')
                    }else{
                        successHandler("User is not allowed to login")
                        navigate('/login')
                    }
                    setLoad(false)
                }).catch((e) => {
                    errorHandler('Login failed')
                    setLoad(false)
                })
        } else {
            !json.phone && errorHandler('Phone number cannot be empty')
            !json.password && errorHandler('Password cannot be empty')
            setLoad(false)
        }
    }

    return (
        <>
            <CardMedia sx={{ width: '100%', zIndex: '-1' }} component='img' image={img} />
            <Box sx={{ marginTop: '-10%', width: '100%', position: 'absolute', zIndex: '1000', padding: '5%' }}>
                <Grid container sx={{ ...df_jfs_ac_fdc, backgroundColor: 'white', width: '90vw', padding: '5%', borderRadius: '10px' }}>
                    <Typography variant='h5' sx={{ ...bold_name, textAlign: 'left' }}>Login</Typography>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Phone no.</p>
                        <TextField sx={textField} value={json.phone} onChange={handleChange} name='phone' placeholder='Phone number' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Password</p>
                        <TextField sx={textField} value={json.password} onChange={handleChange} name='password' placeholder='Password' type='password' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%', ...df_jfs_ac }}>
                        Don't have an account? &nbsp; <p style={link} onClick={() => navigate('/signup')}> Signup </p>
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        {load ? <Box sx={df_jc_ac}>
                            <CircularProgress size={30} sx={circularprog} />
                        </Box> :
                            <Button sx={btn_connect} onClick={clicked} >Login as merchant</Button>}

                    </Grid>
                </Grid>

            </Box>
        </>
    )
}
