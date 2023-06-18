import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, CardMedia, TextField } from '@mui/material';
import { bold_name, btn_connect, btn_hire, ptag, textField } from '../../theme/CssMy';
import giphy from '../../images/utility.gif'
import { redeemUtility, validateUtility } from '../../services/utilityServices';
import ReactInputVerificationCode from 'react-input-verification-code'
import { getCategoryCoupon } from '../../services/userServices';
import errorHandler from '../toasts/errorHandler'
import successHandler from '../toasts/successHandler'
import Loading from '../loader/Loading';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

export default function UtilityModal({ open, setOpen, setCat, solo, string, cat, category }) {
  const [click, setClick] = useState(false)
  const [id, setId] = useState(null)
  const [amnt, setamnt] = useState(null)
  const [code, setCode] = useState()
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [showverif, setShowVerif] = useState(false)
  const [redeemed, setRedeemed] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validate = async () => {
    setLoading(true)
    const regex = /xxx-(.*?)-xxx/;
    const match = string.match(regex);
    console.log(match)
    let res = await validateUtility({ "encryptedString": match[1] })
    if (res.data.success) {
      setId(res.data.voucherId)
      setClick(true)
    } else {
      setOpen(false)
    }
    setLoading(false)
  }

  const redeemvou = async () => {
    setLoading(true)
    let res = await redeemUtility({
      "voucherId": id,
      "verificationCode": code,
      "transactionAmount": amnt,
      "transactionTitle": title
    })
    if (res.data.success) {
      setLoading(false)
      setRedeemed(true)
      setTimeout(() => {
        setClick(false)
        setShowVerif(false)
        setOpen(false)
        setRedeemed(false)
      }, 2000)
      await getCategoryCoupon(category)
        .then((res) => {
          console.log(res.data.data)
          setTimeout(() => {
            setOpen(false)
          }, 1000)
          setCat(res.data.data)
        })
      successHandler("Offer redeemed successfully")
    }
    else {
      setOpen(false)
      errorHandler("Cannot redeem voucher")
      setLoading(false)
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardMedia component='img' image={solo?.issuedByLogo} sx={{ width: '50px', borderRadius: '50px' }} />
            <CardMedia component='img' image={solo?.orgLogo} sx={{ width: '50px', borderRadius: '50px' }} />
          </div>
          {loading  ? <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Loading />
          </Box> :  !redeemed ? <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '5%' }}>
            <Typography sx={bold_name} >{solo?.title}</Typography>
            <p style={ptag}>{solo?.useType === 'multiple' ? "Multiple Use" : "Single Use"} | <b>₹ {solo?.useType === 'multiple' ? solo?.balanceAmount : solo?.amount}</b></p>
            {!click ? <><Typography variant='h5' sx={{ ...bold_name, textAlign: 'center', marginTop: '10%' }}>Would you like to continue and redeem the voucher?</Typography>
              <img src={giphy} style={{ width: '250px' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button onClick={() => setOpen(false)} sx={{ ...btn_connect, width: 'auto' }}>Back</Button>
                <Button onClick={validate} sx={{ ...btn_hire, width: 'auto' }}>Continue</Button>
              </Box></> : !showverif ? <>
                <TextField sx={{ ...textField, marginTop: '10%' }} value={amnt} onChange={(e) => setamnt(e.target.value)} placeholder='Enter amount to redeem' />
                <TextField multiline rows={3} sx={{ ...textField, marginTop: '2%' }} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Note for yourself' />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10%' }}>
                  <Button onClick={() => setOpen(false)} sx={{ ...btn_connect, width: 'auto' }}>Back</Button>
                  <Button onClick={() => setShowVerif(true)} sx={{ ...btn_hire, width: 'auto' }}>Continue</Button>
                </Box>
              </> : <>
              <Typography sx={{ ...ptag, marginTop: '10%' }} >We have sent verificationcode on xxx{JSON.parse(localStorage.getItem('codivasUser')).phone.slice(7, 10)}</Typography>

              <ReactInputVerificationCode
                autoFocus
                placeholder=""
                onChange={(e) => setCode(e)}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10%' }}>
                <Button onClick={() => setOpen(false)} sx={{ ...btn_connect, width: 'auto' }}>Back</Button>
                <Button onClick={() => redeemvou} sx={{ ...btn_hire, width: 'auto' }}>Redeem</Button>
              </Box>
            </>}
          </Box> : <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10%', alignItems: 'center', flexDirection: 'column' }}>
            <svg className='svgg' version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
              <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
              <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
            </svg>
            <Typography sx={{ ...ptag, color: '#73AF55', marginTop: '5%' }}>Redemption Successful</Typography>
          </Box>  }
        </Box>
      </Modal>
    </div>
  );
}