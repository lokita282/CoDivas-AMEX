// Importing modules
const express = require('express');
// Importing Middleware
const authorizeJWT = require('../middleware/jwt');

const {
    viewAllVouchers,
    viewAllVouchersByCategory,
    viewCategoryVouchers,
    viewCategoryVouchersByStatus
} = require('../controllers/user');

// Initializing router
const router = new express.Router();

router.get(
    '/all',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    viewAllVouchers
);

router.get(
    '/all-grouped',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    viewAllVouchersByCategory
);

router.get(
    '/:category',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    viewCategoryVouchers
);

router.get(
    '/:category/:status',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    viewCategoryVouchersByStatus
);

module.exports = router;
