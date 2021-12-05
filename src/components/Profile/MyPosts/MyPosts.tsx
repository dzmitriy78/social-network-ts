import React, {createRef} from "react";
import classes from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {addPostActionCreator, PostDataType, updatePostActionCreator} from "../../../redux/state";

type MyPostsType = {
    postData: Array<PostDataType>
    dispatch: (action: { type: string })=>void
    newPostText: string
}

export const MyPosts  = (props:MyPostsType) => {

    let postElement = props.postData
        .map(p => <Post id={p.id} message={p.message} likes={p.likeCount}/>)


    let addPost = () => {
        props.dispatch(addPostActionCreator());
    }
    let newPostElement: React.RefObject<HTMLTextAreaElement>;
    newPostElement = createRef();
    let onPostChange = () => {

        let text = newPostElement.current?.value;
        if (text) {
            props.dispatch(updatePostActionCreator(text));
        }
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
                <div className={classes.posts}>
                    {postElement}
                </div>
            </div>
        </div>
    )
}