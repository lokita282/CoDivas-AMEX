const dotenv = require('dotenv').config();
var AES = require('crypto-js/aes');
const CryptoJS = require('crypto-js');
const NodeRSA = require('node-rsa');
const Merchant = require('../models/merchant');
const Transaction = require('../models/transaction');
const removeSensitiveData = (data) => {
    data.password = undefined;
    data.tokens = undefined;
    data.createdAt = undefined;
    data.updatedAt = undefined;
    data.__v = undefined;
    data.otp = undefined;

    return data;
};
const toTitleCase = (str) =>
    str.replace(
        /(^\w|\s\w)(\S*)/g,
        (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
    );
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

const encryptData = (data) => {
    const encryptedData = AES.encrypt(
        JSON.stringify(data),
        process.env.AES_KEY
    ).toString();
    return encryptedData;
};

const decryptData = (data) => {
    const decryptedData = AES.decrypt(data, process.env.AES_KEY).toString(
        CryptoJS.enc.Utf8
    );
    return decryptedData;
};

// OLD RSA CODE
// const privateKeyPEM = Buffer.from(process.env.PRIVATE_KEY, 'base64').toString(
//     'ascii'
// );
// const publicKeyPEM = Buffer.from(process.env.PUBLIC_KEY, 'base64').toString(
//     'ascii'
// );

// const key = new NodeRSA();
// key.setOptions({ encryptionScheme: 'pkcs1' });
// key.importKey(publicKeyPEM, 'pkcs1-public-pem');
// key.importKey(privateKeyPEM, 'pkcs1-private-pem');

// // ENCRYPTION USING PUBLIC KEY
// const encryptData = (data) => {
//     const encryptedData = key.encrypt(data, 'base64');
//     return encryptedData;
// };

// // DECRYPTION USING PRIVATE KEY
// const decryptData = (data) => {
//     const decryptedData = key.decrypt(data, 'utf8');
//     return decryptedData;
// };

// // ENCRYPTION USING PUBLIC KEY
// const encryptData = (data) => {
//     console.log(data);
//     const aesEncryptedString = AES.encrypt(
//         data,
//         process.env.AES_KEY
//     ).toString();
//     console.log('aes');
//     console.log(aesEncryptedString);
//     const rsaEncryptedData = key.encrypt(aesEncryptedString, 'base64');
//     console.log('rsa');
//     console.log(rsaEncryptedData);
//     return rsaEncryptedData;
// };

// // DECRYPTION USING PRIVATE KEY
// const decryptData = (data) => {
//     const rsaDecryptedData = key.decrypt(data, 'utf8');
//     const aesDecryptedString = AES.decrypt(
//         rsaDecryptedData,
//         process.env.AES_KEY
//     ).toString(CryptoJS.enc.Utf8);
//     return aesDecryptedString;
// };

const merchantNames = async (merchantId) => {
    try {
        const categories = [
            'health',
            'agriculture',
            'education',
            'food',
            'housing',
            'transportation',
            'utility',
            'telecommunication',
            'other'
        ];
        const merchantsData = [
            {
                id: '1',
                name: 'Apollo Hospital',
                category: 'health',
                gstIn: '07AAACA5443N1ZK'
            },
            {
                id: '2',
                name: 'Fortis Hospital',
                category: 'health',
                gstIn: '27AABCF3718N1ZE'
            },
            {
                id: '3',
                name: 'Reliance Hospital',
                category: 'health',
                gstIn: '27AAACR7606L2Z3'
            },
            {
                id: '4',
                name: 'ITC Limited',
                category: 'agriculture',
                gstIn: '34AAACI5950L1ZF'
            },
            {
                id: '5',
                name: 'Godrej Agrovet Limited',
                category: 'agriculture',
                gstIn: '33AAACG0617Q3ZL'
            },
            {
                id: '6',
                name: 'Mahindra & Mahindra Limited',
                category: 'agriculture',
                gstIn: '23AAACM3025E1Z7'
            },
            {
                id: '7',
                name: 'Food Corporation of India',
                category: 'food',
                gstIn: '37AAACF0365N1ZH'
            },
            {
                id: '8',
                name: 'Amul',
                category: 'food',
                gstIn: '35AAAAG5588Q1ZZ'
            },
            {
                id: '9',
                name: 'Nestle India',
                category: 'food',
                gstIn: '27AAACN0757G1ZL'
            },
            {
                id: '10',
                name: 'Housing Development Finance Corporation Limited (HDFC)',
                category: 'housing',
                gstIn: '27AAACH0997E1ZL'
            },
            {
                id: '11',
                name: 'LIC Housing Finance Limited',
                category: 'housing',
                gstIn: '23AAACL1799C2ZQ'
            },
            {
                id: '12',
                name: 'Tata Housing Development Company Limited',
                category: 'housing',
                gstIn: '27AAACT0191Q1ZY'
            },
            {
                id: '13',
                name: 'Indian Railways',
                category: 'transportation',
                gstIn: '09AAAGM0289C1DQ'
            },
            {
                id: '14',
                name: 'Uber India Systems Private Limited',
                category: 'transportation',
                gstIn: '07AABCU6223H1CR'
            },
            {
                id: '15',
                name: 'Ola Cabs',
                category: 'transportation',
                gstIn: '36AAKCA2311H1CC'
            },
            {
                id: '16',
                name: 'BSES Rajdhani Power Limited',
                category: 'utility',
                gstIn: '07AAGCS3187H2Z3'
            },
            {
                id: '17',
                name: 'Adani Gas Limited',
                category: 'utility',
                gstIn: '24AAFCA3788D1ZS'
            },
            {
                id: '18',
                name: 'Tata Power',
                category: 'utility',
                gstIn: '30AAACT0054A2ZD'
            },
            {
                id: '19',
                name: 'Bharti Airtel Limited',
                category: 'telecommunication',
                gstIn: '33AAACB2894G1ZU'
            },
            {
                id: '20',
                name: 'Reliance Jio Infocomm Limited',
                category: 'telecommunication',
                gstIn: '37AABCI6363G1ZI'
            },
            {
                id: '21',
                name: 'Vodafone Idea Limited',
                category: 'telecommunication',
                gstIn: '19AAACB2100P1ZU'
            },
            {
                id: '22',
                name: 'Amazon India Private Limited',
                category: 'other',
                gstIn: '36AAPCA6346P1ZW'
            },
            {
                id: '23',
                name: 'Flipkart India Private Limited',
                category: 'other',
                gstIn: '27AABCF8078M1Z1'
            },
            {
                id: '24',
                name: 'Byjus',
                category: 'education',
                gstIn: '32ARMPB3552D1ZB'
            },
            {
                id: '25',
                name: 'Educomp Solutions Ltd',
                category: 'education',
                gstIn: '36AAACE2983M1ZA'
            },
            {
                id: '26',
                name: 'FIITJEE',
                category: 'education',
                gstIn: '33AAACF2659M2ZH'
            }
        ];
        const allMerchants = await Merchant.find();
        for (let merchant of allMerchants) {
            const matchingMerchants = merchantsData.filter(
                (merchantData) => merchantData.category === merchant.category
            );
            const randomMerchant =
                matchingMerchants[
                    Math.floor(Math.random() * matchingMerchants.length)
                ];
            merchant.businessName = randomMerchant.name;
            merchant.gstNo = randomMerchant.gstIn;
            const transactions = await Transaction.find({
                merchantId: merchant._id
            });
            for (let transaction of transactions) {
                transaction.payee = randomMerchant.name;
                await transaction.save();
            }

            await merchant.save();
        }
        console.log('Merchant names updated');
        return;
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    removeSensitiveData,
    generateRandomNumber,
    generateQrString,
    decryptQrString,
    sendSms,
    caesarCipherEncrypt,
    caesarCipherDecrypt,
    encryptData,
    decryptData,
    merchantNames
};
