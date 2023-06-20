import httpcommon from "../httpcommon"
import { decryptData, encryptData } from "./encryptdecrypt"

export const validateUtility = async (data) => {
  let res = await httpcommon.post(`/beneficiary/utility/validate-voucher`, { data: encryptData(data) }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
  let res3 = { data: JSON.parse(JSON.parse(res2)) }
  return res3
}


export const redeemUtility = async (data) => {
  let res = await httpcommon.post(`/beneficiary/utility/redeem-voucher`, { data: encryptData(data) }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
  let res3 = { data: JSON.parse(JSON.parse(res2)) }
  return res3
}