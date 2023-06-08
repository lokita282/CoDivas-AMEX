// Importing modules
const express = require('express');
// Importing Middleware
const authorizeJWT = require('../middleware/jwt');
// Importing controllers and utilities
const {
    signupBeneficiary,
    signupMerchant,
    login,
    logout,
    logoutAll,
    changePassword,
    forgotPassword,
    resetPassword,
    testTwilio
} = require('../controllers/auth');

// Initializing router
const router = new express.Router();

router.post('/beneficiary/signup', signupBeneficiary);
router.post('/merchant/signup', signupMerchant);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:token', resetPassword);
router.put('/logout', authorizeJWT.verifyJWT, logout);
router.put('/logoutall', authorizeJWT.verifyJWT, logoutAll);
router.put('/changepassword', authorizeJWT.verifyJWT, changePassword);
router.get('/test', testTwilio);
// Exporting Modules
module.exports = router;
