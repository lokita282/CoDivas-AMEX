const dotenv = require('dotenv').config();
var AES = require('crypto-js/aes');
const CryptoJS = require('crypto-js');
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

const generateQrString = (data) => {
    const encryptedString = AES.encrypt(
        data,
        process.env.QR_SECRET_KEY
    ).toString();
    const qrString = `xxx-${encryptedString}-xxx`;
    return qrString;
};

const decryptQrString = (data) => {
    const decryptedString = AES.decrypt(
        data,
        process.env.QR_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    return decryptedString;
};

function caesarCipherEncrypt(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let charCode = char.charCodeAt(0);

        if (
            (charCode >= 65 && charCode <= 90) ||
            (charCode >= 97 && charCode <= 122)
        ) {
            // Uppercase and lowercase letters
            char = String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
        } else if (isNumber(char)) {
            // Numbers
            let num = parseInt(char);
            num += shift;
            if (num > 9) {
                num = num % 10;
            }
            char = String(num);
        }
        result += char;
    }
    result = 'xxx-' + result + '-xxx';

    return result;
}

function caesarCipherDecrypt(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let charCode = char.charCodeAt(0);

        if (charCode >= 65 && charCode <= 90) {
            // Uppercase letters
            char = String.fromCharCode(
                ((charCode - 65 - shift + 26) % 26) + 65
            );
        } else if (charCode >= 97 && charCode <= 122) {
            // Lowercase letters
            char = String.fromCharCode(
                ((charCode - 97 - shift + 26) % 26) + 97
            );
        } else if (isNumber(char)) {
            // Numbers
            let num = parseInt(char);
            num -= shift;
            if (num < 0) {
                num = 10 + num;
            }
            char = String(num);
        }

        result += char;
    }
    return result;
}

function isLetter(char) {
    return /^[a-zA-Z]$/.test(char);
}

function isUpperCase(char) {
    return /^[A-Z]$/.test(char);
}

function isNumber(char) {
    return /^[0-9]$/.test(char);
}

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
    generateQrString,
    decryptQrString,
    sendSms,
    caesarCipherEncrypt,
    caesarCipherDecrypt
};
