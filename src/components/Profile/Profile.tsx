import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

type ProfileType = {
    profilePage: ProfilePageType
    dispatch: any
}

export const Profile = (props:any) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </div>
    )
}