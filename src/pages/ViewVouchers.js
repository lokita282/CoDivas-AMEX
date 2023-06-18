import React from 'react'
import { Grid, Typography } from '@mui/material'
import SideDrawer from '../components/sidebar/Sidebar'
import VouchersTable from '../components/viewvouchers/VouchersTable'

const styles = {
  paperContainer: {
    borderRadius: '10px',
    boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 30px',
    width: '70%',
  },
  gradientText: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'Poppins',
    padding: '15px 0px',
  },
  createBtn: {
    background: 'radial-gradient( #7E8AFF, #375EC0)',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    marginTop: 20,
    borderRadius: '5px',
    width: '10%',
    height: '50%',
    fontFamily: 'Poppins',
  },
  gridContainer: {
    marginTop: 7,
  },
}

const ViewVouchers = () => {
  return (
    <SideDrawer>
      <Grid
        container
        spacing={2}
        direction="column"
        sx={{padding: '0px 25px'}}
        // alignItems="center"
        // justifyContent="center"
      >
        {/* <Paper style={styles.paperContainer}> */}
        <Grid item xs={12}>
          <Typography variant="h4" style={styles.gradientText}>
            <b>Vouchers</b>
          </Typography>
          </Grid>
          <Grid item xs={12}>
            <VouchersTable />
            </Grid>

        {/* </Paper> */}
      </Grid>
    </SideDrawer>
  )
}

export default ViewVouchers
