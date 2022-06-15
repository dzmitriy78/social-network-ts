import React from "react";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../ProfileContainer";
import ProfileStatus from "./ProfileStatus";
import rootImg from "./../../../assets/images/rootImg.jpg"

type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus(status: string): void
}
export const ProfileInfo: React.FC<ProfileInfoType> = ({profile, status, updateStatus}) => {
    if (!profile) {
        return (
            <Preloader/>
        )
    }
    return (
        <div className={classes.profileInfo}>
            <div>
                <img src={rootImg} alt={"rootImg"}/>
            </div>
            <div className={classes.description}>
                <img
                    src={profile.photos.small} alt={"photos"}/>
                <ProfileStatus status={status}
                               updateStatus={updateStatus}
                />
                <div>
                    <h4>{`Имя: ${profile.fullName}`}</h4>
                </div>
                <div>
                    {`Обо мне: ${profile.aboutMe}`}
                </div>
                <div>
                    {`Контакты: ${profile.contacts.vk}`}
                </div>
                <div>
                    {`В поиске работы? ${profile.lookingForAJobDescription}`}
                </div>
            </div>
        </div>
    )
}