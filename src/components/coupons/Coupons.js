import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getCategoryCoupon } from '../../services/userServices'
import { Avatar, AvatarGroup, Box, CardContent, Grid, Typography } from '@mui/material'
import { bold_name, card, df_jfs_ac, ptag } from '../../theme/CssMy'
import moment from 'moment/moment'
import BasicModal from './Modal'

export default function Coupons() {
    const params = useParams()
    const [cat, setCat] = useState([])
    const [solo, setSolo] = useState(null)
    const [qrString, setQRString] = useState('')
    const [open, setOpen] = useState(false)
    const category = params.category
    console.log(category)

    useEffect(() => {
        const func = async () => {
            await getCategoryCoupon(category
            )
                .then((res) => {
                    console.log(res.data.data)
                    setCat(res.data.data)
                })
        }
        func()
    }, [])

    return (
        <>
            {
                cat && <Box>
                    <Grid container spacing={3}>
                        <Grid item md={4}>
                            <Typography variant='h6' sx={{ backgroundColor: '#375EC0', padding: '10px', borderRadius: '5px', color: 'white' }}>Not Redeemed</Typography>
                            {
                                cat.map((ca, i) => {
                                    if (moment(ca.startsAt).unix() > moment().unix() && ca.balanceAmount !== 0) {
                                        return <Box onClick={() => {
                                            setQRString(ca.uid)
                                            setSolo(ca)
                                            setOpen(true)
                                        }} key={i} sx={{ marginTop: '5%', cursor: 'pointer', ...card, height: 'auto', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                <AvatarGroup sx={{ marginRight: '5%' }}>
                                                    <Avatar src={ca.issuedByLogo} />
                                                    <Avatar src={ca.orgLogo} />
                                                </AvatarGroup>
                                                <Typography variant='p' sx={bold_name}>{ca.title}</Typography>
                                            </div>
                                            <Grid container spacing={2} sx={{ marginTop: '5%', padding: '5%' }}>
                                                <Grid item md={5.5} sx={{ backgroundColor: '#EBFBF6', borderRadius: '5px' }}>
                                                    <Typography sx={{ padding: '5px', ...ptag }}>Balance</Typography>
                                                    <Typography variant='h5' sx={bold_name}>₹ {ca.balanceAmount}</Typography>
                                                </Grid>
                                                <Grid item md={1}></Grid>
                                                <Grid item md={5.5} sx={{ backgroundColor: '#FDEDEE', borderRadius: '5px' }}>
                                                    <Typography sx={{ padding: '5px', ...ptag }}>Redeemed</Typography>
                                                    <Typography variant='h5' sx={bold_name}>₹ {ca.amount - ca.balanceAmount}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    }
                                })
                            }
                        </Grid>
                        <Grid item md={4}>
                            <Typography variant='h6' sx={{ backgroundColor: '#375EC0', padding: '10px', borderRadius: '5px', color: 'white' }}>Redeemed</Typography>
                            {
                                cat.map((ca, i) => {
                                    if (ca.balanceAmount === 0) {
                                        return <Box key={i} sx={{ marginTop: '5%', ...card, height: 'auto', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                <AvatarGroup sx={{ marginRight: '5%' }}>
                                                    <Avatar src={ca.issuedByLogo} />
                                                    <Avatar src={ca.orgLogo} />
                                                </AvatarGroup>
                                                <Typography variant='p' sx={bold_name}>{ca.title}</Typography>
                                            </div>
                                            <Grid container spacing={2} sx={{ marginTop: '5%', padding: '5%' }}>
                                                <Grid item md={5.5} sx={{ backgroundColor: '#EBFBF6', borderRadius: '5px' }}>
                                                    <Typography sx={{ padding: '5px', ...ptag }}>Balance</Typography>
                                                    <Typography variant='h5' sx={bold_name}>₹ {ca.balanceAmount}</Typography>
                                                </Grid>
                                                <Grid item md={1}></Grid>
                                                <Grid item md={5.5} sx={{ backgroundColor: '#FDEDEE', borderRadius: '5px' }}>
                                                    <Typography sx={{ padding: '5px', ...ptag }}>Redeemed</Typography>
                                                    <Typography variant='h5' sx={bold_name}>₹ {ca.amount - ca.balanceAmount}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    }
                                })
                            }
                        </Grid>
                        <Grid item md={4}>
                            <Typography variant='h6' sx={{ backgroundColor: '#375EC0', padding: '10px', borderRadius: '5px', color: 'white' }}>Expired</Typography>
                            {
                                cat.map((ca, i) => {
                                    if (moment(ca.startsAt).unix() < moment().unix()) {
                                        return <Box key={i} sx={{ marginTop: '5%', ...card, height: 'auto', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                <AvatarGroup sx={{ marginRight: '5%' }}>
                                                    <Avatar src={ca.issuedByLogo} />
                                                    <Avatar src={ca.orgLogo} />
                                                </AvatarGroup>
                                                <Typography variant='p' sx={bold_name}>{ca.title}</Typography>
                                            </div>
                                            <Grid container spacing={2} sx={{ marginTop: '5%', padding: '5%' }}>
                                                <Grid item md={5.5} sx={{ backgroundColor: '#EBFBF6', borderRadius: '5px' }}>
                                                    <Typography sx={{ padding: '5px', ...ptag }}>Balance</Typography>
                                                    <Typography variant='h5' sx={bold_name}>₹ {ca.balanceAmount}</Typography>
                                                </Grid>
                                                <Grid item md={1}></Grid>
                                                <Grid item md={5.5} sx={{ backgroundColor: '#FDEDEE', borderRadius: '5px' }}>
                                                    <Typography sx={{ padding: '5px', ...ptag }}>Redeemed</Typography>
                                                    <Typography variant='h5' sx={bold_name}>₹ {ca.amount - ca.balanceAmount}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    }
                                })
                            }
                        </Grid>
                    </Grid>
                </Box>
            }
            <BasicModal open={open} setOpen={setOpen} string={qrString} solo={solo} />
        </>
    )
}
