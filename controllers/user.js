const User = require('../models/user');
const Voucher = require('../models/voucher');

const { removeSensitiveData } = require('../utils/functions');

const viewAllVouchers = async (req, res) => {
    try {
        let user = req.user;
        let vouchers = await Voucher.find({ user: user._id });
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
        let vouchers = await Voucher.find({ user: user._id });
        let result = vouchers.reduce(function (r, a) {
            r[a.category] = r[a.category] || [];
            r[a.categoryLogo].push(a);
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
