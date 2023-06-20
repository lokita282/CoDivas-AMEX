import httpcommon from "../httpcommon"
import { decryptData, encryptData } from "./encryptdecrypt"

export const login = async(data) => {
    let res = await httpcommon.post(`/auth/login`, {data:encryptData(data)})
    let res2 = decryptData(res.data)
    console.log(res2)

    // return decryptData(res)
}

export const signup = (data) => {
    console.log(encryptData({data}))
    return httpcommon.post(`auth/merchant/signup`, {data : encryptData({data})})
}

export const validate = (data) => {
    return httpcommon.post(`/merchant/validate-voucher`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
}

export const redeem = (data) => {
    return httpcommon.post(`/merchant/redeem-voucher`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
}

export const getTrans = () => {
    return httpcommon.get(`/merchant/transactions`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
}

export const scanSMS = (data) => {
    return httpcommon.post(`/merchant/validate-voucher-sms`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
}