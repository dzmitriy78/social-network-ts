import {addPostActionCreator} from "../../../redux/profile-reducer";
import {MyPosts, PostDataType, ProfilePageType} from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state: {
    profilePage: ProfilePageType;
    postData: PostDataType
}) => {
    return {
        postData: state.profilePage.postData
    }
}
let mapDispatchToProps = (dispatch: (arg0: { type: string }) => any) => {
    return {
        addPost: (text: string) => dispatch(addPostActionCreator(text))
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)