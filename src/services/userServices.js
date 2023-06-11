import httpcommon from "../httpcommon"

export const login = (data) => {
    return httpcommon.post(`/auth/login`, data)
}

export const signup = (data) => {
    return httpcommon.post(`/auth/beneficiary/signup`, data)
}

export const getAllCoupons = () => {
    return httpcommon.get(`/beneficiary/multiple/all-grouped`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
}

export const getCategoryCoupon = (cat) => {
    return httpcommon.get(`/beneficiary/multiple/${cat}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
}