import {React, useState} from 'react'
import {Grid, Paper, Typography, Button} from '@mui/material'
import { btn_bank} from '../theme/CssMy'
import { useNavigate, useParams } from 'react-router'
import Lottie from 'react-lottie'
import { styled } from '@mui/material/styles'
import eRUPIImage from '../images/erupi.png'
import bankDashboard from '../assets/bankDashboard.json'
import BankAnalytics from '../components/dashboard/BankDashboardAnalysis'

const styles = {
  imgPaperContainer: {
    // backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST7SRW4J8PGymU6U8QnIxL15Gmn-FC9kx6Fxh5iRfO-PFcNV5vnJtNStr_L24837G_aog&usqp=CAU')`,
    height: '525px',
    borderRadius: '10px',
    boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)',
    paddingTop: '50px',
    // backgroundRepeat: 'no-repeat',
  },
  paperContainer: {
    height: '525px',
    borderRadius: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
    backgroundColor: '#f5f5f5',
  },
  gradientText: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    padding: '15px 0px',
  },
  proceedBtn: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    marginTop: 20,
    borderRadius: '20px',
    width: '30%',
    height: '10.5%',
    fontFamily: 'Poppins',
  },
}

export default function DashboardPage() {
  const navigate = useNavigate()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: bankDashboard,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <Grid container spacing={2} sx={{ padding: 5 }}>
      <Grid item xs={6.5}>
        <Paper style={styles?.imgPaperContainer}>
          {/* <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST7SRW4J8PGymU6U8QnIxL15Gmn-FC9kx6Fxh5iRfO-PFcNV5vnJtNStr_L24837G_aog&usqp=CAU"
            alt="buildqr"
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '70%',
              paddingTop: '80px',
            }}
          /> */}
          <Lottie
            options={defaultOptions}
            height={440}
            width={400}
            speed={1.25}
          />
        </Paper>
      </Grid>
      <Grid item xs={5.5}>
        <Paper style={styles.paperContainer} elevation={0}>
          <Typography variant="h1" style={styles?.gradientText}>
            <b>
              Generate <br /> e-₹UPI
            </b>
          </Typography>
          <Button onClick={() => navigate('/bank/createerupi')} sx={btn_bank}>
            <b>Proceed ➤</b>
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 7.5 }}>
        <Typography variant="h3" style={styles?.gradientText}>
          <b>Analytics</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <BankAnalytics />
      </Grid>
    </Grid>
  )
}
