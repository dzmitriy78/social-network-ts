import React from "react";
import {addPostActionCreator, updatePostActionCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";

export const MyPostsContainer = (props:any) => {
    let state = props.store.getState().profilePage;

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    let onPostChange = (text:string) => {
            props.store.dispatch(updatePostActionCreator(text));
        }
    return (
        <MyPosts postData={state.postData}
                 newPostText={state.newPostText}
                 addPost={addPost}
                 updatePostActionCreator={onPostChange}/>
    )
}