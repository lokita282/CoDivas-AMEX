const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const beneficiarySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        phone: {
            type: String,
            trim: true
        },
        vouchersReceived: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Voucher'
        }
    },
    { timestamps: true }
);

const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);

module.exports = Beneficiary;
