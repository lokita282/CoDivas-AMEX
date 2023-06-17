import React, { useEffect } from 'react';
import JSEncrypt from 'jsencrypt';

const MyComponent = () => {
  const publicKey = process.env.REACT_APP_PUBLIC_KEY; // Replace with your public key
  const privateKey = process.env.REACT_APP_PRIVATE_KEY; // Replace with your private key

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

export default MyComponent;
