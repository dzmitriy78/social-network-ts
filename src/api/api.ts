import axios from "axios";
import {ProfileType} from "../components/Profile/ProfileContainer";
import {UsersType} from "../components/Users/Users";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY as string
    }
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
            .then(res=>res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(res=>res.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType<{}>>(`profile/status/`, {status})
            .then(res=>res.data)
    }
}

type MeResponseType = {
    id: number
    email: string
    login: string
}

export const myAPI = {
    authMe() {
        return instance.get<ResponseType<MeResponseType>>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseType<{ userId: number }>>(`auth/login`, {email, password, rememberMe})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType<{}>>(`auth/login`)
            .then(res => res.data)
    }
}
