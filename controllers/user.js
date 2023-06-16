const { decrypt } = require('crypto-js/aes');
const _ = require('lodash');
const User = require('../models/user');
const Voucher = require('../models/voucher');
const Transaction = require('../models/transaction');
const Merchant = require('../models/merchant');
const {
    generateQrString,
    generateRandomNumber
} = require('../utils/functions');
const { setVoucherStatuses } = require('../utils/cron-jobs');
const Beneficiary = require('../models/beneficiary');
const { categoryIcons, shortCodes } = require('../utils/data');

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
        d.setDate(d.getDate() - 334);

        let vouchers = await Voucher.find({
            beneficiaryPhone: beneficiary.phone,
            createdAt: { $gte: d }
        });

        const count = (data, categoryObj, d) => {
            let da = _.clone(d);

            for (let i = 0; i < 12; i++) {
                let temp = {
                    x: '',
                    y: 0
                };
                temp.x = month[da.getMonth()];
                temp.x += '-' + (da.getYear() + 1900);

                for (let item of data) {
                    if (
                        item.createdAt.getMonth() == da.getMonth() &&
                        item.createdAt.getYear() == da.getYear()
                    ) {
                        temp.y += 1;
                    }
                }

                categoryObj.data.push(temp);
                da.setDate(da.getDate() + 30);
            }
            return categoryObj;
        };

        for (let item of categoryIcons) {
            let temp = [];

            let categoryObj = _.cloneDeep(lineDataObj);
            categoryObj.id = item.category;

            for (let itemception of vouchers) {
                if (itemception.category === item.category) {
                    temp.push(itemception);
                }
            }

            lineData.push(count(temp, categoryObj, d));
        }

        res.status(200).json({
            message: 'Monthy Category Data of Beneficiary',
            data: {
                lineData
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const expenditureCategoryData = async (req, res) => {
    try {
        let expenditureData = [];
        let expenditureDataObj = {
            id: '',
            label: '',
            value: 0
        };

        const beneficiary = await Beneficiary.findById(req.user.beneficiary);

        let transactions = await Transaction.find({
            beneficiaryId: beneficiary._id
        });
        console.log(beneficiary._id);

        const count = (data, obj) => {
            for (const item of data) {
                obj.value += parseInt(item.amount);
            }

            return obj;
        };

        for (const item of categoryIcons) {
            let temp = _.cloneDeep(expenditureDataObj);
            temp.id = item.category;
            temp.label = item.category;

            let data = [];

            for (const itemception of transactions) {
                let itemceptionCode = itemception.voucherUid.slice(0, 3);
                let itemceptionCategory = '';
                for (const key in shortCodes) {
                    if (shortCodes[key] === itemceptionCode) {
                        itemceptionCategory = key;
                        break;
                    }
                }

                if (itemceptionCategory == item.category) {
                    data.push(itemception);
                }
            }

            expenditureData.push(count(data, temp));
        }

        res.status(200).json({
            message: 'Expenditure Data of Beneficiary',
            data: {
                expenditureData
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const trendingData = async (req, res) => {
    try {
        let trendingData = {
            weekExpenditure: 0,
            weekChange: '',
            weekPercent: 0,
            weekHighestCategory: '',
            weekHighestCategoryIcon: '',
            monthExpenditure: 0,
            monthChange: '',
            monthPercent: 0,
            monthHighestCategory: '',
            monthHighestCategoryIcon: ''
        };
        const countObj = {
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

        const beneficiary = await Beneficiary.findById(req.user.beneficiary);

        // WEEKLY CALCULATIONS
        let countData = [];

        var dOld = new Date();
        dOld.setDate(dOld.getDate() - 13);
        var dNew = new Date();
        dNew.setDate(dNew.getDate() - 6);

        const vouchersOld = await Voucher.find({
            beneficiaryPhone: beneficiary.phone,
            createdAt: { $gte: dOld, $lt: dNew },
            status: 'redeemed'
        });

        const vouchersNew = await Voucher.find({
            beneficiaryPhone: beneficiary.phone,
            createdAt: { $gte: dNew },
            status: 'redeemed'
        });
        const vouchers = [vouchersOld, vouchersNew];

        const count = (data) => {
            let temp = _.cloneDeep(countObj);
            let weekExpense = 0;

            for (let item of data) {
                if (item.category == 'health') {
                    temp.health += item.amount;
                    weekExpense += item.amount;
                } else if (item.category == 'agriculture') {
                    temp.agriculture += item.amount;
                    weekExpense += item.amount;
                } else if (item.category == 'education') {
                    temp.education += item.amount;
                    weekExpense += item.amount;
                } else if (item.category == 'food') {
                    temp.food += item.amount;
                    weekExpense += item.amount;
                } else if (item.category == 'housing') {
                    temp.housing += item.amount;
                    weekExpense += item.amount;
                } else if (item.category == 'transportation') {
                    temp.transportation += item.amount;
                    weekExpense += item.amount;
                } else if (item.category == 'utility') {
                    temp.utility += item.amount;
                    weekExpense += item.amount;
                } else if (item.category == 'telecommunication') {
                    temp.telecommunication += item.amount;
                    weekExpense += item.amount;
                } else if (item.category == 'other') {
                    temp.other += item.amount;
                    weekExpense += item.amount;
                }
            }
            let maxExpenditure = {
                category: '',
                value: 0
            };
            let maxValue = -Infinity;
            for (let field in temp) {
                if (temp[field] > maxValue) {
                    maxExpenditure.category = field;
                    maxExpenditure.value = temp[field];
                    maxValue = temp[field];
                }
            }
            return { temp, maxExpenditure, weekExpense };
        };

        for (let item of vouchers) {
            countData.push(count(item));
        }

        trendingData.weekExpenditure = countData[1].weekExpense;

        let max1 = countData[1].maxExpenditure;
        let max0 = countData[0].maxExpenditure;

        trendingData.weekHighestCategory = max1.category;

        categoryIcons.forEach((item) => {
            if (max1.category === item.category) {
                trendingData.weekHighestCategoryIcon = item.icon;
            }
        });

        let difference = 0;
        difference = max0.value - max1.value;

        if (difference > 0) {
            trendingData.weekChange = 'dec';
            trendingData.weekPercent = difference / max0.value;
        } else if (difference < 0) {
            difference = -difference;
            trendingData.weekChange = 'inc';
            trendingData.weekPercent = (difference / max1.value) * 100;
        } else if (difference == 0) {
            trendingData.weekPercent = 'no-change';
        }

        // MONTHLY CALCULATION
        let countMonthData = [];

        var date = new Date();
        var dOldMonthly = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        // dOldMonthly.setMonth(dOldMonthly.getMonth() - 1);
        var dNewMonthly = new Date(date.getFullYear(), date.getMonth(), 1);
        // dNewMonthly.setMonth(dNewMonthly.getMonth());

        const vouchersOldMonthly = await Voucher.find({
            beneficiaryPhone: beneficiary.phone,
            status: 'redeemed',
            createdAt: { $gte: dOldMonthly, $lt: dNewMonthly }
        });

        const vouchersNewMonthly = await Voucher.find({
            beneficiaryPhone: beneficiary.phone,
            status: 'redeemed',
            createdAt: { $gte: dNewMonthly }
        });

        const vouchersMonthly = [vouchersOldMonthly, vouchersNewMonthly];

        const countMonth = (data) => {
            let tempMonth = _.cloneDeep(countObj);
            let monthExpense = 0;

            for (let item of data) {
                if (item.category == 'health') {
                    tempMonth.health += item.amount;
                    monthExpense += item.amount;
                } else if (item.category == 'agriculture') {
                    tempMonth.agriculture += item.amount;
                    monthExpense += item.amount;
                } else if (item.category == 'education') {
                    tempMonth.education += item.amount;
                    monthExpense += item.amount;
                } else if (item.category == 'food') {
                    tempMonth.food += item.amount;
                    monthExpense += item.amount;
                } else if (item.category == 'housing') {
                    tempMonth.housing += item.amount;
                    monthExpense += item.amount;
                } else if (item.category == 'transportation') {
                    tempMonth.transportation += item.amount;
                    monthExpense += item.amount;
                } else if (item.category == 'utility') {
                    tempMonth.utility += item.amount;
                    monthExpense += item.amount;
                } else if (item.category == 'telecommunication') {
                    tempMonth.telecommunication += item.amount;
                    monthExpense += item.amount;
                } else if (item.category == 'other') {
                    tempMonth.other += item.amount;
                    monthExpense += item.amount;
                }
            }

            let maxMonthExpenditure = {
                category: '',
                value: 0
            };
            let maxMonthValue = -Infinity;

            for (let field in tempMonth) {
                if (tempMonth[field] > maxMonthValue) {
                    maxMonthExpenditure.category = field;
                    maxMonthExpenditure.value = tempMonth[field];
                    maxMonthValue = tempMonth[field];
                }
            }
            return { tempMonth, maxMonthExpenditure, monthExpense };
        };

        for (let item of vouchersMonthly) {
            countMonthData.push(countMonth(item));
        }

        trendingData.monthExpenditure = countMonthData[1].monthExpense;

        let maxMonth1 = countMonthData[1].maxMonthExpenditure;
        let maxMonth0 = countMonthData[0].maxMonthExpenditure;

        trendingData.monthHighestCategory = maxMonth1.category;
        categoryIcons.forEach((item) => {
            if (maxMonth1.category === item.category) {
                trendingData.monthHighestCategoryIcon = item.icon;
            }
        });

        let monthDifference = 0;
        monthDifference = maxMonth0.value - maxMonth1.value;

        if (monthDifference > 0) {
            trendingData.monthChange = 'dec';
            trendingData.monthPercent = difference / maxMonth0.value;
        } else if (monthDifference < 0) {
            monthDifference = -monthDifference;
            trendingData.monthChange = 'inc';
            trendingData.monthPercent = (difference / maxMonth1.value) * 100;
        } else if (difference == 0) {
            trendingData.monthPercent = 'no-change';
        }

        res.status(200).json({
            message: 'Weekly & Monthly Trending for Beneficiary',
            data: {
                trendingData
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getAllMerchants = async (req, res) => {
    try {
        const merchants = await Merchant.find(
            {},
            {
                bankAccountDetails: 0,
                user: 0
            }
        );
        res.status(200).json({
            message: 'All Merchants returned successfully',
            data: {
                merchants
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
    weeklyCategoryData,
    monthlyCategoryData,
    expenditureCategoryData,
    trendingData,
    getAllMerchants
};
