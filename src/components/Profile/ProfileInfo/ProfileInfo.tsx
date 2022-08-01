import React, {ChangeEvent, useRef} from "react";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "./../../../assets/images/user.png"
import ProfileDataEditingForm from "../../form/ProfileDataEditingForm";
import {useDispatch} from "react-redux";
import {setEditMode, setError} from "../../../redux/profile-reducer";
import {ProfileType} from "../ProfileContainer";


export const ProfileInfo: React.FC<ProfileInfoType> = ({
                                                           profile,
                                                           status,
                                                           updateStatus,
                                                           isOwner,
                                                           savePhoto,
                                                           saveProfile,
                                                           error,
                                                           editMode
                                                       }) => {
    const dispatch = useDispatch()
    const filePicker = useRef<HTMLInputElement>(null)

    if (!profile) {
        return (
            <Preloader/>
        )
    }

    const onPhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const enableEditMode = () => {
        dispatch(setEditMode(true))
    }
    const disableEditMode = () => {
        dispatch(setEditMode(false))
        dispatch(setError(""))
    }

    const handlePick = () => {
        filePicker.current?.click()
    }

    return (
        <div className={classes.profileInfo}>
            {/*<div>
                <img src={rootImg} alt={"rootImg"}/>
            </div>*/}
            <div className={classes.description}>
                <img className={classes.userPhoto}
                     src={profile.photos.small || profile.photos.large || userPhoto} alt={"photos"}/>
                {isOwner && <div>
                    <button onClick={handlePick}>Change avatar</button>
                    <input className={classes.hidden} type={"file"}
                           onChange={onPhotoSelect}
                           ref={filePicker}
                           accept={"image/*,.png, .jpg, .gif, .web"}/></div>}
                <ProfileStatus status={status}
                               updateStatus={updateStatus}
                               isOwner={isOwner}
                />
                {editMode && <button onClick={disableEditMode}>Cancel Editing</button>}
                {editMode
                    ? <ProfileDataEditingForm profile={profile}
                                              saveProfile={saveProfile}
                                              error={error}/>
                    : <ProfileData profile={profile}
                                   goToEditMode={enableEditMode}
                                   isOwner={isOwner}/>}
            </div>
        </div>
    )
}

const Contacts: React.FC<ContactPropsType> = ({title, value}) => {
    return <div>
        <b>{title}</b>: {value}
    </div>
}

const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <button onClick={goToEditMode}>Edit Profile</button>}
            <div className={classes.description}>
                <h3>  {profile.fullName}</h3>
            </div>
            <div className={classes.description}>
                <b>Looking for a job:</b> {profile.lookingForAJob ? "Yes" : "No"}
            </div>
            <div className={classes.description}>
                <b>My professional skills:</b> {profile.lookingForAJobDescription}
            </div>
            <div className={classes.description}>
                <b>AboutMe:</b> {profile.aboutMe}
            </div>
            <div className={classes.description}>
                <b>Contacts</b>: {Object.keys(profile.contacts)
                .map(key => {
                    return <Contacts key={key} title={key} value={profile.contacts[key]}/>
                })}
            </div>
        </div>
    )
}
type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus(status: string): void
    isOwner: boolean
    savePhoto(file: File): void
    error: string
    editMode: boolean
    saveProfile(profile: ProfileType): void
}
type ContactPropsType = {
    title: string
    value: string
}
type ProfileDataType = {
    profile: any
    isOwner: boolean
    goToEditMode(): void
}