import JSEncrypt from 'jsencrypt'

const publicKey = process.env.REACT_APP_PRIVATE_KEY
const privateKey = process.env.REACT_APP_PUBLIC_KEY
const publicPem = window.atob(publicKey)
const privatePem = window.atob(privateKey)
const encryptor = new JSEncrypt()
encryptor.setPublicKey(publicPem)
const decryptor = new JSEncrypt()
decryptor.setPrivateKey(privatePem)

export const encryptData = (data) => {
  return encryptor.encrypt(JSON.stringify({ ...data }))
}

export const decryptData = (string) => {
  return decryptor.decrypt(string)
}
