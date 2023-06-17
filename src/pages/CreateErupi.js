import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography, Grid, Tabs, Tab, Box } from '@mui/material'
import SideDrawer from '../components/sidebar/Sidebar'
import SingleVoucher from '../components/erupiCreation/SingleVoucher'
import BulkVoucher from '../components/erupiCreation/BulkVoucher'

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

const CreateErupi = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <SideDrawer>
      {/* <Box  */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        centered
        >
        <Tab label="Single Voucher creation" {...a11yProps(0)} />
        <Tab label="Bulk Voucher creation" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SingleVoucher />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BulkVoucher />
      </TabPanel>
      {/* </Box> */}
    </SideDrawer>
  )
}

export default CreateErupi