// Importing modules
const express = require('express');
// Importing Middleware
const authorizeJWT = require('../middleware/jwt');

const {
    viewAllVouchers,
    viewAllVouchersByCategory,
    viewCategoryVouchers,
    viewCategoryVouchersByStatus,
    viewOneVoucher,
    getRedemptionStatus,
    getVerificationCode,
    getTransactions,
    weeklyCategoryData,
    monthlyCategoryData,
    expenditureCategoryData,
    trendingData,
    getAllMerchants,
    validateVoucherUtility,
    redeemVoucherUtility
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

router.get(
    '/redeemed/:id',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    getRedemptionStatus
);

router.get(
    '/verification-code/:id',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    getVerificationCode
);

router.get(
    '/transactions',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    getTransactions
);

router.get(
    '/weekly-category-data',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    weeklyCategoryData
);

router.get(
    '/monthly-category-data',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    monthlyCategoryData
);

router.get(
    '/expenditure-category-data',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    expenditureCategoryData
);

router.get(
    '/trending-data',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    trendingData
);

router.get(
    '/merchants',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    getAllMerchants
);

router.post(
    '/utility/validate-voucher',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    validateVoucherUtility
);

router.post(
    '/utility/redeem-voucher',
    [authorizeJWT.verifyJWT, authorizeJWT.roleBeneficiary],
    redeemVoucherUtility
);

module.exports = router;
