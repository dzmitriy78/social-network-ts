import React from "react";
import classes from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import PostForm, {FormikValues} from "../../form/PostForm";

export type PostDataType = {
    id: number
    message: string
    likeCount: number
}
type MyPostsType = {
    postData: Array<PostDataType>
    addPost(text: string): void
}

export const MyPosts = (props: MyPostsType) => {

    let postElement = props.postData
        .map((p: { id: number; message: string; likeCount: number; }, i: number) =>
            <Post key={i} id={p.id}
                  message={p.message}
                  likes={p.likeCount}/>)


    let addMyPost = (values: FormikValues) => {
        props.addPost(values.text)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <PostForm callback={addMyPost}/>
                <div className={classes.posts}>
                    {postElement}
                </div>
            </div>
        </div>
    )
}
