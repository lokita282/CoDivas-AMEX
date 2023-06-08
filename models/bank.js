const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bankSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        vouchersIssued: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Voucher'
        },
        bankLogo: {
            type: String
        }
    },
    { timestamps: true }
);

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
