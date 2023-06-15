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

export const getSoloCoupon = (id) => {
    return httpcommon.get(`/beneficiary/single/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
}

export const getVerifCode = (id) => {
    return httpcommon.get(`/beneficiary/verification-code/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('codivasToken')}`
        }
    })
}

export const weeklyCatVsAmt = () => {
  return httpcommon.get(`/beneficiary/weekly-category-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}

export const yearlyCatVsAmt = () => {
  return httpcommon.get(`/beneficiary/monthly-category-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}

export const categoryPie = () => {
  return httpcommon.get(`/beneficiary/expenditure-category-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}

export const trendingData = () => {
  return httpcommon.get(`/beneficiary/trending-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}