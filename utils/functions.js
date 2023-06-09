var SHA256 = require('crypto-js/sha256');
const dotenv = require('dotenv').config();

const removeSensitiveData = (data) => {
    data.password = undefined;
    data.tokens = undefined;
    data.createdAt = undefined;
    data.updatedAt = undefined;
    data.__v = undefined;
    data.otp = undefined;

    return data;
};

const generateRandomNumber = (numLength) => {
    let digits = '0123456789';
    let num = '';
    for (let i = 0; i < numLength; i++) {
        num += digits[Math.floor(Math.random() * 10)];
    }
    return num;
};

const generateHash = (data) => {
    const hashedString = SHA256(data).toString();
    return hashedString.slice(0, 24);
};

const sendSms = (message, mobile) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = require('twilio')(accountSid, authToken, {
        lazyLoading: true
    });

    client.messages
        .create({
            from: process.env.TWILIO_MOBILE_NUMBER,
            to: '+91' + mobile,
            body: message
        })
        .then((message) => console.log(`Message SID ${message.sid}`))
        .catch((error) => console.error(error));
};

module.exports = {
    removeSensitiveData,
    generateRandomNumber,
    generateHash,
    sendSms
};
