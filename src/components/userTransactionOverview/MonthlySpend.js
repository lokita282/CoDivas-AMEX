import React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

import utilityImage from '../../images/utility.png'
import { Grid } from '@mui/material'
import { bold_name, df_jc_ac, df_jc_ac_fdc, ptag } from '../../theme/CssMy'
import { Icon } from '@iconify/react'

const styles = {
  paperContainerAnalysis: {
    // height: '237px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    // verticalAlign: 'middle',
    padding: 10,
    marginBottom: '26px',
    boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.21)'
  },
  imgPaperContainer: {
    backgroundImage: `url(${utilityImage})`,
    height: '525px',
    borderRadius: '30px',
  },
}

const MonthlySpend = () => {
  return (
    <Paper style={styles.paperContainerAnalysis}>
      <Grid container sx={df_jc_ac_fdc} >
        <Grid item md={12} sx={df_jc_ac_fdc}>
          {/* <Icon icon="bxs:calendar-week" width={44} height={44} style={{ color: '#3F64C9', borderRadius: '50%', backgroundColor: '#3F64C95c', padding: '6px' }} /> */}
          <Typography variant="h3" color="initial" sx={{ color: '#3F64C9', fontFamily: 'Poppins' }}>
            <b>₹ 2,500</b>
          </Typography>
          <Typography variant="p" color="#909090" sx={ptag}>
            Spent this Month
          </Typography>
        </Grid>
      </Grid>

      <Grid container sx={{ marginTop: '15%' }}>
        <Grid item md={6}>
          <Typography variant='h6' sx={{ ...bold_name, ...df_jc_ac }}>
            <ArrowCircleUpIcon />1%
          </Typography>
          <Typography
            variant="body1"
            color="#909090"
            sx={{ ...ptag, textAlign: 'center' }}
          >
            up since last month
          </Typography>
        </Grid>
        <Grid item md={6} sx={df_jc_ac_fdc}>
          <Typography variant='h6' sx={{ ...bold_name, ...df_jc_ac }}>
            <b> Telecom </b>
          </Typography>
          <Typography variant="p" sx={{ ...ptag, textAlign: 'center' }}>
            Most Spent On
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default MonthlySpend
