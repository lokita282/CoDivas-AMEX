const removeSensitiveData = (data) => {
    data.password = undefined;
    data.tokens = undefined;
    data.createdAt = undefined;
    data.updatedAt = undefined;
    data.__v = undefined;
    data.profilepicture = undefined;
    data.otp = undefined;

    return data;
};

module.exports = { removeSensitiveData };

const generateRandomNumber = (numLength) => {
    let digits = '0123456789';
    let num = '';
    for (let i = 0; i < numLength; i++) {
        num += digits[Math.floor(Math.random() * 10)];
    }
    return num;
};

module.exports = {
    removeSensitiveData,
    generateRandomNumber
};
