import httpcommon from '../httpcommon'
import { decryptData, encryptData } from './encryptdecrypt'

export const createErupi = async (data) => {
  let res = await httpcommon.post(`/bank/create-voucher`, { data: encryptData(data) }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
  let res3 = { data: JSON.parse(JSON.parse(res2)) }
  return res3
}

export const createBulkErupi = async (data) => {
  let res = await httpcommon.post(`/bank/create-bulk-vouchers`, { data: encryptData(data) }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
  let res3 = { data: JSON.parse(JSON.parse(res2)) }
  return res3
}

export const weeklyCatVsAmt = async () => {
  let res = await httpcommon.get(`/bank/weekly-category-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
  let res3 = { data: JSON.parse(JSON.parse(res2)) }
  return res3
}

export const weeklyCatVsOrg = async () => {
  let res = await httpcommon.get(`/bank/weekly-org-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
  let res3 = { data: JSON.parse(JSON.parse(res2)) }
  return res3
}

export const weeklyTrending = async () => {
  let res = await httpcommon.get(`/bank/weekly-trending-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
  let res3 = { data: JSON.parse(JSON.parse(res2)) }
  return res3
}

export const regionRedeemed = async () => {
  let res = await httpcommon.get(`/bank/region-distribution/redeemed`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
  let res3 = { data: JSON.parse(JSON.parse(res2)) }
  return res3
}

export const regionIssued = async () => {
  let res = await httpcommon.get(`/bank/region-distribution/issued`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
  let res3 = { data: JSON.parse(JSON.parse(res2)) }
  return res3
}

export const viewVouchers = async () => {
  let res = await httpcommon.get(`/bank/vouchers`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
  let res3 = { data: JSON.parse(JSON.parse(res2)) }
  return res3
}

export const revokeVoucher = async (id) => {
  let res = await httpcommon.patch(`/bank/revoke-voucher/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
  let res3 = { data: JSON.parse(JSON.parse(res2)) }
  return res3
}





