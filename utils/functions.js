const dotenv = require('dotenv').config();
var AES = require('crypto-js/aes');
const CryptoJS = require('crypto-js');
const RSAUtil = require('node-crypto-rsa');

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
    if (num[0] === '0') {
        num = '1' + num.slice(1);
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

// these should come from env
publicKey =
    '-----BEGIN RSA PUBLIC KEY-----\n' +
    'MIIBCgKCAQEAoGEQbHw0rqw0wKKUc4wGrJeROlL3AjctMHQhMkVZHKnBdpjl3UKO\n' +
    'LmFBgLAFD3aTtv7FH6OtceLyzbpoBKdQe/zbFUdslniYtcgwoAipDiaEqIGhzY21\n' +
    'NrsTtRF9fWhhGfUfQXQaUXR1UJgqdR05PP24n5/NXTpLGvsN/SlqV7Z3xNWfxy6m\n' +
    'lUe/yoXvcZIZrob/1HQDwpTCrAyQCoG4Dny4GtcbnYKjBN3r0YNC5QpWskWiREOA\n' +
    'hpN2xRQhwSZUBMiSqhyk2RY7Lh+/N7kldWi2TsDBWXb8964U2wDuVZeI1OfV0Uj7\n' +
    'N4USiaj79u2a/P0c5E6EwLGyWa4Gj6DqEQIDAQAB\n' +
    '-----END RSA PUBLIC KEY-----\n';

privateKey =
    '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEowIBAAKCAQEAoGEQbHw0rqw0wKKUc4wGrJeROlL3AjctMHQhMkVZHKnBdpjl\n' +
    '3UKOLmFBgLAFD3aTtv7FH6OtceLyzbpoBKdQe/zbFUdslniYtcgwoAipDiaEqIGh\n' +
    'zY21NrsTtRF9fWhhGfUfQXQaUXR1UJgqdR05PP24n5/NXTpLGvsN/SlqV7Z3xNWf\n' +
    'xy6mlUe/yoXvcZIZrob/1HQDwpTCrAyQCoG4Dny4GtcbnYKjBN3r0YNC5QpWskWi\n' +
    'REOAhpN2xRQhwSZUBMiSqhyk2RY7Lh+/N7kldWi2TsDBWXb8964U2wDuVZeI1OfV\n' +
    '0Uj7N4USiaj79u2a/P0c5E6EwLGyWa4Gj6DqEQIDAQABAoIBAAWxLDoNdnk0l3K2\n' +
    '0nn/YEVD492kECw99RahKIR2PaFszPb+mjnuIMm4nfCJTsSrurZl+G0VDBTcry1q\n' +
    'DkMMBSlBYi0xKcN1aEYbYs5rQETGTTMF1s5K10GoBh0JD+EhkUCwmHlkO4LklT1V\n' +
    'CTy62ss1XhYcP9etN/kvK+HuVF3kh5yvXgUm1eN5nWUoe12lmlo+LGwFAZh0Mr8h\n' +
    'QeEIzpHQIM28DnZrtrxiLUjk3AOTCFkyKNyFwgrvSCiYW+gALtlWHV4IczqFhcSC\n' +
    'mNLNz+lYllw4HnVPKSDJNWP5dWVAyn2d7U72S0fPS0tBvN1nC4e+fa0MHKKqycZk\n' +
    'jyXYbnkCgYEAzzDDOt39F0jEgUZU5HyZrF3tIm+Frq2mVjzCP5hBYZV1Lp1BjZq+\n' +
    't8YDOMTHi8mbJUB0b2yOCVSjGmW8YpkNALO4Im7wBjIZPdJOSYVnuVLknKyIn5ir\n' +
    'Ss27d84NUbEKCrEg4UKTXlHsrep76GG7+/e60lRTTSqUmeSXPkGSwqsCgYEAxik0\n' +
    'p8U4RN0vuQnRc/Cud3UVR3iVqoxCYJ9GrmfUhbr9H6C1c1LepXTnSGTD+ttDniiu\n' +
    'acwxxXtQNoZ3m+XVNvlZqTnfqKu/i1UsqbX9elCvt18HoXxhVGYA5uF+k8J38vqR\n' +
    'lZZ1F0W5gn9dfVXPH+yaZzqZFA+u/JeccjF8ZjMCgYBbZMoptHSJCdtMnyahZ2ku\n' +
    'RHxvHTyd8hGWptSU0ue8UP5Q4qNhAGqyjBEtwHe5bOQYCZeS8xKwgPo1kb0IzTSU\n' +
    'I7LM1ZzhTsYdpCBOhB9d+3fGuMDHjcO5iojwbx8m8u5YCwxS8VgqWf8KNI4V0s7m\n' +
    'db+eOf5I4siMHe6tUqWXYwKBgQC9IFS+DvAOYaCLlUBPzJVnM9r0VLVbifRMLZgT\n' +
    'GsvuOrIdfo/PmncfKT0YjfuyL5UQnTkhhp62IWRENgBwTWI6zq9xYOgDHrB4tfkj\n' +
    'nKtpExsyA0PQL1rhZ11S/kKFmeRLhjRutaPZa1WLpC3BUqWVjYcsIPQ6/mD/eV/6\n' +
    'aRqWmwKBgBEn1+f3sPmJbFttgTFwgWPqGpmPd1Jua1ijQiA1Cdj3h++0wpt8IBR0\n' +
    'XVXSdc/P0gqCWdR0SzRJVzb5jobGuYG0md1YpTvIk1wwAieUUacfboq1XiQGir0y\n' +
    '81dJa+H1TgbtuMfmxVQTyLYLWqz6zCHUu9hMDYwUZu2PfheZdg6V\n' +
    '-----END RSA PRIVATE KEY-----\n';

const rsaUtil = new RSAUtil.RSAUtil();
rsaUtil.privateKeyPEMString = privateKey;
rsaUtil.publicKeyPEMString = publicKey;

// ENCRYPTION USING PUBLIC KEY
const encryptData = (data) => {
    const encryptedData = rsaUtil.encrypt(data);
    return encryptedData;
};

// DECRYPTION USING PRIVATE KEY
const decryptData = (data) => {
    const decryptedData = rsaUtil.decrypt(data);
    return decryptedData;
};

console.log(encryptData('hellomello'));

module.exports = {
    removeSensitiveData,
    generateRandomNumber,
    generateQrString,
    decryptQrString,
    sendSms,
    caesarCipherEncrypt,
    caesarCipherDecrypt
};
