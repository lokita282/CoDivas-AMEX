const { decrypt } = require('crypto-js/aes');
const User = require('../models/user');
const Voucher = require('../models/voucher');
const Transaction = require('../models/transaction');
const {
    generateQrString,
    generateRandomNumber,
    decryptQrString
} = require('../utils/functions');
const { setVoucherStatuses } = require('../utils/cron-jobs');
const Beneficiary = require('../models/beneficiary');

const viewAllVouchers = async (req, res) => {
    try {
        let user = req.user;
        let vouchers = await Voucher.find({ beneficiaryPhone: user.phone });
        vouchers = await setVoucherStatuses(vouchers);
        res.status(200).json({
            data: vouchers
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const viewAllVouchersByCategory = async (req, res) => {
    try {
        let user = req.user;
        let vouchers = await Voucher.find({ beneficiaryPhone: user.phone });
        vouchers = await setVoucherStatuses(vouchers);
        let result = vouchers.reduce(function (r, a) {
            r[a.category] = r[a.category] || [];
            r[a.category].push(a);
            return r;
        }, Object.create(null));

        res.status(200).json({
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const viewCategoryVouchersByStatus = async (req, res) => {
    try {
        let user = req.user;
        let category = req.params.category;
        let status = req.params.status;
        let vouchers = await Voucher.find({
            beneficiaryPhone: user.phone,
            category: category,
            status: status
        });
        vouchers = await setVoucherStatuses(vouchers);
        // let result = vouchers.reduce(function (r, a) {
        //     r[a.status] = r[a.status] || [];
        //     r[a.status].push(a);
        //     return r;
        // }, Object.create(null));
        let result = vouchers;
        res.status(200).json({
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const viewCategoryVouchers = async (req, res) => {
    try {
        let user = req.user;
        let category = req.params.category;
        let vouchers = await Voucher.find({
            beneficiaryPhone: user.phone,
            category: category
        });
        vouchers = await setVoucherStatuses(vouchers);
        res.status(200).json({
            data: vouchers
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const viewOneVoucher = async (req, res) => {
    try {
        let user = req.user;
        let voucherId = req.params.id;
        let voucher = await Voucher.findOne({ _id: voucherId });
        let voucherStatusSet = await setVoucherStatuses([voucher]);
        voucher = voucherStatusSet[0];
        if (!voucher) {
            return res.status(404).json({
                message: 'Voucher not found'
            });
        }
        if (voucher.beneficiaryPhone !== user.phone) {
            return res.status(403).json({
                message: 'You are not authorized to view this voucher'
            });
        }

        res.status(200).json({
            data: {
                ...voucher._doc,
                qrString: generateQrString(voucher.uid)
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getRedemptionStatus = async (req, res) => {
    try {
        let user = req.user;
        let voucherId = req.params.id;
        let voucher = await Voucher.findOne({ _id: voucherId });

        if (!voucher) {
            return res.status(404).json({
                message: 'Voucher not found'
            });
        }

        res.status(200).json({
            redeemed: voucher.status === 'redeemed'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getVerificationCode = async (req, res) => {
    try {
        let user = req.user;
        let voucherId = req.params.id;
        let voucher = await Voucher.findOne({ _id: voucherId });

        if (!voucher) {
            return res.status(404).json({
                message: 'Voucher not found'
            });
        }
        if (voucher.status !== 'scanned') {
            res.status(200).json({
                scanned: false
            });
        } else {
            // get verification code from db
            res.status(200).json({
                scanned: true,
                verificationCode: voucher.verificationCode
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getTransactions = async (req, res) => {
    try {
        let user = req.user;
        let beneficiary = await Beneficiary.findById(user.beneficiary);
        let transactions = await Transaction.find({
            beneficiaryId: beneficiary._id
        });
        res.status(200).json({
            data: transactions
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    viewAllVouchers,
    viewAllVouchersByCategory,
    viewCategoryVouchersByStatus,
    viewCategoryVouchers,
    viewOneVoucher,
    getRedemptionStatus,
    getVerificationCode,
    getTransactions
};
