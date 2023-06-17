// Importing modules
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../models/user');
const { removeSensitiveData } = require('../utils/functions');

// JWT Authorization
const authorizeJWT = {
    verifyJWT: async (req, res, next) => {
        try {
            let token = req.header('Authorization').replace('Bearer ', '');
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            let user = await User.findOne({
                _id: decoded._id,
                'tokens.token': token
            });

            let userIPAddress = req.headers['cf-connecting-ip'];
            if (userIPAddress instanceof Array) {
                userIPAddress = userIPAddress.join(',');
            }

            if (!user) {
                res.status(401).json({
                    message: 'Please Authenticate!'
                });
                return;
            }

            req.user = user;
            req.token = token;
            req.userIPAddress = userIPAddress;
            req.userAgent = req.headers['user-agent'];

            next();
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    },

    roleMerchant: (req, res, next) => {
        try {
            if (req.user.type === 'merchant') {
                next();
            } else {
                res.status(403).json({
                    message: 'Access Denied'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    },

    roleBank: (req, res, next) => {
        try {
            if (req.user.type === 'bank') {
                next();
            } else {
                res.status(403).json({
                    message: 'Access Denied'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    },

    roleBeneficiary: (req, res, next) => {
        try {
            if (req.user.type === 'beneficiary') {
                next();
            } else {
                res.status(403).json({
                    message: 'Access Denied'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    },

    roleOrganisation: (req, res, next) => {
        try {
            if (req.user.type === 'organisation') {
                next();
            } else {
                res.status(403).json({
                    message: 'Access Denied'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    },

    roleAdmin: (req, res, next) => {
        try {
            if (req.user.type === 'admin') {
                next();
            } else {
                res.status(403).json({
                    message: 'Access Denied'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
};

// Exporting Module
module.exports = authorizeJWT;
