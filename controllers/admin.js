// get api for activity log
// get api for onboarded entities
const User = require('./../models/user');
const Merchant = require('../models/merchant');
const Bank = require('./../models/bank');
const ActivityLog = require('./../models/activityLog');
const { organisationDetails } = require('./../utils/data');

const getActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find({}).sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Logs found!',
            data: {
                logs
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getOnboardedEntities = async (req, res) => {
    try {
        // get all merchants
        const merchants = await Merchant.find(
            {},
            {
                bankAccountDetails: 0,
                user: 0
            }
        );

        // get all organisations from object directly

        // get all banks
        const banks = await Bank.find({});
        let bankUsers = [];
        let bankUser = {
            user: {},
            bank: {}
        };

        for (const bank of banks) {
            const user = await User.findById(bank.user);
            bankUser.user = user;
            bankUser.bank = bank;
            bankUsers.push(bankUser);
        }

        res.status(200).json({
            message: 'Onboarded entities found!',
            data: {
                merchants,
                bankUsers,
                organisationDetails
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    getActivityLogs,
    getOnboardedEntities
};
