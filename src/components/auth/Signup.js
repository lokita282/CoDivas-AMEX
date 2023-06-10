import React from 'react'
import { bold_name, btn_connect, circularImage, df_jc_ac, df_jc_ac_fdc, df_jfs_ac, df_jfs_ac_fdc, link, ptag, textField } from '../../theme/CssMy'
import { Box, Button, CardMedia, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import img from '../../images/img.png'
import { useNavigate } from 'react-router'
import { useState } from 'react'


export default function Signup() {
    const [category, setCategory] = useState('')
    const navigate = useNavigate()
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    return (
        <>
            <CardMedia sx={{ width: '100%', zIndex: '-1' }} component='img' image={img} />
            <Box sx={{ marginTop: '-10%', width: '100%', position: 'absolute', zIndex: '1000', padding: '5%' }}>
                <Grid container sx={{ ...df_jfs_ac_fdc, backgroundColor: 'white', width: '90vw', padding: '5%', borderRadius: '10px' }}>
                    <Typography variant='h5' sx={{ ...bold_name, textAlign: 'left' }}>Signup</Typography>
                    <Typography variant='p' sx={{ ...bold_name, textAlign: 'left', marginTop: '10%', color: '#6A707F' }}>Basic Details</Typography>

                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Owner name</p>
                        <TextField sx={textField} placeholder='Enter name' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Phone no.</p>
                        <TextField sx={textField} placeholder='Phone number' />
                    </Grid>

                    <Typography variant='p' sx={{ ...bold_name, textAlign: 'left', marginTop: '10%', color: '#6A707F' }}>Bank account details</Typography>

                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>IFSC code</p>
                        <TextField sx={textField} placeholder='Enter IFSC code' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Branch name</p>
                        <TextField sx={textField} placeholder='Enter branch name' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Account no.</p>
                        <TextField sx={textField} placeholder='Enter account number' />
                    </Grid>

                    <Typography variant='p' sx={{ ...bold_name, textAlign: 'left', marginTop: '10%', color: '#6A707F' }}>Account details</Typography>

                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Category</p>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            sx={textField}
                            onChange={handleChange}
                        >
                            <MenuItem value={'Health'}>Health</MenuItem>
                            <MenuItem value={'Agriculture'}>Agriculture</MenuItem>
                            <MenuItem value={'Education'}>Education</MenuItem>
                            <MenuItem value={'Food'}>Food</MenuItem>
                            <MenuItem value={'Housing'}>Housing</MenuItem>
                            <MenuItem value={'Transportation'}>Transportation</MenuItem>
                            <MenuItem value={'Utility'}>Utility</MenuItem>
                            <MenuItem value={'Telecommunication'}>Telecommunication</MenuItem>
                            <MenuItem value={'Other'}>Other</MenuItem>

                        </Select>
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <p style={ptag}>Password</p>
                        <TextField sx={textField} placeholder='Password' type='password' />
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%', ...df_jfs_ac }}>
                        Already have an account? &nbsp; <p style={link} onClick={() => navigate('/')}> Login </p>
                    </Grid>
                    <Grid item md={12} lg={12} sx={{ width: '100%', marginTop: '5%' }}>
                        <Button sx={btn_connect} onClick={() => navigate('/dashboard')} >Signup as merchant</Button>
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}
