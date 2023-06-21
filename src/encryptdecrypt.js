import { AES } from "react-native-crypto-js";
import CryptoJS from 'react-native-crypto-js'
import { REACT_APP_AES_KEY } from "./constants";

export const encryptData = (data) => {
    console.log(data)
    const encryptedData = AES.encrypt(
        JSON.stringify({...data}),
        REACT_APP_AES_KEY
      ).toString();
    console.log(encryptedData)
    return encryptedData;
};

export const decryptData = (data) => {
    const decryptedData = AES.decrypt(data,  REACT_APP_AES_KEY).toString(
        CryptoJS.enc.Utf8
    );
    console.log(decryptedData)
    return decryptedData;
};