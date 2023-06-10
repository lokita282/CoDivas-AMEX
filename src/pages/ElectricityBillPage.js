import {React, useState} from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import { Grid, Typography, Paper, Button, Modal, Box } from '@mui/material'
import QrGenerator from '../components/electricityBillQr/QrGenerator'
import ReactCodeInput from 'react-verification-code-input'
import CircularProgress from '@mui/material/CircularProgress'


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
    transparency :'50%',
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
    float: 'right'
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

const pastBills = [
  {
    id: 1,
    month: 'May',
    units: 402,
    num: 3569820012,
    amount: '₹4020',
  },
  {
    id: 2,
    month: 'April',
    units: 380,
    num: 356944820012,
    amount: '₹3800',
  },
  {
    id: 3,
    month: 'March',
    units: 320,
    num: 356944820012,
    amount: '₹3200',
  },
]


const ElectricityBillPage = () => {
  const [flag, setFlag] = useState(0)
  const [redeemFlag, setRedeemFlag] = useState(0)
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)}
    const handleClose = () => {
      setRedeemFlag(1)
      setOpen(false)}

  return (
    <SideDrawer>
      <Typography variant="h2" style={styles.gradientText}>
        <b>Pay Electricity Bills Online through e₹UPI</b>
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid item xs={6} sx={{ mr: 2 }}>
            <Paper style={styles.headingPaper}>Past Bills</Paper>
            {pastBills.map((bill) => {
              return (
                <Paper style={styles.cardPaper}>
                  <Typography
                    variant="h5"
                    color="initial"
                    sx={{ fontFamily: 'Poppins', paddingBottom: 2 }}
                  >
                    <b>{bill.month} 2023</b>
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography
                      variant="body1"
                      color="#909090"
                      sx={{ fontFamily: 'Poppins' }}
                    >
                      Units:
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ fontFamily: 'Poppins', paddingLeft: 1 }}
                    >
                      {bill.units}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography
                      variant="body1"
                      color="#909090"
                      sx={{ fontFamily: 'Poppins' }}
                    >
                      Bill Number:
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ fontFamily: 'Poppins', paddingLeft: 1 }}
                    >
                      {bill.num}
                    </Typography>
                  </div>
                  <Typography
                    variant="h4"
                    color="initial"
                    sx={{ fontFamily: 'Poppins', paddingTop: 2 }}
                  >
                    <b>{bill.amount}</b>
                  </Typography>
                </Paper>
              )
            })}
          </Grid>
          <Grid item xs={6}>
            <Paper style={styles.headingPaper}>Due</Paper>
            <Paper style={styles.cardPaper}>
              <Typography
                variant="h5"
                color="initial"
                sx={{ fontFamily: 'Poppins', paddingBottom: 2 }}
              >
                <b>June 2023</b>
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Typography
                  variant="body1"
                  color="#909090"
                  sx={{ fontFamily: 'Poppins' }}
                >
                  Units:
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontFamily: 'Poppins', paddingLeft: 1 }}
                >
                  450
                </Typography>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Typography
                  variant="body1"
                  color="#909090"
                  sx={{ fontFamily: 'Poppins' }}
                >
                  Bill Number:
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontFamily: 'Poppins', paddingLeft: 1 }}
                >
                  3841014857
                </Typography>
              </div>
              <Typography
                variant="h4"
                color="initial"
                sx={{ fontFamily: 'Poppins', paddingTop: 2 }}
              >
                <b>₹4500</b>
              </Typography>
              <Button
                variant="text"
                style={styles.payBtn}
                onClick={() => {
                  setFlag(1)
                }}
              >
                Pay Now
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          {flag === 0 ? (
            'hi'
          ) : (
            <>
              <Paper style={styles.paperContainer}>
                <Typography
                  variant="h4"
                  style={styles.gradientText}
                  sx={{ fontFamily: 'Poppins', mt: 2 }}
                >
                  <b>e-₹UPI Generated for June</b>
                </Typography>
                <Typography
                  variant="h6"
                  style={styles.gradientText}
                  sx={{ fontFamily: 'Poppins', mb: 4 }}
                >
                  <b>Single Use | Amount 4500 INR</b>
                </Typography>
                <QrGenerator />
                {redeemFlag === 0 ? (
                  <Button style={styles.redeemBtn} onClick={handleOpen}>
                    Click to Redeem
                  </Button>
                ) : (
                  <Button style={styles.redeemBtn} onClick={handleOpen}>
                    Redeeemed ✓
                  </Button>
                )}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={modalStyle}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ fontFamily: 'Poppins', mb: 3, textAlign: 'center' }}
                    >
                      <b>Enter Verification Code</b>
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ReactCodeInput />
                    </div>
                    <Button style={styles.verifyBtn} onClick={handleClose}>
                      Verify
                    </Button>
                  </Box>
                </Modal>
              </Paper>
            </>
          )}
        </Grid>
      </Grid>
    </SideDrawer>
  )
}

export default ElectricityBillPage
