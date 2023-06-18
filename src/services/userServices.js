import httpcommon from "../httpcommon"

export const login = (data) => {
    return httpcommon.post(`/auth/login`, data)
}

export const getActivityLog = () => {
  return httpcommon.get(`/admin/activity-logs`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}

export const getEntities = () => {
  return httpcommon.get(`/admin/onboarded-entities`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('codivasToken')}`,
    },
  })
}