import httpcommon from '../httpcommon'

export const createErupi = (data) => {
  return httpcommon.post(`/bank/create-voucher`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}

export const createBulkErupi = (data) => {
  return httpcommon.post(`/bank/create-bulk-vouchers`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}

export const weeklyCatVsAmt = () => {
  return httpcommon.get(`/bank/weekly-category-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}

export const weeklyCatVsOrg = () => {
  return httpcommon.get(`/bank/weekly-org-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}

export const weeklyTrending = () => {
  return httpcommon.get(`/bank/weekly-trending-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}

export const regionRedeemed = () => {
  return httpcommon.get(`/bank/region-distribution/redeemed`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}

export const regionIssued = () => {
  return httpcommon.get(`/bank/region-distribution/issued`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}

export const viewVouchers = () => {
  return httpcommon.get(`/bank/vouchers`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}

export const revokeVoucher = (id) => {
  return httpcommon.patch(`/bank/revoke-voucher/${id}`,{}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}





