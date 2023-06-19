import { Box, CardMedia, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ResponsiveDrawer from '../sidebar/SideDrawer'
import { bold_name } from '../../theme/CssMy'
import { useNavigate } from 'react-router'
import giphy from '../../images/tick.gif'

export default function Tick() {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }, [])
    return (
        <ResponsiveDrawer>
            <Box sx={{ width: '100%', height: '80vh', display: 'flex',  justifyContent: 'center', alignItems: 'center', flexDirection: 'column', bgcolor:'white' }}>
                <img src={giphy} />
                <Typography sx={{ ...bold_name, color: 'gray' }}>Redemption Successful</Typography>
            </Box>
        </ResponsiveDrawer>
    )
}
