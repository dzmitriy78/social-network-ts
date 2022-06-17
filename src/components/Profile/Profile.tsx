import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";
import no_profile_img from "./../../assets/images/noPofile.jpg"

interface ProfileProps {
    profile: ProfileType
    status: string
    updateStatus(status: string): void
}

export const Profile: React.FC<ProfileProps> = ({profile, updateStatus, status}) => {
    if (!profile) {
        return <div>
            <img src={no_profile_img} alt={"noProfileImg"}/>
        </div>
    }
    return (
        <div>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}