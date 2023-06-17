import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import eRUPIImage from '../images/erupi.png'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import BankAnalytics from '../components/dashboard/BankDashboardAnalysis'

const styles = {
  imgPaperContainer: {
    // backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST7SRW4J8PGymU6U8QnIxL15Gmn-FC9kx6Fxh5iRfO-PFcNV5vnJtNStr_L24837G_aog&usqp=CAU')`,
    height: '525px',
    borderRadius: '10px',
    boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)',
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
  return (
    <Grid container spacing={2}>
      <Grid item xs={6.5}>
        <Paper style={styles?.imgPaperContainer}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST7SRW4J8PGymU6U8QnIxL15Gmn-FC9kx6Fxh5iRfO-PFcNV5vnJtNStr_L24837G_aog&usqp=CAU"
            alt="buildqr"
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '70%',
              paddingTop: '80px',
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={5.5}>
        <Paper style={styles.paperContainer} elevation={0}>
          <Typography variant="h1" style={styles?.gradientText}>
            <b>Generate e-₹UPI</b>
          </Typography>
          <Link style={styles.proceedBtn} to="/bank/createerupi">
            <Button
              sx={{ color: '#fff', fontFamily: 'Poppins' }}
            ><b>Proceed ➤</b>
            </Button>
          </Link>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2" style={styles?.gradientText}>
          <b>Analytics</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <BankAnalytics />
      </Grid>
    </Grid>
  )
}
