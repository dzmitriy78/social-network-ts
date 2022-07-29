import React, {ChangeEvent} from "react";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../ProfileContainer";
import ProfileStatus from "./ProfileStatus";
import rootImg from "./../../../assets/images/rootImg.jpg"
import userPhoto from "./../../../assets/images/user.png"

type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus(status: string): void
    isOwner: boolean
    savePhoto(file: any): void
}
export const ProfileInfo: React.FC<ProfileInfoType> = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    if (!profile) {
        return (
            <Preloader/>
        )
    }

    const onPhotoSelect = (e: ChangeEvent<any>) => {
        if (e.target.files.length){
        savePhoto(e.target.files[0])
    }}

    return (
        <div className={classes.profileInfo}>
            <div>
                <img src={rootImg} alt={"rootImg"}/>
            </div>
            <div className={classes.description}>
                <img className={classes.userPhoto}
                     src={profile.photos.small || profile.photos.large || userPhoto} alt={"photos"}/>
                {isOwner && <span>Сменить фото<input type={"file"} onChange={onPhotoSelect}/></span>}
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