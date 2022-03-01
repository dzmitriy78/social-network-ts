import React from "react";
import cl from "./Header.module.css";
import {NavLink} from "react-router-dom";

export type HeaderPropsType = {
    isAuth?: boolean
    login?: string
    authMe(): void
}

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={cl.header}>
            <img src="https://previews.123rf.com/images/wavy28/wavy281605/wavy28160500900/59350543-hf-logo.jpg"
                 alt={""}/>
            <div className={cl.loginBlock}>
                {props.isAuth ? props.login
                    : <NavLink to={"/login"}>Login</NavLink>
                }
            </div>
        </header>
    )
}