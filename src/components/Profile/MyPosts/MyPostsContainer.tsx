import React from "react";
import {PostDataType} from "../../../redux/store";
import {addPostActionCreator, updatePostActionCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";

type MyPostsType = {
    postData: Array<PostDataType>
    dispatch: (action: { type: string }) => void
    newPostText: string
}

export const MyPostsContainer = (props:any) => {
    let state = props.store.getState()

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    let onPostChange = (text:string) => {
            props.store.dispatch(updatePostActionCreator(text));
        }
    return (
        <MyPosts postData={state.profilePage.postData}
                 newPostText={state.profilePage.newPostText}
                 addPost={addPost}
                 updatePostActionCreator={onPostChange}/>
    )
}