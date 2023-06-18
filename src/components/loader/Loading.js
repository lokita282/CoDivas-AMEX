import React from 'react'
import Lottie from 'react-lottie'
import { Box } from '@mui/material'
import loader from '../../assets/loader'
import { df_jc_ac } from '../../theme/CssMy'

export default function Loading() {
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <>
    <Box sx={{ ...df_jc_ac, height: '80vh' }}>
    <Lottie
      options={defaultOptions}
      height={150}
      width={150}
    />
    </Box>
    </>
  )
}
