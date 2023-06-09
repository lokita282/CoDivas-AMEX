// Importing modules
const express = require('express');
// Importing Middleware
const authorizeJWT = require('../middleware/jwt');

const {
    viewAllVouchers,
    viewAllVouchersByCategory,
    viewCategoryVouchers,
    viewCategoryVouchersByStatus,
    viewOneVoucher
} = require('../controllers/user');

// Initializing router
const router = new express.Router();

router.get(
    '/multiple/all',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    viewAllVouchers
);

router.get(
    '/multiple/all-grouped',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    viewAllVouchersByCategory
);

router.get(
    '/multiple/:category',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    viewCategoryVouchers
);

router.get(
    '/multiple/:category/:status',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    viewCategoryVouchersByStatus
);

router.get(
    '/single/:id',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    viewOneVoucher
);

module.exports = router;
