import axios from "axios";
import {ProfileType} from "../components/Profile/ProfileContainer";
import {UsersType} from "../components/Users/Users";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {"API-KEY": "a6e25988-0e21-403d-9590-97bddd744784"}
})

type GetUsersType = {
    items: UsersType[]
    totalCount: number
    error: string
}

type ResponseType<T> = {
    resultCode: number
    messages: string[]
    data: T
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollowUser(id: number) {
        return instance.delete<ResponseType<{}>>(`follow/${id}`)
            .then(response => response.data)
    },
    followUser(id: number) {
        return instance.post<ResponseType<{}>>(`follow/${id}`, {},)
            .then(response => response.data)
    }
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType<{}>>(`profile/status/`, {status})
    }
}

export const myAPI = {
    authMe() {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>(`auth/me`)
            .then(response => response.data)
    },
}