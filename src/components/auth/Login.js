import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { bold_name, btn_connect, circularprog, df_jc_ac, df_jfs_ac, df_jfs_ac_fdc, link, ptag, textField } from '../../theme/CssMy'
import { useNavigate } from 'react-router'
import { login } from '../../services/userServices'
import { codivascontext } from '../../context/MainContext'
import successHandler from '../toasts/successHandler'
import errorHandler from '../toasts/errorHandler'

export default function Login() {
    const navigate = useNavigate()
    const { user, setUser, token, setToken } = useContext(codivascontext)
    const [load, setLoad] = useState(false)
    const [json, setJson] = useState({
        phone: '',
        password: ''
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, [name]: value });
    }

    const clickSubmit = async () => {
        setLoad(true)
        if (json.phone && json.password) {
            await login(json)
                .then((res) => {
                    console.log(res.data)
                    localStorage.setItem('codivasToken', res.data.token)
                    localStorage.setItem('codivasUser', JSON.stringify(res.data.user))
                    setUser(res.data.user)
                    setToken(res.data.token)
                    successHandler(res.data.message)
                    navigate('/')
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
        <Box sx={{ ...df_jfs_ac, height: '100%', padding: '0 15%' }}>
          <Box sx={{ ...df_jfs_ac_fdc, width: '100%' }}>
            <Grid container rowSpacing={3}>
              <Grid item md={12}>
                <Typography variant="h5" sx={{ ...bold_name }}>
                  Welcome back!
                </Typography>
              </Grid>
              <Grid item md={12}>
                <p style={ptag}>Phone number</p>
                <TextField
                  InputProps={{
                    sx: {
                      '& input': {
                        color: '#fff',
                        border: '1px solid #fff',
                        borderRadius: '5px',
                      },
                    },
                  }}
                    placeholder="Phone number"
                  value={json.phone}
                  type="tel"
                  pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                  name="phone"
                  onChange={handleChange}
                  sx={textField}
                  //   placeholder="Phone number"
                />
              </Grid>
              <Grid item md={12}>
                <p style={ptag}>Password</p>
                <TextField
                  InputProps={{
                    sx: {
                      '& input': {
                        color: '#fff',
                        border: '1px solid #fff',
                        borderRadius: '5px',
                      },
                    },
                  }}
                  sx={textField}
                  type="password"
                  value={json.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                />
              </Grid>
              <Grid md={12} item sx={df_jfs_ac}>
                Don't have an account? &nbsp;{' '}
                <p style={link} onClick={() => navigate('/signup/beneficiary')}>
                  {' '}
                  Signup{' '}
                </p>
              </Grid>
              <Grid item md={12}>
                {load ? (
                  <Box sx={df_jc_ac}>
                    <CircularProgress size={30} sx={circularprog} />
                  </Box>
                ) : (
                  <Button sx={btn_connect} onClick={clickSubmit}>
                    Login
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </>
    )
}
