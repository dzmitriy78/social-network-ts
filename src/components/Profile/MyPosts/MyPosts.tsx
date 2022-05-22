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
    isAuth: boolean
}

export const MyPosts: React.FC<MyPostsType> = ({postData, addPost, isAuth}) => {

    let postElement = postData
        .map((p: PostDataType, i: number) =>
            <Post key={i} id={p.id}
                  message={p.message}
                  likes={p.likeCount}/>)


    let addMyPost = (values: FormikValues) => {
        addPost(values.text)
    }
    return isAuth ? (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <PostForm callback={addMyPost}/>
                <div className={classes.posts}>
                    {postElement}
                </div>
            </div>
        </div>
    ) : <div></div>;
}
