import httpcommon from "../httpcommon"

export const login = (data) => {
    return httpcommon.post(`/auth/login`, data)
}

export const signup = (data) => {
    return httpcommon.post(`auth/merchant/signup`, data)
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