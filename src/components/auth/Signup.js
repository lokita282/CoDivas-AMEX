import React from 'react'
import { bold_name, btn_connect, circularImage, circularprog, df_jc_ac, df_jc_ac_fdc, df_jfs_ac, df_jfs_ac_fdc, link, ptag, textField } from '../../theme/CssMy'
import { Box, Button, CardMedia, CircularProgress, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import img from '../../images/img.png'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useContext } from 'react'
import { merchant } from '../../context/MainContext'
import { signup } from '../../services/merchantServices'
import errorHandler from '../toasts/errorHandler'
import successHandler from '../toasts/succesHandler'


export default function Signup() {
    const [category, setCategory] = useState('')
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)
    const { setUser, setToken } = useContext(merchant)
    const [json, setJson] = useState({
        aadhar: "",
        pan: "",
        name: "",
        phone: "",
        password: "",
        gstNo: "",
        bankAccountDetails: {
            accountNumber: "",
            bankName: "",
            branch: "",
            ifscCode: ""
        },
        category: ""
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, [name]: value });
    }

    const handleBank = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, bankAccountDetails: { ...json.bankAccountDetails, [name]: value } });
    }

    const clickSubmit = async () => {
        setLoad(true)
        if (json.name && json.aadhar && json.phone && json.password && json.pan && json.gstNo && json.bankAccountDetails.accountNumber && json.bankAccountDetails.bankName
            && json.bankAccountDetails.branch && json.bankAccountDetails.ifscCode && json.category) {
            await signup(json)
                .then((res) => {
                    console.log(res.data)
                    localStorage.setItem('codivasToken', res.data.data.token)
                    localStorage.setItem('codivasUser', JSON.stringify(res.data.data.user))
                    setUser(res.data.data.user)
                    setToken(res.data.data.token)
                    navigate('/gst')
                    setLoad(false)
                }).catch((e) => {
                    console.log(e)
                    errorHandler(e.response.data.message)
                    setLoad(false)
                })
        } else {
            !json.phone && errorHandler('Phone number cannot be empty')
            !json.password && errorHandler('Password cannot be empty')
            !json.name && errorHandler('Name cannot be empty')
            !json.aadhar && errorHandler('Aadhar number cannot be empty')
            !json.pan && errorHandler('PAN number cannot be empty')
            !json.bankAccountDetails.accountNumber && errorHandler('Enter account number')
            !json.bankAccountDetails.bankName && errorHandler('Enter bank name')
            !json.bankAccountDetails.branch && errorHandler('Enter branch name')
            !json.bankAccountDetails.ifscCode && errorHandler('Enter IFSC code')
            !json.category && errorHandler('Add category')
            setLoad(false)
        }
    }

    console.log(json)

    return (
        <>
            <CardMedia sx={{ width: '100%', zIndex: '-1' }} component='img' image={img} />
            <Box sx={{ marginTop: '-10%', width: '100%', position: 'absolute', zIndex: '1000', padding: '5%' }}>
                <Grid container sx={{ ...df_jfs_ac_fdc, backgroundColor: 'white', width: '90vw', padding: '5%', borderRadius: '10px' }}>
                    <Typography variant='h5' sx={{ ...bold_name, textAlign: 'left' }}>Signup</Typography>
                    <Typography variant='p' sx={{ ...bold_name, textAlign: 'left', marginTop: '10%', color: '#6A707F' }}>Basic Details</Typography>

                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Owner name</p>
                        <TextField value={json.name} onChange={handleChange} name='name' sx={textField} placeholder='Enter name' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Phone no.</p>
                        <TextField value={json.phone} onChange={handleChange} name='phone' sx={textField} placeholder='Phone number' />
                    </Grid>

                    <Typography variant='p' sx={{ ...bold_name, textAlign: 'left', marginTop: '10%', color: '#6A707F' }}>Bank account details</Typography>

                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>IFSC code</p>
                        <TextField value={json.bankAccountDetails.ifscCode} onChange={handleBank} name='ifscCode' sx={textField} placeholder='Enter IFSC code' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Bank name</p>
                        <TextField value={json.bankAccountDetails.bankName} onChange={handleBank} name='bankName' sx={textField} placeholder='Enter bank name' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Branch name</p>
                        <TextField value={json.bankAccountDetails.branch} onChange={handleBank} name='branch' sx={textField} placeholder='Enter branch name' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Account no.</p>
                        <TextField value={json.bankAccountDetails.accountNumber} onChange={handleBank} name='accountNumber' sx={textField} placeholder='Enter account number' />
                    </Grid>

                    <Typography variant='p' sx={{ ...bold_name, textAlign: 'left', marginTop: '10%', color: '#6A707F' }}>Account details</Typography>

                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Category</p>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={json.category}
                            name='category'
                            sx={textField}
                            onChange={handleChange}
                        >
                            <MenuItem value={'health'}>Health</MenuItem>
                            <MenuItem value={'agriculture'}>Agriculture</MenuItem>
                            <MenuItem value={'education'}>Education</MenuItem>
                            <MenuItem value={'food'}>Food</MenuItem>
                            <MenuItem value={'housing'}>Housing</MenuItem>
                            <MenuItem value={'transportation'}>Transportation</MenuItem>
                            <MenuItem value={'utility'}>Utility</MenuItem>
                            <MenuItem value={'telecommunication'}>Telecommunication</MenuItem>
                            <MenuItem value={'other'}>Other</MenuItem>

                        </Select>
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>PAN number</p>
                        <TextField value={json.pan} onChange={handleChange} name='pan' sx={textField} placeholder='Enter PAN number' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Aadhar number</p>
                        <TextField value={json.aadhar} onChange={handleChange} name='aadhar' sx={textField} placeholder='Enter aadhar card number' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>GST number</p>
                        <TextField value={json.gstNo} onChange={handleChange} name='gstNo' sx={textField} placeholder='Enter GST number' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Password</p>
                        <TextField value={json.password} onChange={handleChange} name='password' sx={textField} placeholder='Password' type='password' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%', ...df_jfs_ac }}>
                        Already have an account? &nbsp; <p style={link} onClick={() => navigate('/')}> Login </p>
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        {load ? <Box sx={df_jc_ac}>
                            <CircularProgress size={30} sx={circularprog} />
                        </Box> :
                            <Button sx={btn_connect} onClick={clickSubmit} >Signup as merchant</Button>}
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}
