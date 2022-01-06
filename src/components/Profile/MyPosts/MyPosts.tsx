import React from "react";
import classes from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostDataType} from "../../../redux/store";

type MyPostsType = {
    postData: Array<PostDataType>
    dispatch: (action: { type: string }) => void
    newPostText: string
    updatePostActionCreator: any
    addPost: any
}

export const MyPosts = (props: any) => {

    let postElement = props.postData
        .map((p: { id: number; message: string; likeCount: number; }) => <Post id={p.id} message={p.message} likes={p.likeCount}/>)


    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = (e: { target: { value: string; }; }) => {

        let text = e.target.value;
        if (text) {
            props.updatePostActionCreator(text);
        }
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={props.newPostText}/>
                </div>
                <div>
                    <button disabled={props.newPostText === ""} onClick={onAddPost}>Add post</button>
                </div>
                <div className={classes.posts}>
                    {postElement}
                </div>
            </div>
        </div>
    )
}