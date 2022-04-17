import React, {ComponentType} from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

type MPSType = {
    isAuth: boolean
}

interface MapStateToPropsForRedirectParams {
    auth: { isAuth: boolean }
}

let mapStateToPropsForRedirect = (state: MapStateToPropsForRedirectParams): MPSType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect <T>(Component: ComponentType<T>) {
    return connect(mapStateToPropsForRedirect)((props: MPSType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth)
            return <Navigate replace to="/login"/>
        return <Component {...restProps as T}/>
    })
}