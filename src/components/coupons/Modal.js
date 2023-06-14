import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import QRCode from 'react-qr-code';
import { CardMedia, Typography } from '@mui/material';
import { getCategoryCoupon, getSoloCoupon, getVerifCode } from '../../services/userServices';
import { bold_name, df_jc_ac, df_jc_ac_fdc, ptag } from '../../theme/CssMy';

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
    const [scanned, setScanned] =useState(false)
    const [code, setCode] = useState('')
    console.log(solo, scanned)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await getVerifCode(solo?._id); // Call the API function
            console.log(res.data);
            setScanned(res.data.scanned);
            setCode(res.data.verificationCode)
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
        }, 5000);
    
        return () => {
          clearInterval(interval); // Clear the interval when the component unmounts
        };
      }, [solo, scanned]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await getSoloCoupon(solo?._id); // Call the API function
            console.log(res.data);
            setRedeem(res.data.data.status === 'redeemed' ? true : false) ;
            res.data.data.status === 'redeemed' && await getCategoryCoupon(category)
                .then((res) => {
                    console.log(res.data.data)
                    setCat(res.data.data)
                    setTimeout(() => {
                        setOpen(false)
                    }, [3000])
                })
          } catch (error) {
            console.log(error);
          }
        };
    
        const interval = setInterval(() => {
          if (solo !== null && !redeem) {
            fetchData();
          } else {
            clearInterval(interval);
          }
        }, 5000);
    
        return () => {
          clearInterval(interval); // Clear the interval when the component unmounts
        };
      }, [solo, redeem]);

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={() => {
                    setSolo(null)
                    setOpen(false)}}
                sx={{ "& .css-1m2x5u7": { border: 'none', borderRadius: '10px' } }}
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CardMedia component='img' image={solo?.issuedByLogo} sx={{ width: '50px', borderRadius: '50px' }} />
                        <CardMedia component='img' image={solo?.orgLogo} sx={{ width: '50px', borderRadius: '50px' }} />
                    </div>
                     {scanned ? redeem ? <Box sx={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column' }}>
                <svg className='svgg' version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                    <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                </svg>
                <Typography sx={{ ...bold_name, color: '#73AF55' }}>Redemption Successful</Typography>
            </Box> :  <Box sx={df_jc_ac_fdc}>
                     <p sx={ptag}>Your verification code is</p>
                        <Typography variant='h1' sx={bold_name}>{code}</Typography>
                     </Box> : <QRCode value={string} style={{ marginTop: '5%' }} />}
                </Box>
            </Modal>
        </div>
    );
}
