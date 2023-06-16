import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import QRCode from 'react-qr-code';
import { CardMedia, Grid, Typography } from '@mui/material';
import { getCategoryCoupon, getSoloCoupon, getVerifCode, redemptionStatus } from '../../services/userServices';
import { bold_name, df_jc_ac, df_jc_ac_fdc, ptag } from '../../theme/CssMy';
import Loading from '../loader/Loading';
import { QRCode } from 'react-qrcode-logo';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: 250, sm: 700, xs: 400 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  border: 'none',
  p: 2,
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column'
};

export default function BasicModal(props) {
  const { open, setOpen, string, solo, setSolo, category, cat, setCat } = props
  const [redeem, setRedeem] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  console.log(solo, scanned)

  useEffect(() => {
    setLoading(true)
    setScanned(false)
    setRedeem(false)
  }, [string])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getVerifCode(solo?._id); // Call the API function
        console.log(res.data);
        setLoading(false)
        setScanned(res.data.scanned);
        setCode(res.data.verificationCode)
      } catch (error) {
        console.log(error);
      }
    };

    const checkRedemptionStatus = async () => {
      try {
        const res = await redemptionStatus(solo?._id); // Call the API function to check redemption status
        console.log(res.data);
        setRedeem(res.data.redeemed)
      } catch (error) {
        console.log(error);
      }
    };


    const interval = setInterval(() => {
      if (solo !== null && !scanned) {
        fetchData();
      } else {
        clearInterval(interval);
      }
    }, 2000);

    let redemptionStatusInterval;
    if (code) {
      redemptionStatusInterval = setInterval(() => {
        checkRedemptionStatus();
      }, 2000);
    }

    return () => {
      clearInterval(interval);
      clearInterval(redemptionStatusInterval) // Clear the interval when the component unmounts
    };
  }, [solo, scanned, code]);

useEffect(() => {
  const func = async () => {
    await getCategoryCoupon(category)
        .then((res) => {
            console.log(res.data.data)
            setTimeout(() => {
              setOpen(false)
            },1000)
            setCat(res.data.data)
        })
}
redeem && func()
},[redeem])


  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => {
          setSolo(null)
          setOpen(false)
        }}
        sx={{ "& .css-1m2x5u7": { border: 'none', borderRadius: '10px' } }}
      >
        <Box sx={style}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardMedia component='img' image={solo?.issuedByLogo} sx={{ width: '50px', borderRadius: '50px' }} />
            <CardMedia component='img' image={solo?.orgLogo} sx={{ width: '50px', borderRadius: '50px' }} />
          </div>
          {loading ? <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Loading />
          </Box> : scanned ? redeem ? <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <svg className='svgg' version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
              <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
              <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
            </svg>
            <Typography sx={{ ...ptag, color: '#73AF55', marginTop: '5%' }}>Redemption Successful</Typography>
          </Box> : <Box sx={df_jc_ac_fdc}>
            <p sx={ptag}>Your verification code is</p>
            <Typography variant='h1' sx={bold_name}>{code}</Typography>
          </Box> : <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '5%' }}>
          <Typography sx={bold_name} >{solo?.title}</Typography>
          <p style={ptag}>{solo?.useType === 'multiple' ? "Multiple Use" : "Single Use"} | <b>₹ {solo?.useType === 'multiple' ? solo?.balanceAmount : solo?.amount}</b></p>
          <QRCode value={string} logoImage='https://1.bp.blogspot.com/-Y1pEQZY18mU/YQfesT_TBMI/AAAAAAAAEcA/NLzbLq-egwQSHHmDTHxJxC0tQIhTek-VQCLcBGAsYHQ/w400-h289/erupi-logo.webp' logoWidth={70}  size={250} />
          <p style={{...ptag, textAlign:'center'}}>Ask merchant to scan the QR code to redeem coupon</p>
          </Box>
          }
        </Box>
      </Modal>
    </div>
  );
}
