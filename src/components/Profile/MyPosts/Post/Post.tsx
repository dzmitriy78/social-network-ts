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
                 alt={""}/>
            {message}

            <button className={classes.btn} onClick={removePost}>x</button>
            <div>
                <span>Likes:</span>
                {likes}
            </div>
            <hr/>
        </div>
    )
}