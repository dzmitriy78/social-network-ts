import {ProfileType} from "../components/Profile/ProfileContainer";
import {profileAPI} from "../api/api";
import {PostDataType} from "../components/Profile/MyPosts/MyPosts";

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";

export const addPostActionCreator = (text: string) => ({type: ADD_POST, text});
export const updatePostActionCreator = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text})
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string) => ({type: SET_STATUS, status})

let initialState = {
    postData: [
        {id: 1, message: "Hi, how are you", likeCount: 15},
        {id: 2, message: "It's my first post", likeCount: 25},
        {id: 3, message: "Hi", likeCount: 1},
    ],
    profile: null,
    status: ""
}

const profileReducer = (state: { postData: PostDataType[] } = initialState,
                        action: { type: string; text: string; newDialText: string; profile: ProfileType; status: string }) => {
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
    return (dispatch: (arg0: { type: string; profile: ProfileType; }) => void) => {
        profileAPI.getProfile(userId)
            .then(({data}) => {
                dispatch(setUserProfile(data))
            })
    }
}
export const getStatus = (userId: number) => {
    return (dispatch: (arg0: { type: string; status: string }) => void) => {
        profileAPI.getStatus(userId)
            .then(({data}) => {
                dispatch(setStatus(data));
            })
    }
}
export const updateStatus = (status: string) => {
    return (dispatch: (arg0: { type: string; status: string; }) => void) => {
        profileAPI.updateStatus(status)
            .then(({data}) => {
                if (data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            })
    }
}

export default profileReducer;
