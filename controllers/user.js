const User = require('../models/user');
const Voucher = require('../models/voucher');
const Bank = require('../models/bank');
const Beneficiary = require('../models/beneficiary');

const { generateHash, generateRandomNumber } = require('../utils/functions');



const viewAllVouchers = async (req, res) => {
    try {
        let user = req.user;
        let vouchers = await Voucher.find({ beneficiaryPhone: user.phone });
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
        let vouchers = await Voucher.find({ beneficiaryPhone: user.phone, category: category, status: status });
        // let result = vouchers.reduce(function (r, a) {
        //     r[a.status] = r[a.status] || [];
        //     r[a.status].push(a);
        //     return r;
        // }, Object.create(null));
        let result = vouchers
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
        let vouchers = await Voucher.find({ beneficiaryPhone: user.phone, category: category });
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

        // const banks = await Bank.updateMany({}, { $set: { vouchersIssued: [] } });
        // const beneficiaries = await Beneficiary.updateMany({}, { $set: { vouchersReceived: [] } });
        if(!voucher) {
            return res.status(404).json({
                message: 'Voucher not found'
            });
        }
        if(voucher.beneficiaryPhone !== user.phone) {
            return res.status(403).json({
                message: 'You are not authorized to view this voucher'
            });
        }
        
        
        res.status(200).json({
            data: {
                ...voucher._doc,
                hash: generateHash(voucher.uid + user.phone)
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getRedemptionStatus = async (req, res) => {
    try {
        let user = req.user;
        let voucherId = req.params.id;
        let voucher = await Voucher.findOne({ _id: voucherId });

        if(!voucher) {
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
}

const getVerificationCode = async (req, res) => {
    try {
        let user = req.user;
        let voucherId = req.params.id;
        let voucher = await Voucher.findOne({ _id: voucherId });

        if(!voucher) {
            return res.status(404).json({
                message: 'Voucher not found'
            });
        }

        // if scanned
        if (voucher.status !== 'scanned') {
            res.status(200).json({
            scanned: false
            });
        } else {
            // get verification code from db
            res.status(200).json({
                scanned: true,
                verificationCode: generateRandomNumber(4)
            });

        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
module.exports = {
    viewAllVouchers,
    viewAllVouchersByCategory,
    viewCategoryVouchersByStatus,
    viewCategoryVouchers,
    viewOneVoucher,
    getRedemptionStatus,
    getVerificationCode
};