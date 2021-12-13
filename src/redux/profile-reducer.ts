import {PostDataType} from "./state";

export const updateNewPostText = "UPDATE-NEW-POST-TEXT";
export const addPost = "ADD-POST";
export const addPostActionCreator = () => ({type: addPost});
export const updatePostActionCreator = (text: string) => ({type: updateNewPostText, newText: text})

const profileReducer = (state: { postData: any; newPostText: string; }, action: { type: string; newText: string; newDialText: string; }) => {
    switch (action.type) {
        case "ADD-POST":
            let newPost: PostDataType = {
                id: 7,
                message: state.newPostText,
                likeCount: 0
            }
            state.postData.push(newPost);
            state.newPostText = "";
            break;
        case "UPDATE-NEW-POST-TEXT":
            state.newPostText = action.newText;
            break;
        default:
            return state;
    }
    return state;
}
export default profileReducer;
