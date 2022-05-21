import {ProfileType} from "../components/Profile/ProfileContainer";
import {profileAPI} from "../api/api";
import {PostDataType} from "../components/Profile/MyPosts/MyPosts";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";

export const addPostActionCreator = (text: string): AddPostActionType => ({type: ADD_POST, text});
export const setUserProfile = (profile: ProfileType): setUserProfileActionType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string): setStatusActionType => ({type: SET_STATUS, status})

type initialStateType = {
    postData: PostDataType[]
    profile: ProfileType | null
    status: string
    newPostText: string
}

type profileActionType = AddPostActionType | setUserProfileActionType | setStatusActionType

type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type AddPostActionType = {
    type: typeof ADD_POST
    text: string
}
type setStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

let initialState = {
    postData: [
        {id: 1, message: "Hi, how are you", likeCount: 15},
        {id: 2, message: "It's my first post", likeCount: 25},
        {id: 3, message: "Hi", likeCount: 1},
    ],
    profile: null,
    status: "",
    newPostText: ""
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
        default:
            return state;
    }
}

export const getProfile = (userId: number) => {
    return (dispatch: (arg0: setUserProfileActionType) => void) => {
        profileAPI.getProfile(userId)
            .then(({data}) => {
                dispatch(setUserProfile(data))
            })
    }
}
export const getStatus = (userId: number) => {
    return (dispatch: (arg0: setStatusActionType) => void) => {
        profileAPI.getStatus(userId)
            .then(({data}) => {
                dispatch(setStatus(data));
            })
    }
}
export const updateStatus = (status: string) => {
    return (dispatch: (arg0: setStatusActionType) => void) => {
        profileAPI.updateStatus(status)
            .then(({data}) => {
                if (data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            })
    }
}

export default profileReducer;
