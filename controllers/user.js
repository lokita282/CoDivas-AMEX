const { decrypt } = require('crypto-js/aes');
const _ = require('lodash');
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
const { categoryIcons } = require('../utils/data');

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

        let results = [];
        for (let transaction of transactions) {
            results.push({
                ...transaction._doc,
                beneficiaryName: user.name
            });
        }
        res.status(200).json({
            data: results
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const weeklyCategoryData = async (req, res) => {
    try {
        let barData = [];
        const barDataObj = {
            day: '',
            health: 0,
            agriculture: 0,
            education: 0,
            food: 0,
            housing: 0,
            transportation: 0,
            utility: 0,
            telecommunication: 0,
            other: 0
        };
        const weekday = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];

        const beneficiary = await Beneficiary.findById(req.user.beneficiary);

        var d = new Date();
        d.setDate(d.getDate() - 6);

        let vouchers = await Voucher.find({
            beneficiaryPhone: beneficiary.phone,
            createdAt: { $gte: d }
        });

        const count = (data, d) => {
            let temp = _.cloneDeep(barDataObj);
            temp.day = weekday[d.getDay()];

            for (let item of data) {
                if (item.category == 'health') {
                    temp.health += 1;
                } else if (item.category == 'agriculture') {
                    temp.agriculture += 1;
                } else if (item.category == 'education') {
                    temp.education += 1;
                } else if (item.category == 'food') {
                    temp.food += 1;
                } else if (item.category == 'housing') {
                    temp.housing += 1;
                } else if (item.category == 'transportation') {
                    temp.transportation += 1;
                } else if (item.category == 'utility') {
                    temp.utility += 1;
                } else if (item.category == 'telecommunication') {
                    temp.telecommunication += 1;
                } else if (item.category == 'other') {
                    temp.other += 1;
                }
            }
            return temp;
        };

        for (let i = 0; i < 7; i++) {
            let temp = [];
            for (let item of vouchers) {
                if (item.createdAt.toDateString() === d.toDateString()) {
                    temp.push(item);
                }
            }
            barData.push(count(temp, d));
            d.setDate(d.getDate() + 1);
        }

        res.status(200).json({
            message: 'User Weekly Vouchers by Category',
            data: {
                barData
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const monthlyCategoryData = async (req, res) => {
    try {
        let lineData = [];
        const lineDataObj = {
            id: '',
            data: []
        };

        const month = [
            'JAN',
            'FEB',
            'MAR',
            'APR',
            'MAY',
            'JUN',
            'JUL',
            'AUG',
            'SEP',
            'OCT',
            'NOV',
            'DEC'
        ];

        const beneficiary = await Beneficiary.findById(req.user.beneficiary);
        let d = new Date();
        d.setDate(d.getMonth() - 364);

        let vouchers = await Voucher.find({
            beneficiaryPhone: beneficiary.phone,
            createdAt: { $gte: d }
        });

        const count = (data, d) => {
            let temp = _.cloneDeep(lineDataObj);
            temp.id = data[0].category;

            for (let itemception of data) {
                let itemMonth = itemception.getMonth();
                if (itemception.createdAt.getMonth() == d.getMonth()) {
                }

                if (item.category == 'health') {
                    temp.data[0].y += 1;
                } else if (item.category == 'agriculture') {
                    temp.data[1].y += 1;
                } else if (item.category == 'education') {
                    temp.data[2].y += 1;
                } else if (item.category == 'food') {
                    temp.data[3].y += 1;
                } else if (item.category == 'housing') {
                    temp.data[4].y += 1;
                } else if (item.category == 'transportation') {
                    temp.data[5].y += 1;
                } else if (item.category == 'utility') {
                    temp.data[6].y += 1;
                } else if (item.category == 'telecommunication') {
                    temp.data[7].y += 1;
                } else if (item.category == 'other') {
                    temp.data[8].y += 1;
                }
            }
            return temp;
        };

        for (let item of categoryIcons) {
            let temp = [];
            for (let itemception of vouchers) {
                // let date = item.createdAt
                if (itemception.category === item.category) {
                    temp.push(itemception);
                }
            }
            let innerObj = lineData.push(count(temp, d));
            d.setDate(d.getDate + 30);
        }

        res.status(200).json({
            message: 'Weekly Vouchers for Organisation',
            data: {
                barData
            }
        });
    } catch (error) {
        res.status(400).json({
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
    getTransactions,
    weeklyCategoryData
};
