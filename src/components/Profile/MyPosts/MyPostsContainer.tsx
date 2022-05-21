import {addPostActionCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/store";

let mapStateToProps = (state: AppStateType) => {
    return {
        postData: state.profilePage.postData
    }
}
let mapDispatchToProps = (dispatch: (arg0: { type: "ADD-POST"; text: string; }) => any) => {
    return {
        addPost: (text: string) => dispatch(addPostActionCreator(text))
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)