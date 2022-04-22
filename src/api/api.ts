import axios from "axios";
import {ProfileType} from "../components/Profile/ProfileContainer";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {"API-KEY": "a6e25988-0e21-403d-9590-97bddd744784"}
})

type RespUsersType = {
            "name": string
            "id": number
            "photos": {
                "small": string
                "large": string
            },
            "status": string
            "followed": boolean
}

type GetUsersType = {
    "items": RespUsersType[]
    "totalCount": number
    "error": string
}
type UpdateFollowAndStatusType = {
    resultCode: number
    messages: string[]
    data: {}
}
type GetAuthType = {
    resultCode: number
    messages: string[]
    data: {
        id: number
        email: string
        login: string
    }
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollowUser(id: number) {
        return instance.delete<UpdateFollowAndStatusType>(`follow/${id}`)
            .then(response => response.data)
    },
    followUser(id: number) {
        return instance.post<UpdateFollowAndStatusType>(`follow/${id}`, {},)
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
        return instance.put<UpdateFollowAndStatusType>(`profile/status/`, {status})
    }
}

export const myAPI = {
    authMe() {
        return instance.get<GetAuthType>(`auth/me`)
            .then(response => response.data)
    },
}