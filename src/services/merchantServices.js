import httpcommon from "../httpcommon"
import { decryptData, encryptData } from "./encryptdecrypt"

export const login = async(data) => {
    let res = await httpcommon.post(`/auth/login`, {data:encryptData(data)})
    let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const signup = async(data) => {
    let res = await httpcommon.post(`auth/merchant/signup`, {data:encryptData(data)})
    let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const validate = async(data) => {
    let res = await httpcommon.post(`/merchant/validate-voucher`, {data:encryptData(data)}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
    let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const redeem = async(data) => {
    let res = await httpcommon.post(`/merchant/redeem-voucher`, {data:encryptData(data)}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
    let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const getTrans = async() => {
    let res = await httpcommon.get(`/merchant/transactions`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
    let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const scanSMS = async(data) => {
    let res = await httpcommon.post(`/merchant/validate-voucher-sms`, {data:encryptData(data)}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
    let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}