import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {Params, PathMatch, useMatch} from "react-router-dom";

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
    match?: PathMatch<string> | null
    params?:  Params<string>
}


const ProfileURLMatch = (props: ProfileContainerPropsType) => {
    const match = useMatch('/profile/:userId/');
    return <ProfileContainer {...props} match={match} />;
}
class ProfileContainer extends React.Component<ProfileContainerPropsType, ProfileType> {
    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : 'My ID';
        let BASE_URL  = "https://social-network.samuraijs.com/api/1.0";
        axios.get(`${BASE_URL}/profile/${userId}`).then(({ data }) => {
            this.props.setUserProfile(data);
        });
    }
/*        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/10`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }*/

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