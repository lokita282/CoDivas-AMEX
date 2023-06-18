import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { bold_name, btn_connect, circularprog, df_jc_ac, df_jfs_ac, df_jfs_ac_fdc, link, ptag, textField } from '../../theme/CssMy'
import { useNavigate } from 'react-router'
import { signup } from '../../services/userServices'
import { useContext } from 'react'
import { codivascontext } from '../../context/MainContext'
import successHandler from '../toasts/successHandler'
import errorHandler from '../toasts/errorHandler'

export default function SignupBene() {
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)
    const { setUser, setToken } = useContext(codivascontext)
    const [json, setJson] = useState({
        aadhar: '',
        pan: '',
        phone: '',
        name: '',
        password: ''
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, [name]: value });
    }

    const clickSubmit = async () => {
        setLoad(true)
        if (json.name && json.aadhar && json.phone && json.password && json.pan) {
            await signup(json)
                .then((res) => {
                    // console.log(res.data)
                    localStorage.setItem('codivasToken', res.data.data.token)
                    localStorage.setItem('codivasUser', JSON.stringify(res.data.data.user))
                    setUser(res.data.data.user)
                    setToken(res.data.data.token)
                    successHandler(res.data.message)
                    navigate('/')
                    setLoad(false)
                }).catch((e) => {
                    errorHandler('Signup failed')
                    setLoad(false)
                })
        } else {
            !json.phone && errorHandler('Phone number cannot be empty')
            !json.password && errorHandler('Password cannot be empty')
            !json.name && errorHandler('Name cannot be empty')
            !json.aadhar && errorHandler('Aadhar number cannot be empty')
            !json.pan && errorHandler('PAN number cannot be empty')
            setLoad(false)
        }
    }

    return (
        <Box sx={{ ...df_jfs_ac, height: '100%', padding: '0 15%' }}>
            <Box sx={{ ...df_jfs_ac_fdc, width: '100%' }}>
                <Grid container spacing={3}>
                    <Grid item md={12}>
                        <Typography variant='h5' sx={{ ...bold_name }}>Good to see you!</Typography>
                    </Grid>
                    <Grid item md={6}>
                        <p style={ptag}>Name</p>
                        <TextField value={json.name} name='name' onChange={handleChange} sx={textField} placeholder='Enter your name' />
                    </Grid>
                    <Grid item md={6}>
                        <p style={ptag}>Aadhar number</p>
                        <TextField value={json.aadhar} name='aadhar' onChange={handleChange} sx={textField} placeholder='Enter your aadhar number' />
                    </Grid>
                    <Grid item md={6}>
                        <p style={ptag}>PAN number</p>
                        <TextField sx={textField} value={json.pan} name='pan' onChange={handleChange} placeholder='Enter your PAN number' />
                    </Grid>
                    <Grid item md={6}>
                        <p style={ptag}>Phone number</p>
                        <TextField value={json.phone} name='phone' onChange={handleChange} sx={textField} placeholder='Enter your phone number' />
                    </Grid>
                    <Grid item md={6}>
                        <p style={ptag}>Password</p>
                        <TextField type='password' sx={textField} value={json.password} name='password' onChange={handleChange} placeholder='Enter password' />
                    </Grid>
                    <Grid item md={6}>
                        <p style={ptag}>Confirm password</p>
                        <TextField type='password' sx={textField} placeholder='Enter confirm password' />
                    </Grid>
                    <Grid md={12} item sx={df_jfs_ac}>
                        Already have an account? &nbsp; <p style={link} onClick={() => navigate('/login')}> Login </p>
                    </Grid>
                    <Grid item md={12}>
                        {load ? <Box sx={df_jc_ac}>
                            <CircularProgress size={30} sx={circularprog} />
                        </Box> :
                            <Button sx={btn_connect} onClick={clickSubmit} >Signin as beneficiary</Button>}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
