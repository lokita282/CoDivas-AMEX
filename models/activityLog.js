// Importing modules
const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        userIPAddress: {
            type: String
        },
        userAgent: {
            type: String
        },
        userType: {
            type: String,
            enum: ['merchant', 'bank', 'beneficiary', 'organisation']
        },
        uid: {
            type: String
        },
        voucherUid: {
            type: String
        },
        occurredAt: {
            type: Date
        },
        actionType: {
            type: String,
            enum: [
                'Create',
                'Bulk Create',
                'Update',
                'Delete',
                'Validate',
                'Redeem',
                'Revoke',
                'Log In',
                'Sign Up'
            ]
        },
        body: {
            type: String
        }
    },
    { timestamps: true }
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
