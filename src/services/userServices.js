import httpcommon from "../httpcommon"
import { decryptData, encryptData } from "./encryptdecrypt"

export const login = async(data) => {
    // return httpcommon.post(`/auth/login`, encrypt(data))
    let res = await httpcommon.post(`/auth/login`, {data:encryptData(data)})
    let res2 = decryptData(res.data)
    let res3 = {data:JSON.parse(JSON.parse(res2))}
    return res3
}

export const getActivityLog = async() => {
  let res = await httpcommon.get(`/admin/activity-logs`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
  let res3 = {data:JSON.parse(JSON.parse(res2))}
  return res3
}

export const getEntities = async() => {
  let res = await httpcommon.get(`/admin/onboarded-entities`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
  let res2 = decryptData(res.data)
  let res3 = {data:JSON.parse(JSON.parse(res2))}
  return res3
}