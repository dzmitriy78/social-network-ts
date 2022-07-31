import React, {useEffect} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {Params, PathMatch, useMatch} from "react-router-dom";
import {compose} from "redux";
import {AppStateType} from "../../redux/store";

export const ProfileURLMatch = (Component: any) => {
    let RouterComponent: (props: ProfileContainerPropsType) => JSX.Element;
    RouterComponent = (props: ProfileContainerPropsType) => {
        const match = useMatch('/profile/:userId/');
        return <Component {...props} match={match}/>;
    };
    return RouterComponent
}

const ProfileContainer: React.FC<ProfileContainerPropsType> = ({
                                                                   profile,
                                                                   getProfile,
                                                                   getStatus,
                                                                   updateStatus,
                                                                   status,
                                                                   meId,
                                                                   match,
                                                                   savePhoto,
                                                                   saveProfile,
                                                                   editMode,
                                                                   error
                                                               }) => {
    useEffect(() => {
        let userId = match
            ? match.params.userId
            : meId;
        if (userId) {
            getProfile(userId as number)
            getStatus(userId as number)
        }
    }, [match])

    return (
        <Profile profile={profile}
                 status={status}
                 updateStatus={updateStatus}
                 isOwner={!match}
                 savePhoto={savePhoto}
                 editMode={editMode}
                 error={error}
                 saveProfile={saveProfile}/>
    );
}

function mapStateToProps(state: AppStateType) {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        meId: state.auth.userId,
        error: state.profilePage.error,
        editMode: state.profilePage.editMode
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    ProfileURLMatch,
    /* withAuthRedirect*/)
(ProfileContainer)

export type ProfileType = {
    aboutMe: string
    contacts: {
        facebook: string
        github: string
        instagram: string
        mainLink: string
        twitter: string
        vk: string
        website: string
        youtube: string
    }
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: { small: string, large: string }
    userId: number
}
export type ProfileContainerPropsType = {
    profile: ProfileType
    match?: PathMatch | null
    params?: Params
    getProfile(userId: number): void
    getStatus(userId: number): void
    status: string
    updateStatus(status: string): void
    meId: number
    userId: number
    savePhoto(file: File): void
    error: string
    editMode: boolean
    saveProfile(profile: ProfileType): void
}