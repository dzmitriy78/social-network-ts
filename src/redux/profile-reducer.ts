import {ProfileType} from "../components/Profile/ProfileContainer"
import {profileAPI} from "../api/api"
import {PostDataType} from "../components/Profile/MyPosts/MyPosts"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./store"

const ADD_POST = "profileReducer/ADD-POST"
const DELETE_POST = "profileReducer/DELETE-POST"
const SET_USER_PROFILE = "profileReducer/SET-USER-PROFILE"
const SET_STATUS = "profileReducer/SET-STATUS"
const SET_PHOTO = "profileReducer/SET-PHOTO"
const SET_ERROR = "profileReducer/SET-ERROR"
const SET_EDIT_MODE = "profileReducer/SET-EDIT-MODE"

export const addPost = (text: string): AddPostActionType => ({type: ADD_POST, text});
export const deletePost = (postId: number) => ({type: DELETE_POST, postId}) as const
export const setUserProfile = (profile: ProfileType): setUserProfileActionType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string): setStatusActionType => ({type: SET_STATUS, status})
export const setPhoto = (photos: { small: string, large: string }) => ({type: SET_PHOTO, photos}) as const
export const setError = (error: string) => ({type: SET_ERROR, error}) as const
export const setEditMode = (editMode: boolean) => ({type: SET_EDIT_MODE, editMode}) as const

let initialState = {
    postData: [
        {id: 1, message: "Hi, how are you", likeCount: 15},
        {id: 2, message: "It's my first post", likeCount: 25},
        {id: 3, message: "Hi", likeCount: 1},
    ],
    profile: null,
    status: "",
    newPostText: "",
    error: "",
    editMode: false
}

const profileReducer = (state: initialStateType = initialState,
                        action: profileActionType): initialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostDataType = {
                id: 7,
                message: action.text,
                likeCount: 0
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ""
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                postData: state.postData.filter((p: { id: number }) => p.id !== action.postId ? p : "")
            }
        case SET_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        case SET_EDIT_MODE:
            return {
                ...state,
                editMode: action.editMode
            }
        default:
            return state;
    }
}

export const getProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        let res = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(res))
    }
}
export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let res = await profileAPI.getStatus(userId)
        dispatch(setStatus(res));
    }
}
export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        let res = await profileAPI.updateStatus(status)
        if (res.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}
export const savePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        let res = await profileAPI.updatePhoto(file)
        if (res.resultCode === 0) {
            dispatch(setPhoto(res.data.photos))
        }
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        const userID = getState().auth.userId
        const res = await profileAPI.updateProfile(profile)
        if (res.resultCode === 0) {
            await dispatch(getProfile(<number>userID))
            dispatch(setEditMode(false))
            dispatch(setError(""))
        } else {
            dispatch(setError(res.messages[0]))
        }
    }
}

export default profileReducer;

type initialStateType = {
    postData: PostDataType[]
    profile: ProfileType | null | { photos: { large: string, small: string } }
    status: string | ""
    newPostText: string
    error: string | ""
    editMode: boolean
}

type profileActionType =
    AddPostActionType
    | setUserProfileActionType
    | setStatusActionType
    | deletePostAT
    | setPhotoAT
    | setErrorAT
    | setEditModeAT

type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type AddPostActionType = {
    type: typeof ADD_POST
    text: string
}
type deletePostAT = ReturnType<typeof deletePost>
type setStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
type setPhotoAT = ReturnType<typeof setPhoto>
type setErrorAT = ReturnType<typeof setError>
type setEditModeAT = ReturnType<typeof setEditMode>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, profileActionType>