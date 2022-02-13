import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {Params, PathMatch, useMatch} from "react-router-dom";
import {myAPI} from "../../api/api";

export type ProfileType = {
    aboutMe: string
    contacts: { facebook: string | null, website: string | null, vk: string | null, twitter: string | null, instagram: string | null, }
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: { small: string, large: string }
    userId: number
}
export type ProfileContainerPropsType = {
    setUserProfile(profile: ProfileType): void
    profile: ProfileType
    match?: PathMatch | null
    params?:  Params
}

const ProfileURLMatch = (props: ProfileContainerPropsType) => {
    const match = useMatch('/profile/:userId/');
    return <ProfileContainer {...props} match={match} />;
}
class ProfileContainer extends React.Component<ProfileContainerPropsType, ProfileType> {
    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : /*'My ID'*/7384;
        myAPI.getProfile(userId)
            .then(({ data }) => {
            this.props.setUserProfile(data);
        });
    }
    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

function mapStateToProps(state: { profilePage: { profile: ProfileType; }; }) {
    return ({
        profile: state.profilePage.profile
    })
}


export default connect(mapStateToProps, {setUserProfile})(ProfileURLMatch)