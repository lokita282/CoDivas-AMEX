const Merchant = require('../models/merchant');
const Voucher = require('../models/voucher');
const Transaction = require('../models/transaction');
const Beneficiary = require('../models/beneficiary');
const {
    generateQrString,
    generateRandomNumber,
    decryptQrString
} = require('../utils/functions');

const validateVoucher = async (req, res) => {
    try {
        const { encryptedString } = req.body;
        const user = req.user;
        const merchant = await Merchant.findById(user.merchant);
        const decryptedString = decryptQrString(encryptedString);
        let voucher = await Voucher.findOne({ uid: decryptedString });
        if (!voucher) {
            res.status(404).json({
                success: false,
                message: 'Voucher not found!'
            });
            return;
        }
        if (voucher.status !== 'valid') {
            res.status(200).json({
                success: false,
                message: 'Voucher Invalid!'
            });
            return;
        }
        if (voucher.category !== merchant.category) {
            res.status(200).json({
                success: false,
                message: 'Voucher not valid for this merchant!'
            });
            return;
        }
        if (voucher.startsAt > Date.now() || voucher.endsAt < Date.now()) {
            res.status(200).json({
                success: false,
                message: 'Voucher not valid for this time!'
            });
            return;
        }
        voucher.status = 'scanned';
        voucher.verificationCode = generateRandomNumber(4);
        await voucher.save();

        res.status(200).json({
            success: true,
            message: 'Verification Code generated!',
            voucherId: voucher._id
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const redeemVoucher = async (req, res) => {
    try {
        const { voucherId, verificationCode, transactionAmount } = req.body;
        const user = req.user;
        const merchant = await Merchant.findById(user.merchant);
        const voucher = await Voucher.findById(voucherId);
        if (!voucher) {
            res.status(404).json({
                success: false,
                message: 'Voucher not found!'
            });
            return;
        }
        if (voucher.status !== 'scanned') {
            res.status(200).json({
                success: false,
                message: 'Voucher not scanned!'
            });
            return;
        }
        const beneficiary = await Beneficiary.findOne({
            phone: voucher.beneficiaryPhone
        });
        if (voucher.verificationCode !== verificationCode) {
            res.status(200).json({
                success: false,
                message: 'Verification Code not matched!'
            });
            return;
        }
        if (
            (voucher.useType === 'multiple' &&
                voucher.balanceAmount < transactionAmount) ||
            (voucher.useType === 'single' && voucher.amount < transactionAmount)
        ) {
            res.status(200).json({
                success: false,
                message: 'Insufficient Balance!'
            });
            return;
        }

        const transaction = new Transaction({
            datetime: Date.now(),
            voucherUid: voucher.uid,
            voucherTitle: voucher.title,
            amount: transactionAmount,
            closingBalance:
                voucher.useType === 'multiple'
                    ? voucher.balanceAmount
                    : undefined,
            beneficiaryPhone: beneficiary.phone,
            payee: merchant.businessName,
            beneficiaryId: beneficiary._id,
            merchantId: merchant._id
        });
        await transaction.save();

        if (voucher.useType === 'single') {
            voucher.status = 'redeemed';
        } else {
            voucher.status = 'redeemed';
            voucher.balanceAmount = voucher.balanceAmount - transactionAmount;
        }
        voucher.verificationCode = undefined;
        await voucher.save();

        res.status(200).json({
            success: true,
            message: 'Voucher Redeemed!',
            transactionDetails: transaction
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getTransactions = async (req, res) => {
    try {
        const user = req.user;
        const merchant = await Merchant.findById(user.merchant);
        const transactions = await Transaction.find({
            merchantId: merchant._id
        });
        let results = [];
        for (let transaction of transactions) {
            let beneficiary = await Beneficiary.findById(transaction.beneficiaryId).populate('user');
            results.push({
                ...transaction._doc,
                beneficiaryName: beneficiary.user.name
            });
        }
                
        res.status(200).json({
            success: true,
            transactions: results
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    validateVoucher,
    redeemVoucher,
    getTransactions
};
