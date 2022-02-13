import React from "react";
import {Header, HeaderPropsType} from "./Header";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import {myAPI} from "../../api/api";

type HeaderContainerPropsType = {
    setAuthUserData: (userId: string, email: string, login: string) => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType, HeaderPropsType> {
    componentDidMount() {
        myAPI.authMe()
            .then(data => {
                    if (data.resultCode === 0) {
                        let {id, email, login} = data.data;
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
    }
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);