import { Avatar, CardContent, CardMedia, Chip, Grid, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { bold_name, df_jc_ac, df_jfs_ac_fdc, ptag } from '../../theme/CssMy';
import rev from '../../images/rev.png'
import scan from '../../images/scan.webp'
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { getTrans } from '../../services/merchantServices';
import moment from 'moment/moment';



const DashboardScreen = () => {
    const [trans, setTrans] = useState([])
    const [revenue, setRevenue] = useState(0)
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const navigate = useNavigate()

    useEffect(() => {
        setRevenue(() => 0)
        const func = async () => {
            await getTrans()
                .then((res) => {
                    if (res.data.success) {
                        console.log(res.data)
                        setTrans(res.data.transactions)
                        let re = 0
                        res.data.transactions.map((tr) => re = re + parseInt(tr.amount))
                        res.data.transactions.map((tr) => setRevenue(re))
                    }
                }).catch((e) => console.log(e))
        }
        func()
    }, [])

    return (
        <div >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <CardContent sx={{ width: '100%', backgroundColor: 'white', marginRight: '3%', borderRadius: '10px', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)' }}>
                        <Grid container>
                            <Grid item xs={4} sx={df_jc_ac}>
                                <CardMedia component='img' image={rev} sx={{ width: '50px' }} />
                            </Grid>
                            <Grid item xs={8} sx={df_jfs_ac_fdc}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>Revenue</Typography>
                                <Typography sx={{ ...ptag, fontSize: '10px' }}>Using ez-RUPI</Typography>
                                <Chip size='small' label={`₹ ${revenue}`} sx={{ marginTop: '7%', backgroundColor: '#375EC0', color: 'white', fontWeight: 'bold' }} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
                <Grid item xs={6}>
                    <CardContent sx={{ width: '100%', backgroundColor: 'white', marginRight: '3%', borderRadius: '10px', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)' }}>
                        <Grid container>
                            <Grid item xs={4} sx={df_jc_ac}>
                                <CardMedia component='img' image={scan} sx={{ width: '50px' }} />
                            </Grid>
                            <Grid item xs={8} sx={df_jfs_ac_fdc}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>Scan QR</Typography>
                                <Typography sx={{ ...ptag, fontSize: '10px' }}>Using ez-RUPI</Typography>
                                <Chip onClick={() => navigate('/scan')} size='small' label='Scan now!' sx={{ marginTop: '7%', backgroundColor: '#375EC0', color: 'white', fontWeight: 'bold' }} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography sx={{ marginTop: '10%', ...bold_name }}>Transaction history</Typography>
                </Grid>
                {
                    trans.map((tr, i) => {
                        return <Grid key={i} item xs={12}>
                            <CardContent sx={{ width: '100%', backgroundColor: 'white', marginRight: '3%', borderRadius: '10px', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)' }}>
                                <Grid container>
                                    <Grid item xs={2} sx={df_jc_ac}>
                                        <Avatar sx={{ bgcolor: getRandomColor() }}>{tr.beneficiaryPhone.slice(8, 10)}</Avatar>
                                    </Grid>
                                    <Grid item xs={6} sx={df_jfs_ac_fdc}>
                                        <Typography sx={{ ...bold_name, fontSize: '14px' }}>{tr.beneficiaryName}</Typography>
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
        </div>

    );
};

export default DashboardScreen;
