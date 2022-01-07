import {addPostActionCreator, updatePostActionCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {PostDataType, ProfilePageType} from "../../../redux/store";

let mapStateToProps = (state: {
    profilePage: ProfilePageType;
    postData: PostDataType; newPostText: string;
}) => {
    return {
        postData: state.profilePage.postData,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: (arg0: { type: string; newText?: string; }) => any) => {
    return {
        addPost: () => dispatch(addPostActionCreator()),
        updatePostActionCreator: (text: string) => dispatch(updatePostActionCreator(text))
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)