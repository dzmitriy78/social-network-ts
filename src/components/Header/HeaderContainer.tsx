import React from "react";
import {Header, HeaderPropsType} from "./Header";
import {connect} from "react-redux";
import {authMe} from "../../redux/auth-reducer";

type HeaderContainerPropsType = {
    authMe(): void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType, HeaderPropsType> {
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

export default connect(mapStateToProps, {authMe})(HeaderContainer);