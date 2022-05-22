import {addPost} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/store";

let mapStateToProps = (state: AppStateType) => {
    return {
        postData: state.profilePage.postData,
        isAuth: state.auth.isAuth
    }
}
export const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts)