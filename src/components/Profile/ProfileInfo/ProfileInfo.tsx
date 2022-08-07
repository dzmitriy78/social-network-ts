import React, {ChangeEvent, useRef} from "react";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "./../../../assets/images/user.png"
import ProfileDataEditingForm from "../../form/ProfileDataEditingForm";
import {useDispatch} from "react-redux";
import {setEditMode, setError} from "../../../redux/profile-reducer";
import {ProfileType} from "../ProfileContainer";
import {ProfileData} from "./ProfileData";


export const ProfileInfo: React.FC<ProfileInfoType> = ({
                                                           profile,
                                                           status,
                                                           updateStatus,
                                                           isOwner,
                                                           savePhoto,
                                                           saveProfile,
                                                           error,
                                                           editMode,
                                                           isAuth
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
            <div className={classes.description}>
                <img className={classes.userPhoto}
                     src={profile.photos.large || userPhoto} alt={"photos"}/>
                {isAuth && isOwner && <div>
                    <button className={classes.btn} onClick={handlePick}>Change avatar</button>
                    <input className={classes.hidden} type={"file"}
                           onChange={onPhotoSelect}
                           ref={filePicker}
                           accept={"image/*,.png, .jpg, .gif, .web"}/></div>}
                <ProfileStatus status={status}
                               updateStatus={updateStatus}
                               isOwner={isOwner}
                               isAuth={isAuth}
                />
                {isAuth && isOwner && editMode && <button className={classes.btn} onClick={disableEditMode}>Cancel editing</button>}
                {isAuth && isOwner && editMode
                    ? <ProfileDataEditingForm profile={profile}
                                              saveProfile={saveProfile}
                                              error={error}/>
                    : <ProfileData profile={profile}
                                   goToEditMode={enableEditMode}
                                   isOwner={isOwner}
                                   isAuth={isAuth}/>}
            </div>
        </div>
    )
}

type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus(status: string): void
    isOwner: boolean
    isAuth: boolean
    savePhoto(file: File): void
    error: string
    editMode: boolean
    saveProfile(profile: ProfileType): void
}
