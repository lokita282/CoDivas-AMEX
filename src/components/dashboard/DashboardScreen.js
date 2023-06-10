import { Avatar, CardContent, CardMedia, Chip, Grid, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { bold_name, df_jc_ac, df_jfs_ac_fdc, ptag } from '../../theme/CssMy';
import rev from '../../images/rev.png'
import scan from '../../images/scan.webp'
import { useNavigate } from 'react-router';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


const HorizontalScroll2 = () => {
    const navigate = useNavigate()

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
                                <Chip size='small' label='₹ 50,000' sx={{ marginTop: '7%', backgroundColor: '#375EC0', color: 'white', fontWeight: 'bold' }} />
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
                <Grid item xs={12}>
                    <CardContent sx={{ width: '100%', backgroundColor: 'white', marginRight: '3%', borderRadius: '10px', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)' }}>
                        <Grid container>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Avatar sx={{ bgcolor: getRandomColor() }}>PH</Avatar>
                            </Grid>
                            <Grid item xs={8} sx={df_jfs_ac_fdc}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>Priyambi Hiran</Typography>
                                <Typography sx={{ ...ptag, fontSize: '10px' }}>June 23, 2021 9:30PM</Typography>
                            </Grid>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>₹ 240</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
                <Grid item xs={12}>
                    <CardContent sx={{ width: '100%', backgroundColor: 'white', marginRight: '3%', borderRadius: '10px', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)' }}>
                        <Grid container>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Avatar sx={{ bgcolor: getRandomColor() }}>RD</Avatar>
                            </Grid>
                            <Grid item xs={8} sx={df_jfs_ac_fdc}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>Rosita D'mello</Typography>
                                <Typography sx={{ ...ptag, fontSize: '10px' }}>June 23, 2021 9:30PM</Typography>
                            </Grid>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>₹ 240</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
                <Grid item xs={12}>
                    <CardContent sx={{ width: '100%', backgroundColor: 'white', marginRight: '3%', borderRadius: '10px', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)' }}>
                        <Grid container>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Avatar sx={{ bgcolor: getRandomColor() }}>LV</Avatar>
                            </Grid>
                            <Grid item xs={8} sx={df_jfs_ac_fdc}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>Lokita Varma</Typography>
                                <Typography sx={{ ...ptag, fontSize: '10px' }}>June 23, 2021 9:30PM</Typography>
                            </Grid>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>₹ 240</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
                <Grid item xs={12}>
                    <CardContent sx={{ width: '100%', backgroundColor: 'white', marginRight: '3%', borderRadius: '10px', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)' }}>
                        <Grid container>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Avatar sx={{ bgcolor: getRandomColor() }}>VP</Avatar>
                            </Grid>
                            <Grid item xs={8} sx={df_jfs_ac_fdc}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>Vidhita Pai</Typography>
                                <Typography sx={{ ...ptag, fontSize: '10px' }}>June 23, 2021 9:30PM</Typography>
                            </Grid>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>₹ 240</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
                <Grid item xs={12}>
                    <CardContent sx={{ width: '100%', backgroundColor: 'white', marginRight: '3%', borderRadius: '10px', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)' }}>
                        <Grid container>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Avatar sx={{ bgcolor: getRandomColor() }}>UD</Avatar>
                            </Grid>
                            <Grid item xs={8} sx={df_jfs_ac_fdc}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>Urmi Dedhia</Typography>
                                <Typography sx={{ ...ptag, fontSize: '10px' }}>June 23, 2021 9:30PM</Typography>
                            </Grid>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>₹ 240</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
                <Grid item xs={12}>
                    <CardContent sx={{ width: '100%', backgroundColor: 'white', marginRight: '3%', borderRadius: '10px', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)' }}>
                        <Grid container>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Avatar sx={{ bgcolor: getRandomColor() }}>HM</Avatar>
                            </Grid>
                            <Grid item xs={8} sx={df_jfs_ac_fdc}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>Harsh Mangukiya</Typography>
                                <Typography sx={{ ...ptag, fontSize: '10px' }}>June 23, 2021 9:30PM</Typography>
                            </Grid>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>₹ 240</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
                <Grid item xs={12}>
                    <CardContent sx={{ width: '100%', backgroundColor: 'white', marginRight: '3%', borderRadius: '10px', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)' }}>
                        <Grid container>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Avatar sx={{ bgcolor: getRandomColor() }}>BM</Avatar>
                            </Grid>
                            <Grid item xs={8} sx={df_jfs_ac_fdc}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>Bhavya Mehta0.</Typography>
                                <Typography sx={{ ...ptag, fontSize: '10px' }}>June 23, 2021 9:30PM</Typography>
                            </Grid>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>₹ 240</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
                <Grid item xs={12}>
                    <CardContent sx={{ width: '100%', backgroundColor: 'white', marginRight: '3%', borderRadius: '10px', boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)' }}>
                        <Grid container>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Avatar sx={{ bgcolor: getRandomColor() }}>VP</Avatar>
                            </Grid>
                            <Grid item xs={8} sx={df_jfs_ac_fdc}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>Vidhita Pai</Typography>
                                <Typography sx={{ ...ptag, fontSize: '10px' }}>June 23, 2021 9:30PM</Typography>
                            </Grid>
                            <Grid item xs={2} sx={df_jc_ac}>
                                <Typography sx={{ ...bold_name, fontSize: '14px' }}>₹ 240</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
            </Grid>
        </div>

    );
};

export default HorizontalScroll2;
