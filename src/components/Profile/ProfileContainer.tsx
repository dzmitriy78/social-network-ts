import React, {Component} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, updateStatus} from "../../redux/profile-reducer";
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
    status: string
}
export type ProfileContainerPropsType = {
    profile: ProfileType
    match?: PathMatch | null
    params?: Params
    getProfile(userId: number): void
    getStatus(userId: number): void
    status: string
    updateStatus(status: string): void
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
        this.props.getProfile(userId as number)
        this.props.getStatus(userId as number)
    }

    render() {

        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
            />
        );
    }
}

function mapStateToProps(state: {
    profilePage: {
        status: string;
        profile: ProfileType;
    }; auth: { isAuth: boolean; };
}) {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus}),
    ProfileURLMatch,
    withAuthRedirect)
(ProfileContainer)