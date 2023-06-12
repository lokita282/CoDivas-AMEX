import httpcommon from "../httpcommon"

export const login = (data) => {
    return httpcommon.post(`/auth/login`, data)
}

export const signup = (data) => {
    return httpcommon.post(`auth/merchant/signup`, data)
}