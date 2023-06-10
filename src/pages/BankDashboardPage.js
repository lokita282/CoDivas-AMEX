import React from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import eRUPIImage from '../images/erupi.png'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import BankAnalytics from '../components/dashboard/BankDashboardAnalysis'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const styles = {
  imgPaperContainer: {
    backgroundImage: `url(${eRUPIImage})`,
    height: '525px',
    borderRadius: '30px',
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
    background: 'radial-gradient( #272a71, #18152c)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
  },
  proceedBtn: {
    background: 'radial-gradient(#272a71, #18152c)',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    marginTop: 20,
    borderRadius: '20px',
    width: '30%',
    height: '10%',
    fontFamily: 'Poppins',
  },
}

export default function DashboardPage() {
  return (
    <SideDrawer>
      <Grid container spacing={2}>
        <Grid item xs={6.5}>
          <Paper style={styles.imgPaperContainer}></Paper>
        </Grid>
        <Grid item xs={5.5}>
          <Paper style={styles.paperContainer} elevation={0}>
            <Typography variant="h1" style={styles.gradientText}>
              <b>Generate e₹UPI</b>
            </Typography>
            <Button variant="contained" style={styles.proceedBtn}>
              <b>Proceed ➤</b>
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" style={styles.gradientText}>
            <b>Analytics</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* <Item>xs=4</Item> */}
          <BankAnalytics />
        </Grid>
      </Grid>
    </SideDrawer>
  )
}
