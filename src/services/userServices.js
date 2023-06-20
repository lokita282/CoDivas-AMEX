import httpcommon from "../httpcommon"
import { decryptData, encryptData } from "./encryptdecrypt"
// import { encryptData } from "./encryptdecrypt"

export const login = async(data) => {
    let res = await httpcommon.post(`/auth/login`, {data:encryptData(data)})
    let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}


export const signup = async(data) => {
    let res = await httpcommon.post(`/auth/beneficiary/signup`, {data:encryptData(data)})
    let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const getAllCoupons = async() => {
    let res = await httpcommon.get(`/beneficiary/multiple/all-grouped`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
    let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const getCategoryCoupon = async(cat) => {
    let res = await httpcommon.get(`/beneficiary/multiple/${cat}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
    let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const getSoloCoupon = async(id) => {
    let res = await httpcommon.get(`/beneficiary/single/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
    let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const getVerifCode = async(id) => {
    let res = await httpcommon.get(`/beneficiary/verification-code/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
    let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const weeklyCatVsAmt = async() => {
  let res = await httpcommon.get(`/beneficiary/weekly-category-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const yearlyCatVsAmt = async() => {
  let res = await httpcommon.get(`/beneficiary/monthly-category-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const categoryPie = async() => {
  let res = await httpcommon.get(`/beneficiary/expenditure-category-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const redemptionStatus = async(id) => {
  let res = await httpcommon.get(`/beneficiary/redeemed/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const trendingData = async() => {
  let res = await httpcommon.get(`/beneficiary/trending-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const getTrans = async() => {
  let res =await httpcommon.get(`/beneficiary/transactions`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const getAllMerchants = async() => {
  let res = await httpcommon.get(`/beneficiary/merchants`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}