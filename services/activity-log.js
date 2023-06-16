const ActivityLog = require('./../models/activityLog');

const recordActivity = async (req, obj, action) => {
    try {
        const log = new ActivityLog({
            userId: req.user._id,
            userIPAddress: req.userIPAddress ? req.userIPAddress : 'Postman',
            userAgent: req.userAgent,
            userType: req.user.type,
            uid: obj.uid ? uid : undefined,
            occuredAt: Date.now().toString(),
            actionType: action,
            body: `${actionType} operation performed by ${type} (${req.user._id.toString()})`
        });

        await log.save();

        let result = {
            data: log,
            message: 'Activity log added successfully'
        };
    } catch (error) {
        console.error(error.message);
        throw new error();
    }
};

module.exports = {
    recordActivity
};
