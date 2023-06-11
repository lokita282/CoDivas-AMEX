import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import QRCode from 'react-qr-code';
import { CardMedia } from '@mui/material';

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
    const { open, setOpen, string, solo } = props

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={() => setOpen(false)}
                sx={{ "& .css-1m2x5u7": { border: 'none', borderRadius: '10px' } }}
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CardMedia component='img' image={solo?.issuedByLogo} sx={{ width: '50px', borderRadius: '50px' }} />
                        <CardMedia component='img' image={solo?.orgLogo} sx={{ width: '50px', borderRadius: '50px' }} />
                    </div>
                    <QRCode value={string} style={{ marginTop: '5%' }} />
                </Box>
            </Modal>
        </div>
    );
}
