const express = require('express');

const authorizeJWT = require('../middleware/jwt');

const {
    validateVoucher,
    redeemVoucher,
    getTransactions,
    validateVoucherSMS
} = require('../controllers/merchant');

const router = new express.Router();

router.post(
    '/validate-voucher',
    [authorizeJWT.verifyJWT, authorizeJWT.roleMerchant],
    validateVoucher
);

router.post(
    '/validate-voucher-sms',
    [authorizeJWT.verifyJWT, authorizeJWT.roleMerchant],
    validateVoucherSMS
);

router.post(
    '/redeem-voucher',
    [authorizeJWT.verifyJWT, authorizeJWT.roleMerchant],
    redeemVoucher
);
router.get(
    '/transactions',
    [authorizeJWT.verifyJWT, authorizeJWT.roleMerchant],
    getTransactions
);

module.exports = router;
