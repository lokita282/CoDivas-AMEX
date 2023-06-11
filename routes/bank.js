// Importing modules
const express = require('express');
// Importing Middleware
const authorizeJWT = require('../middleware/jwt');
const upload = require('./../utils/multer');

const {
    createERupiVoucher,
    createBulkERupiVouchers,
    viewVouchers,
    revokeVoucher
} = require('../controllers/bank');

// Initializing router
const router = new express.Router();

router.post(
    '/create-voucher',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBank],
    createERupiVoucher
);

router.post(
    '/create-bulk-vouchers',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBank],
    upload.single('file'),
    createBulkERupiVouchers
);

router.get(
    '/vouchers',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBank],
    viewVouchers
);

router.patch(
    '/revoke-voucher/:id',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBank],
    revokeVoucher
);

module.exports = router;
