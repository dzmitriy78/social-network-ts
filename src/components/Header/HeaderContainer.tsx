import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {authMe, logout} from "../../redux/auth-reducer";

type HeaderPropsType = {
    authMe(): void
    logout(): void
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<HeaderPropsType, HeaderPropsType> {
    componentDidMount() {
        this.props.authMe()
    }

    render() {
        return <Header {...this.props}/>
    }
}

function mapStateToProps(state: { auth: { isAuth: boolean; login: string; }; }) {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {authMe, logout})(HeaderContainer);