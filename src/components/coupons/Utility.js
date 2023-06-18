import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getCategoryCoupon, getSoloCoupon } from '../../services/userServices'
import { Avatar, AvatarGroup, Box, CardContent, Grid, Typography } from '@mui/material'
import { bold_name, card, df_jc_ac, df_jfs_ac, ptag } from '../../theme/CssMy'
import moment from 'moment/moment'
import BasicModal from './Modal'
import { Icon } from '@iconify/react'
import Loading from '../loader/Loading'
import UtilityModal from './UtilityModal'

export default function Utility() {
    const navigate = useNavigate()
    const [cat, setCat] = useState([])
    const [solo, setSolo] = useState(null)
    const [qrString, setQRString] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading]  = useState(false)
    const category = 'utility'
    console.log(category)

    useEffect(() => {
        setLoading(true)
        const func = async () => {
            await getCategoryCoupon(category)
                .then((res) => {
                    console.log(res.data.data)
                    setCat(res.data.data)
                })
                setLoading(false)
        }
        func()
    }, [])

    const currentDate = moment();
    
  return (
    <>
        {
                loading ? <Box sx={{...df_jc_ac, height:'80vh'}}>
                    <Loading/>
                </Box> : cat && <Box>
                <Box sx={{display:'flex'}}>
                <Icon icon="ep:arrow-left-bold" onClick={() => navigate('/')} style={{padding:'0.4%',backgroundColor: '#375EC05c', borderRadius:'50px', color:'white', marginRight:'1%', cursor:'pointer'}} />
                <Typography sx={{...bold_name, marginBottom:'3%'}}>{category.toLocaleUpperCase()}</Typography>
                </Box>
                    <Grid container spacing={3}>
                        <Grid item md={3} xs={12}>
                            <Typography variant='h6' sx={{ backgroundColor: '#375EC0', padding: '10px', borderRadius: '5px', color: 'white' }}>Not Redeemed</Typography>
                            {
                                cat.filter((item) => {
                                    const endsAt = moment(item.endsAt);
                                    return endsAt.isAfter(currentDate) && moment(item.startsAt).isBefore(currentDate) && item.status !== "redeemed";
                                }).map((ca, i) => {

                                    return <Box onClick={async () => {
                                        await getSoloCoupon(ca?._id)
                                            .then((res) => {
                                                console.log(res.data.data)
                                                setQRString(res.data.data.qrString)
                                            }).catch((e) => console.log(e))
                                        setSolo(ca)
                                        setOpen(true)
                                    }} key={i} sx={{ marginTop: '5%', cursor: 'pointer', ...card, height: 'auto', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <AvatarGroup sx={{ marginRight: '5%' }}>
                                                <Avatar src={ca.issuedByLogo} />
                                                <Avatar src={ca.orgLogo} />
                                            </AvatarGroup>
                                            <div>
                                                <Typography variant='p' sx={bold_name}>{ca.title}</Typography>
                                                <p style={{ ...ptag, fontSize: '11px' }} ><b>Starts At -</b> {moment(ca.startsAt).format("MMMM DD, YYYY")}</p>
                                                <p style={{ ...ptag, fontSize: '11px' }} ><b>Ends At - </b>{moment(ca.endsAt).format("MMMM DD, YYYY")}</p>
                                            </div>

                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <p style={{ ...ptag, fontSize: '11px', padding: '5% 2%' }} ><b>Amount - </b>₹ {ca.amount}</p>
                                            {ca.balanceAmount && <p style={{ ...ptag, fontSize: '11px', padding: '5%' }} ><b>Balance - </b>₹ {ca.balanceAmount}</p>}
                                        </div>
                                    </Box>

                                })
                            }
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Typography variant='h6' sx={{ backgroundColor: '#375EC0', padding: '10px', borderRadius: '5px', color: 'white' }}>Upcoming</Typography>
                            {
                                cat.filter((item) => {
                                    const startsAt = moment(item.startsAt);
                                    return startsAt.isAfter(currentDate) && item.status === "upcoming";
                                }).map((ca, i) => {
                                    return <Box key={i} sx={{ marginTop: '5%', ...card, height: 'auto', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <AvatarGroup sx={{ marginRight: '5%' }}>
                                                <Avatar src={ca.issuedByLogo} />
                                                <Avatar src={ca.orgLogo} />
                                            </AvatarGroup>
                                            <div>
                                                <Typography variant='p' sx={bold_name}>{ca.title}</Typography>
                                                <p style={{ ...ptag, fontSize: '11px' }} ><b>Starts At -</b> {moment(ca.startsAt).format("MMMM DD, YYYY")}</p>
                                                <p style={{ ...ptag, fontSize: '11px' }} ><b>Ends At - </b>{moment(ca.endsAt).format("MMMM DD, YYYY")}</p>
                                            </div>

                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <p style={{ ...ptag, fontSize: '11px', padding: '5% 2%' }} ><b>Amount - </b>₹ {ca.amount}</p>
                                            {ca.balanceAmount && <p style={{ ...ptag, fontSize: '11px', padding: '5%' }} ><b>Balance - </b>₹ {ca.balanceAmount}</p>}
                                        </div>
                                    </Box>
                                })
                            }
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Typography variant='h6' sx={{ backgroundColor: '#375EC0', padding: '10px', borderRadius: '5px', color: 'white' }}>Redeemed</Typography>
                            {
                                cat.filter((item) => {
                                    const startsAt = moment(item.startsAt);
                                    return !startsAt.isAfter(currentDate) && item.status === "upcoming" ;
                                }).map((ca, i) => {
                                    return <Box key={i} sx={{ marginTop: '5%', ...card, height: 'auto', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <AvatarGroup sx={{ marginRight: '5%' }}>
                                                <Avatar src={ca.issuedByLogo} />
                                                <Avatar src={ca.orgLogo} />
                                            </AvatarGroup>
                                            <div>
                                                <Typography variant='p' sx={bold_name}>{ca.title}</Typography>
                                                <p style={{ ...ptag, fontSize: '11px' }} ><b>Starts At -</b> {moment(ca.startsAt).format("MMMM DD, YYYY")}</p>
                                                <p style={{ ...ptag, fontSize: '11px' }} ><b>Ends At - </b>{moment(ca.endsAt).format("MMMM DD, YYYY")}</p>
                                            </div>

                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <p style={{ ...ptag, fontSize: '11px', padding: '5% 2%' }} ><b>Amount - </b>₹ {ca.amount}</p>
                                            {ca.balanceAmount && <p style={{ ...ptag, fontSize: '11px', padding: '5%' }} ><b>Balance - </b>₹ {ca.balanceAmount}</p>}
                                        </div>
                                    </Box>
                                })
                            }
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Typography variant='h6' sx={{ backgroundColor: '#375EC0', padding: '10px', borderRadius: '5px', color: 'white' }}>Expired</Typography>
                            {
                                cat.filter((item) => {
                                    const endsAt = moment(item.endsAt);
                                    return endsAt.isBefore(currentDate) && item.status !== "redeemed";
                                }).map((ca, i) => {
                                    return <Box key={i} sx={{ marginTop: '5%', ...card, height: 'auto', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <AvatarGroup sx={{ marginRight: '5%' }}>
                                                <Avatar src={ca.issuedByLogo} />
                                                <Avatar src={ca.orgLogo} />
                                            </AvatarGroup>
                                            <div>
                                                <Typography variant='p' sx={bold_name}>{ca.title}</Typography>
                                                <p style={{ ...ptag, fontSize: '11px' }} ><b>Starts At -</b> {moment(ca.startsAt).format("MMMM DD, YYYY")}</p>
                                                <p style={{ ...ptag, fontSize: '11px' }} ><b>Ends At - </b>{moment(ca.endsAt).format("MMMM DD, YYYY")}</p>
                                            </div>

                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <p style={{ ...ptag, fontSize: '11px', padding: '5% 2%' }} ><b>Amount - </b>₹ {ca.amount}</p>
                                            {ca.balanceAmount && <p style={{ ...ptag, fontSize: '11px', padding: '5%' }} ><b>Balance - </b>₹ {ca.balanceAmount}</p>}
                                        </div>
                                    </Box>

                                })
                            }

                        </Grid>
                    </Grid>
                </Box>
            }
            <UtilityModal open={open} setOpen={setOpen} setCat={setCat} string={qrString} solo={solo} cat={cat} category={category} />
    </>
  )
}
