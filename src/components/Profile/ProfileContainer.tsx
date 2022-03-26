import React, {Component} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profile-reducer";
import {Params, PathMatch, useMatch} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

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
    profile: ProfileType
    match?: PathMatch | null
    params?: Params
    getProfile(userId: string | undefined | number): void
}

export const ProfileURLMatch = (Component: any) => {
    let RouterComponent: (props: ProfileContainerPropsType) => JSX.Element;
    RouterComponent = (props: ProfileContainerPropsType) => {
        const match = useMatch('/profile/:userId/');
        return <Component {...props} match={match}/>;
    };
    return RouterComponent
}

class ProfileContainer extends React.Component<ProfileContainerPropsType, ProfileType> {
    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : /*'My ID'*/7384;
        this.props.getProfile(userId)
    }

    render() {

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

function mapStateToProps(state: { profilePage: { profile: ProfileType; }; auth: { isAuth: boolean; }; }) {
    return {
        profile: state.profilePage.profile
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile}),
    ProfileURLMatch,
    withAuthRedirect)
(ProfileContainer)