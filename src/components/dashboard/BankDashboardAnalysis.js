import React from 'react'
import PropTypes from 'prop-types'
import {Paper, Typography, Grid, Tabs, Tab, Box} from '@mui/material'
import WeeklyActivity from '../bankAnalysis/WeeklyActivity'
import WeeklyOrgVsAmt from '../bankAnalysis/WeeklyOrgVsAmt'
import TrendingAssets from '../bankAnalysis/TrendingAssets'
import RegionRedeemed from '../bankAnalysis/RegionRedeemed'
import RegionIssued from '../bankAnalysis/RegionIssued'

const styles = {
  paperContainerAnalysis: {
    height: '500px',
    borderRadius: '10px',
    boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  paperContainerAnalysisRow2: {
    height: '600px',
    borderRadius: '10px',
    boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}


export default function BankDashboard() {
   const [value, setValue] = React.useState(0)

   const handleChange = (event, newValue) => {
     setValue(newValue)
   }

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Paper style={styles.paperContainerAnalysis}>
              <Typography
                variant="h6"
                color="initial"
                sx={{ fontFamily: 'Poppins' }}
              >
                <b>Weekly Category v/s Amount</b>
              </Typography>
              <WeeklyActivity />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper style={styles.paperContainerAnalysis}>
              <Typography
                variant="h6"
                color="initial"
                sx={{ fontFamily: 'Poppins' }}
              >
                <b>Weekly Organisation v/s Amount</b>
              </Typography>
              <WeeklyOrgVsAmt />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper style={styles.paperContainerAnalysisRow2}>
              <Typography
                variant="h6"
                color="initial"
                sx={{ fontFamily: 'Poppins', mt: 3 }}
              >
                <b>Weekly Trending Assets</b>
              </Typography>

              <TrendingAssets />
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper style={styles.paperContainerAnalysisRow2}>
              <Typography
                variant="h6"
                color="initial"
                sx={{ fontFamily: 'Poppins', mt: 12 }}
              >
                <b>Region Wise distribution</b>
              </Typography>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Vouchers Redeemed" {...a11yProps(0)} />
                <Tab label="Vouchers Issued" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <RegionRedeemed />
              </TabPanel>

              <TabPanel value={value} index={1}>
                <RegionIssued />
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
}
