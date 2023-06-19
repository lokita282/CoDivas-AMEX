import React, { useEffect } from 'react';
import JSEncrypt from 'jsencrypt';
import dotenv from 'dotenv';

dotenv.config();

const encryptdecrypt = () => {
  const publicKey = process.env.publicKey; 
  const privateKey = process.env.privateKey; 

  const encryptData = (data, publicKey) => {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    return encryptor.encrypt(data);
  };

  const decryptData = (encryptedData, privateKey) => {
    const decryptor = new JSEncrypt();
    decryptor.setPrivateKey(privateKey);
    return decryptor.decrypt(encryptedData);
  };

  useEffect(() => {
    const func = async () => {
      const dataToEncrypt = 'Hello, world!';
      const encryptedData = encryptData(dataToEncrypt, publicKey);
      const decryptedData = decryptData(encryptedData, privateKey);
      console.log('Encrypted:', encryptedData);
      console.log('Decrypted:', decryptedData);
    };
    func();
  }, []);

  return <div />;
};

export default encryptdecrypt;