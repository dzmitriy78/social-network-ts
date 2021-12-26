import {PostDataType} from "./store";

export const updateNewPostText = "UPDATE-NEW-POST-TEXT";
export const addPost = "ADD-POST";
export const addPostActionCreator = () => ({type: addPost});
export const updatePostActionCreator = (text: string) => ({type: updateNewPostText, newText: text})

let initialState = {
    postData: [
        {id: 1, message: "Hi, how are you", likeCount: 15},
        {id: 2, message: "It's my first post", likeCount: 25},
        {id: 3, message: "Hi", likeCount: 1},
    ],
    newPostText: "",
}

const profileReducer = (state: { postData: PostDataType[]; newPostText: string; }= initialState, action: { type: string; newText: string; newDialText: string; }) => {
    switch (action.type) {
        case "ADD-POST":
            let newPost: PostDataType = {
                id: 7,
                message: state.newPostText,
                likeCount: 0
            }
            state.postData.push(newPost);
            state.newPostText = "";
            return state;
        case "UPDATE-NEW-POST-TEXT":
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}
export default profileReducer;
