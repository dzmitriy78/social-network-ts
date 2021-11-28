import React from "react";
import classes from "./ProfileInfo.module.css"

export const ProfileInfo = () => {
    return (
        <div className={classes.profileInfo}>
            <div>
                <img
                    src="https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg"/>
            </div>
            <div className={classes.description}> ava + description
                <img
                    src={""}/>
            </div>
        </div>
    )
}