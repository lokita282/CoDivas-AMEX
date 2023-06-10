import { React, useState } from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import { Grid, Typography, Paper, Button, Modal, Box } from '@mui/material'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
}

const styles = {
  paperContainer: {
    // height: '525px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
    // backgroundColor: '#f5f5f5',
    padding: 4,
  },
  gradientText: {
    background: 'radial-gradient( #272a71, #18152c)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
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
    // background: 'radial-gradient(#272a71, #18152c)',
    color: '#000',
    border: '1px solid',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: 20,
    borderRadius: '20px',
    width: '40%',
    height: '10%',
    fontFamily: 'Poppins',
  },
  redeemBtn: {
    background: 'radial-gradient(#272a71, #18152c)',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '20px',
    width: '40%',
    height: '10%',
    fontFamily: 'Poppins',
    marginBottom: 40,
    marginTop: 40,
  },
  verifyBtn: {
    background: '#00B031',
    transparency: '50%',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '10px',
    width: '40%',
    height: '10%',
    fontFamily: 'Poppins',
    marginTop: 40,
    // marginLeft: 'auto'
    float: 'right',
  },
  headingPaper: {
    backgroundColor: '#2F3659',
    color: '#fff',
    fontFamily: 'Poppins',
    height: '40px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
    display: 'flex',
    marginBottom: '10px',
  },
  cardPaper: {
    fontFamily: 'Poppins',
    padding: '20px',
    marginBottom: '10px',
  },
}

const notRedeemed = [
  {
    id: 1,
    code: 'skdo827',
    amount: 2000,
    receivedAt: '01-01-2023',
    validTill: '01-12-2023',
  },
  {
    id: 1,
    code: 'cle372o',
    amount: 2000,
    receivedAt: '01-01-2023',
    validTill: '01-12-2023',
  },
  {
    id: 1,
    code: 'wq332ukm',
    amount: 2000,
    receivedAt: '01-01-2023',
    validTill: '01-12-2023',
  },
  {
    id: 1,
    code: 'lverj32',
    amount: 2000,
    receivedAt: '01-01-2023',
    validTill: '01-12-2023',
  },
]

const redeemed = [
  {
    id: 1,
    redeemedPlace: 'Apollo Hospital',
    amount: 2000,
    receivedAt: '01-01-2023',
    redeemedAt: '06-06-2023',
  },
  {
    id: 1,
    redeemedPlace: 'Tardeo Hospital',
    amount: 2000,
    receivedAt: '01-01-2023',
    redeemedAt: '06-06-2023',
  },
  {
    id: 1,
    redeemedPlace: 'Global Hospital',
    amount: 2000,
    receivedAt: '01-01-2023',
    redeemedAt: '06-06-2023',
  },
  {
    id: 1,
    redeemedPlace: 'Apollo Hospital',
    amount: 2000,
    receivedAt: '01-01-2023',
    redeemedAt: '06-06-2023',
  },
]

const expired = [
  {
    id: 1,
    code: '93i87g2ed',
    amount: 2000,
    receivedAt: '01-01-2023',
    validTill: '01-03-2023',
  },
  {
    id: 1,
    amount: 2000,
    code: 'mxdc3221',
    receivedAt: '01-01-2023',
    validTill: '01-03-2023',
  },
  {
    id: 1,
    amount: 2000,
    code: 'lwq321145',
    receivedAt: '01-01-2023',
    validTill: '01-03-2023',
  },

]

const HealthcarePage = () => {
  const [flag, setFlag] = useState(0)
  const [redeemFlag, setRedeemFlag] = useState(0)
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setRedeemFlag(1)
    setOpen(false)
  }

  return (
    <SideDrawer>
      <Typography variant="h2" style={styles.gradientText}>
        <b>Healthcare</b>
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <Paper style={styles.headingPaper}>Not Redeemed</Paper>
          {notRedeemed.map((coupon) => {
            return (
              <Paper style={styles.cardPaper}>
                <Typography
                  variant="h5"
                  color="initial"
                  sx={{ fontFamily: 'Poppins', paddingBottom: 2 }}
                >
                  <b>{coupon.code} </b>
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography
                    variant="body1"
                    color="#909090"
                    sx={{ fontFamily: 'Poppins' }}
                  >
                    Received:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ fontFamily: 'Poppins', paddingLeft: 1 }}
                  >
                    {coupon.receivedAt}
                  </Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography
                    variant="body1"
                    color="#909090"
                    sx={{ fontFamily: 'Poppins' }}
                  >
                    Expiring:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ fontFamily: 'Poppins', paddingLeft: 1 }}
                  >
                    {coupon.validTill}
                  </Typography>
                </div>
                <Typography
                  variant="h4"
                  color="initial"
                  sx={{ fontFamily: 'Poppins', paddingTop: 2 }}
                >
                  <b>₹{coupon.amount}</b>
                </Typography>
              </Paper>
            )
          })}
        </Grid>

        <Grid item xs={4}>
          <Paper style={styles.headingPaper}>Redeemed</Paper>
          {redeemed.map((coupon) => {
            return (
              <Paper style={styles.cardPaper}>
                <Typography
                  variant="h5"
                  color="initial"
                  sx={{ fontFamily: 'Poppins', paddingBottom: 2 }}
                >
                  <b>{coupon.redeemedPlace} </b>
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography
                    variant="body1"
                    color="#909090"
                    sx={{ fontFamily: 'Poppins' }}
                  >
                    Received:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ fontFamily: 'Poppins', paddingLeft: 1 }}
                  >
                    {coupon.receivedAt}
                  </Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography
                    variant="body1"
                    color="#909090"
                    sx={{ fontFamily: 'Poppins' }}
                  >
                    Redeemed At:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ fontFamily: 'Poppins', paddingLeft: 1 }}
                  >
                    {coupon.redeemedAt}
                  </Typography>
                </div>
                <Typography
                  variant="h4"
                  color="initial"
                  sx={{ fontFamily: 'Poppins', paddingTop: 2 }}
                >
                  <b>₹{coupon.amount}</b>
                </Typography>
              </Paper>
            )
          })}
        </Grid>

        <Grid item xs={4}>
          <Paper style={styles.headingPaper}>Not Redeemed</Paper>
          {expired.map((coupon) => {
            return (
              <Paper style={styles.cardPaper}>
                <Typography
                  variant="h5"
                  color="initial"
                  sx={{ fontFamily: 'Poppins', paddingBottom: 2 }}
                >
                  <b>{coupon.code} </b>
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography
                    variant="body1"
                    color="#909090"
                    sx={{ fontFamily: 'Poppins' }}
                  >
                    Received:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ fontFamily: 'Poppins', paddingLeft: 1 }}
                  >
                    {coupon.receivedAt}
                  </Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography
                    variant="body1"
                    color="#909090"
                    sx={{ fontFamily: 'Poppins' }}
                  >
                    Expired At:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ fontFamily: 'Poppins', paddingLeft: 1 }}
                  >
                    {coupon.validTill}
                  </Typography>
                </div>
                <Typography
                  variant="h4"
                  color="initial"
                  sx={{ fontFamily: 'Poppins', paddingTop: 2 }}
                >
                  <b>₹{coupon.amount}</b>
                </Typography>
              </Paper>
            )
          })}
        </Grid>
      </Grid>
    </SideDrawer>
  )
}

export default HealthcarePage
