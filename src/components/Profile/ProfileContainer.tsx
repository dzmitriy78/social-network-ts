import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profile-reducer";
import {Params, PathMatch, useMatch} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

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

const ProfileURLMatch = (props: ProfileContainerPropsType) => {
    const match = useMatch('/profile/:userId/');
    return <AuthRedirectComponent {...props} match={match}/>;
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

let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

function mapStateToProps(state: { profilePage: { profile: ProfileType; }; auth: { isAuth: boolean; }; }) {
    return {
        profile: state.profilePage.profile
    }
}


export default connect(mapStateToProps, {getProfile})(ProfileURLMatch)