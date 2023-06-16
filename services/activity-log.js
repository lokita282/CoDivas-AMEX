const ActivityLog = require('./../models/activityLog');

const recordActivity = async (req, obj, action) => {
    try {
        const log = new ActivityLog({
            userId: req.user._id,
            userIPAddress: req.userIPAddress ? req.userIPAddress : 'Postman',
            userAgent: req.userAgent ? req.userAgent : undefined,
            userType: req.user.type,
            uid: obj.uid ? uid : undefined,
            occuredAt: Date.now().toString(),
            actionType: action,
            body: `${action} operation performed by ${
                req.user.type
            } (${req.user._id.toString()})`
        });

        await log.save();

        let result = {
            data: log,
            message: 'Activity log added successfully'
        };
        return result;
    } catch (error) {
        console.error(error.message);
        throw new Error(error);
    }
};

module.exports = {
    recordActivity
};
