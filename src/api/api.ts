import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {"API-KEY": "1d749247-8add-4b0f-b135-ce6b6d1987eb"}
})

export const usersAPI = {
    getUsers(currentPage: any, pageSize: any) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    deleteUsers(id: any) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    },
    postUsers(id: any) {
        return instance.post(`follow/${id}`, {})
            .then(response => response.data)
    }
}
export const myAPI = {
    getProfile(userId: any) {
        return instance.get(`profile/${userId}`)
    },
    authMe() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
}