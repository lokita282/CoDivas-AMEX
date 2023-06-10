import React from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Lottie from 'react-lottie'
import userscan from '../assets/userscan.json'
import WeeklyActivity from '../components/userTransactionOverview/WeeklyActivity'
import WeeklySpend from '../components/userTransactionOverview/WeeklySpend'
import MonthlySpend from '../components/userTransactionOverview/MonthlySpend'
import CategoryVsTime from '../components/userTransactionOverview/CategoryVsTime'
import CategoryPie from '../components/userTransactionOverview/CategoryPie'


const styles = {
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
  paperContainerAnalysis: {
    height: '500px',
    borderRadius: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  gradientText: {
    background: 'radial-gradient( #272a71, #18152c)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
  },
  gradientTextH2: {
    background: 'radial-gradient(circle, #272a71, #18152c)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    paddingLeft: 20,
    fontFamily: 'Poppins',
  },
  paperContainerCharts: {
    height: '500px',
    borderRadius: '30px',
    // display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  payBtn: {
    background: 'radial-gradient(#272a71, #18152c)',
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

const UserDashboardPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: userscan,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <SideDrawer>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Paper style={styles.paperContainer} elevation={0}>
            <Typography variant="h1" style={styles.gradientText}>
              <b>eZ-₹UPI</b>
            </Typography>
            <Typography
              variant="h6"
              color="#909090"
              sx={{ paddingTop: 2, fontFamily: 'Poppins' }}
            >
              Empowering Seamless Transactions, the eZ-RUPI Way!
            </Typography>
            <Link style={styles.payBtn} to="/user/getstarted">
              <Button sx={{ color: '#fff', fontFamily: 'Poppins' }}>
                <b>Get Started ➤</b>
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Lottie
            options={defaultOptions}
            height={500}
            width={600}
            speed={0.25}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" style={styles.gradientTextH2}>
            <b>Transaction Overview </b>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Paper style={styles.paperContainerAnalysis}>
            <Typography
              variant="h6"
              color="initial"
              sx={{ fontFamily: 'Poppins' }}
            >
              <b>Weekly Activity</b>
            </Typography>
            <WeeklyActivity />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <WeeklySpend />
          <MonthlySpend />
        </Grid>
        <Grid item xs={9}>
          <Paper style={styles.paperContainerAnalysis}>
            <Typography
              variant="h6"
              color="initial"
              sx={{ fontFamily: 'Poppins' }}
            >
              <b>Category vs Time Analysis</b>
            </Typography>
            <CategoryVsTime />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper style={styles.paperContainerCharts}>
            <Typography
              variant="h6"
              color="initial"
              sx={{ paddingTop: 5, paddingBottom: 2, fontFamily: 'Poppins' }}
            >
              <b>Comparing Expenditure</b>
            </Typography>
            <CategoryPie />
          </Paper>
          {/* <MonthlySpend />  */}
        </Grid>
      </Grid>
    </SideDrawer>
  )
}

export default UserDashboardPage

