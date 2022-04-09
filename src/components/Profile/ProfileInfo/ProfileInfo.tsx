import React from "react";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../ProfileContainer";
import ProfileStatus from "./ProfileStatus";

type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus(status: string): void
}
export const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {
        return (
            <Preloader/>
        )
    }
    return (
        <div className={classes.profileInfo}>
            <div>
                <img
                    src="https://p4.wallpaperbetter.com/wallpaper/198/347/760/astronaut-vortex-4k-8k-wallpaper-preview.jpg"
                    alt={'avatar'}/>
            </div>
            <div className={classes.description}>
                <img
                    src={props.profile.photos.small} alt={"photos"}/>
                <ProfileStatus status={props.status}
                               updateStatus={props.updateStatus}
                />
                <div>
                    <h4>{"Имя:" + " " + props.profile.fullName}</h4>
                </div>
                <div>
                    {"Обо мне:" + " " + props.profile.aboutMe}
                </div>
                <div>
                    {"Контакты:" + " " + props.profile.contacts.vk}
                </div>
                <div>
                    {"В поиске работы?" + " " + props.profile.lookingForAJobDescription}
                </div>
            </div>
        </div>
    )
}