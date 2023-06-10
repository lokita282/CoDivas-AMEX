import React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

import utilityImage from '../../images/utility.png'
import erupiImage from '../../images/erupi.png'

const styles = {
  paperContainerAnalysis: {
    height: '237px',
    borderRadius: '30px',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    // verticalAlign: 'middle',
    padding: 20,
    marginBottom: '26px',
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
      <Typography variant="h6" color="#909090" sx={{ fontFamily: 'Poppins' }}>
        <b>Spent this Month</b>
      </Typography>
      <Typography variant="h3" color="initial" sx={{ fontFamily: 'Poppins' }}>
        <b>₹2500</b>
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
        <ArrowCircleUpIcon sx={{ color: '#909090', fontFamily: 'Poppins' }} />
        <Typography
          variant="body1"
          color="#909090"
          sx={{ fontFamily: 'Poppins' }}
        >
          1% up since last week
        </Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: 30 }}>
        <Typography variant="h6" color="#909090" sx={{ fontFamily: 'Poppins' }}>
          Most Spent On:
        </Typography>
        <Typography
          variant="h5"
          color="initial"
          sx={{ paddingLeft: 1, fontFamily: 'Poppins' }}
        >
          <b> Telecommunication </b>
        </Typography>
      </div>
      {/* <Paper style={styles.imgPaperContainer}></Paper> */}
    </Paper>
  )
}

export default MonthlySpend
