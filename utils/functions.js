var SHA256 = require("crypto-js/sha256");

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
    const hashedString = SHA256(data)
    return hashedString.slice(0, 24);
};


module.exports = {
    removeSensitiveData,
    generateRandomNumber,
    generateHash
};
