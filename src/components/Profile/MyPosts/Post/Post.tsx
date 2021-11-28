import React from "react";
import classes from "./Post.module.css";

export type PostType = {
    id: number
    message: string
    likes: number
}

export const Post = (props: PostType) => {

    return (
        <div className={classes.item}>
            <img src={"https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"}/>
            {props.message}
            <div>
                <span>Likes:</span>
                {props.likes}
            </div>
        </div>
    )
}