import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";
import no_profile_img from "./../../assets/images/noPofile.jpg"


export const Profile: React.FC<ProfileProps> = ({
                                                    profile,
                                                    updateStatus,
                                                    status,
                                                    isOwner,
                                                    savePhoto,
                                                    saveProfile,
                                                    error,
                                                    editMode
                                                }) => {
    if (!profile) {
        return <div>
            <img src={no_profile_img} alt={"noProfileImg"}/>
        </div>
    }
    return (
        <div>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
                         editMode={editMode}
                         error={error}
                         saveProfile={saveProfile}/>
            <MyPostsContainer/>
        </div>
    )
}

interface ProfileProps {
    profile: ProfileType
    status: string

    updateStatus(status: string): void

    isOwner: boolean

    savePhoto(file: File): void

    error: string
    editMode: boolean

    saveProfile(profile: ProfileType): void
}