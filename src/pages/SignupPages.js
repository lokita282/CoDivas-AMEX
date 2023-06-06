import { Box, Button, CardMedia, Grid, Skeleton, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import img0 from '../images/img1.png'
import img1 from '../images/img2.png'
import img2 from '../images/img3.png'
import img3 from '../images/img4.png'
import { createMuiTheme } from "@material-ui/core"
import SignupBene from '../components/auth/SignupBene'
import SignupMerchant from '../components/auth/SignupMerchant'
import SignupBank from '../components/auth/SignupBank'
import SignupOrg from '../components/auth/SignupOrg'

const defaultTheme = createMuiTheme()
const { breakpoints, typography: { pxToRem } } = defaultTheme

const theme = {
    ...defaultTheme,
    overrides: {
        MuiTypography: {
            h1: {
                fontSize: "5rem",
                [breakpoints.down("xs")]: {
                    fontSize: "3rem"
                }
            }
        }
    }
}

function SignupPage() {
    const url = window.location.href.split('/')[4]
    console.log(url)
    var items = [
        {
            img: img0,
        },
        {
            img: img1,
        },
        {
            img: img2,
        },
        {
            img: img3,
        }
    ]

    return (
        <Grid container sx={{ "&::-webkit-scrollbar": { display: 'none' } }}>
            <Grid item md={5} sm={6} xs={0}>
                <Carousel
                    autoPlay={true}
                    swipe={true}
                    indicators={false}
                    cycleNavigation={true}
                    interval={2000}
                    animation='fade'
                >
                    {
                        items.map((item, i) => <Item key={i} item={item} i={i === 0 ? true : false} />)
                    }
                </Carousel>
            </Grid>
            <Grid item md={7} sm={6} xs={12}>
                {
                    url === 'merchant' ? <SignupMerchant /> : url === 'bank' ? <SignupBank /> : url === 'organisation' ? <SignupOrg /> : <SignupBene />
                }

            </Grid>
        </Grid>
    )
}


function Item(props) {
    return (
        <>
            <Box sx={{ margin: 0, padding: 0, "&::-webkit-scrollbar": { display: 'none' } }} >
                <CardMedia component='img' image={props.item.img} sx={{ height: '100vh' }} />
            </Box>
        </>
    )
}

export default SignupPage