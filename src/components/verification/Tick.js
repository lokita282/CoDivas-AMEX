import { Box, CardMedia, Typography } from '@mui/material'
import React from 'react'
import ResponsiveDrawer from '../sidebar/SideDrawer'
import { bold_name } from '../../theme/CssMy'

export default function Tick() {
    return (
        <ResponsiveDrawer>
            <Box sx={{ width: 100 % CardMedia, height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg className='svgg' version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                    <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                </svg>
                <Typography sx={{ ...bold_name, color: '#73AF55' }}>Redemption Successful</Typography>
            </Box>

        </ResponsiveDrawer>
    )
}
