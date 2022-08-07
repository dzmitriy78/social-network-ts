import React from "react";
import classes from "./ProfileInfo.module.css";
import {ProfileType} from "../ProfileContainer";

const Contacts: React.FC<ContactPropsType> = ({title, value}) => {
    return <div>
        <b>{title}</b>: {value}
    </div>
}

export const ProfileData: React.FC<ProfileDataType> = ({
                                                           profile,
                                                           isOwner,
                                                           isAuth,
                                                           goToEditMode
                                                       }) => {
    return (
        <div className={classes.profileInfo}>
            {isAuth && isOwner && <button className={classes.btn} onClick={goToEditMode}>Edit profile</button>}
            <div className={classes.description}>
                <div className={classes.name}>  {profile.fullName}</div>
            </div>
            <div className={classes.description}>
                <b>Looking for a job:</b>
                <div>{profile.lookingForAJob ? "Yes" : "No"}</div>
            </div>
            <div className={classes.description}>
                <b>My professional skills:</b>
                <div>{profile.lookingForAJobDescription}</div>
            </div>
            <div className={classes.description}>
                <b>AboutMe:</b>
                <div>{profile.aboutMe}</div>
            </div>
            <div className={classes.description}>
                <b>Contacts</b>: {Object.keys(profile.contacts)
                .map(key => {
                    // @ts-ignore
                    return <Contacts key={key} title={key} value={profile.contacts[key]}/>
                })}
            </div>
        </div>
    )
}
type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    isAuth: boolean
    goToEditMode(): void
}
type ContactPropsType = {
    title: string
    value: string
}