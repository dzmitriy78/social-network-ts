import React from "react";
import classes from "./Post.module.css";

export type PostType = {
    id: number
    message: string
    likes: number
    deletePost(postId: number): void
}

export const Post: React.FC<PostType> = ({deletePost, id, message, likes}) => {

    let removePost = () => {
        deletePost(id)
    }
    return (
        <div className={classes.item}>
            <img src={"https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"}
                 alt={"MyPost"}/>
            <span className={classes.message}>{message}</span>
                <button className={classes.btn} onClick={removePost}>x</button>
            <div className={classes.likes}>
                <span>Likes: </span>
                {likes}
            </div>
            <hr/>
        </div>
    )
}