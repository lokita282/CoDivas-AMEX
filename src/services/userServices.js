import httpcommon from "../httpcommon"

// for put, post and delete
export const updateMe = (data) => {
    return httpcommon.put(`/user/me`, data, {
        headers: {
            Authorization: localStorage.getItem('codivasToken')
        }
    });
};

// for get requests
export const getUsers = () => {
    return httpcommon.get(`/user/users?expert=yes`)
}