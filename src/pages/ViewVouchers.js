import React, { useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import SideDrawer from '../components/sidebar/Sidebar'
import VouchersTable from '../components/viewvouchers/VouchersTable'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles'
import { df_jc_ac } from '../theme/CssMy'

const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    width: '30vw',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
    },
    
  },
}));

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
  const [search, setSearch] = useState('')

  return (
    <SideDrawer>
      <Grid
        container
        spacing={2}
        direction="column"
        sx={{ padding: '0px 25px', width: '100%' }}
      >
        <Grid item md={3} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{display:'flex', justifyContent:'space-between', width:'100%'}}>
          <Typography variant="h4" style={styles.gradientText}>
            <b>Vouchers</b>
          </Typography>
          <TextField
            variant="outlined"
            value={search}
            placeholder='Search vouchers'
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={{display:'flex', width:'30vw',justifyContent:'flex-end'}}
            InputProps={{
              startAdornment: (
                <SearchIcon color="action" />
              ),
            }}
          />
        </Box>
        </Grid>
        <Grid item xs={12}>
          <VouchersTable search={search} setSearch={setSearch} />
        </Grid>

        {/* </Paper> */}
      </Grid>
    </SideDrawer>
  )
}

export default ViewVouchers
