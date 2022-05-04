import React from "react";
import cl from "./Header.module.css";
import {NavLink} from "react-router-dom";

export type HeaderPropsType = {
    isAuth: boolean
    login: string
    logout(): void
}

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={cl.header}>
            <img src="https://previews.123rf.com/images/wavy28/wavy281605/wavy28160500900/59350543-hf-logo.jpg"
                 alt={""}/>
            <div className={cl.loginBlock}>
                {props.isAuth
                    ? <div>{props.login}
                        <button onClick={props.logout}>Log out</button>
                    </div>
                    : <NavLink to={"/login"}>Login</NavLink>
                }
            </div>
        </header>
    )
}