// Importing modules
const express = require('express');
// Importing Middleware
const authorizeJWT = require('../middleware/jwt');
const upload = require('./../utils/multer');

const {
    createERupiVoucher,
    createBulkERupiVouchers,
    viewVouchers,
    revokeVoucher,
    weeklyCategoryData,
    weeklyOrgData,
    regionDistributionData
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

router.get(
    '/weekly-category-data',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBank],
    weeklyCategoryData
);

router.get(
    '/weekly-org-data',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBank],
    weeklyOrgData
);

router.get(
    '/region-distribution/:type',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBank],
    regionDistributionData
);

module.exports = router;
