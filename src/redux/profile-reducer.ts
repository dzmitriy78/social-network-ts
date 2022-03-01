import {PostDataType} from "./store";
import {ProfileType} from "../components/Profile/ProfileContainer";
import {myAPI} from "../api/api";

export const updateNewPostText = "UPDATE-NEW-POST-TEXT";
export const addPost = "ADD-POST";
export const addPostActionCreator = () => ({type: addPost});
export const updatePostActionCreator = (text: string) => ({type: updateNewPostText, newText: text})
export const setUserProfile = (profile: ProfileType) => ({type: "SET_USER_PROFILE", profile})

let initialState = {
    postData: [
        {id: 1, message: "Hi, how are you", likeCount: 15},
        {id: 2, message: "It's my first post", likeCount: 25},
        {id: 3, message: "Hi", likeCount: 1},
    ],
    newPostText: "",
    profile: null
}

const profileReducer = (state: { postData: PostDataType[]; newPostText: string; } = initialState, action: { type: string; newText: string; newDialText: string; profile: ProfileType }) => {
    switch (action.type) {
        case "ADD-POST":
            let newPost: PostDataType = {
                id: 7,
                message: state.newPostText,
                likeCount: 0
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ""
            }
        case "UPDATE-NEW-POST-TEXT":
            return {
                ...state,
                newPostText: action.newText
            }
        case "SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state;
    }
}

export const getProfile = (userId: string | undefined | number) => {
    return (dispatch: (arg0: { type: string; profile: ProfileType; }) => void) => {
        myAPI.getProfile(userId)
            .then(({data}) => {
                dispatch(setUserProfile(data));
            })
    }
}

export default profileReducer;
