import React from "react";
import {Header, HeaderPropsType} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";

type HeaderContainerPropsType = {
    setAuthUserData: (userId: string, email: string, login: string) => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType, HeaderPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(response => {
                    if (response.data.resultCode === 0) {
                        let {id, email, login} = response.data.data;
                        this.props.setAuthUserData(id, email, login);
                    }
                }
            )
    }

    render() {
        return <Header {...this.props}/>
    }
}

function mapStateToProps(state: { auth: { isAuth: boolean; login: string; }; }) {
    return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
}}

export default connect (mapStateToProps, {setAuthUserData}) (HeaderContainer);