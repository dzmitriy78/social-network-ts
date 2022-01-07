import React from "react";
import classes from "./ProfileInfo.module.css"

export const ProfileInfo = () => {
    return (
        <div className={classes.profileInfo}>
            <div>
                <img
                    src="https://p4.wallpaperbetter.com/wallpaper/198/347/760/astronaut-vortex-4k-8k-wallpaper-preview.jpg" alt={''}/>
            </div>
            <div className={classes.description}> ava + description
                <img
                    src="" alt={""}/>
            </div>
        </div>
    )
}