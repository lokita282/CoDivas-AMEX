const Merchant = require('../models/merchant');
const Voucher = require('../models/voucher');
const Transaction = require('../models/transaction');
const Beneficiary = require('../models/beneficiary');
const { recordActivity } = require('../services/activity-log');
const {
    generateQrString,
    generateRandomNumber,
    decryptQrString,
    caesarCipherDecrypt,
    encryptData,
    decryptData
} = require('../utils/functions');

const validateVoucher = async (req, res) => {
    try {
        const bodyData = JSON.parse(decryptData(req.body.data));
        const { encryptedString } = bodyData;
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
            const encryptedData = encryptData(
                JSON.stringify({
                    success: false,
                    message: 'Voucher Invalid!'
                })
            );

            // res.status(200).json({
            //     success: false,
            //     message: 'Voucher Invalid!'
            // });
            res.status(200).send(encryptedData);
            return;
        }
        if (voucher.category !== merchant.category) {
            const encryptedData = encryptData(
                JSON.stringify({
                    success: false,
                    message: 'Voucher not valid for this merchant!'
                })
            );
            // res.status(200).json({
            //     success: false,
            //     message: 'Voucher not valid for this merchant!'
            // });
            res.status(200).send(encryptedData);
            return;
        }
        if (voucher.startsAt > Date.now() || voucher.endsAt < Date.now()) {
            const encryptedData = encryptData(
                JSON.stringify({
                    success: false,
                    message: 'Voucher not valid for this time!'
                })
            );
            // res.status(200).json({
            //     success: false,
            //     message: 'Voucher not valid for this time!'
            // });
            res.status(200).send(encryptedData);
            return;
        }
        voucher.status = 'scanned';
        voucher.verificationCode = generateRandomNumber(4);
        await voucher.save();

        const activityLog = await recordActivity(
            req,
            merchant,
            'Validate',
            voucher
        );
        const encryptedData = encryptData(
            JSON.stringify({
                success: true,
                message: 'Verification Code generated!',
                voucherId: voucher._id
            })
        );
        // res.status(200).json({
        //     success: true,
        //     message: 'Verification Code generated!',
        //     voucherId: voucher._id
        // });
        res.status(200).send(encryptedData);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const redeemVoucher = async (req, res) => {
    try {
        const bodyData = JSON.parse(decryptData(req.body.data));
        const { voucherId, verificationCode, transactionAmount } = bodyData;
        const user = req.user;
        const merchant = await Merchant.findById(user.merchant);
        let voucher = await Voucher.findById(voucherId);
        if (!voucher) {
            res.status(404).json({
                success: false,
                message: 'Voucher not found!'
            });
            return;
        }
        if (voucher.status !== 'scanned') {
            const encryptedData = encryptData(
                JSON.stringify({
                    success: false,
                    message: 'Voucher not scanned!'
                })
            );
            // res.status(200).json({
            //     success: false,
            //     message: 'Voucher not scanned!'
            // });
            res.status(200).send(encryptedData);
            return;
        }
        const beneficiary = await Beneficiary.findOne({
            phone: voucher.beneficiaryPhone
        });
        if (voucher.verificationCode !== verificationCode) {
            const encryptedData = encryptData(
                JSON.stringify({
                    success: false,
                    message: 'Verification Code not matched!'
                })
            );
            // res.status(200).json({
            //     success: false,
            //     message: 'Verification Code not matched!'
            // });
            res.status(200).send(encryptedData);
            return;
        }
        if (
            (voucher.useType === 'multiple' &&
                voucher._doc.balanceAmount < transactionAmount) ||
            (voucher.useType === 'single' && voucher.amount < transactionAmount)
        ) {
            voucher.status = 'valid';
            voucher.verificationCode = undefined;
            await voucher.save();
            const encryptedData = encryptData(
                JSON.stringify({
                    success: false,
                    message: 'Insufficient Balance!'
                })
            );
            // res.status(200).json({
            //     success: false,
            //     message: 'Insufficient Balance!'
            // });
            res.status(200).send(encryptedData);
            return;
        }

        const transaction = new Transaction({
            datetime: Date.now(),
            voucherUid: voucher.uid,
            voucherTitle: voucher.title,
            amount: transactionAmount,
            closingBalance:
                voucher.useType === 'multiple'
                    ? parseInt(voucher._doc.balanceAmount) -
                      parseInt(transactionAmount)
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
            let balance =
                parseInt(voucher._doc.balanceAmount) -
                parseInt(transactionAmount);

            voucher = await Voucher.findByIdAndUpdate(
                voucher._id,
                {
                    $set: {
                        balanceAmount: balance,
                        status: 'redeemed'
                    }
                },
                { new: true }
            );
        }
        voucher.verificationCode = undefined;
        await voucher.save();

        const activityLog = await recordActivity(
            req,
            merchant,
            'Redeem',
            voucher
        );
        const encryptedData = encryptData(
            JSON.stringify({
                success: true,
                message: 'Voucher Redeemed!',
                transactionDetails: transaction
            })
        );
        // res.status(200).json({
        //     success: true,
        //     message: 'Voucher Redeemed!',
        //     transactionDetails: transaction
        // });
        res.status(200).send(encryptedData);
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
            let beneficiary = await Beneficiary.findById(
                transaction.beneficiaryId
            ).populate('user');
            results.push({
                ...transaction._doc,
                beneficiaryName: beneficiary.user.name
            });
        }
        const encryptedData = encryptData(
            JSON.stringify({
                success: true,
                transactions: results
            })
        );
        // res.status(200).json({
        //     success: true,
        //     transactions: results
        // });
        res.status(200).send(encryptedData);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const validateVoucherSMS = async (req, res) => {
    try {
        const bodyData = JSON.parse(decryptData(req.body.data));
        const { encryptedString } = bodyData;
        const user = req.user;
        const merchant = await Merchant.findById(user.merchant);
        console.log(encryptedString);
        const decryptedString = caesarCipherDecrypt(encryptedString, 3);
        console.log(decryptedString);
        let voucher = await Voucher.findOne({ uid: decryptedString });
        if (!voucher) {
            res.status(404).json({
                success: false,
                message: 'Voucher not found!'
            });
            return;
        }
        if (voucher.status !== 'valid') {
            const encryptedData = encryptData(
                JSON.stringify({
                    success: false,
                    message: 'Voucher Invalid!'
                })
            );
            // res.status(200).json({
            //     success: false,
            //     message: 'Voucher Invalid!'
            // });
            res.status(200).send(encryptedData);
            return;
        }
        if (voucher.category !== merchant.category) {
            const encryptedData = encryptData(
                JSON.stringify({
                    success: false,
                    message: 'Voucher not valid for this merchant!'
                })
            );
            // res.status(200).json({
            //     success: false,
            //     message: 'Voucher not valid for this merchant!'
            // });
            res.status(200).send(encryptedData);
            return;
        }
        if (voucher.startsAt > Date.now() || voucher.endsAt < Date.now()) {
            const encryptedData = encryptData(
                JSON.stringify({
                    success: false,
                    message: 'Voucher not valid for this time!'
                })
            );
            // res.status(200).json({
            //     success: false,
            //     message: 'Voucher not valid for this time!'
            // });
            res.status(200).send(encryptedData);
            return;
        }
        voucher.status = 'scanned';
        voucher.verificationCode = generateRandomNumber(4);
        await voucher.save();
        await sendSms(
            `Your e-RUPI Voucher has been scanned through SMS. Please use the verification code ${voucher.verificationCode} to complete the transaction.`,
            voucher.beneficiaryPhone
        );
        const activityLog = await recordActivity(
            req,
            merchant,
            'Validate',
            voucher
        );
        const encryptedData = encryptData(
            JSON.stringify({
                success: true,
                message: 'Verification Code generated!',
                voucherId: voucher._id
            })
        );

        // res.status(200).json({
        //     success: true,
        //     message: 'Verification Code generated!',
        //     voucherId: voucher._id
        // });
        res.status(200).send(encryptedData);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    validateVoucher,
    redeemVoucher,
    getTransactions,
    validateVoucherSMS
};
