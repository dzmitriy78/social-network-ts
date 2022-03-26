import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state: { auth: { isAuth: boolean; }; })=>{
    return{
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Component:any) => {
    return connect (mapStateToPropsForRedirect)((props: any) => {
    if (!props.isAuth)
        return <Navigate replace to="/login"/>
    return <Component {...props}/>
})
}