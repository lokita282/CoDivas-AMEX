import React, { useEffect, useState } from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import { getTrans } from '../services/userServices'
import { Avatar, Box, CardContent, Grid, Typography } from '@mui/material'
import Loading from '../components/loader/Loading'
import { bold_name, df_jc_ac, df_jfs_ac_fdc, ptag } from '../theme/CssMy'
import moment from 'moment'

export default function TransactionPage() {
    const [trans, setTrans] = useState([])

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        const func = async() => {
            let res = await getTrans()
            console.log(res.data.data)
            setTrans(res.data.data)
        }
        func()
    }, [])

  return (
    <SideDrawer>
        {
            !trans.length ? <Box sx={{ width: '100%',height:'85vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Loading />
          </Box> :<Grid container sx={{padding:{md:'0% 30%', xs:'2%'}}}>
          <Typography variant='v5' sx={bold_name}>Transaction History</Typography>
            {
                trans.slice(0).reverse().map((tr, i) => {
                        return <Grid key={i} item xs={12} sx={{marginTop:'3%'}}>
                            <CardContent sx={{ width: '100%', backgroundColor: 'white', marginRight: '3%', borderRadius: '10px', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)' }}>
                                <Grid container>
                                    <Grid item xs={2} sx={df_jc_ac}>
                                        <Avatar  sx={{ bgcolor: getRandomColor() }}>{tr.payee.slice(0,1)}</Avatar>
                                    </Grid>
                                    <Grid item xs={6} sx={df_jfs_ac_fdc}>
                                        <Typography sx={{ ...bold_name, fontSize: '14px' }}>{tr.payee}</Typography>
                                        <Typography sx={{ ...ptag, fontSize: '10px' }}>{moment(tr.datetime).format("MMMM DD, YYYY h:mmA")}</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={df_jc_ac}>
                                        <Typography sx={{ ...bold_name, fontSize: '14px' }}>₹ {tr.amount}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                    })
            }
          </Grid>
        }
    </SideDrawer>
  )
}
