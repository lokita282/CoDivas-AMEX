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
    testTwilio,
    testEncryption,
    testDecryption
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

// Test APIs
router.get('/test', testTwilio);
router.get('/test-encryption', testEncryption);
router.get('/test-decryption', testDecryption);

// Exporting Modules
module.exports = router;
