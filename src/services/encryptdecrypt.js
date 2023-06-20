import { AES } from "crypto-js";
import CryptoJS from 'crypto-js'


export const encryptData = (data) => {
    console.log(process.env.REACT_APP_AES_KEY)
    const encryptedData = AES.encrypt(
        JSON.stringify({...data}),
        process.env.REACT_APP_AES_KEY
    ).toString();
    console.log(encryptedData)
    return encryptedData;
};

export const decryptData = (data) => {
    const decryptedData = AES.decrypt(data, process.env.REACT_APP_AES_KEY).toString(
        CryptoJS.enc.Utf8
    );
    console.log(decryptedData)
    return decryptedData;
};