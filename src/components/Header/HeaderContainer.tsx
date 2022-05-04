import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";

type HeaderPropsType = {
    logout(): void
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<HeaderPropsType, HeaderPropsType> {

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

export default connect(mapStateToProps, {logout})(HeaderContainer);