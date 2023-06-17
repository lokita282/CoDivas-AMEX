// Importing modules
const express = require('express');
// Importing Middleware
const authorizeJWT = require('../middleware/jwt');

const {
    getActivityLogs,
    getOnboardedEntities
} = require('./../controllers/admin');

const router = new express.Router();

router.get(
    '/activity-logs',
    [authorizeJWT.verifyJWT, authorizeJWT.roleAdmin],
    getActivityLogs
);

router.get(
    '/onboarded-entities',
    [authorizeJWT.verifyJWT, authorizeJWT.roleAdmin],
    getOnboardedEntities
);

module.exports = router;
